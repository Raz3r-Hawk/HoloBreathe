import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl font-bold text-white">HB</span>
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
            <button className="w-full py-4 px-8 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
              Start Your Journey
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