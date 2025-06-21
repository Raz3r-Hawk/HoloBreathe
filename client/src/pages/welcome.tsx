import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen px-8 text-center">
        {/* Premium 3D Holographic Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          <div className="relative w-48 h-48 mx-auto" style={{ perspective: '1200px' }}>
            {/* Main floating holographic cube */}
            <motion.div
              animate={{
                rotateX: [15, 20, 10, 15],
                rotateY: [15, 25, 5, 15],
                y: [0, -12, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full h-full"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Holographic cube with premium materials */}
              <div className="absolute inset-8 bg-gradient-to-br from-cyan-400/90 via-blue-500/90 to-purple-600/90 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20"
                style={{
                  boxShadow: `
                    0 0 80px rgba(6, 182, 212, 0.4),
                    0 0 40px rgba(59, 130, 246, 0.3),
                    inset 0 0 60px rgba(255, 255, 255, 0.1)
                  `
                }}
              >
                {/* Premium glass effect */}
                <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/15 to-transparent rounded-2xl"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-transparent via-cyan-400/20 to-transparent rounded-xl"></div>
                
                {/* Logo text with premium typography */}
                <div className="flex items-center justify-center h-full">
                  <span className="text-6xl font-black text-white tracking-tight drop-shadow-2xl">H</span>
                </div>
              </div>
              
              {/* Multi-layer holographic aura */}
              <div className="absolute inset-4 bg-gradient-to-r from-cyan-400/15 via-blue-500/15 to-purple-600/15 rounded-3xl animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/8 via-blue-500/8 to-purple-600/8 rounded-full animate-pulse delay-300"></div>
              
              {/* Elegant floating particles */}
              <motion.div
                animate={{ y: [-10, -30, -10], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0 }}
                className="absolute -top-2 left-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
              />
              <motion.div
                animate={{ y: [-15, -35, -15], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-2 right-1/4 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
              />
              <motion.div
                animate={{ y: [-12, -32, -12], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
                className="absolute top-1/4 -left-2 w-2.5 h-2.5 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
              />
            </motion.div>
            
            {/* Premium energy rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-cyan-400/25 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-6 border border-blue-400/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-12 border border-purple-400/20 rounded-full"
            />
          </div>
        </motion.div>

        {/* Premium Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16"
        >
          <h1 className="text-7xl font-black text-white mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              HoloBreathe
            </span>
          </h1>
          <p className="text-2xl text-slate-300 mb-4 font-light leading-relaxed max-w-2xl">
            Transform your mind with guided breathing
          </p>
          <p className="text-lg text-slate-400 font-light max-w-xl mx-auto leading-relaxed">
            Discover inner peace, reduce stress, and enhance focus through 
            scientifically-proven breathing techniques.
          </p>
        </motion.div>

        {/* Premium Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-6 w-full max-w-md"
        >
          <Link to="/protocol-selection">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 backdrop-blur-sm border border-white/10"
              style={{
                boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              }}
            >
              Start Your Journey
            </motion.button>
          </Link>
          
          <Link to="/breathing-session?protocol=foundation&trial=true">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-8 border-2 border-cyan-400/40 bg-cyan-400/5 text-cyan-400 font-medium text-lg rounded-2xl hover:bg-cyan-400/10 hover:border-cyan-400/60 transition-all duration-300 backdrop-blur-xl"
            >
              Test Free Protocol
            </motion.button>
          </Link>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-slate-500 text-sm flex items-center justify-center gap-2 mt-8"
          >
            Made in India 🇮🇳 with ❤️ by GeeksGrow Technologies
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}