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
    duration: 300
  },
  calm: {
    name: 'Calming Breath',
    pattern: [4, 0, 6, 0],
    phases: ['Inhale', '', 'Exhale', ''],
    color: 'from-blue-500 to-indigo-500',
    duration: 360
  },
  energize: {
    name: 'Energizing Breath',
    pattern: [3, 1, 3, 1],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: 'from-orange-500 to-red-500',
    duration: 180
  }
};

export default function BreathingSession() {
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
    1 + (phaseProgress / 100) * 0.3 : 
    1.3 - (phaseProgress / 100) * 0.3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen px-8">
        {!isActive ? (
          // Start Screen
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl"
          >
            {isTrial && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl backdrop-blur-xl"
              >
                <h3 className="text-amber-400 font-semibold text-xl mb-2">Free Trial Session</h3>
                <p className="text-amber-300/80">Experience the Foundation breathing protocol</p>
              </motion.div>
            )}
            
            <div className={`w-40 h-40 mx-auto mb-8 bg-gradient-to-r ${protocol.color} rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/10`}>
              <span className="text-white font-bold text-3xl tracking-wider">
                {protocol.pattern.join('-')}
              </span>
            </div>
            
            <h1 className="text-5xl font-black text-white mb-4 tracking-tight">{protocol.name}</h1>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Follow the breathing pattern: <span className="text-cyan-400 font-semibold">{protocol.pattern.join('-')} seconds</span>
            </p>
            
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsActive(true)}
              className={`py-5 px-12 bg-gradient-to-r ${protocol.color} text-white font-semibold text-lg rounded-2xl shadow-2xl transition-all duration-300 backdrop-blur-sm border border-white/10 mb-8`}
            >
              Begin Session
            </motion.button>
            
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="text-slate-400 hover:text-white transition-colors font-medium"
              >
                ← Back to Home
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          // Active Session
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center w-full max-w-4xl"
          >
            {/* Premium Session Stats */}
            <div className="flex justify-center gap-8 mb-12">
              <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-cyan-400/20 rounded-2xl p-6 backdrop-blur-xl min-w-[140px]">
                <div className="text-3xl font-bold text-cyan-400 mb-2">{formatTime(sessionTime)}</div>
                <div className="text-sm text-cyan-300/60 uppercase tracking-wider font-medium">Time</div>
              </div>
              <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-purple-400/20 rounded-2xl p-6 backdrop-blur-xl min-w-[140px]">
                <div className="text-3xl font-bold text-purple-400 mb-2">{breathCount}</div>
                <div className="text-sm text-purple-300/60 uppercase tracking-wider font-medium">Breaths</div>
              </div>
            </div>
            
            {/* Premium Breathing Circle */}
            <div className="relative mb-12">
              {/* Ambient glow */}
              <div className="absolute inset-0 w-80 h-80 mx-auto">
                <div className={`absolute inset-0 bg-gradient-to-r ${protocol.color} rounded-full opacity-20 blur-2xl animate-pulse`}></div>
              </div>
              
              {/* Main breathing circle */}
              <motion.div
                animate={{ scale: circleScale }}
                transition={{ duration: 0.1, ease: "linear" }}
                className={`relative w-72 h-72 mx-auto bg-gradient-to-r ${protocol.color} rounded-full shadow-2xl border border-white/20 backdrop-blur-xl`}
                style={{
                  boxShadow: `0 0 100px ${currentPhase % 2 === 0 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(139, 92, 246, 0.4)'}, inset 0 0 80px rgba(255, 255, 255, 0.1)`
                }}
              >
                {/* Glass effect */}
                <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/10 to-transparent rounded-full"></div>
              </motion.div>
              
              {/* Progress Ring */}
              <div className="absolute inset-0 w-72 h-72 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="289"
                    strokeDashoffset={289 - (289 * phaseProgress) / 100}
                    className="transition-all duration-100 ease-linear"
                    style={{ filter: 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))' }}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            
            {/* Phase Instruction */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="mb-12"
              >
                <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 border border-cyan-400/20 rounded-2xl p-8 backdrop-blur-xl max-w-md mx-auto">
                  <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
                    <span className={`bg-gradient-to-r ${protocol.color} bg-clip-text text-transparent`}>
                      {currentPhaseText || 'Pause'}
                    </span>
                  </h2>
                  <p className="text-slate-300 text-xl font-medium">
                    {protocol.pattern[currentPhase]} {protocol.pattern[currentPhase] === 1 ? 'second' : 'seconds'}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Premium Controls */}
            <div className="flex gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsPaused(!isPaused)}
                className="px-8 py-4 bg-gradient-to-r from-slate-700/80 to-slate-600/80 border border-cyan-400/40 text-cyan-400 font-semibold rounded-xl hover:border-cyan-400/60 transition-all backdrop-blur-xl shadow-lg"
              >
                {isPaused ? '▶ Resume' : '⏸ Pause'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsActive(false);
                  setCurrentPhase(0);
                  setPhaseProgress(0);
                  setSessionTime(0);
                  setBreathCount(0);
                  setIsPaused(false);
                }}
                className="px-8 py-4 bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-400/40 text-red-400 font-semibold rounded-xl hover:border-red-400/60 transition-all backdrop-blur-xl shadow-lg"
              >
                🛑 End Session
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}