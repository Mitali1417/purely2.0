import { useCallback, useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useProfileStore } from "@/lib/store";
import { userAPI } from "@/api";
import { useDebounce } from "./useDebounce";

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { 
    profile, 
    preferences, 
    loading, 
    error,
    updateProfile: updateLocalProfile,
    updatePreferences: updateLocalPreferences,
    setLoading,
    setError,
    resetProfile: resetLocalProfile
  } = useProfileStore();

  // Fetch profile from server
  const { data: serverProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: userAPI.getProfile,
    enabled: false, // Don't auto-fetch, we'll sync from local store
  });

  // Fetch preferences from server
  const { data: serverPreferences, isLoading: isLoadingPreferences } = useQuery({
    queryKey: ["userPreferences"],
    queryFn: userAPI.getPreferences,
    enabled: false, // Don't auto-fetch, we'll sync from local store
  });

  // Sync server data with local store when available
  useEffect(() => {
    if (serverProfile && Object.keys(serverProfile).length > 0) {
      updateLocalProfile(serverProfile);
    }
  }, [serverProfile, updateLocalProfile]);

  useEffect(() => {
    if (serverPreferences && Object.keys(serverPreferences).length > 0) {
      updateLocalPreferences(serverPreferences);
    }
  }, [serverPreferences, updateLocalPreferences]);

  // Debounced profile updates
  const debouncedProfile = useDebounce(profile, 1000);
  const debouncedPreferences = useDebounce(preferences, 1000);

  // Combined mutation for profile and preferences updates
  const updateMutation = useMutation({
    mutationFn: async (data: { type: 'profile' | 'preferences'; updates: any }) => {
      if (data.type === 'profile') {
        return userAPI.updateProfile(data.updates);
      }
      return userAPI.updatePreferences(data.updates);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: [variables.type === 'profile' ? "userProfile" : "userPreferences"] 
      });
    },
  });

  // Combined debounced updates
  useEffect(() => {
    if (debouncedProfile && Object.keys(debouncedProfile).length > 0) {
      updateMutation.mutate({ type: 'profile', updates: debouncedProfile });
    }
  }, [debouncedProfile, updateMutation]);

  useEffect(() => {
    if (debouncedPreferences && Object.keys(debouncedPreferences).length > 0) {
      updateMutation.mutate({ type: 'preferences', updates: debouncedPreferences });
    }
  }, [debouncedPreferences, updateMutation]);

  // Optimized update functions
  const updateProfile = useCallback((updates: Partial<typeof profile>) => {
    updateLocalProfile(updates);
  }, [updateLocalProfile]);

  const updatePreferences = useCallback((updates: Partial<typeof preferences>) => {
    updateLocalPreferences(updates);
  }, [updateLocalPreferences]);

  const resetProfile = useCallback(() => {
    resetLocalProfile();
    updateMutation.mutate({ type: 'profile', updates: {} });
    updateMutation.mutate({ type: 'preferences', updates: {} });
  }, [resetLocalProfile, updateMutation]);

  // Computed values
  const isUpdating = updateMutation.isPending;
  const hasChanges = updateMutation.isPending;

  return {
    // State
    profile,
    preferences,
    loading: loading || isLoadingProfile || isLoadingPreferences,
    error: error || updateMutation.error,
    
    // Actions
    updateProfile,
    updatePreferences,
    resetProfile,
    
    // Status
    isUpdating,
    hasChanges,
    
    // Mutation (for direct control if needed)
    updateMutation,
  };
};
