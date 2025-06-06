import { useState, useEffect, useCallback, useRef } from 'react';
import { BreathingProtocol } from '@/lib/breathing-patterns';

export interface BreathingSessionState {
  isActive: boolean;
  isPaused: boolean;
  currentPhase: number; // index of current phase
  phaseTimeLeft: number; // seconds left in current phase
  sessionTimeElapsed: number; // total seconds elapsed
  cycles: number; // completed cycles
}

export const useBreathingSession = (protocol: BreathingProtocol | null) => {
  const [sessionState, setSessionState] = useState<BreathingSessionState>({
    isActive: false,
    isPaused: false,
    currentPhase: 0,
    phaseTimeLeft: 0,
    sessionTimeElapsed: 0,
    cycles: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sessionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const getCurrentPhaseName = useCallback(() => {
    if (!protocol) return 'Breathe';
    return protocol.phases[sessionState.currentPhase] || 'Breathe';
  }, [protocol, sessionState.currentPhase]);

  const getCurrentPhasePattern = useCallback(() => {
    if (!protocol) return 4;
    return protocol.pattern[sessionState.currentPhase] || 4;
  }, [protocol, sessionState.currentPhase]);

  const getProgress = useCallback(() => {
    if (!protocol) return 0;
    return Math.min((sessionState.sessionTimeElapsed / protocol.sessionDuration) * 100, 100);
  }, [protocol, sessionState.sessionTimeElapsed]);

  const getFormattedTime = useCallback(() => {
    const minutes = Math.floor(sessionState.sessionTimeElapsed / 60);
    const seconds = sessionState.sessionTimeElapsed % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [sessionState.sessionTimeElapsed]);

  const startSession = useCallback(() => {
    if (!protocol) return;

    setSessionState(prev => ({
      ...prev,
      isActive: true,
      isPaused: false,
      currentPhase: 0,
      phaseTimeLeft: protocol.pattern[0],
      sessionTimeElapsed: 0,
      cycles: 0,
    }));
  }, [protocol]);

  const pauseSession = useCallback(() => {
    setSessionState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  const endSession = useCallback(() => {
    setSessionState({
      isActive: false,
      isPaused: false,
      currentPhase: 0,
      phaseTimeLeft: 0,
      sessionTimeElapsed: 0,
      cycles: 0,
    });

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (sessionIntervalRef.current) {
      clearInterval(sessionIntervalRef.current);
      sessionIntervalRef.current = null;
    }
  }, []);

  // Phase timer effect
  useEffect(() => {
    if (!protocol || !sessionState.isActive || sessionState.isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setSessionState(prev => {
        const newPhaseTimeLeft = prev.phaseTimeLeft - 1;
        
        if (newPhaseTimeLeft <= 0) {
          // Move to next phase
          const nextPhase = (prev.currentPhase + 1) % protocol.pattern.length;
          const newCycles = nextPhase === 0 ? prev.cycles + 1 : prev.cycles;
          
          return {
            ...prev,
            currentPhase: nextPhase,
            phaseTimeLeft: protocol.pattern[nextPhase],
            cycles: newCycles,
          };
        }
        
        return {
          ...prev,
          phaseTimeLeft: newPhaseTimeLeft,
        };
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [protocol, sessionState.isActive, sessionState.isPaused]);

  // Session timer effect
  useEffect(() => {
    if (!protocol || !sessionState.isActive || sessionState.isPaused) {
      if (sessionIntervalRef.current) {
        clearInterval(sessionIntervalRef.current);
        sessionIntervalRef.current = null;
      }
      return;
    }

    sessionIntervalRef.current = setInterval(() => {
      setSessionState(prev => {
        const newSessionTime = prev.sessionTimeElapsed + 1;
        
        // Auto-end session when time limit reached
        if (newSessionTime >= protocol.sessionDuration) {
          return {
            ...prev,
            sessionTimeElapsed: protocol.sessionDuration,
            isActive: false,
          };
        }
        
        return {
          ...prev,
          sessionTimeElapsed: newSessionTime,
        };
      });
    }, 1000);

    return () => {
      if (sessionIntervalRef.current) {
        clearInterval(sessionIntervalRef.current);
      }
    };
  }, [protocol, sessionState.isActive, sessionState.isPaused]);

  return {
    sessionState,
    getCurrentPhaseName,
    getCurrentPhasePattern,
    getProgress,
    getFormattedTime,
    startSession,
    pauseSession,
    endSession,
    isSessionComplete: protocol ? sessionState.sessionTimeElapsed >= protocol.sessionDuration : false,
  };
};
