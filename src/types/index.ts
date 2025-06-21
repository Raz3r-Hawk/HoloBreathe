export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  profilePicture?: string;
  theme: 'light' | 'dark' | 'auto';
  createdAt: string;
  updatedAt: string;
}

export interface BreathingProtocol {
  id: string;
  name: string;
  pattern: number[]; // [inhale, hold, exhale, hold] in seconds
  phases: string[];
  color: string;
  benefit: string;
  description: string;
  sessionDuration: number; // in seconds
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface BreathingSession {
  id: string;
  userId: string;
  protocolId: string;
  protocolName: string;
  duration: number;
  completedDuration: number;
  cycles: number;
  completed: boolean;
  startTime: string;
  endTime?: string;
  createdAt: string;
}

export interface SessionAnalytics {
  totalSessions: number;
  totalMinutes: number;
  averageSessionLength: number;
  mostUsedProtocol: string;
  completionRate: number;
  streak: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    accent: string;
  };
  typography: {
    h1: TextStyle;
    h2: TextStyle;
    h3: TextStyle;
    body: TextStyle;
    caption: TextStyle;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

export interface TextStyle {
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  letterSpacing?: number;
}