import { create } from "zustand";

export const useLoader = create(() => ({
  showLoader: true,
  isDone: false,
}))