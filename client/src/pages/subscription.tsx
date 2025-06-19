import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HolographicCube } from '@/components/holographic-cube';
import { Check, Star, Sparkles, Zap } from 'lucide-react';

export default function Subscription() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading } = useAuth();

  // Immediate subscription activation mutation
  const subscribeMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/subscribe", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      queryClient.invalidateQueries({ queryKey: ["/api/subscription-status"] });
      toast({
        title: "Welcome to Premium!",
        description: "You now have full access to all breathing protocols.",
      });
      setTimeout(() => {
        setLocation('/protocol-selection');
      }, 1000);
    },
    onError: (error: Error) => {
      toast({
        title: "Subscription Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900">
        <div className="animate-spin w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    setLocation('/auth');
    return null;
  }

  const handleSubscribe = () => {
    subscribeMutation.mutate();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black/70 to-gray-900/50" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-60"
          animate={{
            y: [0, -30, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-40"
          animate={{
            y: [0, 40, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-400 rounded-full opacity-30"
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex justify-center mb-6">
            <HolographicCube size="lg" />
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Unlock Premium Breathing
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Access all advanced breathing protocols and premium features
          </p>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/60 border-cyan-500/30 backdrop-blur-lg shadow-2xl max-w-md mx-auto">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-4 py-1">
                  <Star className="w-4 h-4 mr-1" />
                  PREMIUM
                </Badge>
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Monthly Access
              </CardTitle>
              <CardDescription className="text-gray-300">
                Full access to all breathing protocols
              </CardDescription>
              <div className="text-center mt-4">
                <span className="text-4xl font-bold text-cyan-400">₹999</span>
                <span className="text-lg text-gray-400 ml-2">/month</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  "All 8 breathing protocols",
                  "Unlimited sessions",
                  "Session analytics & tracking",
                  "Ambient audio library",
                  "Personalized recommendations",
                  "Premium themes & animations"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="pt-6">
              <Button
                onClick={handleSubscribe}
                disabled={subscribeMutation.isPending}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50"
              >
                {subscribeMutation.isPending ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Activating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Get Premium Access</span>
                  </div>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Features highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {[
            {
              icon: <Zap className="w-8 h-8 text-yellow-400" />,
              title: "Instant Access",
              description: "Immediate activation of all premium features"
            },
            {
              icon: <Star className="w-8 h-8 text-purple-400" />,
              title: "Premium Protocols",
              description: "Access advanced breathing techniques"
            },
            {
              icon: <Sparkles className="w-8 h-8 text-cyan-400" />,
              title: "Enhanced Experience",
              description: "Beautiful animations and ambient sounds"
            }
          ].map((feature, index) => (
            <Card key={index} className="bg-gray-900/40 border-gray-700/50 backdrop-blur-lg">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <Button
            variant="outline"
            onClick={() => setLocation('/protocol-selection')}
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Back to Protocols
          </Button>
        </motion.div>
      </div>
    </div>
  );
}