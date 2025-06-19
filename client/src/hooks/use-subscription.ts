import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/hooks/useAuth';

interface SubscriptionStatus {
  hasSubscription: boolean;
  subscriptionEndDate?: string;
}

export const useSubscription = () => {
  const { isAuthenticated } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/subscription-status'],
    queryFn: async (): Promise<SubscriptionStatus> => {
      const response = await apiRequest('GET', '/api/subscription-status');
      if (!response.ok) {
        throw new Error('Failed to fetch subscription status');
      }
      return await response.json();
    },
    enabled: isAuthenticated, // Only run when authenticated
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    hasSubscription: data?.hasSubscription ?? false,
    subscriptionEndDate: data?.subscriptionEndDate,
    isLoading: isAuthenticated && isLoading,
    error
  };
};