import { motion } from 'framer-motion';
import { BreathingProtocol, getColorClasses } from '@/lib/breathing-patterns';

interface ProtocolCardProps {
  protocol: BreathingProtocol;
  onClick: () => void;
  index: number;
}

export function ProtocolCard({ protocol, onClick, index }: ProtocolCardProps) {
  const colorClasses = getColorClasses(protocol.color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`theme-card theme-transition rounded-xl p-6 cursor-pointer transition-all duration-300 hover:${colorClasses.border} hover:shadow-lg border-2 border-border hover:border-primary/50`}
      onClick={onClick}
      style={{
        boxShadow: `0 0 20px hsla(var(--neon-${protocol.color}), 0.1)`,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-xl font-semibold ${colorClasses.text}`}>
          {protocol.name}
        </h3>
        <span className={`${colorClasses.bg} ${colorClasses.text} px-3 py-1 rounded-full text-sm font-medium`}>
          {protocol.benefit}
        </span>
      </div>
      
      <p className="text-muted-foreground mb-2 theme-transition">
        {protocol.pattern.join('-')} breathing pattern
      </p>
      
      <p className="text-sm text-muted-foreground/80 mb-4 theme-transition">
        {protocol.description}
      </p>
      
      {/* Pattern visualization */}
      <div className="flex items-center space-x-2">
        {protocol.pattern.map((duration, idx) => (
          <motion.div
            key={idx}
            className={`w-2 h-2 rounded-full ${colorClasses.text}`}
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
