"use client";

import { create } from "zustand";

interface ScreenSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

interface ScreenSizeStore extends ScreenSize {
  updateScreenSize: () => void;
}

const useScreenSizeStore = create<ScreenSizeStore>((set) => ({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  width: typeof window !== "undefined" ? window.innerWidth : 1920,
  updateScreenSize: () => {
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    set({
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      width,
    });
  },
}));

// Initialize screen size listener
if (typeof window !== "undefined") {
  // Initial update
  useScreenSizeStore.getState().updateScreenSize();

  // Add resize listener
  window.addEventListener("resize", () => {
    useScreenSizeStore.getState().updateScreenSize();
  });
}

export default useScreenSizeStore;
