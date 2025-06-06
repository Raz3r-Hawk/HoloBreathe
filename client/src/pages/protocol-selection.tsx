import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useState } from 'react';
import { ProtocolCard } from '@/components/protocol-card';
import { breathingProtocols, BreathingProtocol } from '@/lib/breathing-patterns';

export default function ProtocolSelection() {
  const [, setLocation] = useLocation();
  const [selectedProtocolId, setSelectedProtocolId] = useState<string | null>(null);

  const handleProtocolSelect = (protocol: BreathingProtocol) => {
    setSelectedProtocolId(protocol.id);
    
    // Store selected protocol in sessionStorage for use in other screens
    sessionStorage.setItem('selectedProtocol', JSON.stringify(protocol));
    
    // Navigate to activation sequence after brief delay for visual feedback
    setTimeout(() => {
      setLocation('/activation-sequence');
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 py-12">
      <div className="w-full max-w-md mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-2">
            Choose Your{' '}
            <span className="gradient-text">Protocol</span>
          </h2>
          <p className="text-gray-400">Select your breathing pattern</p>
        </motion.div>
        
        {/* Protocol Cards */}
        <motion.div
          className="space-y-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {breathingProtocols.map((protocol, index) => (
            <ProtocolCard
              key={protocol.id}
              protocol={protocol}
              onClick={() => handleProtocolSelect(protocol)}
              index={index}
            />
          ))}
        </motion.div>
        
        {/* Back Button */}
        <motion.button
          onClick={() => setLocation('/')}
          className="w-full py-3 text-gray-400 hover:text-white transition-colors duration-300 flex items-center justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
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
          <span>Back</span>
        </motion.button>
      </div>
    </div>
  );
}
