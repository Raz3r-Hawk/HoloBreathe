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
      const response = await apiRequest('GET', '/api/subscription-status');
      if (!response.ok) {
        throw new Error('Failed to fetch subscription status');
      }
      return await response.json();
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