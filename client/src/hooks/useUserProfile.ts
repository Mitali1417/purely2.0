import { userAPI } from "@/api/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store";

export const useUserProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

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

  const merged = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    ...(data || {}),
  } as any;

  return {
    profile: merged,
    isLoading,
    isError,
    updateProfile: update.mutateAsync,
    isUpdating: update.isPending,
  };
};


