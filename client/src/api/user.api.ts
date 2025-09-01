import api from "./index"; // your api.ts file

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: "user" | "admin";
  createdAt?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  name?: string;
  avatar?: string;
  preferences?: Record<string, any>;
}

// 🔹 User API
export const userAPI = {
  // Auth
  login: async (payload: LoginPayload): Promise<{ token: string; user: User }> => {
    const res = await api.post("/auth/login", payload);
    return res.data;
  },

  register: async (payload: RegisterPayload): Promise<{ token: string; user: User }> => {
    const res = await api.post("/auth/register", payload);
    return res.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
    localStorage.removeItem("auth_token");
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const res = await api.post("/auth/refresh");
    return res.data;
  },

  // Profile
  getProfile: async (): Promise<User> => {
    const res = await api.get("/users/me/profile");
    return res.data?.profile ?? {};
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<User> => {
    const res = await api.put("/users/me/profile", payload);
    return res.data?.profile ?? {};
  },

  // Preferences
  getPreferences: async (): Promise<any> => {
    const res = await api.get("/users/me/preferences");
    return res.data?.preferences ?? {};
  },

  updatePreferences: async (preferences: any): Promise<any> => {
    const res = await api.put("/users/me/preferences", { preferences });
    return res.data?.preferences ?? {};
  },
};
