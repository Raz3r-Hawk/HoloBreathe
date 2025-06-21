import { motion } from 'framer-motion';
import { BreathingProtocol } from '@/lib/breathing-patterns';

const getColorMap = (color: string) => {
  const colorMap: Record<string, string> = {
    cyan: 'bg-cyan-400',
    blue: 'bg-blue-400', 
    purple: 'bg-purple-400',
    green: 'bg-green-400',
    orange: 'bg-orange-400',
    red: 'bg-red-400',
    pink: 'bg-pink-400'
  };
  return colorMap[color] || 'bg-gray-400';
};

interface ProtocolCardProps {
  protocol: BreathingProtocol;
  onClick: () => void;
  index: number;
}

export function ProtocolCard({ protocol, onClick, index }: ProtocolCardProps) {

  return (
    <motion.div
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 cursor-pointer bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-sm border border-slate-600/40 hover:from-slate-800/90 hover:to-slate-700/70 hover:border-cyan-400/50 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-400/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-200 transition-colors duration-300">
          {protocol.name}
        </h3>
        <span className="text-xs text-cyan-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-600/40">
          {Math.floor(protocol.sessionDuration / 60)}min
        </span>
      </div>
      
      <p className="text-slate-300 text-sm mb-4 group-hover:text-slate-200 transition-colors duration-300">
        {protocol.description}
      </p>
      
      <div className="flex items-center space-x-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${getColorMap(protocol.color)} shadow-lg`} />
        <span className="text-sm font-medium text-cyan-200">{protocol.benefit}</span>
      </div>
      
      <div className="flex justify-center space-x-2 mb-4">
        {protocol.pattern.map((count, idx) => (
          <div key={idx} className="text-center">
            <div className="text-lg font-bold text-cyan-300">{count}</div>
            <div className="text-xs text-slate-400">{protocol.phases[idx]}</div>
          </div>
        ))}
      </div>
      
      {/* Pattern visualization */}
      <div className="flex items-center space-x-2">
        {protocol.pattern.map((duration, idx) => (
          <motion.div
            key={idx}
            className="w-2 h-2 rounded-full bg-cyan-400"
            style={{
              opacity: duration === 0 ? 0.3 : Math.min(duration / 8, 1),
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: idx * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
