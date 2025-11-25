import { create } from "zustand";

interface AppState {
  activeUserId?: string;
  setActiveUserId: (userId?: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeUserId: undefined,
  setActiveUserId: (userId) => set({ activeUserId: userId }),
}));
