import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { BreathingAnimation } from '@/components/breathing-animation';
import { useBreathingSession } from '@/hooks/use-breathing-session';
import { useAmbientAudio } from '@/hooks/use-ambient-audio';
import { BreathingProtocol, getColorClasses } from '@/lib/breathing-patterns';

export default function BreathingSession() {
  const [, setLocation] = useLocation();
  const [selectedProtocol, setSelectedProtocol] = useState<BreathingProtocol | null>(null);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

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
    if (isSessionComplete && !showCompletionMessage) {
      setShowCompletionMessage(true);
      setTimeout(() => {
        setLocation('/');
      }, 3000);
    }
  }, [isSessionComplete, showCompletionMessage, setLocation]);

  const handleEndSession = () => {
    stopAudio();
    endSession();
    setLocation('/');
  };

  if (!selectedProtocol) {
    return null; // Will redirect in useEffect
  }

  if (showCompletionMessage) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 20px rgba(0,255,255,0.5)',
                '0 0 40px rgba(255,20,147,0.8)',
                '0 0 20px rgba(138,43,226,0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-4 gradient-text">Session Complete!</h2>
          <p className="text-gray-300 mb-2">Great job on completing your breathing session.</p>
          <p className="text-sm text-gray-400">Returning to home screen...</p>
        </motion.div>
      </div>
    );
  }

  const colorClasses = getColorClasses(selectedProtocol.color);
  const currentPhase = getCurrentPhaseName();
  const phaseDuration = getCurrentPhasePattern();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 py-12">
      <div className="w-full max-w-md mx-auto text-center">
        {/* Protocol Info */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className={`text-lg font-semibold ${colorClasses.text} mb-2`}>
            {selectedProtocol.name} Protocol
          </h3>
          <p className="text-gray-400 text-sm">Follow the glowing guide</p>
        </motion.div>
        
        {/* Breathing Animation */}
        <motion.div
          className="mb-12"
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
        
        {/* Progress Indicator */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="w-full bg-gray-800 rounded-full h-2 mb-4 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-cyan-400 to-pink-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${getProgress()}%` }}
              animate={{
                boxShadow: [
                  '0 0 10px rgba(0,255,255,0.5)',
                  '0 0 20px rgba(255,20,147,0.8)',
                  '0 0 10px rgba(0,255,255,0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">
              Session: <span className="text-cyan-400 font-mono">{getFormattedTime()}</span>
            </span>
            <span className="text-gray-400">
              Cycles: <span className="text-pink-400 font-mono">{sessionState.cycles}</span>
            </span>
            <span className="text-gray-400">
              / 5:00
            </span>
          </div>
        </motion.div>
        
        {/* Phase Info */}
        <motion.div
          className="mb-8 p-4 glass-card rounded-xl"
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
          className="flex justify-center space-x-4 mb-8"
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
  );
}
