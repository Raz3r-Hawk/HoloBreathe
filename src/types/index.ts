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

export interface BreathingSessionState {
  isActive: boolean;
  isPaused: boolean;
  currentPhase: number;
  phaseTimeLeft: number;
  sessionTimeElapsed: number;
  cycles: number;
}

export interface SubscriptionStatus {
  hasSubscription: boolean;
  subscriptionEndDate?: string;
}