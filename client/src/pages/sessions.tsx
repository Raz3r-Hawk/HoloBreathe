import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Activity, TrendingUp, BarChart3, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface SessionData {
  id: number;
  protocolId: string;
  protocolName: string;
  duration: number;
  completedAt: string;
  cycles: number;
  completed: boolean;
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
            <TabsList className="grid grid-cols-2 w-full max-w-md bg-muted border-border">
              <TabsTrigger value="analytics" className="text-muted-foreground data-[state=active]:text-foreground">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="history" className="text-muted-foreground data-[state=active]:text-foreground">
                <Clock className="w-4 h-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="space-y-6">
                {/* Period Selection */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-primary" />
                      Time Period
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Select the time period for your analytics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {periodOptions.map((option) => (
                        <Button
                          key={option.value}
                          variant={selectedPeriod === option.value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedPeriod(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Analytics Cards */}
                {analyticsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i} className="bg-card border-border">
                        <CardContent className="p-6">
                          <div className="animate-pulse">
                            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                            <div className="h-8 bg-muted rounded w-1/2"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : analytics ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2 mb-2">
                          <Activity className="w-5 h-5 text-primary" />
                          <span className="text-sm font-medium text-muted-foreground">Total Sessions</span>
                        </div>
                        <div className="text-3xl font-bold text-card-foreground">{analytics.totalSessions}</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-5 h-5 text-primary" />
                          <span className="text-sm font-medium text-muted-foreground">Total Minutes</span>
                        </div>
                        <div className="text-3xl font-bold text-card-foreground">{analytics.totalMinutes}</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          <span className="text-sm font-medium text-muted-foreground">Average Session</span>
                        </div>
                        <div className="text-3xl font-bold text-card-foreground">{analytics.averageSessionLength}m</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2 mb-2">
                          <BarChart3 className="w-5 h-5 text-primary" />
                          <span className="text-sm font-medium text-muted-foreground">Most Used Protocol</span>
                        </div>
                        <div className="text-xl font-bold text-card-foreground">{analytics.mostUsedProtocol}</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          <span className="text-sm font-medium text-muted-foreground">Completion Rate</span>
                        </div>
                        <div className="text-3xl font-bold text-card-foreground">{analytics.completionRate}%</div>
                      </CardContent>
                    </Card>
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
                              {formatDate(session.completedAt)}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-card-foreground">
                              {formatDuration(session.duration)}
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