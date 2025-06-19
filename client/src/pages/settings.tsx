import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useLogout, useDeleteAccount } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Monitor,
  LogOut, 
  Trash2, 
  Heart,
  Shield,
  Mail,
  Star,
  HelpCircle,
  MessageSquare,
  Flag,
  ArrowLeft
} from 'lucide-react';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

const feedbackSchema = z.object({
  rating: z.string().min(1, 'Please select a rating'),
  message: z.string().min(10, 'Please provide detailed feedback (minimum 10 characters)'),
  category: z.string().min(1, 'Please select a category'),
});

type ProfileForm = z.infer<typeof profileSchema>;
type FeedbackForm = z.infer<typeof feedbackSchema>;

export default function Settings() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const logoutMutation = useLogout();
  const deleteAccountMutation = useDeleteAccount();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // All hook calls must be at the top level
  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      gender: user?.gender || '',
      dateOfBirth: user?.dateOfBirth || '',
    },
  });

  const feedbackForm = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: '',
      message: '',
      category: '',
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileForm) => {
      return await apiRequest("PUT", "/api/user", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const submitFeedbackMutation = useMutation({
    mutationFn: async (data: FeedbackForm) => {
      return await apiRequest("POST", "/api/feedback", data);
    },
    onSuccess: () => {
      feedbackForm.reset();
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback! We'll review it soon.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Feedback submission failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Event handlers
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'auto') => {
    setTheme(newTheme);
    toast({
      title: "Theme updated",
      description: `Theme set to ${newTheme} mode.`,
    });
  };

  const onProfileSubmit = (data: ProfileForm) => {
    updateProfileMutation.mutate(data);
  };

  const onFeedbackSubmit = (data: FeedbackForm) => {
    submitFeedbackMutation.mutate(data);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      deleteAccountMutation.mutate();
    } else {
      setShowDeleteConfirm(true);
    }
  };

  // Early return for unauthenticated users AFTER all hooks
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen theme-bg theme-transition p-4">
        <div className="max-w-md mx-auto">
          <Button
            variant="outline"
            onClick={() => setLocation('/')}
            className="mb-6 theme-transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Welcome
          </Button>
          
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="text-center">
              <p className="text-foreground mb-4">Please log in to access settings</p>
              <Button onClick={() => setLocation('/auth')}>Go to Login</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen theme-bg theme-transition py-8 px-4">
      <div className="max-w-4xl mx-auto">
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
            ← Back to Breathing
          </Button>
          
          <div className="flex items-center space-x-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          </div>
          <p className="text-muted-foreground">Manage your account and app preferences</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full theme-tabs theme-transition">
              <TabsTrigger value="profile" className="theme-tab theme-transition">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="preferences" className="theme-tab theme-transition">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Preferences
              </TabsTrigger>
              <TabsTrigger value="feedback" className="theme-tab theme-transition">
                <MessageSquare className="w-4 h-4 mr-2" />
                Feedback
              </TabsTrigger>
              <TabsTrigger value="account" className="theme-tab theme-transition">
                <Shield className="w-4 h-4 mr-2" />
                Account
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="theme-card theme-transition">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Update your personal details and profile information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                        <Input
                          id="firstName"
                          {...profileForm.register('firstName')}
                          className="theme-input theme-transition"
                          placeholder="Enter your first name"
                        />
                        {profileForm.formState.errors.firstName && (
                          <p className="text-sm text-red-500">{profileForm.formState.errors.firstName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                        <Input
                          id="lastName"
                          {...profileForm.register('lastName')}
                          className="theme-input theme-transition"
                          placeholder="Enter your last name"
                        />
                        {profileForm.formState.errors.lastName && (
                          <p className="text-sm text-red-500">{profileForm.formState.errors.lastName.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-foreground">Gender</Label>
                        <Select onValueChange={(value) => profileForm.setValue('gender', value)} defaultValue={profileForm.getValues('gender')}>
                          <SelectTrigger className="theme-input theme-transition">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent className="theme-card theme-transition">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth" className="text-foreground">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          {...profileForm.register('dateOfBirth')}
                          className="theme-input theme-transition"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full theme-transition"
                      disabled={updateProfileMutation.isPending}
                    >
                      {updateProfileMutation.isPending ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card className="theme-card theme-transition">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <SettingsIcon className="w-5 h-5 mr-2" />
                    App Preferences
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Customize your app experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-foreground font-medium">Theme Preference</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant={theme === 'light' ? 'default' : 'outline'}
                        onClick={() => handleThemeChange('light')}
                        className="flex items-center justify-center p-3 theme-transition"
                      >
                        <Sun className="w-4 h-4 mr-2" />
                        Light
                      </Button>
                      <Button
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        onClick={() => handleThemeChange('dark')}
                        className="flex items-center justify-center p-3 theme-transition"
                      >
                        <Moon className="w-4 h-4 mr-2" />
                        Dark
                      </Button>
                      <Button
                        variant={theme === 'auto' ? 'default' : 'outline'}
                        onClick={() => handleThemeChange('auto')}
                        className="flex items-center justify-center p-3 theme-transition"
                      >
                        <Monitor className="w-4 h-4 mr-2" />
                        Auto
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback" className="space-y-6">
              <Card className="theme-card theme-transition">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Send Feedback
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Help us improve the app with your feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={feedbackForm.handleSubmit(onFeedbackSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-foreground">Rating</Label>
                      <Select onValueChange={(value) => feedbackForm.setValue('rating', value)}>
                        <SelectTrigger className="theme-input theme-transition">
                          <SelectValue placeholder="Rate your experience" />
                        </SelectTrigger>
                        <SelectContent className="theme-card theme-transition">
                          <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                          <SelectItem value="4">⭐⭐⭐⭐ Very Good</SelectItem>
                          <SelectItem value="3">⭐⭐⭐ Good</SelectItem>
                          <SelectItem value="2">⭐⭐ Fair</SelectItem>
                          <SelectItem value="1">⭐ Poor</SelectItem>
                        </SelectContent>
                      </Select>
                      {feedbackForm.formState.errors.rating && (
                        <p className="text-sm text-red-500">{feedbackForm.formState.errors.rating.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground">Category</Label>
                      <Select onValueChange={(value) => feedbackForm.setValue('category', value)}>
                        <SelectTrigger className="theme-input theme-transition">
                          <SelectValue placeholder="Select feedback category" />
                        </SelectTrigger>
                        <SelectContent className="theme-card theme-transition">
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="bug">Bug Report</SelectItem>
                          <SelectItem value="general">General Feedback</SelectItem>
                          <SelectItem value="ui">User Interface</SelectItem>
                          <SelectItem value="performance">Performance</SelectItem>
                        </SelectContent>
                      </Select>
                      {feedbackForm.formState.errors.category && (
                        <p className="text-sm text-red-500">{feedbackForm.formState.errors.category.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground">Your Feedback</Label>
                      <textarea
                        id="message"
                        {...feedbackForm.register('message')}
                        className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 theme-input theme-transition"
                        placeholder="Tell us about your experience..."
                      />
                      {feedbackForm.formState.errors.message && (
                        <p className="text-sm text-red-500">{feedbackForm.formState.errors.message.message}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full theme-transition"
                      disabled={submitFeedbackMutation.isPending}
                    >
                      {submitFeedbackMutation.isPending ? 'Submitting...' : 'Submit Feedback'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-6">
              <Card className="theme-card theme-transition">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Account Actions
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Manage your account settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="flex items-center justify-center theme-transition"
                      disabled={logoutMutation.isPending}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {logoutMutation.isPending ? 'Logging out...' : 'Log Out'}
                    </Button>
                    
                    <Button
                      onClick={handleDeleteAccount}
                      variant={showDeleteConfirm ? "destructive" : "outline"}
                      className="flex items-center justify-center theme-transition"
                      disabled={deleteAccountMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {deleteAccountMutation.isPending 
                        ? 'Deleting...' 
                        : showDeleteConfirm 
                          ? 'Confirm Delete' 
                          : 'Delete Account'
                      }
                    </Button>
                  </div>
                  
                  {showDeleteConfirm && (
                    <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                      <AlertDescription className="text-red-800 dark:text-red-200">
                        This action cannot be undone. All your data will be permanently deleted.
                        Click "Confirm Delete" to proceed or refresh the page to cancel.
                      </AlertDescription>
                    </Alert>
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