import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertBreathingSessionSchema, insertFeedbackSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcrypt";

// Extend Request type to include session and user
interface AuthenticatedRequest extends Request {
  session: any;
  user?: any;
}

// Authentication middleware
const requireAuth = async (req: AuthenticatedRequest, res: Response, next: any) => {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  
  const user = await storage.getUser(req.session.userId);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  
  req.user = user;
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {

  // Authentication routes
  app.post("/api/register", async (req: AuthenticatedRequest, res) => {
    try {
      const { email, password, firstName, lastName, gender, dateOfBirth } = req.body;
      
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: "Required fields missing" });
      }

      const existingUser = await storage.getUserByEmail(email);
      
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        gender: gender || null,
        dateOfBirth: dateOfBirth || null,
        profilePicture: null
      });
      
      req.session.userId = user.id;
      req.session.isAuthenticated = true;
      
      res.json({ 
        message: "Registration successful",
        user: { 
          id: user.id, 
          email: user.email, 
          firstName: user.firstName, 
          lastName: user.lastName,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
          profilePicture: user.profilePicture,
          hasSubscription: user.hasSubscription,
          hasUsedTrial: user.hasUsedTrial,
          themePreference: user.themePreference
        }
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ message: "Registration failed" });
    }
  });

  app.post("/api/login", async (req: AuthenticatedRequest, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }

      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      req.session.userId = user.id;
      req.session.isAuthenticated = true;
      
      res.json({ 
        message: "Login successful",
        user: { 
          id: user.id, 
          email: user.email, 
          firstName: user.firstName, 
          lastName: user.lastName,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
          profilePicture: user.profilePicture,
          hasSubscription: user.hasSubscription,
          hasUsedTrial: user.hasUsedTrial,
          themePreference: user.themePreference
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(401).json({ message: "Login failed" });
    }
  });

  app.post("/api/logout", async (req: AuthenticatedRequest, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  // User profile routes
  app.get("/api/user", requireAuth, async (req: AuthenticatedRequest, res) => {
    res.json(req.user);
  });

  app.put("/api/user", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const updates = z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        dateOfBirth: z.string().optional(),
        gender: z.string().optional(),
        themePreference: z.string().optional(),
      }).parse(req.body);
      
      const updatedUser = await storage.updateUser(req.user.id, updates);
      res.json(updatedUser);
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(400).json({ message: "Profile update failed" });
    }
  });

  app.delete("/api/user", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      await storage.deleteUser(req.user.id);
      req.session.destroy((err: any) => {
        if (err) {
          console.error("Session destruction error:", err);
        }
        res.json({ message: "Account deleted successfully" });
      });
    } catch (error) {
      console.error("Account deletion error:", error);
      res.status(500).json({ message: "Account deletion failed" });
    }
  });

  // Subscription routes
  app.get("/api/subscription-status", requireAuth, async (req: AuthenticatedRequest, res) => {
    res.json({ 
      hasSubscription: req.user.hasSubscription,
      subscriptionEndDate: req.user.subscriptionEndDate,
      hasUsedTrial: req.user.hasUsedTrial
    });
  });

  app.post("/api/subscribe", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      // Activate subscription immediately (no payment processing)
      const subscriptionEndDate = new Date();
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
      
      await storage.updateUser(req.user.id, {
        hasSubscription: true,
        subscriptionEndDate
      });
      
      res.json({ 
        message: "Subscription activated successfully",
        subscriptionEndDate
      });
    } catch (error) {
      console.error("Subscription error:", error);
      res.status(500).json({ message: "Subscription failed" });
    }
  });

  // Breathing session routes
  app.post("/api/sessions", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const sessionData = insertBreathingSessionSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      const session = await storage.createBreathingSession(sessionData);
      
      // Mark trial as used if applicable
      if (!req.user.hasSubscription && !req.user.hasUsedTrial) {
        await storage.updateUser(req.user.id, { hasUsedTrial: true });
      }
      
      res.json(session);
    } catch (error) {
      console.error("Session creation error:", error);
      res.status(400).json({ message: "Session creation failed" });
    }
  });

  app.get("/api/sessions", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const sessions = await storage.getUserSessions(req.user.id, limit);
      res.json(sessions);
    } catch (error) {
      console.error("Sessions fetch error:", error);
      res.status(500).json({ message: "Failed to fetch sessions" });
    }
  });

  app.get("/api/analytics", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const { period = 'week' } = req.query;
      const endDate = new Date();
      const startDate = new Date();
      
      switch (period) {
        case 'week':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(endDate.getMonth() - 1);
          break;
        case 'quarter':
          startDate.setMonth(endDate.getMonth() - 3);
          break;
        case 'half-year':
          startDate.setMonth(endDate.getMonth() - 6);
          break;
        case 'year':
          startDate.setFullYear(endDate.getFullYear() - 1);
          break;
        default:
          startDate.setDate(endDate.getDate() - 7);
      }
      
      const analytics = await storage.getSessionAnalytics(req.user.id, startDate, endDate);
      res.json({ ...analytics, period });
    } catch (error) {
      console.error("Analytics error:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Feedback routes
  app.post("/api/feedback", async (req: AuthenticatedRequest, res) => {
    try {
      const feedbackData = insertFeedbackSchema.parse({
        ...req.body,
        userId: req.session?.userId || null
      });
      
      const feedback = await storage.createFeedback(feedbackData);
      res.json({ message: "Feedback submitted successfully", feedback });
    } catch (error) {
      console.error("Feedback error:", error);
      res.status(400).json({ message: "Feedback submission failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
