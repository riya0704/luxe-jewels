import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/data/products";

type WishlistStore = {
  items: Product[];
  toggle: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) =>
        set((state) => ({
          items: state.items.find((i) => i.id === product.id)
            ? state.items.filter((i) => i.id !== product.id)
            : [...state.items, product],
        })),
      isWishlisted: (productId) =>
        get().items.some((i) => i.id === productId),
    }),
    { name: "luxe-wishlist" }
  )
);
