import { motion } from 'framer-motion';
import { useSubscription } from '@/hooks/use-subscription';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export function SubscriptionStatus() {
  const { isAuthenticated } = useAuth();
  const { hasSubscription, subscriptionEndDate, isLoading, error } = useSubscription();

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Always show Premium Member status for authenticated users
  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-green-500/10 dark:bg-green-500/10 border-green-500/30 dark:border-green-500/20 theme-transition">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"></div>
              <span className="text-sm text-green-700 dark:text-green-300 font-medium">Premium Member</span>
            </div>
            <Badge variant="outline" className="text-xs border-green-500/40 dark:border-green-500/30 text-green-700 dark:text-green-300">
              Premium
            </Badge>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            Active until 19/07/2025
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}