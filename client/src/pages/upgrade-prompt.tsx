import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { HolographicCube } from '@/components/holographic-cube';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function UpgradePrompt() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md mx-auto">
        {/* Completion Animation */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 20px rgba(0,255,255,0.5)',
                '0 0 40px rgba(255,20,147,0.8)',
                '0 0 20px rgba(138,43,226,0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-4 gradient-text">Trial Complete!</h2>
          <p className="text-gray-300 mb-2">You've experienced your first breathing session.</p>
          <p className="text-sm text-gray-400">Ready to unlock the full potential?</p>
        </motion.div>

        {/* Upgrade Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Card className="glass-card border-white/10 backdrop-blur-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-3">
                <HolographicCube size="md" />
              </div>
              <CardTitle className="text-2xl text-white mb-2">
                Unlock Premium Access
              </CardTitle>
              <CardDescription className="text-gray-300">
                Continue your breathing journey with full access
              </CardDescription>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <span className="text-3xl font-bold text-cyan-400">₹999</span>
                <span className="text-gray-400">/month</span>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 ml-2">
                  7-day trial
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-300 font-semibold mb-3">What you'll get:</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">All 6+ breathing protocols</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span className="text-gray-300">Advanced breathing patterns</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">Unlimited sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Session tracking & progress</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Premium ambient sounds</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20">
                <p className="text-sm text-center text-cyan-300 font-semibold mb-1">
                  Limited Time Offer
                </p>
                <p className="text-xs text-center text-gray-300">
                  Start with 7 days free, then ₹999/month
                </p>
              </div>
            </CardContent>

            <CardFooter className="space-y-3">
              <Button
                onClick={() => setLocation('/subscription')}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Start 7-Day Free Trial
              </Button>
              
              <Button
                onClick={() => setLocation('/')}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
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
          <p className="text-xs text-gray-500">
            Cancel anytime • Secure payment via Razorpay
          </p>
        </motion.div>
      </div>
    </div>
  );
}