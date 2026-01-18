import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    _id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    quantity: number;
    maxQuantity?: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (item) => {
                const { cart } = get();
                const existingItem = cart.find((i) => i._id === item._id);

                if (existingItem) {
                    set({
                        cart: cart.map((i) =>
                            i._id === item._id
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i
                        ),
                    });
                } else {
                    set({ cart: [...cart, item] });
                }
            },
            removeFromCart: (id) => {
                set({ cart: get().cart.filter((item) => item._id !== id) });
            },
            updateQuantity: (id, quantity) => {
                const { cart } = get();
                if (quantity <= 0) {
                    set({ cart: cart.filter((item) => item._id !== id) });
                } else {
                    set({
                        cart: cart.map((item) =>
                            item._id === id ? { ...item, quantity } : item
                        ),
                    });
                }
            },
            clearCart: () => set({ cart: [] }),
            getTotalItems: () => {
                return get().cart.reduce((total, item) => total + item.quantity, 0);
            },
            getTotalPrice: () => {
                return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
