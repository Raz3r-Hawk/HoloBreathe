import { supabase } from '../config/supabase';
import { BreathingSession, SessionAnalytics } from '../types';

export class BreathingService {
  static async createSession(session: Omit<BreathingSession, 'id' | 'createdAt'>): Promise<BreathingSession> {
    const { data, error } = await supabase
      .from('breathing_sessions')
      .insert({
        ...session,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateSession(sessionId: string, updates: Partial<BreathingSession>): Promise<void> {
    const { error } = await supabase
      .from('breathing_sessions')
      .update(updates)
      .eq('id', sessionId);

    if (error) throw error;
  }

  static async getUserSessions(userId: string, limit: number = 50): Promise<BreathingSession[]> {
    const { data, error } = await supabase
      .from('breathing_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  static async getSessionAnalytics(userId: string, startDate: Date, endDate: Date): Promise<SessionAnalytics> {
    const { data, error } = await supabase
      .from('breathing_sessions')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (error) throw error;

    const sessions = data || [];
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.completed);
    const totalMinutes = sessions.reduce((sum, s) => sum + (s.completed_duration / 60), 0);
    
    // Calculate most used protocol
    const protocolCounts = sessions.reduce((acc, s) => {
      acc[s.protocol_name] = (acc[s.protocol_name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const mostUsedProtocol = Object.entries(protocolCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'None';

    // Calculate streak (consecutive days with sessions)
    const streak = this.calculateStreak(sessions);

    return {
      totalSessions,
      totalMinutes: Math.round(totalMinutes),
      averageSessionLength: totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0,
      mostUsedProtocol,
      completionRate: totalSessions > 0 ? Math.round((completedSessions.length / totalSessions) * 100) : 0,
      streak,
      weeklyGoal: 7, // Default weekly goal
      weeklyProgress: this.getWeeklyProgress(sessions),
    };
  }

  private static calculateStreak(sessions: BreathingSession[]): number {
    if (sessions.length === 0) return 0;

    const today = new Date();
    const sortedSessions = sessions.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    let streak = 0;
    let currentDate = new Date(today);
    
    for (const session of sortedSessions) {
      const sessionDate = new Date(session.created_at);
      const daysDiff = Math.floor((currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
        currentDate = sessionDate;
      } else if (daysDiff > streak) {
        break;
      }
    }

    return streak;
  }

  private static getWeeklyProgress(sessions: BreathingSession[]): number {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weekSessions = sessions.filter(s => 
      new Date(s.created_at) >= weekStart
    );

    const uniqueDays = new Set(
      weekSessions.map(s => new Date(s.created_at).toDateString())
    );

    return uniqueDays.size;
  }
}