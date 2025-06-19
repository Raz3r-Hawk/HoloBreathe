import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { HolographicCube } from '@/components/holographic-cube';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function UpgradePrompt() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen theme-bg theme-transition flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md mx-auto">
        {/* Completion Animation */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-blue-500 flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 20px rgba(59,130,246,0.5)',
                '0 0 40px rgba(99,102,241,0.8)',
                '0 0 20px rgba(59,130,246,0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-4 gradient-text">Trial Complete!</h2>
          <p className="text-muted-foreground mb-2">You've experienced your first breathing session.</p>
          <p className="text-sm text-muted-foreground">Ready to unlock the full potential?</p>
        </motion.div>

        {/* Upgrade Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Card className="theme-card theme-transition border border-border">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-3">
                <HolographicCube size="md" />
              </div>
              <CardTitle className="text-2xl text-foreground mb-2">
                Unlock Premium Access
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Continue your breathing journey with full access
              </CardDescription>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <span className="text-3xl font-bold text-primary">₹999</span>
                <span className="text-muted-foreground">/month</span>
                <Badge variant="secondary" className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 ml-2">
                  7-day trial
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground font-semibold mb-3">What you'll get:</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">All 6+ breathing protocols</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-foreground">Advanced breathing patterns</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-foreground">Unlimited sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-foreground">Session tracking & progress</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-foreground">Premium ambient sounds</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg border border-primary/20">
                <p className="text-sm text-center text-primary font-semibold mb-1">
                  Limited Time Offer
                </p>
                <p className="text-xs text-center text-muted-foreground">
                  Start with 7 days free, then ₹999/month
                </p>
              </div>
            </CardContent>

            <CardFooter className="space-y-3">
              <Button
                onClick={() => setLocation('/subscription')}
                className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Start 7-Day Free Trial
              </Button>
              
              <Button
                onClick={() => setLocation('/')}
                variant="outline"
                className="w-full theme-transition"
              >
                Maybe Later
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-xs text-muted-foreground">
            Cancel anytime • Secure payment via Razorpay
          </p>
        </motion.div>
      </div>
    </div>
  );
}