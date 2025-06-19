import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin, useRegister } from '@/hooks/useAuth';
import { HolographicCube } from '@/components/holographic-cube';
import { ArrowLeft } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function Auth() {
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
    },
  });

  const onLoginSubmit = async (data: LoginForm) => {
    try {
      await loginMutation.mutateAsync(data);
      setLocation('/');
    } catch (error) {
      // Error is handled by mutation
    }
  };

  const onRegisterSubmit = async (data: RegisterForm) => {
    try {
      await registerMutation.mutateAsync(data);
      setLocation('/');
    } catch (error) {
      // Error is handled by mutation
    }
  };

  return (
    <div className="min-h-screen theme-bg theme-transition flex flex-col items-center justify-center px-6 py-8">
      {/* Back Button */}
      <div className="w-full max-w-md mx-auto mb-4">
        <Button
          variant="ghost"
          onClick={() => setLocation('/')}
          className="theme-transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Welcome
        </Button>
      </div>
      
      <div className="w-full max-w-md mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <HolographicCube size="lg" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            BREATHE
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Welcome back to your breathing journey' : 'Start your holographic breathing experience'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="theme-card theme-transition">
            <CardHeader>
              <CardTitle className="text-xl text-card-foreground text-center">
                {isLogin ? 'Sign In' : 'Create Account'}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-center">
                {isLogin 
                  ? 'Enter your email to access your account' 
                  : 'Fill in your details to get started'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {isLogin ? (
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-card-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...loginForm.register('email')}
                      className="theme-transition bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary"
                    />
                    {loginForm.formState.errors.email && (
                      <p className="text-destructive text-sm">{loginForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-card-foreground">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      {...loginForm.register('password')}
                      className="theme-transition bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary"
                    />
                    {loginForm.formState.errors.password && (
                      <p className="text-destructive text-sm">{loginForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-card-foreground">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        {...registerForm.register('firstName')}
                        className="theme-transition bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary"
                      />
                      {registerForm.formState.errors.firstName && (
                        <p className="text-destructive text-sm">{registerForm.formState.errors.firstName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-card-foreground">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        {...registerForm.register('lastName')}
                        className="theme-transition bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary"
                      />
                      {registerForm.formState.errors.lastName && (
                        <p className="text-destructive text-sm">{registerForm.formState.errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-card-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...registerForm.register('email')}
                      className="theme-transition bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary"
                    />
                    {registerForm.formState.errors.email && (
                      <p className="text-destructive text-sm">{registerForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-card-foreground">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create password"
                        {...registerForm.register('password')}
                        className="theme-transition bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary"
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-destructive text-sm">{registerForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-card-foreground">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        {...registerForm.register('confirmPassword')}
                        className="theme-transition bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary"
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-destructive text-sm">{registerForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-sm font-medium text-card-foreground">
                      Date of Birth (Optional)
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      {...registerForm.register('dateOfBirth')}
                      className="theme-transition bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-medium text-card-foreground">
                      Gender (Optional)
                    </Label>
                    <Select onValueChange={(value) => registerForm.setValue('gender', value)}>
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

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              )}

              <div className="text-center pt-4">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : 'Already have an account? Sign in'
                  }
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-gray-400 text-sm">
            By continuing, you agree to our{' '}
            <button 
              onClick={() => setLocation('/privacy-policy')} 
              className="text-cyan-400 hover:text-cyan-300"
            >
              Privacy Policy
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}