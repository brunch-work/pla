import { create } from "zustand";

export const useLogo = create(() => ({
  animate: true,
  isDone: false,
}));
