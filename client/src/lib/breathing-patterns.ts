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
  {
    id: 'energize',
    name: 'Energize',
    pattern: [3, 1, 3, 1],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: 'orange',
    benefit: 'Energy',
    description: 'Quick energizing breath for morning vitality',
    sessionDuration: 180,
  },
  {
    id: 'calm',
    name: 'Calm',
    pattern: [4, 0, 6, 0],
    phases: ['Inhale', 'Rest', 'Exhale', 'Rest'],
    color: 'blue',
    benefit: 'Relaxation',
    description: 'Extended exhale for deep relaxation',
    sessionDuration: 300,
  },
  {
    id: 'power',
    name: 'Power',
    pattern: [5, 5, 5, 5],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: 'red',
    benefit: 'Strength',
    description: 'Powerful breathing for mental strength',
    sessionDuration: 240,
  },
  {
    id: 'balance',
    name: 'Balance',
    pattern: [4, 2, 4, 2],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: 'green',
    benefit: 'Harmony',
    description: 'Gentle rhythm for emotional balance',
    sessionDuration: 360,
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
    orange: {
      text: 'text-orange-400',
      border: 'border-orange-400',
      bg: 'bg-orange-400/20',
      glow: 'neon-glow-orange',
      hover: 'hover:border-orange-400',
    },
    blue: {
      text: 'text-blue-400',
      border: 'border-blue-400',
      bg: 'bg-blue-400/20',
      glow: 'neon-glow-blue',
      hover: 'hover:border-blue-400',
    },
    red: {
      text: 'text-red-400',
      border: 'border-red-400',
      bg: 'bg-red-400/20',
      glow: 'neon-glow-red',
      hover: 'hover:border-red-400',
    },
    green: {
      text: 'text-green-400',
      border: 'border-green-400',
      bg: 'bg-green-400/20',
      glow: 'neon-glow-green',
      hover: 'hover:border-green-400',
    },
  };
  
  return colorMap[color as keyof typeof colorMap] || colorMap.cyan;
};
