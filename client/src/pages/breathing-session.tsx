import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { BreathingAnimation } from '@/components/breathing-animation';
import { useBreathingSession } from '@/hooks/use-breathing-session';
import { useAmbientAudio } from '@/hooks/use-ambient-audio';
import { BreathingProtocol, getColorClasses } from '@/lib/breathing-patterns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export default function BreathingSession() {
  const [, setLocation] = useLocation();
  const [selectedProtocol, setSelectedProtocol] = useState<BreathingProtocol | null>(null);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const queryClient = useQueryClient();

  const {
    sessionState,
    getCurrentPhaseName,
    getCurrentPhasePattern,
    getProgress,
    getFormattedTime,
    startSession,
    pauseSession,
    endSession,
    isSessionComplete,
  } = useBreathingSession(selectedProtocol);

  const { play: playAudio, stop: stopAudio, isPlaying: audioIsPlaying, isLoaded: audioIsLoaded } = useAmbientAudio();

  // Session recording mutation
  const recordSessionMutation = useMutation({
    mutationFn: async (sessionData: any) => {
      return apiRequest('POST', '/api/sessions', sessionData);
    },
    onSuccess: () => {
      // Invalidate sessions and analytics queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/sessions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/analytics'] });
    },
  });

  useEffect(() => {
    // Retrieve selected protocol from sessionStorage
    const protocolData = sessionStorage.getItem('selectedProtocol');
    if (protocolData) {
      const protocol = JSON.parse(protocolData);
      setSelectedProtocol(protocol);
    } else {
      // If no protocol selected, redirect to protocol selection
      setLocation('/protocol-selection');
    }
  }, [setLocation]);

  useEffect(() => {
    // Auto-start session when protocol is loaded
    if (selectedProtocol && !sessionState.isActive) {
      setSessionStartTime(new Date());
      startSession();
    }
  }, [selectedProtocol, sessionState.isActive, startSession]);

  useEffect(() => {
    // Start ambient audio when session becomes active
    if (sessionState.isActive && !sessionState.isPaused && audioIsLoaded && !audioIsPlaying) {
      playAudio();
    }
    // Stop ambient audio when session ends or is paused
    else if ((!sessionState.isActive || sessionState.isPaused) && audioIsPlaying) {
      stopAudio();
    }
  }, [sessionState.isActive, sessionState.isPaused, audioIsLoaded, audioIsPlaying, playAudio, stopAudio]);

  useEffect(() => {
    // Handle session completion
    if (isSessionComplete && !showCompletionMessage && selectedProtocol && sessionStartTime) {
      setShowCompletionMessage(true);
      
      // Record the completed session
      const sessionEndTime = new Date();
      const durationMinutes = Math.round((sessionEndTime.getTime() - sessionStartTime.getTime()) / 60000);
      
      // Only record session if authenticated (not in trial mode)
      try {
        recordSessionMutation.mutate({
          protocol: selectedProtocol.id,
          protocolName: selectedProtocol.name,
          duration: selectedProtocol.sessionDuration,
          completedDuration: sessionState.sessionTimeElapsed,
          cycles: sessionState.cycles,
          completed: true
        });
      } catch (error) {
        // Silent fail for trial users - don't block completion flow
        console.log('Session recording skipped (trial mode)');
      }
      
      // Immediate redirect after showing completion
      const redirectTimer = setTimeout(() => {
        setShowCompletionMessage(false);
        setLocation('/protocol-selection');
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }
  }, [isSessionComplete, showCompletionMessage, selectedProtocol, sessionStartTime, sessionState.cycles, recordSessionMutation, setLocation]);

  const handleEndSession = () => {
    console.log('End session clicked - stopping audio and redirecting');
    
    // Stop audio immediately
    try {
      stopAudio();
    } catch (error) {
      console.log('Audio stop failed:', error);
    }
    
    // End the breathing session
    try {
      endSession();
    } catch (error) {
      console.log('End session failed:', error);
    }
    
    // Record incomplete session if it was started (optional for trial mode)
    if (selectedProtocol && sessionStartTime && sessionState.sessionTimeElapsed > 30) {
      try {
        recordSessionMutation.mutate({
          protocol: selectedProtocol.id,
          protocolName: selectedProtocol.name,
          duration: selectedProtocol.sessionDuration,
          completedDuration: sessionState.sessionTimeElapsed,
          cycles: sessionState.cycles,
          completed: false
        });
      } catch (error) {
        console.log('Session recording skipped (trial mode):', error);
      }
    }
    
    // Use setTimeout to avoid setState during render issues
    setTimeout(() => {
      setLocation('/protocol-selection');
    }, 0);
    
    // Backup redirect in case first fails
    setTimeout(() => {
      if (window.location.pathname === '/breathing-session') {
        window.location.href = '/protocol-selection';
      }
    }, 1000);
  };

  // Handle missing protocol with useEffect to avoid setState during render
  useEffect(() => {
    if (!selectedProtocol) {
      setLocation('/protocol-selection');
    }
  }, [selectedProtocol, setLocation]);

  if (!selectedProtocol) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Returning to protocols...</p>
        </div>
      </div>
    );
  }

  if (showCompletionMessage) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex flex-col justify-center items-center px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-primary via-blue-400 to-purple-400 flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 20px rgba(0,102,204,0.5)',
                '0 0 40px rgba(59,130,246,0.8)',
                '0 0 20px rgba(147,51,234,0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-4 gradient-text">Session Complete!</h2>
          <p className="text-muted-foreground mb-4">Great job on completing your breathing session.</p>
          <p className="text-muted-foreground mb-6">You completed {sessionState.cycles} cycles!</p>
          
          <motion.button
            onClick={() => setLocation('/protocol-selection')}
            className="px-8 py-3 bg-gradient-to-r from-primary to-blue-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue
          </motion.button>
          
          <p className="text-sm text-muted-foreground mt-4">Or wait for automatic redirect...</p>
        </motion.div>
      </div>
    );
  }

  const colorClasses = getColorClasses(selectedProtocol.color);
  const currentPhase = getCurrentPhaseName();
  const phaseDuration = getCurrentPhasePattern();

  return (
    <div className="min-h-screen theme-bg theme-transition flex flex-col px-6 py-6">
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen">
        {/* Protocol Info - top section */}
        <motion.div
          className="mb-12 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="theme-card theme-transition rounded-xl p-4 border border-border">
            <h3 className={`text-xl font-bold ${colorClasses.text} mb-1 text-center`}>
              {selectedProtocol.name} Protocol
            </h3>
            <p className="text-muted-foreground text-sm text-center">Follow the glowing guide</p>
          </div>
        </motion.div>
        
        {/* Breathing Animation - center section with more space */}
        <motion.div
          className="flex-1 flex items-center justify-center my-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <BreathingAnimation
            isActive={sessionState.isActive && !sessionState.isPaused}
            currentPhase={currentPhase}
            phaseTimeLeft={sessionState.phaseTimeLeft}
            phaseDuration={phaseDuration}
          />
        </motion.div>
        
        {/* Bottom UI Section with better spacing */}
        <div className="space-y-6 mb-8">
          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-2"
          >
            <div className="w-full bg-muted rounded-full h-2 mb-4 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${getProgress()}%` }}
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(59,130,246,0.5)',
                    '0 0 20px rgba(99,102,241,0.8)',
                    '0 0 10px rgba(59,130,246,0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                Session: <span className="text-primary font-mono">{getFormattedTime()}</span>
              </span>
              <span className="text-muted-foreground">
                Cycles: <span className="text-primary font-mono">{sessionState.cycles}</span>
              </span>
              <span className="text-muted-foreground">
                / 5:00
              </span>
            </div>
          </motion.div>
          
          {/* Phase Info */}
          <motion.div
            className="p-4 glass-card rounded-xl border border-white/10 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Current Phase:</span>
              <span className={`font-semibold ${colorClasses.text}`}>{currentPhase}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-400">Time Left:</span>
              <span className="font-mono text-white">{sessionState.phaseTimeLeft}s</span>
            </div>
          </motion.div>
          
          {/* Control Buttons */}
          <motion.div
            className="flex justify-center space-x-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <button
              onClick={pauseSession}
              className="holographic-border flex-1 max-w-32"
              disabled={!sessionState.isActive}
            >
              <div className="bg-gray-900/80 backdrop-blur-sm px-6 py-3 rounded-xl flex items-center justify-center space-x-2">
                <AnimatePresence mode="wait">
                  {sessionState.isPaused ? (
                    <motion.svg
                      key="play"
                      className="w-4 h-4 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="pause"
                      className="w-4 h-4 text-pink-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>
                <span className="text-white text-sm">
                  {sessionState.isPaused ? 'Resume' : 'Pause'}
                </span>
              </div>
            </button>
            
            <button
              onClick={handleEndSession}
              className="border border-gray-600 hover:border-purple-400 flex-1 max-w-32 px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 10h6v4H9z"
                />
              </svg>
              <span className="text-gray-400 hover:text-white text-sm">End</span>
            </button>
          </motion.div>
          
          {/* Back Button */}
          <motion.button
            onClick={() => setLocation('/activation-sequence')}
            className="w-full py-3 text-gray-400 hover:text-white transition-colors duration-300 flex items-center justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
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
            <span>Back to Setup</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
