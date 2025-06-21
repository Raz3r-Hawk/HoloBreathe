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
    id: '478',
    name: '4-7-8 Relaxation',
    pattern: [4, 7, 8, 0],
    phases: ['Inhale', 'Hold', 'Exhale', 'Rest'],
    color: 'cyan',
    benefit: 'Deep Relaxation & Sleep',
    description: 'Perfect for reducing anxiety and preparing for sleep',
    sessionDuration: 300, // 5 minutes
  },
  {
    id: 'box',
    name: 'Box Breathing',
    pattern: [4, 4, 4, 4],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: 'purple',
    benefit: 'Focus & Concentration',
    description: 'Used by Navy SEALs for mental clarity and stress control',
    sessionDuration: 600, // 10 minutes
  },
  {
    id: 'wim',
    name: 'Wim Hof Method',
    pattern: [3, 0, 1, 15],
    phases: ['Deep Inhale', 'Release', 'Exhale', 'Hold'],
    color: 'orange',
    benefit: 'Energy & Immune Boost',
    description: 'Increases energy levels and strengthens immune system',
    sessionDuration: 900, // 15 minutes
  },
  {
    id: 'triangle',
    name: 'Triangle Breathing',
    pattern: [4, 4, 4, 0],
    phases: ['Inhale', 'Hold', 'Exhale', 'Rest'],
    color: 'green',
    benefit: 'Balance & Harmony',
    description: 'Creates equilibrium between mind, body, and spirit',
    sessionDuration: 480, // 8 minutes
  },
  {
    id: 'coherent',
    name: 'Coherent Breathing',
    pattern: [5, 0, 5, 0],
    phases: ['Inhale', 'Transition', 'Exhale', 'Transition'],
    color: 'blue',
    benefit: 'Heart Rate Variability',
    description: 'Optimizes heart rhythm for emotional balance',
    sessionDuration: 720, // 12 minutes
  },
  {
    id: 'power',
    name: 'Power Breath',
    pattern: [1, 0, 2, 0],
    phases: ['Quick Inhale', 'Release', 'Strong Exhale', 'Reset'],
    color: 'red',
    benefit: 'Instant Energy',
    description: 'Rapid energizing technique for immediate vitality',
    sessionDuration: 180, // 3 minutes
  },
  {
    id: 'extended',
    name: 'Extended Exhale',
    pattern: [4, 0, 8, 0],
    phases: ['Inhale', 'Transition', 'Long Exhale', 'Rest'],
    color: 'indigo',
    benefit: 'Stress Relief',
    description: 'Activates parasympathetic nervous system for deep calm',
    sessionDuration: 420, // 7 minutes
  },
];

export const getProtocolById = (id: string): BreathingProtocol | undefined => {
  return breathingProtocols.find(protocol => protocol.id === id);
};