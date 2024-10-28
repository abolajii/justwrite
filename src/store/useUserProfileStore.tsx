// src/stores/useUserProfileStore.js
import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  profile: {
    name: "",
    email: "",
    username: "",
    profilePic: "",
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
        username: "",
        profilePic: "",
      },
    }),
}));

export default useUserProfileStore;
