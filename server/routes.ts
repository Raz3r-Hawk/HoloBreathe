import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'HoloBreathe API is running' });
  });

  // API endpoint for app info
  app.get('/api/app-info', (req, res) => {
    res.json({
      name: 'HoloBreathe',
      version: '1.0.0',
      description: 'Advanced Breathing & Meditation App',
      developer: 'GeeksGrow Technologies',
      madeIn: 'India'
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}