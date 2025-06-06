import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { BreathingProtocol } from '@/lib/breathing-patterns';

const activationSteps = [
  {
    id: 'select',
    title: 'Select',
    description: 'Choose your optimal breathing protocol',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
    color: 'cyan',
  },
  {
    id: 'sync',
    title: 'Sync',
    description: 'Align your rhythm with the neural pattern',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    color: 'pink',
  },
  {
    id: 'flow',
    title: 'Flow',
    description: 'Enter the state of effortless breathing',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    ),
    color: 'purple',
  },
  {
    id: 'transcend',
    title: 'Transcend',
    description: 'Achieve your desired mental state',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    color: 'white',
  },
];

export default function ActivationSequence() {
  const [, setLocation] = useLocation();
  const [selectedProtocol, setSelectedProtocol] = useState<BreathingProtocol | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Retrieve selected protocol from sessionStorage
    const protocolData = sessionStorage.getItem('selectedProtocol');
    if (protocolData) {
      setSelectedProtocol(JSON.parse(protocolData));
    } else {
      // If no protocol selected, redirect to protocol selection
      setLocation('/protocol-selection');
    }
  }, [setLocation]);

  useEffect(() => {
    // Auto-advance through steps
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < activationSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const getStepColor = (color: string, isActive: boolean) => {
    if (!isActive) return 'text-gray-600 bg-gray-800/50 border-gray-700';
    
    switch (color) {
      case 'cyan':
        return 'text-cyan-400 bg-cyan-400/20 border-cyan-400';
      case 'pink':
        return 'text-pink-400 bg-pink-400/20 border-pink-400';
      case 'purple':
        return 'text-purple-400 bg-purple-400/20 border-purple-400';
      case 'white':
        return 'text-white bg-white/20 border-white';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400';
    }
  };

  if (!selectedProtocol) {
    return null; // Will redirect in useEffect
  }

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
            <span className="text-cyan-400">Activation</span> Sequence
          </h2>
          <p className="text-gray-400">Preparing {selectedProtocol.name} Protocol</p>
        </motion.div>
        
        {/* Steps */}
        <motion.div
          className="space-y-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {activationSteps.map((step, index) => {
            const isActive = index <= currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <motion.div
                key={step.id}
                className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                  isActive ? 'glass-card' : 'bg-gray-900/30'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${getStepColor(step.color, isActive)}`}
                  animate={isActive ? {
                    boxShadow: [
                      '0 0 0px rgba(0,0,0,0)',
                      `0 0 20px hsla(var(--neon-${step.color}), 0.5)`,
                      '0 0 0px rgba(0,0,0,0)',
                    ],
                  } : {}}
                  transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                >
                  {isCompleted ? (
                    <motion.svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  ) : (
                    step.icon
                  )}
                </motion.div>
                
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold transition-colors duration-500 ${
                    isActive ? getStepColor(step.color, true).split(' ')[0] : 'text-gray-600'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm transition-colors duration-500 ${
                    isActive ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>
                </div>
                
                {isActive && index === currentStep && (
                  <motion.div
                    className="w-2 h-2 bg-current rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Continue Button */}
        <motion.button
          onClick={() => setLocation('/breathing-session')}
          className="w-full holographic-border mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="bg-gray-900/80 backdrop-blur-sm py-4 rounded-2xl text-lg font-semibold flex items-center justify-center space-x-2">
            <span className="text-cyan-400">Begin Session</span>
            <motion.svg
              className="w-5 h-5 text-pink-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </motion.svg>
          </div>
        </motion.button>
        
        {/* Back Button */}
        <motion.button
          onClick={() => setLocation('/protocol-selection')}
          className="w-full py-3 text-gray-400 hover:text-white transition-colors duration-300 flex items-center justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
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
          <span>Back to Protocols</span>
        </motion.button>
      </div>
    </div>
  );
}
