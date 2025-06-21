import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'wouter';
import { useSearchParams } from '../hooks/useSearchParams';

const protocols = {
  foundation: {
    name: 'Foundation Breath',
    pattern: [4, 4, 4, 4],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: 'from-cyan-500 to-blue-500',
    duration: 300 // 5 minutes
  },
  calm: {
    name: 'Calming Breath',
    pattern: [4, 0, 6, 0],
    phases: ['Inhale', '', 'Exhale', ''],
    color: 'from-blue-500 to-indigo-500',
    duration: 360 // 6 minutes
  },
  energize: {
    name: 'Energizing Breath',
    pattern: [3, 1, 3, 1],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: 'from-orange-500 to-red-500',
    duration: 180 // 3 minutes
  }
};

export default function BreathingSession() {
  const [location] = useLocation();
  const searchParams = useSearchParams();
  const protocolId = searchParams.get('protocol') || 'foundation';
  const isTrial = searchParams.get('trial') === 'true';
  
  const protocol = protocols[protocolId as keyof typeof protocols] || protocols.foundation;
  
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [breathCount, setBreathCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isActive || isPaused) return;

    const currentPhaseDuration = protocol.pattern[currentPhase] * 1000;
    const interval = setInterval(() => {
      setPhaseProgress(prev => {
        if (prev >= 100) {
          setCurrentPhase(prevPhase => {
            const nextPhase = (prevPhase + 1) % protocol.pattern.length;
            if (nextPhase === 0) {
              setBreathCount(prev => prev + 1);
            }
            return nextPhase;
          });
          return 0;
        }
        return prev + (100 / (currentPhaseDuration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, currentPhase, protocol.pattern, isPaused]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentPhaseText = protocol.phases[currentPhase];
  const circleScale = currentPhase % 2 === 0 ? 
    1 + (phaseProgress / 100) * 0.5 : 
    1.5 - (phaseProgress / 100) * 0.5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center">
        {!isActive ? (
          // Start Screen
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {isTrial && (
              <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg p-4 mb-6">
                <p className="text-amber-400 font-semibold">Free Trial Session</p>
                <p className="text-amber-300/80 text-sm">Experience the Foundation breathing protocol</p>
              </div>
            )}
            
            <div className={`w-32 h-32 mx-auto bg-gradient-to-r ${protocol.color} rounded-full flex items-center justify-center mb-6 shadow-lg`}>
              <span className="text-white font-bold text-2xl">
                {protocol.pattern.join('-')}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">{protocol.name}</h1>
            <p className="text-slate-400 text-lg mb-8">
              Follow the breathing pattern: {protocol.pattern.join('-')} seconds
            </p>
            
            <button
              onClick={() => setIsActive(true)}
              className={`py-4 px-8 bg-gradient-to-r ${protocol.color} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg`}
            >
              Begin Session
            </button>
            
            <Link to="/">
              <button className="block mx-auto mt-4 px-6 py-2 text-slate-400 hover:text-white transition-colors">
                ← Back to Home
              </button>
            </Link>
          </motion.div>
        ) : (
          // Active Session
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Session Stats - Prominent Neon Display */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">{formatTime(sessionTime)}</div>
                  <div className="text-xs text-cyan-300/80 uppercase tracking-wider">Time</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{breathCount}</div>
                  <div className="text-xs text-purple-300/80 uppercase tracking-wider">Breaths</div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Neon Breathing Circle */}
            <div className="relative mb-8">
              {/* Outer glow effects */}
              <div className="absolute inset-0 w-80 h-80 mx-auto">
                <div className={`absolute inset-0 bg-gradient-to-r ${protocol.color} rounded-full opacity-20 blur-xl animate-pulse`}></div>
                <div className={`absolute inset-4 bg-gradient-to-r ${protocol.color} rounded-full opacity-30 blur-lg animate-pulse delay-75`}></div>
              </div>
              
              {/* Main breathing circle with neon effect */}
              <motion.div
                animate={{ scale: circleScale }}
                transition={{ duration: 0.1, ease: "linear" }}
                className={`relative w-64 h-64 mx-auto bg-gradient-to-r ${protocol.color} rounded-full shadow-2xl border border-cyan-400/50`}
                style={{
                  boxShadow: `0 0 80px ${currentPhase % 2 === 0 ? '#06B6D4' : '#8B5CF6'}60, inset 0 0 40px rgba(255,255,255,0.1)`
                }}
              >
                {/* Inner holographic effect */}
                <div className="absolute inset-4 bg-gradient-to-tl from-transparent via-white/20 to-transparent rounded-full"></div>
                <div className="absolute inset-8 bg-gradient-to-br from-transparent via-cyan-400/30 to-transparent rounded-full"></div>
              </motion.div>
              
              {/* Enhanced Progress Ring with Neon Effect */}
              <div className="absolute inset-0 w-64 h-64 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(6,182,212,0.2)"
                    strokeWidth="3"
                  />
                  {/* Progress ring with glow */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#neonGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * phaseProgress) / 100}
                    className="transition-all duration-100 ease-linear drop-shadow-lg"
                    style={{
                      filter: 'drop-shadow(0 0 8px #06B6D4)'
                    }}
                  />
                  <defs>
                    <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              {/* Floating particles around circle */}
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full opacity-80 animate-bounce"></div>
              <div className="absolute bottom-0 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-60 animate-bounce delay-200"></div>
              <div className="absolute top-1/3 left-0 w-1 h-1 bg-purple-400 rounded-full opacity-70 animate-bounce delay-400"></div>
            </div>
            
            {/* Enhanced Phase Instruction */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className="text-center mb-8"
              >
                <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-cyan-400/30 rounded-xl p-6 backdrop-blur-sm">
                  <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
                    <span className={`bg-gradient-to-r ${protocol.color} bg-clip-text text-transparent`}>
                      {currentPhaseText || 'Pause'}
                    </span>
                  </h2>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <p className="text-slate-300 text-lg font-medium">
                      {protocol.pattern[currentPhase]} seconds
                    </p>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Enhanced Neon Controls */}
            <div className="flex gap-6 justify-center">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-8 py-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-2 border-cyan-400/50 text-cyan-400 font-semibold rounded-xl hover:bg-cyan-400/20 transition-all backdrop-blur-sm shadow-lg shadow-cyan-500/20"
              >
                {isPaused ? '▶️ Resume' : '⏸️ Pause'}
              </button>
              <button
                onClick={() => {
                  setIsActive(false);
                  setCurrentPhase(0);
                  setPhaseProgress(0);
                  setSessionTime(0);
                  setBreathCount(0);
                  setIsPaused(false);
                }}
                className="px-8 py-4 bg-gradient-to-r from-red-600/20 to-pink-600/20 border-2 border-red-400/50 text-red-400 font-semibold rounded-xl hover:bg-red-400/20 transition-all backdrop-blur-sm shadow-lg shadow-red-500/20"
              >
                🛑 End Session
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}