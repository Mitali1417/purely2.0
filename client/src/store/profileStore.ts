import { create } from "zustand";
import { persist } from "zustand/middleware";

type Profile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
};

type ProfileStore = {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
    }),
    { name: "profile-storage", version: 1 }
  )
);
