import { motion } from 'framer-motion';
import { useSubscription } from '@/hooks/use-subscription';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export function SubscriptionStatus() {
  const { hasSubscription, subscriptionEndDate, isLoading } = useSubscription();

  if (isLoading) {
    return null;
  }

  if (!hasSubscription) {
    return (
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-yellow-500/10 border-yellow-500/20">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-sm text-yellow-300">Free Trial</span>
              </div>
              <Badge variant="outline" className="text-xs border-yellow-500/30 text-yellow-300">
                Limited Access
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const endDate = subscriptionEndDate ? new Date(subscriptionEndDate) : null;
  const daysLeft = endDate ? Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-green-500/10 border-green-500/20">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-green-300">Premium Active</span>
            </div>
            <Badge variant="outline" className="text-xs border-green-500/30 text-green-300">
              {daysLeft ? `${daysLeft} days left` : 'Active'}
            </Badge>
          </div>
          {endDate && (
            <p className="text-xs text-gray-400 mt-1">
              Renews on {endDate.toLocaleDateString()}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}