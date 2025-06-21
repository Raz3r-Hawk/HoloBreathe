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
            {/* Session Stats */}
            <div className="flex justify-between text-slate-400 text-sm">
              <span>Time: {formatTime(sessionTime)}</span>
              <span>Breaths: {breathCount}</span>
            </div>
            
            {/* Breathing Circle */}
            <div className="relative">
              <motion.div
                animate={{ scale: circleScale }}
                transition={{ duration: 0.1, ease: "linear" }}
                className={`w-64 h-64 mx-auto bg-gradient-to-r ${protocol.color} rounded-full shadow-2xl`}
                style={{
                  boxShadow: `0 0 60px ${currentPhase % 2 === 0 ? '#3B82F6' : '#8B5CF6'}40`
                }}
              />
              
              {/* Progress Ring */}
              <div className="absolute inset-0 w-64 h-64 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * phaseProgress) / 100}
                    className="transition-all duration-100 ease-linear"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            
            {/* Phase Instruction */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-white mb-2">
                  {currentPhaseText || 'Pause'}
                </h2>
                <p className="text-slate-400">
                  {protocol.pattern[currentPhase]} seconds
                </p>
              </motion.div>
            </AnimatePresence>
            
            {/* Controls */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-6 py-3 bg-slate-800 border border-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                {isPaused ? 'Resume' : 'Pause'}
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
                className="px-6 py-3 bg-red-900/50 border border-red-700 text-red-400 rounded-lg hover:bg-red-900/70 transition-colors"
              >
                End Session
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}