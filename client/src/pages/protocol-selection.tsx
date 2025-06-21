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
  const [isTrialMode, setIsTrialMode] = useState(false);
  const [hasUsedTrial, setHasUsedTrial] = useState(false);
  const { hasSubscription, isLoading } = useSubscription();

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
      // Check trial attempts
      const trialAttempts = parseInt(localStorage.getItem('trialAttempts') || '0');
      
      // If user has subscription, they can access everything
      if (hasSubscription) return;
      
      // If trial attempts exceeded, redirect to signup
      if (trialAttempts >= 2) {
        setLocation('/auth');
        return;
      }
      
      // If in trial mode and hasn't used trial, only allow Foundation protocol
      if (isTrialMode && !hasUsedTrial) return;
      
      // Otherwise require signup
      if (!hasSubscription) {
        setLocation('/auth');
      }
    }
  }, [hasSubscription, isLoading, isTrialMode, hasUsedTrial, setLocation]);

  const handleProtocolSelect = (protocol: BreathingProtocol) => {
    setSelectedProtocolId(protocol.id);
    
    // In trial mode, only allow Foundation protocol
    if (isTrialMode && !hasUsedTrial && protocol.id !== 'foundation') {
      alert('Trial users can only access the Foundation protocol. Please upgrade for full access.');
      return;
    }
    
    // Store selected protocol in sessionStorage for use in other screens
    sessionStorage.setItem('selectedProtocol', JSON.stringify(protocol));
    
    // Navigate to activation sequence after brief delay for visual feedback
    setTimeout(() => {
      setLocation('/activation-sequence');
    }, 300);
  };

  // Show loading while checking subscription (but not in trial mode)
  if (isLoading && !isTrialMode) {
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
    <div className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={() => setLocation('/sessions')}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white transition-all duration-200"
            >
              <Activity className="w-4 h-4" />
              <span>Sessions</span>
            </button>
            
            <button
              onClick={() => setLocation('/settings')}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white transition-all duration-200"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Subscription Status - Only show for authenticated users not in trial mode */}
        {(!isTrialMode || hasUsedTrial) && <SubscriptionStatus />}

        {/* Trial Mode Banner */}
        {isTrialMode && !hasUsedTrial && (
          <motion.div
            className="mb-6 p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <p className="text-cyan-200 font-semibold mb-1">Free Trial - Foundation Protocol Only</p>
              <p className="text-xs text-cyan-300">Experience basic 4-4-4-4 breathing pattern</p>
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
          <h2 className="text-3xl font-bold mb-2 text-white">
            Choose Your{' '}
            <span className="text-blue-400">Protocol</span>
          </h2>
          <p className="text-slate-400">
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
          className="w-full py-3 bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-300 flex items-center justify-center space-x-2 rounded-lg"
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
