import { userAPI } from "@/api/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUserProfile = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: userAPI.getProfile,
  });

  const update = useMutation({
    mutationFn: userAPI.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  return {
    profile: data ?? {},
    isLoading,
    isError,
    updateProfile: update.mutateAsync,
    isUpdating: update.isPending,
  };
};


