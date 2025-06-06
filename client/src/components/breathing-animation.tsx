import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BreathingAnimationProps {
  isActive: boolean;
  currentPhase: string;
  phaseTimeLeft: number;
  phaseDuration: number;
  className?: string;
}

export function BreathingAnimation({ 
  isActive, 
  currentPhase, 
  phaseTimeLeft, 
  phaseDuration,
  className = '' 
}: BreathingAnimationProps) {
  const [animationScale, setAnimationScale] = useState(1);
  const [glowIntensity, setGlowIntensity] = useState(0.7);

  useEffect(() => {
    if (!isActive) {
      setAnimationScale(1);
      setGlowIntensity(0.7);
      return;
    }

    const progress = 1 - (phaseTimeLeft / phaseDuration);
    
    switch (currentPhase.toLowerCase()) {
      case 'inhale':
        setAnimationScale(1 + progress * 0.3); // Scale from 1 to 1.3
        setGlowIntensity(0.7 + progress * 0.3);
        break;
      case 'hold':
        setAnimationScale(1.3); // Stay at max scale
        setGlowIntensity(1);
        break;
      case 'exhale':
        setAnimationScale(1.3 - progress * 0.3); // Scale from 1.3 to 1
        setGlowIntensity(1 - progress * 0.3);
        break;
      case 'rest':
        setAnimationScale(1); // Stay at min scale
        setGlowIntensity(0.4);
        break;
      default:
        setAnimationScale(1);
        setGlowIntensity(0.7);
    }
  }, [isActive, currentPhase, phaseTimeLeft, phaseDuration]);

  return (
    <div className={`relative ${className}`}>
      {/* Main breathing circle */}
      <motion.div
        className="w-64 h-64 mx-auto rounded-full flex items-center justify-center relative"
        style={{
          background: `radial-gradient(circle, 
            rgba(0,255,255,${glowIntensity * 0.2}) 0%, 
            rgba(255,20,147,${glowIntensity * 0.1}) 50%, 
            rgba(138,43,226,${glowIntensity * 0.05}) 100%)`,
          border: `2px solid rgba(0,255,255,${glowIntensity * 0.5})`,
          boxShadow: `0 0 ${20 * glowIntensity}px rgba(0,255,255,${glowIntensity * 0.3})`,
        }}
        animate={{
          scale: animationScale,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {/* Inner circle */}
        <motion.div
          className="w-32 h-32 rounded-full border-2 border-cyan-400/30 flex items-center justify-center"
          animate={{
            borderColor: [
              'rgba(0,255,255,0.3)',
              'rgba(255,20,147,0.5)',
              'rgba(138,43,226,0.3)',
              'rgba(0,255,255,0.3)',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Breathing icon */}
          <motion.div
            className="text-3xl text-cyan-400 opacity-70"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V17C3 18.1 3.9 19 5 19H7V21C7 22.1 7.9 23 9 23H15C16.1 23 17 22.1 17 21V19H19C20.1 19 21 18.1 21 17V9ZM19 17H15V21H9V17H5V3H14.17L19 7.83V17Z"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 border-2 border-pink-400 rounded-full opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute inset-0 border border-purple-400 rounded-full opacity-20"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.05, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      {/* Breathing phase text overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="text-2xl font-bold text-white bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm"
          key={currentPhase}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {currentPhase}
        </motion.span>
      </motion.div>

      {/* Floating particles */}
      {isActive && (
        <>
          <motion.div
            className="absolute top-8 left-8 w-2 h-2 bg-cyan-400 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-16 right-12 w-1.5 h-1.5 bg-pink-400 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-12 left-16 w-1 h-1 bg-purple-400 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </>
      )}
    </div>
  );
}
