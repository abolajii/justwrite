// src/stores/useAuthStore.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: !false,
  user: null,

  // Login action
  login: (user) => set({ isAuthenticated: true, user }),

  // Logout action
  logout: () => set({ isAuthenticated: false, user: null }),

  // Check if user is logged in
  isLoggedIn: () => set((state) => state.isAuthenticated),
}));

export default useAuthStore;
