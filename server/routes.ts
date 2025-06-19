import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Razorpay from "razorpay";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Razorpay with demo keys for testing
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_demo_key",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "demo_secret_key",
  });

  // Simple subscription status check (without authentication for now)
  app.get("/api/subscription-status", async (req, res) => {
    // For demo purposes, return subscription status from session
    // In production, this would check user authentication and database
    const session = req.session as any;
    const hasSubscription = session?.hasSubscription || false;
    const subscriptionEndDate = session?.subscriptionEndDate;
    
    res.json({ 
      hasSubscription,
      subscriptionEndDate 
    });
  });

  // Create payment order
  app.post("/api/create-payment-order", async (req, res) => {
    try {
      const { amount = 99900 } = req.body; // Default ₹999 for subscription
      
      const order = await razorpay.orders.create({
        amount: amount, // Amount in paise (₹999 = 99900 paise)
        currency: "INR",
        receipt: `subscription_${Date.now()}`,
        notes: {
          type: "subscription"
        }
      });

      res.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_KEY_ID
      });
    } catch (error: any) {
      console.error("Error creating payment order:", error);
      res.status(500).json({ error: "Failed to create payment order" });
    }
  });

  // Verify payment and activate subscription
  app.post("/api/verify-payment", async (req, res) => {
    try {
      const { 
        razorpay_order_id, 
        razorpay_payment_id, 
        razorpay_signature 
      } = req.body;

      // Verify payment signature
      const crypto = require('crypto');
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ error: "Invalid payment signature" });
      }

      // Payment verified, activate subscription in session
      const subscriptionEndDate = new Date();
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1); // 1 month subscription

      const session = req.session as any;
      session.hasSubscription = true;
      session.subscriptionEndDate = subscriptionEndDate;

      res.json({ 
        success: true, 
        message: "Subscription activated successfully",
        subscriptionEndDate: subscriptionEndDate
      });
    } catch (error: any) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ error: "Payment verification failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
