import { create } from "zustand";

export const useLogo = create(() => ({
  isAnimating: true,
  isDone: false,
}));
