import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const protocols = [
  {
    id: 'foundation',
    name: 'Foundation',
    pattern: [4, 4, 4, 4],
    color: 'from-cyan-500 to-blue-500',
    benefit: 'Focus & Balance',
    description: 'Perfect for beginners. Build your foundation with balanced breathing cycles that enhance focus and create inner balance.',
    duration: '5 min',
    icon: '🧘‍♀️'
  },
  {
    id: 'calm',
    name: 'Calm',
    pattern: [4, 0, 6, 0],
    color: 'from-blue-500 to-indigo-500',
    benefit: 'Deep Relaxation',
    description: 'Extended exhale for deep relaxation and stress relief. Perfect for unwinding after a long day.',
    duration: '6 min',
    icon: '🌙'
  },
  {
    id: 'energize',
    name: 'Energize',
    pattern: [3, 1, 3, 1],
    color: 'from-orange-500 to-red-500',
    benefit: 'Energy Boost',
    description: 'Quick energizing breath for morning vitality and mental clarity. Start your day with purpose.',
    duration: '3 min',
    icon: '⚡'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    pattern: [4, 7, 8, 0],
    color: 'from-purple-500 to-pink-500',
    benefit: 'Deep Sleep',
    description: 'The 4-7-8 technique for deep relaxation and better sleep. Scientifically proven to calm the nervous system.',
    duration: '5 min',
    icon: '😴'
  },
  {
    id: 'power',
    name: 'Power',
    pattern: [2, 2, 4, 2],
    color: 'from-emerald-500 to-teal-500',
    benefit: 'Peak Performance',
    description: 'Enhance athletic performance and mental acuity. Optimized for pre-workout or important meetings.',
    duration: '4 min',
    icon: '💪'
  },
  {
    id: 'elite',
    name: 'Elite',
    pattern: [6, 6, 6, 6],
    color: 'from-violet-500 to-purple-500',
    benefit: 'Master Level',
    description: 'Advanced practitioners only. Extended cycles for deep meditative states and spiritual connection.',
    duration: '8 min',
    icon: '🎯'
  }
];

export default function ProtocolSelection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-black text-white mb-6 tracking-tight">
              Choose Your <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Protocol</span>
            </h1>
            <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
              Select a breathing pattern that matches your current needs and experience level
            </p>
          </motion.div>

          {/* Protocol Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {protocols.map((protocol, index) => (
              <motion.div
                key={protocol.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link to={`/breathing-session?protocol=${protocol.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    className="group bg-gradient-to-br from-slate-800/60 to-slate-700/60 border border-slate-600/50 rounded-3xl p-8 hover:border-slate-500/70 transition-all duration-500 cursor-pointer backdrop-blur-xl shadow-2xl h-full"
                  >
                    {/* Protocol Icon */}
                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {protocol.icon}
                    </div>
                    
                    {/* Protocol Badge */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${protocol.color} rounded-2xl mb-6 shadow-lg`}>
                      <span className="text-white font-bold text-lg">
                        {protocol.pattern.join('-')}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{protocol.name}</h3>
                    <p className={`text-lg font-semibold mb-4 bg-gradient-to-r ${protocol.color} bg-clip-text text-transparent`}>
                      {protocol.benefit}
                    </p>
                    <p className="text-slate-300 text-sm mb-6 leading-relaxed line-clamp-3">
                      {protocol.description}
                    </p>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-slate-400 text-sm font-medium">{protocol.duration}</span>
                      <div className={`px-4 py-2 bg-gradient-to-r ${protocol.color} text-white font-semibold rounded-xl text-sm shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        Start Practice
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-center"
          >
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-slate-700/80 to-slate-600/80 border border-slate-500/50 text-slate-300 font-semibold rounded-xl hover:border-slate-400/70 hover:text-white transition-all backdrop-blur-xl shadow-lg"
              >
                ← Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}