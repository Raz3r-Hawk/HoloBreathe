import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* 3D Floating Hologram Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative w-40 h-40 mx-auto mb-6" style={{ perspective: '1000px' }}>
            {/* Floating holographic cube */}
            <motion.div
              animate={{
                rotateX: [0, 5, -5, 0],
                rotateY: [0, 10, -10, 0],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full h-full"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(15deg) rotateY(15deg)'
              }}
            >
              {/* Main holographic box */}
              <div className="absolute inset-4 bg-gradient-to-br from-cyan-400/80 via-blue-500/80 to-purple-600/80 rounded-xl shadow-2xl shadow-cyan-500/50 backdrop-blur-md border border-cyan-300/30">
                <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/10 to-transparent rounded-xl"></div>
                <div className="flex items-center justify-center h-full">
                  <span className="text-4xl font-black text-white drop-shadow-2xl">H</span>
                </div>
              </div>
              
              {/* Holographic glow layers */}
              <div className="absolute inset-2 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 rounded-2xl animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-600/10 rounded-3xl animate-pulse delay-75"></div>
              
              {/* Floating particles */}
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-bounce delay-100"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-bounce delay-300"></div>
              <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50 animate-bounce delay-500"></div>
            </motion.div>
            
            {/* Energy rings */}
            <div className="absolute inset-0 border-2 border-cyan-400/20 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-4 border border-blue-400/30 rounded-full animate-spin-reverse"></div>
            <div className="absolute inset-8 border border-purple-400/20 rounded-full animate-spin-slow delay-1000"></div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            HoloBreathe
          </h1>
          <p className="text-xl text-slate-400 mb-6">
            Transform your mind with guided breathing exercises
          </p>
          <p className="text-slate-500">
            Discover inner peace, reduce stress, and enhance focus through 
            scientifically-proven breathing techniques.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-6"
        >
          <Link to="/protocol-selection">
            <button className="w-full py-4 px-8 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25">
              Start Your Journey
            </button>
          </Link>
          
          <Link to="/breathing-session?protocol=foundation&trial=true">
            <button className="w-full py-3 px-6 border-2 border-cyan-400/50 bg-cyan-400/10 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400/20 transition-all backdrop-blur-sm">
              Test Free Protocol
            </button>
          </Link>
          
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            Made in India 🇮🇳 with ❤️ by GeeksGrow Technologies
          </p>
        </motion.div>
      </div>
    </div>
  );
}