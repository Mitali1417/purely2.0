import api from "../api";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

// ---------- Profile APIs ----------
export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get("/profile");
  return response.data;
};

export const updateProfile = async (
  profileData: Partial<UserProfile>
): Promise<UserProfile> => {
  const response = await api.put("/profile", profileData);
  return response.data;
};

export const uploadAvatar = async (formData: FormData): Promise<UserProfile> => {
  const response = await api.post("/profile/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
