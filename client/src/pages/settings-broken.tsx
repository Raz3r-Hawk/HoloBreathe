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

  // All hook calls must be at the top level, before any early returns
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
            <TabsContent value="profile">
              <Card className="theme-card theme-transition">
                <CardHeader>
                  <CardTitle className="text-card-foreground flex items-center">
                    <User className="w-5 h-5 mr-2 text-primary" />
                    Profile Information
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Update your personal information and profile details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-card-foreground font-medium">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          {...profileForm.register('firstName')}
                          className="theme-transition bg-background border-border text-foreground focus:border-primary"
                        />
                        {profileForm.formState.errors.firstName && (
                          <p className="text-destructive text-sm">{profileForm.formState.errors.firstName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-card-foreground font-medium">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          {...profileForm.register('lastName')}
                          className="theme-transition bg-background border-border text-foreground focus:border-primary"
                        />
                        {profileForm.formState.errors.lastName && (
                          <p className="text-destructive text-sm">{profileForm.formState.errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-card-foreground font-medium">
                        Date of Birth
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        {...profileForm.register('dateOfBirth')}
                        className="theme-transition bg-background border-border text-foreground focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-card-foreground font-medium">
                        Gender
                      </Label>
                      <Select onValueChange={(value) => profileForm.setValue('gender', value)} defaultValue={user?.gender || ''}>
                        <SelectTrigger className="theme-transition bg-background border-border text-foreground focus:border-primary">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="theme-card border-border">
                          <SelectItem value="male" className="text-card-foreground">Male</SelectItem>
                          <SelectItem value="female" className="text-card-foreground">Female</SelectItem>
                          <SelectItem value="other" className="text-card-foreground">Other</SelectItem>
                          <SelectItem value="prefer_not_to_say" className="text-card-foreground">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={updateProfileMutation.isPending}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                      >
                        {updateProfileMutation.isPending ? 'Saving...' : 'Save Profile'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <div className="space-y-6">
                <Card className="theme-card theme-transition">
                  <CardHeader>
                    <CardTitle className="text-card-foreground flex items-center">
                      <Monitor className="w-5 h-5 mr-2 text-primary" />
                      Theme Preference
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Choose your preferred app theme
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'light', label: 'Light', icon: Sun },
                        { id: 'dark', label: 'Dark', icon: Moon },
                        { id: 'auto', label: 'Auto', icon: Monitor },
                      ].map((themeOption) => {
                        const Icon = themeOption.icon;
                        const isActive = theme === themeOption.id;
                        
                        return (
                          <Button
                            key={themeOption.id}
                            variant={isActive ? "default" : "outline"}
                            onClick={() => handleThemeChange(themeOption.id as any)}
                            className={`flex flex-col items-center p-4 h-auto theme-transition ${
                              isActive 
                                ? "bg-primary text-primary-foreground" 
                                : "border-border text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            <Icon className="w-6 h-6 mb-2" />
                            <span>{themeOption.label}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="theme-card theme-transition">
                  <CardHeader>
                    <CardTitle className="text-card-foreground flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-primary" />
                      Subscription Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">
                          {user?.hasSubscription ? 'Premium Member' : 'Free Account'}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {user?.hasSubscription 
                            ? `Active until ${user.subscriptionEndDate ? new Date(user.subscriptionEndDate).toLocaleDateString() : 'Unknown'}`
                            : 'Upgrade to access all breathing protocols'
                          }
                        </p>
                      </div>
                      <Badge variant={user?.hasSubscription ? "default" : "secondary"}>
                        {user?.hasSubscription ? 'Premium' : 'Free'}
                      </Badge>
                    </div>
                    {!user?.hasSubscription && (
                      <Button
                        onClick={() => setLocation('/subscription')}
                        className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Upgrade to Premium
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback">
              <Card className="theme-card theme-transition">
                <CardHeader>
                  <CardTitle className="text-card-foreground flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                    Send Feedback
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Help us improve the app with your feedback and suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={feedbackForm.handleSubmit(onFeedbackSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-card-foreground font-medium">Rating</Label>
                      <Select onValueChange={(value) => feedbackForm.setValue('rating', value)}>
                        <SelectTrigger className="theme-transition bg-background border-border text-foreground focus:border-primary">
                          <SelectValue placeholder="Rate your experience" />
                        </SelectTrigger>
                        <SelectContent className="theme-card border-border">
                          <SelectItem value="5" className="text-card-foreground">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                          <SelectItem value="4" className="text-card-foreground">⭐⭐⭐⭐ Good</SelectItem>
                          <SelectItem value="3" className="text-card-foreground">⭐⭐⭐ Average</SelectItem>
                          <SelectItem value="2" className="text-card-foreground">⭐⭐ Poor</SelectItem>
                          <SelectItem value="1" className="text-card-foreground">⭐ Terrible</SelectItem>
                        </SelectContent>
                      </Select>
                      {feedbackForm.formState.errors.rating && (
                        <p className="text-destructive text-sm">{feedbackForm.formState.errors.rating.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-card-foreground font-medium">Category</Label>
                      <Select onValueChange={(value) => feedbackForm.setValue('category', value)}>
                        <SelectTrigger className="theme-transition bg-background border-border text-foreground focus:border-primary">
                          <SelectValue placeholder="Select feedback category" />
                        </SelectTrigger>
                        <SelectContent className="theme-card border-border">
                          <SelectItem value="general" className="text-card-foreground">General Feedback</SelectItem>
                          <SelectItem value="bug" className="text-card-foreground">Bug Report</SelectItem>
                          <SelectItem value="feature" className="text-card-foreground">Feature Request</SelectItem>
                          <SelectItem value="ui" className="text-card-foreground">User Interface</SelectItem>
                          <SelectItem value="performance" className="text-card-foreground">Performance</SelectItem>
                        </SelectContent>
                      </Select>
                      {feedbackForm.formState.errors.category && (
                        <p className="text-destructive text-sm">{feedbackForm.formState.errors.category.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-card-foreground font-medium">
                        Your Feedback
                      </Label>
                      <textarea
                        id="message"
                        {...feedbackForm.register('message')}
                        rows={5}
                        placeholder="Tell us about your experience, suggestions, or any issues you've encountered..."
                        className="w-full px-3 py-2 theme-transition bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {feedbackForm.formState.errors.message && (
                        <p className="text-destructive text-sm">{feedbackForm.formState.errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={submitFeedbackMutation.isPending}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    >
                      {submitFeedbackMutation.isPending ? 'Sending...' : 'Send Feedback'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <div className="space-y-6">
                <Card className="theme-card theme-transition">
                  <CardHeader>
                    <CardTitle className="text-card-foreground flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2 text-primary" />
                      Help & Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start theme-transition border-border text-foreground hover:bg-accent"
                      onClick={() => setLocation('/privacy-policy')}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Privacy Policy
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start theme-transition border-border text-foreground hover:bg-accent"
                      onClick={() => setLocation('/about')}
                    >
                      <Flag className="w-4 h-4 mr-2" />
                      About Us
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start theme-transition border-border text-foreground hover:bg-accent"
                      onClick={() => window.open('mailto:support@breathingapp.com', '_blank')}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>

                <Card className="theme-card theme-transition">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Account Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                      variant="outline"
                      className="w-full justify-start theme-transition border-border text-foreground hover:bg-accent"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {logoutMutation.isPending ? 'Signing out...' : 'Sign Out'}
                    </Button>

                    <Separator className="bg-border" />

                    <div className="space-y-4">
                      <h4 className="text-destructive font-medium">Danger Zone</h4>
                      
                      {showDeleteConfirm ? (
                        <Alert className="border-destructive/50 bg-destructive/10 theme-transition">
                          <Trash2 className="w-4 h-4 text-destructive" />
                          <AlertDescription className="text-foreground">
                            Are you sure? This will permanently delete your account and all data. This action cannot be undone.
                            <div className="flex space-x-2 mt-3">
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={handleDeleteAccount}
                                disabled={deleteAccountMutation.isPending}
                              >
                                {deleteAccountMutation.isPending ? 'Deleting...' : 'Yes, Delete My Account'}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setShowDeleteConfirm(false)}
                                className="theme-transition"
                              >
                                Cancel
                              </Button>
                            </div>
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <Button
                          onClick={handleDeleteAccount}
                          variant="destructive"
                          className="w-full justify-start"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}