import { create } from "zustand";
import type { Recipe } from "./types";

type StudioStore = { saved: Recipe[]; save: (recipe: Recipe) => void; remove: (id: string) => void };

export const useStudioStore = create<StudioStore>((set) => ({
  saved: [],
  save: (recipe) => set((state) => ({ saved: [recipe, ...state.saved.filter((item) => item.id !== recipe.id)].slice(0, 8) })),
  remove: (id) => set((state) => ({ saved: state.saved.filter((item) => item.id !== id) })),
}));
