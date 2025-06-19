import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HolographicCube } from '@/components/holographic-cube';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Subscription() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  // Check current subscription status
  const { data: subscriptionStatus, isLoading } = useQuery({
    queryKey: ['/api/subscription-status'],
    queryFn: () => apiRequest('GET', '/api/subscription-status').then(res => res.json()),
  });

  // Redirect if already subscribed
  useEffect(() => {
    if (subscriptionStatus?.hasSubscription) {
      setLocation('/protocol-selection');
    }
  }, [subscriptionStatus, setLocation]);

  // Create payment order mutation
  const createOrderMutation = useMutation({
    mutationFn: (amount: number) => 
      apiRequest('POST', '/api/create-payment-order', { amount }).then(res => res.json()),
    onSuccess: (orderData) => {
      initiatePayment(orderData);
    },
    onError: (error: any) => {
      toast({
        title: "Payment Error",
        description: "Failed to create payment order. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  });

  // Verify payment mutation
  const verifyPaymentMutation = useMutation({
    mutationFn: (paymentData: any) =>
      apiRequest('POST', '/api/verify-payment', paymentData).then(res => res.json()),
    onSuccess: (data) => {
      const message = data.isDemo 
        ? "Demo subscription activated! You now have full access to all breathing protocols."
        : "Payment successful! Your subscription is now active.";
      
      toast({
        title: "Subscription Activated!",
        description: message,
      });
      
      // Show additional success information
      setTimeout(() => {
        toast({
          title: "Welcome to Premium!",
          description: "Access all breathing protocols, unlimited sessions, and premium features.",
        });
      }, 1500);
      
      queryClient.invalidateQueries({ queryKey: ['/api/subscription-status'] });
      setLocation('/protocol-selection');
    },
    onError: (error: any) => {
      toast({
        title: "Payment Verification Failed",
        description: "Please contact support if payment was deducted.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  });

  const initiatePayment = (orderData: any) => {
    // Check if this is demo mode
    if (orderData.key === "rzp_test_demo_key") {
      // Simulate demo payment
      toast({
        title: "Demo Mode",
        description: "Simulating payment for demonstration...",
      });
      
      setTimeout(() => {
        // Simulate successful payment response
        verifyPaymentMutation.mutate({
          razorpay_order_id: orderData.orderId,
          razorpay_payment_id: `pay_demo_${Date.now()}`,
          razorpay_signature: `demo_signature_${Date.now()}`,
        });
      }, 2000);
      return;
    }

    const options = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Breathing App Premium",
      description: "Monthly Subscription to Premium Breathing Protocols",
      order_id: orderData.orderId,
      handler: function (response: any) {
        verifyPaymentMutation.mutate({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      },
      prefill: {
        name: "User",
        email: "user@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Breathing App Subscription"
      },
      theme: {
        color: "#3B82F6"
      }
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      toast({
        title: "Payment Error",
        description: "Payment service not available. Please refresh and try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const handleSubscribe = async () => {
    setIsProcessing(true);
    createOrderMutation.mutate(99900); // ₹999 in paise
  };

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md mx-auto">
        {/* Demo Mode Banner */}
        <motion.div
          className="mb-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <p className="text-blue-300 font-semibold mb-1">Demo Mode Active</p>
            <p className="text-xs text-blue-200/80">Click Subscribe to simulate the payment process</p>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-4">
            <HolographicCube size="lg" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Unlock Premium Breathing
          </h1>
          <p className="text-gray-300">
            Access advanced protocols and personalized sessions
          </p>
        </motion.div>

        {/* Subscription Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Card className="glass-card border-white/10 backdrop-blur-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white mb-2">
                Premium Monthly
              </CardTitle>
              <CardDescription className="text-gray-300">
                Full access to all breathing protocols
              </CardDescription>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <span className="text-4xl font-bold text-cyan-400">₹999</span>
                <span className="text-gray-400">/month</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">All breathing protocols</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span className="text-gray-300">Advanced breathing patterns</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">Personalized sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Session tracking & analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Ambient audio library</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                    Limited Time
                  </Badge>
                </div>
                <p className="text-sm text-center text-gray-300">
                  7-day free trial included with subscription
                </p>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                onClick={handleSubscribe}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Subscribe Now"
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Back Button */}
        <motion.button
          onClick={() => setLocation('/')}
          className="w-full mt-6 py-3 text-gray-400 hover:text-white transition-colors duration-300 flex items-center justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Home</span>
        </motion.button>
      </div>
    </div>
  );
}