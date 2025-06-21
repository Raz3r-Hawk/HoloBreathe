import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Hologram Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 mx-auto mb-6">
            {/* Holographic effect with multiple layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-30 animate-pulse delay-75"></div>
            <div className="absolute inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full opacity-40 animate-pulse delay-150"></div>
            
            {/* Main logo with holographic glow */}
            <div className="absolute inset-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
              <div className="text-2xl font-bold text-white relative">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent blur-sm">H</span>
                <span className="relative bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">H</span>
              </div>
            </div>
            
            {/* Animated rings */}
            <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-2 border border-blue-400/20 rounded-full animate-spin-reverse"></div>
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
          className="space-y-4"
        >
          <Link to="/protocols">
            <button className="w-full py-4 px-8 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25">
              Start Your Journey
            </button>
          </Link>
          
          <Link to="/breathing-session?protocol=foundation&trial=true">
            <button className="w-full py-3 px-6 border-2 border-cyan-400/50 bg-cyan-400/10 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400/20 transition-all backdrop-blur-sm">
              Test Free Protocol
            </button>
          </Link>
          
          <p className="text-slate-500 text-sm">
            Made in India with ♥ by GeeksGrow Technologies
          </p>
        </motion.div>
      </div>
    </div>
  );
}