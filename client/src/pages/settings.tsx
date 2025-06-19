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
  Flag
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
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const logoutMutation = useLogout();
  const deleteAccountMutation = useDeleteAccount();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="mb-4">Please log in to access settings</p>
          <Button onClick={() => setLocation('/auth')}>Go to Login</Button>
        </div>
      </div>
    );
  }

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

  const updateThemeMutation = useMutation({
    mutationFn: async (theme: string) => {
      return await apiRequest("PUT", "/api/user", { themePreference: theme });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Theme updated",
        description: "Your theme preference has been saved.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Theme update failed",
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

  const onProfileSubmit = (data: ProfileForm) => {
    updateProfileMutation.mutate(data);
  };

  const onFeedbackSubmit = (data: FeedbackForm) => {
    submitFeedbackMutation.mutate(data);
  };

  const handleThemeChange = (theme: string) => {
    updateThemeMutation.mutate(theme);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 py-8 px-4">
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
            className="mb-4 border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            ← Back to Breathing
          </Button>
          
          <div className="flex items-center space-x-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold text-white">Settings</h1>
          </div>
          <p className="text-gray-300">Manage your account and app preferences</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full bg-gray-800/50 border-gray-700">
              <TabsTrigger value="profile" className="text-gray-300 data-[state=active]:text-white">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="preferences" className="text-gray-300 data-[state=active]:text-white">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Preferences
              </TabsTrigger>
              <TabsTrigger value="feedback" className="text-gray-300 data-[state=active]:text-white">
                <MessageSquare className="w-4 h-4 mr-2" />
                Feedback
              </TabsTrigger>
              <TabsTrigger value="account" className="text-gray-300 data-[state=active]:text-white">
                <Shield className="w-4 h-4 mr-2" />
                Account
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="bg-gray-900/80 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="w-5 h-5 mr-2 text-cyan-400" />
                    Profile Information
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Update your personal information and profile details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-gray-200">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          {...profileForm.register('firstName')}
                          className="bg-gray-800/50 border-gray-600 text-white"
                        />
                        {profileForm.formState.errors.firstName && (
                          <p className="text-red-400 text-sm">{profileForm.formState.errors.firstName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-200">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          {...profileForm.register('lastName')}
                          className="bg-gray-800/50 border-gray-600 text-white"
                        />
                        {profileForm.formState.errors.lastName && (
                          <p className="text-red-400 text-sm">{profileForm.formState.errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-gray-200">
                        Date of Birth
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        {...profileForm.register('dateOfBirth')}
                        className="bg-gray-800/50 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-gray-200">
                        Gender
                      </Label>
                      <Select onValueChange={(value) => profileForm.setValue('gender', value)} defaultValue={user?.gender || ''}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="male" className="text-white">Male</SelectItem>
                          <SelectItem value="female" className="text-white">Female</SelectItem>
                          <SelectItem value="other" className="text-white">Other</SelectItem>
                          <SelectItem value="prefer_not_to_say" className="text-white">Prefer not to say</SelectItem>
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
                <Card className="bg-gray-900/80 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Monitor className="w-5 h-5 mr-2 text-cyan-400" />
                      Theme Preference
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Choose your preferred app theme
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'light', label: 'Light', icon: Sun },
                        { id: 'dark', label: 'Dark', icon: Moon },
                        { id: 'auto', label: 'Auto', icon: Monitor },
                      ].map((theme) => {
                        const Icon = theme.icon;
                        const isActive = user?.themePreference === theme.id;
                        
                        return (
                          <Button
                            key={theme.id}
                            variant={isActive ? "default" : "outline"}
                            onClick={() => handleThemeChange(theme.id)}
                            className={`flex flex-col items-center p-4 h-auto ${
                              isActive 
                                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white" 
                                : "border-gray-600 text-gray-300 hover:bg-gray-800"
                            }`}
                          >
                            <Icon className="w-6 h-6 mb-2" />
                            <span>{theme.label}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/80 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-cyan-400" />
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
              <Card className="bg-gray-900/80 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-cyan-400" />
                    Send Feedback
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Help us improve the app with your feedback and suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={feedbackForm.handleSubmit(onFeedbackSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-gray-200">Rating</Label>
                      <Select onValueChange={(value) => feedbackForm.setValue('rating', value)}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Rate your experience" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="5" className="text-white">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                          <SelectItem value="4" className="text-white">⭐⭐⭐⭐ Good</SelectItem>
                          <SelectItem value="3" className="text-white">⭐⭐⭐ Average</SelectItem>
                          <SelectItem value="2" className="text-white">⭐⭐ Poor</SelectItem>
                          <SelectItem value="1" className="text-white">⭐ Terrible</SelectItem>
                        </SelectContent>
                      </Select>
                      {feedbackForm.formState.errors.rating && (
                        <p className="text-red-400 text-sm">{feedbackForm.formState.errors.rating.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-200">Category</Label>
                      <Select onValueChange={(value) => feedbackForm.setValue('category', value)}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select feedback category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="general" className="text-white">General Feedback</SelectItem>
                          <SelectItem value="bug" className="text-white">Bug Report</SelectItem>
                          <SelectItem value="feature" className="text-white">Feature Request</SelectItem>
                          <SelectItem value="ui" className="text-white">User Interface</SelectItem>
                          <SelectItem value="performance" className="text-white">Performance</SelectItem>
                        </SelectContent>
                      </Select>
                      {feedbackForm.formState.errors.category && (
                        <p className="text-red-400 text-sm">{feedbackForm.formState.errors.category.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-200">
                        Your Feedback
                      </Label>
                      <textarea
                        id="message"
                        {...feedbackForm.register('message')}
                        rows={5}
                        placeholder="Tell us about your experience, suggestions, or any issues you've encountered..."
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                      {feedbackForm.formState.errors.message && (
                        <p className="text-red-400 text-sm">{feedbackForm.formState.errors.message.message}</p>
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
                <Card className="bg-gray-900/80 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2 text-cyan-400" />
                      Help & Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800"
                      onClick={() => setLocation('/privacy-policy')}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Privacy Policy
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800"
                      onClick={() => setLocation('/about')}
                    >
                      <Flag className="w-4 h-4 mr-2" />
                      About Us
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800"
                      onClick={() => window.open('mailto:support@breathingapp.com', '_blank')}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/80 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Account Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                      variant="outline"
                      className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {logoutMutation.isPending ? 'Signing out...' : 'Sign Out'}
                    </Button>

                    <Separator className="bg-gray-700" />

                    <div className="space-y-4">
                      <h4 className="text-red-400 font-medium">Danger Zone</h4>
                      
                      {showDeleteConfirm ? (
                        <Alert className="border-red-500/50 bg-red-900/20">
                          <Trash2 className="w-4 h-4 text-red-400" />
                          <AlertDescription className="text-red-300">
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