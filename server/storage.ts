import { 
  users, 
  breathingSessions, 
  userAudioLibrary, 
  userFeedback,
  type User, 
  type InsertUser,
  type BreathingSession,
  type InsertBreathingSession,
  type AudioLibrary,
  type InsertAudioLibrary,
  type Feedback,
  type InsertFeedback
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte, count, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  
  // Breathing session operations
  createBreathingSession(session: InsertBreathingSession): Promise<BreathingSession>;
  getUserSessions(userId: number, limit?: number): Promise<BreathingSession[]>;
  getSessionAnalytics(userId: number, startDate: Date, endDate: Date): Promise<{
    totalSessions: number;
    totalMinutes: number;
    averageSessionLength: number;
    mostUsedProtocol: string;
    completionRate: number;
  }>;
  
  // Audio library operations
  addUserAudio(audio: InsertAudioLibrary): Promise<AudioLibrary>;
  getUserAudioLibrary(userId: number): Promise<AudioLibrary[]>;
  deleteUserAudio(id: number, userId: number): Promise<boolean>;
  
  // Feedback operations
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async deleteUser(id: number): Promise<boolean> {
    // Delete related data first
    await db.delete(breathingSessions).where(eq(breathingSessions.userId, id));
    await db.delete(userAudioLibrary).where(eq(userAudioLibrary.userId, id));
    await db.delete(userFeedback).where(eq(userFeedback.userId, id));
    
    // Delete user
    const result = await db.delete(users).where(eq(users.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Breathing session operations
  async createBreathingSession(session: InsertBreathingSession): Promise<BreathingSession> {
    const [breathingSession] = await db.insert(breathingSessions).values(session).returning();
    return breathingSession;
  }

  async getUserSessions(userId: number, limit: number = 50): Promise<BreathingSession[]> {
    return await db
      .select()
      .from(breathingSessions)
      .where(eq(breathingSessions.userId, userId))
      .orderBy(desc(breathingSessions.createdAt))
      .limit(limit);
  }

  async getSessionAnalytics(userId: number, startDate: Date, endDate: Date) {
    const sessions = await db
      .select()
      .from(breathingSessions)
      .where(
        and(
          eq(breathingSessions.userId, userId),
          gte(breathingSessions.createdAt, startDate),
          lte(breathingSessions.createdAt, endDate)
        )
      );

    const totalSessions = sessions.length;
    const totalMinutes = Math.round(sessions.reduce((acc, s) => acc + s.completedDuration, 0) / 60);
    const averageSessionLength = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;
    
    // Find most used protocol
    const protocolCounts = sessions.reduce((acc, s) => {
      acc[s.protocolName] = (acc[s.protocolName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const mostUsedProtocol = Object.entries(protocolCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'None';
    
    const completedSessions = sessions.filter(s => s.completed).length;
    const completionRate = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

    return {
      totalSessions,
      totalMinutes,
      averageSessionLength,
      mostUsedProtocol,
      completionRate,
    };
  }

  // Audio library operations
  async addUserAudio(audio: InsertAudioLibrary): Promise<AudioLibrary> {
    const [audioFile] = await db.insert(userAudioLibrary).values(audio).returning();
    return audioFile;
  }

  async getUserAudioLibrary(userId: number): Promise<AudioLibrary[]> {
    return await db
      .select()
      .from(userAudioLibrary)
      .where(and(eq(userAudioLibrary.userId, userId), eq(userAudioLibrary.isActive, true)))
      .orderBy(desc(userAudioLibrary.createdAt));
  }

  async deleteUserAudio(id: number, userId: number): Promise<boolean> {
    const result = await db
      .update(userAudioLibrary)
      .set({ isActive: false })
      .where(and(eq(userAudioLibrary.id, id), eq(userAudioLibrary.userId, userId)));
    return (result.rowCount || 0) > 0;
  }

  // Feedback operations
  async createFeedback(feedback: InsertFeedback): Promise<Feedback> {
    const [feedbackRecord] = await db.insert(userFeedback).values(feedback).returning();
    return feedbackRecord;
  }
}

export const storage = new DatabaseStorage();
