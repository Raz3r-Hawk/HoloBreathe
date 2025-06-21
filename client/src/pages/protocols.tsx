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
    description: 'Perfect for beginners. Build your foundation with balanced breathing cycles.',
    duration: '5 min'
  },
  {
    id: 'calm',
    name: 'Calm',
    pattern: [4, 0, 6, 0],
    color: 'from-blue-500 to-indigo-500',
    benefit: 'Deep Relaxation',
    description: 'Extended exhale for deep relaxation and stress relief.',
    duration: '6 min'
  },
  {
    id: 'energize',
    name: 'Energize',
    pattern: [3, 1, 3, 1],
    color: 'from-orange-500 to-red-500',
    benefit: 'Energy Boost',
    description: 'Quick energizing breath for morning vitality.',
    duration: '3 min'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    pattern: [4, 7, 8, 0],
    color: 'from-purple-500 to-pink-500',
    benefit: 'Deep Sleep',
    description: 'The 4-7-8 technique for deep relaxation and better sleep.',
    duration: '5 min'
  }
];

export default function Protocols() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 pt-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your <span className="text-blue-400">Protocol</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Select a breathing pattern that matches your current needs
          </p>
        </motion.div>

        {/* Protocol Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {protocols.map((protocol, index) => (
            <motion.div
              key={protocol.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors cursor-pointer group"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${protocol.color} rounded-lg mb-4 flex items-center justify-center`}>
                <span className="text-white font-bold text-xl">
                  {protocol.pattern.join('-')}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{protocol.name}</h3>
              <p className={`text-sm font-semibold mb-3 bg-gradient-to-r ${protocol.color} bg-clip-text text-transparent`}>
                {protocol.benefit}
              </p>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                {protocol.description}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">{protocol.duration}</span>
                <button className={`px-4 py-2 bg-gradient-to-r ${protocol.color} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity`}>
                  Start Practice
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <Link to="/">
            <button className="px-6 py-3 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
              ← Back to Home
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}