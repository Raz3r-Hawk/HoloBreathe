export interface BreathingProtocol {
  id: string;
  name: string;
  pattern: number[]; // [inhale, hold, exhale, hold] in seconds
  phases: string[];
  color: string;
  benefit: string;
  description: string;
  sessionDuration: number; // in seconds
}

export const breathingProtocols: BreathingProtocol[] = [
  {
    id: 'foundation',
    name: 'Foundation',
    pattern: [4, 4, 4, 4],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: 'cyan',
    benefit: 'Focus',
    description: 'Build your foundation with balanced breathing cycles',
    sessionDuration: 300, // 5 minutes
  },
  {
    id: 'advanced',
    name: 'Advanced',
    pattern: [4, 7, 8, 0],
    phases: ['Inhale', 'Hold', 'Exhale', 'Rest'],
    color: 'pink',
    benefit: 'Sleep',
    description: 'Deep relaxation technique for better rest',
    sessionDuration: 300,
  },
  {
    id: 'elite',
    name: 'Elite',
    pattern: [6, 6, 6, 6],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: 'purple',
    benefit: 'Peak State',
    description: 'Advanced rhythm for peak performance',
    sessionDuration: 300,
  },
];

export const getProtocolById = (id: string): BreathingProtocol | undefined => {
  return breathingProtocols.find(protocol => protocol.id === id);
};

export const getColorClasses = (color: string) => {
  const colorMap = {
    cyan: {
      text: 'text-cyan-400',
      border: 'border-cyan-400',
      bg: 'bg-cyan-400/20',
      glow: 'neon-glow-cyan',
      hover: 'hover:border-cyan-400',
    },
    pink: {
      text: 'text-pink-400',
      border: 'border-pink-400',
      bg: 'bg-pink-400/20',
      glow: 'neon-glow-pink',
      hover: 'hover:border-pink-400',
    },
    purple: {
      text: 'text-purple-400',
      border: 'border-purple-400',
      bg: 'bg-purple-400/20',
      glow: 'neon-glow-purple',
      hover: 'hover:border-purple-400',
    },
  };
  
  return colorMap[color as keyof typeof colorMap] || colorMap.cyan;
};
