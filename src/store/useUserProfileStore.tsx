// src/stores/useUserProfileStore.js
import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  profile: {
    name: "",
    email: "",
    bio: "",
    avatar: "",
  },

  // Action to update profile details
  updateProfile: (updatedProfile) =>
    set((state) => ({
      profile: {
        ...state.profile,
        ...updatedProfile,
      },
    })),

  // Action to reset profile
  resetProfile: () =>
    set({
      profile: {
        name: "",
        email: "",
        bio: "",
        avatar: "",
      },
    }),
}));

export default useUserProfileStore;
