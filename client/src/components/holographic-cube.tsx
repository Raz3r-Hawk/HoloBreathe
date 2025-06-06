import { motion } from 'framer-motion';

interface HolographicCubeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function HolographicCube({ size = 'md', className = '' }: HolographicCubeProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };

  const innerSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} mx-auto relative ${className}`}
      animate={{
        rotateX: [0, 15, 0],
        rotateY: [0, 15, 0],
        y: [0, -10, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <div className="holographic-border w-full h-full">
        <div className="w-full h-full bg-gradient-to-br from-gray-900/80 to-black/90 rounded-2xl flex items-center justify-center backdrop-blur-sm">
          <motion.div
            className={`${innerSizeClasses[size]} border-2 border-cyan-400 rounded-lg rotate-45`}
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 255, 255, 0.3)',
                '0 0 30px rgba(0, 255, 255, 0.8), 0 0 40px rgba(255, 20, 147, 0.4)',
                '0 0 20px rgba(0, 255, 255, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
      
      {/* Floating particles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 0,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full opacity-40"
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50"
        animate={{
          y: [0, -10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 2,
        }}
      />
    </motion.div>
  );
}
