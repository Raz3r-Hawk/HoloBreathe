import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface SubscriptionStatus {
  hasSubscription: boolean;
  subscriptionEndDate?: string;
}

export const useSubscription = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/subscription-status'],
    queryFn: async (): Promise<SubscriptionStatus> => {
      try {
        const response = await apiRequest('GET', '/api/subscription-status');
        return await response.json();
      } catch (error) {
        // If user not authenticated or any error, assume no subscription
        return { hasSubscription: false };
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    hasSubscription: data?.hasSubscription ?? false,
    subscriptionEndDate: data?.subscriptionEndDate,
    isLoading,
    error
  };
};