import { users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserSubscription(id: number, subscriptionData: {
    hasSubscription: boolean;
    razorpayCustomerId?: string;
    razorpaySubscriptionId?: string;
    subscriptionEndDate?: Date;
  }): Promise<User | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      id,
      username: insertUser.username,
      password: insertUser.password,
      email: insertUser.email ?? null,
      hasSubscription: false,
      razorpayCustomerId: null,
      razorpaySubscriptionId: null,
      subscriptionEndDate: null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserSubscription(id: number, subscriptionData: {
    hasSubscription: boolean;
    razorpayCustomerId?: string;
    razorpaySubscriptionId?: string;
    subscriptionEndDate?: Date;
  }): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser: User = {
      ...user,
      hasSubscription: subscriptionData.hasSubscription,
      razorpayCustomerId: subscriptionData.razorpayCustomerId || user.razorpayCustomerId,
      razorpaySubscriptionId: subscriptionData.razorpaySubscriptionId || user.razorpaySubscriptionId,
      subscriptionEndDate: subscriptionData.subscriptionEndDate || user.subscriptionEndDate
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
}

export const storage = new MemStorage();
