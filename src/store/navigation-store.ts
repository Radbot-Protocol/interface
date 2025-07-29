import { create } from "zustand";

interface NavigationStore {
  activeTab: "trade" | "dashboard";
  setActiveTab: (tab: "trade" | "dashboard") => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  activeTab: "trade",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
