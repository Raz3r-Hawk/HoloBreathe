import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function SubscriptionDemo() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: "1. User Clicks Subscribe",
      description: "User selects subscription plan and clicks subscribe",
      action: "Click Subscribe Now"
    },
    {
      title: "2. Create Payment Order",
      description: "Server creates Razorpay order with amount ₹999",
      action: "Create Order"
    },
    {
      title: "3. Payment Processing",
      description: "Razorpay checkout opens, user enters payment details",
      action: "Process Payment"
    },
    {
      title: "4. Payment Verification",
      description: "Server verifies payment signature and activates subscription",
      action: "Verify Payment"
    },
    {
      title: "5. Subscription Active",
      description: "User gets full access to all breathing protocols",
      action: "Access Granted"
    }
  ];

  const handleStepDemo = async () => {
    const currentStep = steps[step - 1];
    
    toast({
      title: currentStep.title,
      description: currentStep.description,
    });

    if (step < steps.length) {
      setTimeout(() => setStep(step + 1), 2000);
    } else {
      setTimeout(() => {
        toast({
          title: "Demo Complete!",
          description: "This is how subscription validation works in the real app.",
        });
        setLocation('/subscription');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Subscription Flow Demo
          </h1>
          <p className="text-gray-300">
            See how payment validation works
          </p>
        </motion.div>

        <Card className="glass-card border-white/10 backdrop-blur-md mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-white">Payment Validation Process</CardTitle>
            <CardDescription className="text-gray-300">
              Step {step} of {steps.length}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {steps.map((stepItem, index) => (
              <motion.div
                key={index}
                className={`p-3 rounded-lg border ${
                  index + 1 === step 
                    ? 'bg-cyan-500/20 border-cyan-500/30' 
                    : index + 1 < step 
                    ? 'bg-green-500/20 border-green-500/30'
                    : 'bg-gray-500/10 border-gray-500/20'
                }`}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: index + 1 <= step ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-semibold ${
                      index + 1 === step ? 'text-cyan-300' : 
                      index + 1 < step ? 'text-green-300' : 'text-gray-400'
                    }`}>
                      {stepItem.title}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">
                      {stepItem.description}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {index + 1 < step && (
                      <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
                        ✓
                      </Badge>
                    )}
                    {index + 1 === step && (
                      <Badge variant="outline" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                        →
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button
            onClick={handleStepDemo}
            disabled={step > steps.length}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
          >
            {step <= steps.length ? steps[step - 1].action : "Demo Complete"}
          </Button>

          <Button
            onClick={() => setLocation('/subscription')}
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Try Real Subscription
          </Button>

          <Button
            onClick={() => setLocation('/')}
            variant="ghost"
            className="w-full text-gray-400 hover:text-white"
          >
            Back to Home
          </Button>
        </div>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-blue-300 font-semibold mb-2">How Validation Works:</h3>
          <ul className="text-sm text-blue-200 space-y-1">
            <li>• Payment signature verified server-side</li>
            <li>• Subscription status stored in session</li>
            <li>• User redirected to protocol selection</li>
            <li>• Full access granted immediately</li>
            <li>• Session persists until browser restart</li>
          </ul>
        </div>
      </div>
    </div>
  );
}