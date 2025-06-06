import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { HolographicCube } from '@/components/holographic-cube';

export default function Welcome() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black/70 to-gray-900/50" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-60"
          animate={{
            y: [0, -30, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full opacity-40"
          animate={{
            y: [0, -25, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>
      
      <motion.div
        className="relative z-10 text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Holographic Cube */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <HolographicCube size="lg" />
        </motion.div>
        
        {/* Main Headline */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.span
            className="text-cyan-400 block"
            animate={{
              textShadow: [
                '0 0 10px rgba(0,255,255,0.5)',
                '0 0 20px rgba(0,255,255,0.8)',
                '0 0 10px rgba(0,255,255,0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Breathe In.
          </motion.span>
          <motion.span
            className="text-pink-400 block"
            animate={{
              textShadow: [
                '0 0 10px rgba(255,20,147,0.5)',
                '0 0 20px rgba(255,20,147,0.8)',
                '0 0 10px rgba(255,20,147,0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            Hold.
          </motion.span>
          <motion.span
            className="text-purple-400 block"
            animate={{
              textShadow: [
                '0 0 10px rgba(138,43,226,0.5)',
                '0 0 20px rgba(138,43,226,0.8)',
                '0 0 10px rgba(138,43,226,0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            Breathe Out.
          </motion.span>
          <motion.span
            className="text-white block"
            animate={{
              textShadow: [
                '0 0 10px rgba(255,255,255,0.3)',
                '0 0 20px rgba(255,255,255,0.6)',
                '0 0 10px rgba(255,255,255,0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            Reset.
          </motion.span>
        </motion.h1>
        
        {/* Subtext */}
        <motion.p
          className="text-xl text-gray-300 mb-12 max-w-sm mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Master calm in under{' '}
          <span className="text-cyan-400 font-semibold">5 minutes</span>
        </motion.p>
        
        {/* Start Button */}
        <motion.button
          className="holographic-border group relative overflow-hidden"
          onClick={() => setLocation('/protocol-selection')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="bg-gray-900/80 backdrop-blur-sm px-8 py-4 rounded-2xl text-xl font-semibold group-hover:bg-gray-800/90 transition-all duration-300 flex items-center justify-center space-x-2">
            <span className="text-cyan-400">Start Free</span>
            <motion.svg
              className="w-5 h-5 text-pink-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </motion.svg>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}
