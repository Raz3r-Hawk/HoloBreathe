import {BreathingProtocol} from '../types';

export const breathingProtocols: BreathingProtocol[] = [
  {
    id: 'foundation',
    name: 'Foundation Protocol',
    pattern: [4, 4, 4, 4],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: '#00ffff',
    benefit: 'Basic breathing foundation',
    description: 'Perfect for beginners to establish proper breathing rhythm and technique.',
    sessionDuration: 300, // 5 minutes
  },
  {
    id: 'stress-relief',
    name: 'Stress Relief',
    pattern: [4, 7, 8, 0],
    phases: ['Inhale', 'Hold', 'Exhale', 'Rest'],
    color: '#ff6b6b',
    benefit: 'Reduces stress and anxiety',
    description: 'Activates parasympathetic nervous system for deep relaxation.',
    sessionDuration: 480, // 8 minutes
  },
  {
    id: 'energy-boost',
    name: 'Energy Boost',
    pattern: [3, 0, 3, 0],
    phases: ['Inhale', 'Switch', 'Exhale', 'Switch'],
    color: '#ffd93d',
    benefit: 'Increases energy and alertness',
    description: 'Rapid breathing technique to boost energy and mental clarity.',
    sessionDuration: 300, // 5 minutes
  },
  {
    id: 'focus-enhancement',
    name: 'Focus Enhancement',
    pattern: [6, 2, 6, 2],
    phases: ['Inhale', 'Hold', 'Exhale', 'Pause'],
    color: '#6bcf7f',
    benefit: 'Improves concentration',
    description: 'Enhances mental focus and cognitive performance.',
    sessionDuration: 600, // 10 minutes
  },
  {
    id: 'sleep-preparation',
    name: 'Sleep Preparation',
    pattern: [4, 4, 6, 2],
    phases: ['Inhale', 'Hold', 'Exhale', 'Rest'],
    color: '#a8e6cf',
    benefit: 'Prepares body for sleep',
    description: 'Calms the nervous system for better sleep quality.',
    sessionDuration: 720, // 12 minutes
  },
  {
    id: 'anxiety-relief',
    name: 'Anxiety Relief',
    pattern: [3, 3, 6, 3],
    phases: ['Inhale', 'Hold', 'Exhale', 'Pause'],
    color: '#dda0dd',
    benefit: 'Reduces anxiety symptoms',
    description: 'Specifically designed to calm anxiety and racing thoughts.',
    sessionDuration: 600, // 10 minutes
  },
  {
    id: 'performance',
    name: 'Performance Mode',
    pattern: [5, 5, 5, 5],
    phases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
    color: '#ff8c42',
    benefit: 'Peak performance state',
    description: 'Advanced protocol for athletes and high performers.',
    sessionDuration: 900, // 15 minutes
  },
];

export const getProtocolById = (id: string): BreathingProtocol | undefined => {
  return breathingProtocols.find(protocol => protocol.id === id);
};