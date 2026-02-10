import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
}

interface WishlistState {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: (item) => {
        const { wishlist } = get();
        const existingItem = wishlist.find((i) => i._id === item._id);

        if (!existingItem) {
          set({ wishlist: [...wishlist, item] });
        }
      },
      removeFromWishlist: (id) => {
        set({ wishlist: get().wishlist.filter((item) => item._id !== id) });
      },
      clearWishlist: () => set({ wishlist: [] }),
      isInWishlist: (id) => {
        return get().wishlist.some((item) => item._id === id);
      },
      getTotalItems: () => {
        return get().wishlist.length;
      },
    }),
    {
      name: "wishlist-storage",
    },
  ),
);
