"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-background" />;
    }

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
                <div className="bg-accent/50 p-6 rounded-full mb-6">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
                <p className="text-muted-foreground mb-8 text-center max-w-md">
                    Looks like you haven't added anything to your cart yet.
                    Browse our products and find something you love!
                </p>
                <Link href="/shop">
                    <Button size="lg" className="gap-2">
                        Continue Shopping
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Shopping Cart ({cart.length} items)</h1>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-8 space-y-4">
                    {cart.map((item) => (
                        <div
                            key={item._id}
                            className="flex gap-4 p-4 bg-card border rounded-lg shadow-sm"
                        >
                            {/* Product Image */}
                            <div className="relative h-24 w-24 flex-shrink-0 bg-white rounded-md overflow-hidden border">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between gap-4">
                                    <div>
                                        <Link
                                            href={`/product/${item.slug}`}
                                            className="font-medium hover:text-primary transition-colors line-clamp-2"
                                        >
                                            {item.name}
                                        </Link>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Unit Price: Rs. {item.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    {/* Quantity Controls */}
                                    <div className="flex items-center border rounded-md">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="p-2 hover:bg-accent transition-colors disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </button>
                                        <span className="w-10 text-center text-sm font-medium">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="p-2 hover:bg-accent transition-colors disabled:opacity-50"
                                            disabled={item.maxQuantity ? item.quantity >= item.maxQuantity : false}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </button>
                                    </div>

                                    {/* Item Total */}
                                    <div className="font-bold">
                                        Rs. {(item.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-4">
                    <div className="bg-card border rounded-lg p-6 shadow-sm sticky top-24">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">Rs. {getTotalPrice().toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="text-muted-foreground text-xs">(Calculated at checkout)</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>Rs. {getTotalPrice().toLocaleString()}</span>
                            </div>
                        </div>

                        <Button
                            className="w-full mt-6"
                            size="lg"
                            onClick={() => router.push("/checkout")}
                        >
                            Proceed to Checkout
                        </Button>

                        <div className="mt-4 text-xs text-center text-muted-foreground">
                            Secure Checkout - SSL Encrypted
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
