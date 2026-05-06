import { create } from "zustand";

export const useDashboardStore = create((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));