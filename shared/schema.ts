import { pgTable, text, serial, integer, boolean, timestamp, jsonb, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: date("date_of_birth"),
  gender: text("gender"), // 'male', 'female', 'other', 'prefer_not_to_say'
  profilePicture: text("profile_picture"), // URL to uploaded image
  hasSubscription: boolean("has_subscription").default(false),
  hasUsedTrial: boolean("has_used_trial").default(false),
  subscriptionEndDate: timestamp("subscription_end_date"),
  themePreference: text("theme_preference").default("auto"), // 'light', 'dark', 'auto'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const breathingSessions = pgTable("breathing_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  protocol: text("protocol").notNull(), // protocol id
  protocolName: text("protocol_name").notNull(),
  duration: integer("duration").notNull(), // in seconds
  completedDuration: integer("completed_duration").notNull(), // actual time spent
  cycles: integer("cycles").default(0),
  completed: boolean("completed").default(false),
  mood: text("mood"), // 'great', 'good', 'okay', 'stressed', 'anxious'
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userAudioLibrary = pgTable("user_audio_library", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  duration: integer("duration"), // in seconds
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userFeedback = pgTable("user_feedback", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // 'bug', 'feature', 'general', 'support'
  status: text("status").default("open"), // 'open', 'in_progress', 'resolved'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBreathingSessionSchema = createInsertSchema(breathingSessions).omit({
  id: true,
  createdAt: true,
});

export const insertAudioLibrarySchema = createInsertSchema(userAudioLibrary).omit({
  id: true,
  createdAt: true,
});

export const insertFeedbackSchema = createInsertSchema(userFeedback).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBreathingSession = z.infer<typeof insertBreathingSessionSchema>;
export type BreathingSession = typeof breathingSessions.$inferSelect;
export type InsertAudioLibrary = z.infer<typeof insertAudioLibrarySchema>;
export type AudioLibrary = typeof userAudioLibrary.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Feedback = typeof userFeedback.$inferSelect;
