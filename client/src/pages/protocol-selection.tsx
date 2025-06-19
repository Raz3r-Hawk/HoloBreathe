import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProtocolCard } from '@/components/protocol-card';
import { SubscriptionStatus } from '@/components/subscription-status';
import { breathingProtocols, BreathingProtocol } from '@/lib/breathing-patterns';
import { useSubscription } from '@/hooks/use-subscription';
import { Settings, ArrowLeft, Activity } from 'lucide-react';

export default function ProtocolSelection() {
  const [, setLocation] = useLocation();
  const [selectedProtocolId, setSelectedProtocolId] = useState<string | null>(null);
  const { hasSubscription, isLoading } = useSubscription();
  const [isTrialMode, setIsTrialMode] = useState(false);
  const [hasUsedTrial, setHasUsedTrial] = useState(false);

  useEffect(() => {
    // Check if user is in trial mode
    const trialMode = localStorage.getItem('trialMode') === 'true';
    const usedTrial = localStorage.getItem('hasUsedTrial') === 'true';
    setIsTrialMode(trialMode);
    setHasUsedTrial(usedTrial);
  }, []);

  // Redirect logic for subscription/trial
  useEffect(() => {
    if (!isLoading) {
      // If user has subscription, they can access everything
      if (hasSubscription) return;
      
      // If in trial mode and hasn't used trial, allow access to one protocol
      if (isTrialMode && !hasUsedTrial) return;
      
      // Show upgrade prompt instead of forcing subscription
      // This allows users to try protocols before subscribing
    }
  }, [hasSubscription, isLoading, isTrialMode, hasUsedTrial, setLocation]);

  const handleProtocolSelect = (protocol: BreathingProtocol) => {
    setSelectedProtocolId(protocol.id);
    
    // If in trial mode and hasn't used trial, mark trial as used
    if (isTrialMode && !hasUsedTrial) {
      localStorage.setItem('hasUsedTrial', 'true');
      localStorage.removeItem('trialMode'); // Clear trial mode
    }
    
    // Store selected protocol in sessionStorage for use in other screens
    sessionStorage.setItem('selectedProtocol', JSON.stringify(protocol));
    
    // Navigate to activation sequence after brief delay for visual feedback
    setTimeout(() => {
      setLocation('/activation-sequence');
    }, 300);
  };

  // Show loading while checking subscription
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // Don't render if no subscription and not in trial mode (will redirect)
  if (!hasSubscription && (!isTrialMode || hasUsedTrial)) {
    return null;
  }

  return (
    <div className="min-h-screen theme-bg theme-transition px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            onClick={() => setLocation('/')}
            className="theme-transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setLocation('/sessions')}
              className="theme-transition"
            >
              <Activity className="w-4 h-4 mr-2" />
              Sessions
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setLocation('/settings')}
              className="theme-transition"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Subscription Status */}
        <SubscriptionStatus />

        {/* Trial Mode Banner */}
        {isTrialMode && !hasUsedTrial && (
          <motion.div
            className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/20 dark:to-orange-500/20 border border-amber-300 dark:border-amber-500/30 rounded-xl theme-transition"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <p className="text-amber-900 dark:text-amber-200 font-semibold mb-1">Free Trial</p>
              <p className="text-xs text-amber-800 dark:text-amber-300">Choose one protocol to try for free</p>
            </div>
          </motion.div>
        )}

        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-2 text-foreground">
            Choose Your{' '}
            <span className="gradient-text">Protocol</span>
          </h2>
          <p className="text-muted-foreground">
            {isTrialMode && !hasUsedTrial 
              ? "Select one breathing pattern to try" 
              : "Select your breathing pattern"
            }
          </p>
        </motion.div>
        
        {/* Protocol Cards */}
        <motion.div
          className="space-y-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {breathingProtocols.map((protocol, index) => (
            <ProtocolCard
              key={protocol.id}
              protocol={protocol}
              onClick={() => handleProtocolSelect(protocol)}
              index={index}
            />
          ))}
        </motion.div>
        
        {/* Back Button */}
        <motion.button
          onClick={() => setLocation('/')}
          className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center justify-center space-x-2 theme-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
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
          <span>Back</span>
        </motion.button>
      </div>
    </div>
  );
}
