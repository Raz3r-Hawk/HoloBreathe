import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const breathingSessions = pgTable("breathing_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  protocol: text("protocol").notNull(), // 'foundation', 'advanced', 'elite'
  duration: integer("duration").notNull(), // in seconds
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBreathingSessionSchema = createInsertSchema(breathingSessions).pick({
  userId: true,
  protocol: true,
  duration: true,
  completed: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBreathingSession = z.infer<typeof insertBreathingSessionSchema>;
export type BreathingSession = typeof breathingSessions.$inferSelect;
