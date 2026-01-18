"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const checkoutSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const { cart, getTotalPrice, clearCart } = useCartStore();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
        },
    });

    const onSubmit = async (data: CheckoutFormValues) => {
        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        setIsSubmitting(true);
        try {
            const orderData = {
                customerDetails: data,
                orderItems: cart.map((item) => ({
                    productId: item._id,
                    name: item.name,
                    slug: item.slug,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                })),
                totalAmount: getTotalPrice(),
            };

            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to place order");
            }

            toast.success("Order placed successfully!");
            clearCart();
            router.push("/"); // Or redirect to a success page
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container min-h-[60vh] flex flex-col items-center justify-center mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Button onClick={() => router.push("/shop")}>Continue Shopping</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Checkout Form */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" {...form.register("fullName")} />
                            {form.formState.errors.fullName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {form.formState.errors.fullName.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...form.register("email")} />
                            {form.formState.errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" {...form.register("phone")} />
                            {form.formState.errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {form.formState.errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" {...form.register("address")} />
                            {form.formState.errors.address && (
                                <p className="text-red-500 text-sm mt-1">
                                    {form.formState.errors.address.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="city">City</Label>
                            <Input id="city" {...form.register("city")} />
                            {form.formState.errors.city && (
                                <p className="text-red-500 text-sm mt-1">
                                    {form.formState.errors.city.message}
                                </p>
                            )}
                        </div>

                        <Button type="submit" className="w-full mt-6" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? "Placing Order..." : "Place Order"}
                        </Button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-muted/50 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {cart.map((item) => (
                            <div key={item._id} className="flex gap-4">
                                <div className="relative w-16 h-16 bg-white rounded border overflow-hidden shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                                    <div className="text-sm text-muted-foreground">
                                        Qty: {item.quantity} × Rs.{item.price.toLocaleString()}
                                    </div>
                                </div>
                                <div className="font-semibold text-sm">
                                    Rs.{(item.price * item.quantity).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>Rs.{getTotalPrice().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                            <span>Total</span>
                            <span>Rs.{getTotalPrice().toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
