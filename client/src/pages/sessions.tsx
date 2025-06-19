import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Activity, TrendingUp, BarChart3, ArrowLeft, Target } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { queryClient } from '@/lib/queryClient';

interface SessionData {
  id: number;
  protocol: string;
  protocolName: string;
  duration: number;
  completedDuration: number;
  cycles: number;
  completed: boolean;
  createdAt: string;
}

interface AnalyticsData {
  totalSessions: number;
  totalMinutes: number;
  averageSessionLength: number;
  mostUsedProtocol: string;
  completionRate: number;
}

export default function Sessions() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('weekly');

  // Force refresh sessions data on component mount
  useEffect(() => {
    if (isAuthenticated) {
      queryClient.invalidateQueries({ queryKey: ['/api/sessions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/analytics'] });
    }
  }, [isAuthenticated]);

  // Fetch user sessions
  const { data: sessions = [], isLoading: sessionsLoading } = useQuery<SessionData[]>({
    queryKey: ['/api/sessions'],
    enabled: isAuthenticated,
  });

  // Fetch analytics data
  const { data: analytics, isLoading: analyticsLoading } = useQuery<AnalyticsData>({
    queryKey: ['/api/analytics', selectedPeriod],
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-center">
          <p className="mb-4">Please log in to view your sessions</p>
          <Button onClick={() => setLocation('/auth')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const periodOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'semi-annual', label: 'Semi-Annual' },
    { value: 'annual', label: 'Annual' }
  ];

  return (
    <div className="min-h-screen theme-bg theme-transition p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            onClick={() => setLocation('/protocol-selection')}
            className="mb-4 theme-transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Breathing
          </Button>
          
          <div className="flex items-center space-x-3 mb-2">
            <Activity className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Sessions & Analytics</h1>
          </div>
          <p className="text-muted-foreground">Track your breathing practice and progress</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full max-w-md theme-tabs theme-transition">
              <TabsTrigger value="analytics" className="theme-tab theme-transition">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="history" className="theme-tab theme-transition">
                <Clock className="w-4 h-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="space-y-8">
                {/* Period Selection - Redesigned */}
                <Card className="theme-card theme-transition">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-card-foreground flex items-center text-xl font-semibold">
                      <Calendar className="w-6 h-6 mr-3 text-primary" />
                      Time Period
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-base mt-2">
                      Select the time period for your analytics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-3">
                      {periodOptions.map((option) => (
                        <Button
                          key={option.value}
                          variant={selectedPeriod === option.value ? 'default' : 'outline'}
                          onClick={() => setSelectedPeriod(option.value)}
                          className={`px-6 py-3 text-sm font-medium theme-transition rounded-lg ${
                            selectedPeriod === option.value
                              ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90'
                              : 'border-2 border-border hover:bg-muted hover:border-primary/50'
                          }`}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Analytics Cards - Redesigned Layout */}
                {analyticsLoading ? (
                  <div className="space-y-6">
                    {/* Top Row - 3 Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[...Array(3)].map((_, i) => (
                        <Card key={i} className="theme-card theme-transition">
                          <CardContent className="p-8">
                            <div className="animate-pulse">
                              <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                              <div className="h-12 bg-muted rounded w-1/2"></div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {/* Bottom Row - 2 Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[...Array(2)].map((_, i) => (
                        <Card key={i + 3} className="theme-card theme-transition">
                          <CardContent className="p-8">
                            <div className="animate-pulse">
                              <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                              <div className="h-12 bg-muted rounded w-1/2"></div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : analytics ? (
                  <div className="space-y-6">
                    {/* Top Row - 3 Main Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="theme-card theme-transition hover:shadow-lg">
                        <CardContent className="p-8 text-center">
                          <div className="flex items-center justify-center mb-4">
                            <div className="p-3 rounded-full bg-primary/10">
                              <Activity className="w-6 h-6 text-primary" />
                            </div>
                          </div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Total Sessions</p>
                          <p className="text-4xl font-bold text-card-foreground">{analytics.totalSessions}</p>
                        </CardContent>
                      </Card>

                      <Card className="theme-card theme-transition hover:shadow-lg">
                        <CardContent className="p-8 text-center">
                          <div className="flex items-center justify-center mb-4">
                            <div className="p-3 rounded-full bg-primary/10">
                              <Clock className="w-6 h-6 text-primary" />
                            </div>
                          </div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Total Minutes</p>
                          <p className="text-4xl font-bold text-card-foreground">{analytics.totalMinutes}</p>
                        </CardContent>
                      </Card>

                      <Card className="theme-card theme-transition hover:shadow-lg">
                        <CardContent className="p-8 text-center">
                          <div className="flex items-center justify-center mb-4">
                            <div className="p-3 rounded-full bg-primary/10">
                              <TrendingUp className="w-6 h-6 text-primary" />
                            </div>
                          </div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Average Session</p>
                          <p className="text-4xl font-bold text-card-foreground">{analytics.averageSessionLength}m</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Bottom Row - 2 Additional Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="theme-card theme-transition hover:shadow-lg">
                        <CardContent className="p-8 text-center">
                          <div className="flex items-center justify-center mb-4">
                            <div className="p-3 rounded-full bg-primary/10">
                              <BarChart3 className="w-6 h-6 text-primary" />
                            </div>
                          </div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Most Used Protocol</p>
                          <p className="text-2xl font-bold text-card-foreground">{analytics.mostUsedProtocol || 'None'}</p>
                        </CardContent>
                      </Card>

                      <Card className="theme-card theme-transition hover:shadow-lg">
                        <CardContent className="p-8 text-center">
                          <div className="flex items-center justify-center mb-4">
                            <div className="p-3 rounded-full bg-primary/10">
                              <Target className="w-6 h-6 text-primary" />
                            </div>
                          </div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Completion Rate</p>
                          <p className="text-4xl font-bold text-card-foreground">{analytics.completionRate}%</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <Card className="bg-card border-border">
                    <CardContent className="p-8 text-center">
                      <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-card-foreground mb-2">No Data Available</h3>
                      <p className="text-muted-foreground">Complete some breathing sessions to see your analytics</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    Session History
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Your recent breathing sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {sessionsLoading ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-16 bg-muted rounded-lg"></div>
                        </div>
                      ))}
                    </div>
                  ) : sessions.length > 0 ? (
                    <div className="space-y-4">
                      {sessions.map((session) => (
                        <motion.div
                          key={session.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/50"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-card-foreground">{session.protocolName}</h4>
                              <Badge variant={session.completed ? 'default' : 'secondary'}>
                                {session.completed ? 'Completed' : 'Incomplete'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(session.createdAt)}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-card-foreground">
                              {formatDuration(session.completedDuration)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {session.cycles} cycles
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-card-foreground mb-2">No Sessions Yet</h3>
                      <p className="text-muted-foreground mb-4">Complete your first breathing session to see it here</p>
                      <Button onClick={() => setLocation('/protocol-selection')}>
                        Start Your First Session
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}