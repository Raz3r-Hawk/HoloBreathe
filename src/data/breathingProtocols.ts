import { BreathingProtocol } from '../types';

export const breathingProtocols: BreathingProtocol[] = [
  {
    id: 'foundation',
    name: 'Foundation',
    pattern: [4, 4, 4, 4],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: '#00D4AA',
    benefit: 'Focus & Balance',
    description: 'Perfect for beginners. Build your foundation with balanced breathing cycles that enhance focus and create mental clarity.',
    sessionDuration: 300,
    difficulty: 'beginner',
  },
  {
    id: 'calm',
    name: 'Calm',
    pattern: [4, 0, 6, 0],
    phases: ['Inhale', 'Rest', 'Exhale', 'Rest'],
    color: '#0066FF',
    benefit: 'Deep Relaxation',
    description: 'Extended exhale for deep relaxation and stress relief. Activates your parasympathetic nervous system.',
    sessionDuration: 360,
    difficulty: 'beginner',
  },
  {
    id: 'energize',
    name: 'Energize',
    pattern: [3, 1, 3, 1],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: '#F59E0B',
    benefit: 'Energy Boost',
    description: 'Quick energizing breath for morning vitality. Increases alertness and mental energy naturally.',
    sessionDuration: 180,
    difficulty: 'beginner',
  },
  {
    id: 'advanced',
    name: 'Advanced',
    pattern: [4, 7, 8, 0],
    phases: ['Inhale', 'Hold', 'Exhale', 'Rest'],
    color: '#EF4444',
    benefit: 'Deep Sleep',
    description: 'The 4-7-8 technique for deep relaxation and better sleep. Helps calm the nervous system completely.',
    sessionDuration: 300,
    difficulty: 'intermediate',
  },
  {
    id: 'power',
    name: 'Power',
    pattern: [5, 5, 5, 5],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: '#EF4444',
    benefit: 'Mental Strength',
    description: 'Powerful breathing for mental strength and endurance. Builds resilience and concentration.',
    sessionDuration: 240,
    difficulty: 'intermediate',
  },
  {
    id: 'elite',
    name: 'Elite',
    pattern: [6, 6, 6, 6],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: '#8B5CF6',
    benefit: 'Peak Performance',
    description: 'Advanced rhythm for peak performance and flow state. Optimizes oxygen delivery and mental clarity.',
    sessionDuration: 300,
    difficulty: 'advanced',
  },
  {
    id: 'balance',
    name: 'Balance',
    pattern: [4, 2, 4, 2],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: '#10B981',
    benefit: 'Emotional Harmony',
    description: 'Gentle rhythm for emotional balance and stability. Creates harmony between mind and body.',
    sessionDuration: 360,
    difficulty: 'intermediate',
  },
];

export const getProtocolById = (id: string): BreathingProtocol | undefined => {
  return breathingProtocols.find(protocol => protocol.id === id);
};

export const getProtocolsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): BreathingProtocol[] => {
  return breathingProtocols.filter(protocol => protocol.difficulty === difficulty);
};