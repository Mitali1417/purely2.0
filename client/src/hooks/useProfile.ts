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

  // Update profile on server with debouncing
  const updateProfileMutation = useMutation({
    mutationFn: userAPI.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  // Update preferences on server with debouncing
  const updatePreferencesMutation = useMutation({
    mutationFn: userAPI.updatePreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPreferences"] });
    },
  });

  // Debounced profile update
  useEffect(() => {
    if (debouncedProfile && Object.keys(debouncedProfile).length > 0) {
      updateProfileMutation.mutate(debouncedProfile);
    }
  }, [debouncedProfile, updateProfileMutation]);

  // Debounced preferences update
  useEffect(() => {
    if (debouncedPreferences && Object.keys(debouncedPreferences).length > 0) {
      updatePreferencesMutation.mutate(debouncedPreferences);
    }
  }, [debouncedPreferences, updatePreferencesMutation]);

  // Optimized update functions
  const updateProfile = useCallback((updates: Partial<typeof profile>) => {
    updateLocalProfile(updates);
  }, [updateLocalProfile]);

  const updatePreferences = useCallback((updates: Partial<typeof preferences>) => {
    updateLocalPreferences(updates);
  }, [updateLocalPreferences]);

  const resetProfile = useCallback(() => {
    resetLocalProfile();
    updateProfileMutation.mutate({});
    updatePreferencesMutation.mutate({});
  }, [resetLocalProfile, updateProfileMutation, updatePreferencesMutation]);

  // Computed values
  const isUpdating = updateProfileMutation.isPending || updatePreferencesMutation.isPending;
  const hasChanges = updateProfileMutation.isPending || updatePreferencesMutation.isPending;

  return {
    // State
    profile,
    preferences,
    loading: loading || isLoadingProfile || isLoadingPreferences,
    error: error || updateProfileMutation.error || updatePreferencesMutation.error,
    
    // Actions
    updateProfile,
    updatePreferences,
    resetProfile,
    
    // Status
    isUpdating,
    hasChanges,
    
    // Mutations (for direct control if needed)
    updateProfileMutation,
    updatePreferencesMutation,
  };
};

// Simple debounce hook
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
