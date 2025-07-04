import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { HolographicCube } from '@/components/holographic-cube';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function Welcome() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { toast } = useToast();

  // Clear any trial mode flags and reset navigation state on welcome page load
  useEffect(() => {
    localStorage.removeItem('trialMode');
    localStorage.removeItem('hasUsedTrial');
    sessionStorage.clear(); // Clear any session redirects
  }, []);

  const handleTryFree = () => {
    console.log('Try free clicked - checking trial eligibility');
    
    // Check trial attempts
    const trialAttempts = parseInt(localStorage.getItem('trialAttempts') || '0');
    const hasUsedTrial = localStorage.getItem('hasUsedTrial') === 'true';
    
    if (trialAttempts >= 2 || hasUsedTrial) {
      console.log('Trial limit exceeded, showing toast and redirecting to signup');
      toast({
        title: "Trial Limit Reached",
        description: "You have exceeded your trial limit of 2 sessions. Please sign up to continue breathing with all protocols.",
        variant: "destructive",
      });
      
      // Delay redirect to show toast
      setTimeout(() => {
        setLocation('/auth');
      }, 2000);
      return;
    }
    
    // Activate trial mode for Foundation protocol only
    localStorage.setItem('trialMode', 'true');
    localStorage.setItem('trialProtocol', 'foundation');
    
    // Go directly to activation sequence for Foundation protocol
    const foundationProtocol = {
      id: 'foundation',
      name: 'Foundation',
      pattern: [4, 4, 4, 4],
      phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
      color: 'cyan',
      benefit: 'Focus',
      description: 'Build your foundation with balanced breathing cycles',
      sessionDuration: 300
    };
    
    sessionStorage.setItem('selectedProtocol', JSON.stringify(foundationProtocol));
    setLocation('/activation-sequence');
  };

  // Auto-redirect effect for authenticated users
  useEffect(() => {
    if (isAuthenticated && !isRedirecting) {
      const timeout = setTimeout(() => {
        setIsRedirecting(true);
        setCountdown(5);
      }, 0); // Defer to next tick
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, isRedirecting]);

  // Separate effect for countdown timer
  useEffect(() => {
    if (isAuthenticated && isRedirecting) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setLocation('/protocol-selection');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isAuthenticated, isRedirecting, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="mb-8">
            <motion.div 
              className="w-20 h-20 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-3xl">🧘‍♂️</span>
            </motion.div>
            <h2 className="text-3xl font-bold text-foreground mb-3">Welcome Back!</h2>
            <p className="text-muted-foreground text-lg mb-6">Ready to continue your breathing journey?</p>
            
            <div className="theme-card rounded-xl p-4 mb-6">
              <p className="text-muted-foreground text-sm mb-2">Automatically redirecting in:</p>
              <motion.div 
                className="text-2xl font-bold text-primary"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                key={countdown}
              >
                {countdown}s
              </motion.div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => setLocation('/protocol-selection')}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>Start Now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setLocation('/settings')}
              className="w-full theme-transition py-3"
            >
              Go to Settings
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleGetStarted = () => {
    setLocation('/auth');
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
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full opacity-40"
          animate={{
            y: [0, -25, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>
      
      <motion.div
        className="relative z-10 text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Holographic Cube */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <HolographicCube size="lg" />
        </motion.div>
        
        {/* Main Headline */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.span
            className="text-cyan-400 block"
            animate={{
              textShadow: [
                '0 0 10px rgba(0,255,255,0.5)',
                '0 0 20px rgba(0,255,255,0.8)',
                '0 0 10px rgba(0,255,255,0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Breathe In.
          </motion.span>
          <motion.span
            className="text-pink-400 block"
            animate={{
              textShadow: [
                '0 0 10px rgba(255,20,147,0.5)',
                '0 0 20px rgba(255,20,147,0.8)',
                '0 0 10px rgba(255,20,147,0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            Hold.
          </motion.span>
          <motion.span
            className="text-purple-400 block"
            animate={{
              textShadow: [
                '0 0 10px rgba(138,43,226,0.5)',
                '0 0 20px rgba(138,43,226,0.8)',
                '0 0 10px rgba(138,43,226,0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            Breathe Out.
          </motion.span>
          <motion.span
            className="text-white block"
            animate={{
              textShadow: [
                '0 0 10px rgba(255,255,255,0.3)',
                '0 0 20px rgba(255,255,255,0.6)',
                '0 0 10px rgba(255,255,255,0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            Reset.
          </motion.span>
        </motion.h1>
        
        {/* Subtext */}
        <motion.p
          className="text-xl text-gray-300 mb-12 max-w-sm mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Master calm in under{' '}
          <span className="text-cyan-400 font-semibold">5 minutes</span>
        </motion.p>
        
        {/* Action Buttons */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {/* Free Trial Button */}
          <motion.button
            className="btn-enhanced holographic-border group relative overflow-hidden w-full"
            onClick={handleTryFree}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              WebkitAppearance: 'none', 
              border: 'none', 
              outline: 'none',
              WebkitTapHighlightColor: 'transparent',
              WebkitFocusRingColor: 'transparent'
            }}
          >
            <div className="bg-gray-900/80 backdrop-blur-sm px-8 py-4 rounded-2xl text-lg font-semibold group-hover:bg-gray-800/90 transition-all duration-300">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <span className="text-cyan-400">Try Foundation Protocol (Free)</span>
                <motion.svg
                  className="w-5 h-5 text-pink-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </motion.svg>
              </div>
              <p className="text-xs text-gray-400">No payment required</p>
            </div>
          </motion.button>

          {/* Subscription Button */}
          <motion.button
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
            onClick={() => setLocation('/subscription')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-1">
              <span>Get Full Access</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <p className="text-xs opacity-90">Unlock all breathing protocols</p>
          </motion.button>

          
        </motion.div>
      </motion.div>
    </div>
  );
}
