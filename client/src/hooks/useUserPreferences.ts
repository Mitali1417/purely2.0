import { userAPI } from "@/api/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useUserPreferences = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userPreferences"],
    queryFn: userAPI.getPreferences,
  });

  const update = useMutation({
    mutationFn: userAPI.updatePreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPreferences"] });
    },
  });

  return {
    preferences: data ?? {},
    isLoading,
    isError,
    updatePreferences: update.mutateAsync,
    isUpdating: update.isPending,
  };
};


