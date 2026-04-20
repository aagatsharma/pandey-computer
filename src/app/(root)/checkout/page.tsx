"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { sendRequest } from "@/lib/fetcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { districtData } from "@/lib/district-data";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  province: z.string().min(1, "Province is required"),
  district: z.string().min(1, "District is required"),
  street: z.string().min(3, "Street must be at least 3 characters"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trigger: placeOrder } = useSWRMutation("/api/orders", sendRequest);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      province: "",
      district: "",
      street: "",
    },
  });

  const selectedProvince = form.watch("province");
  const selectedProvinceData = districtData.find(
    (item) => item.province === selectedProvince,
  );

  const onSubmit = async (data: CheckoutFormValues) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        customerDetails: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          province: data.province,
          district: data.district,
          street: data.street,
          // Keep legacy fields for older admin views/documents.
          address: data.street,
          city: data.district,
        },
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

      await placeOrder(orderData);
      toast.success("Order placed successfully!");
      clearCart();
      router.push("/");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
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
              <Label htmlFor="province">Province</Label>
              <Select
                value={form.watch("province")}
                onValueChange={(value) => {
                  form.setValue("province", value, { shouldValidate: true });
                  form.setValue("district", "", { shouldValidate: true });
                }}
              >
                <SelectTrigger id="province">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {districtData.map((item) => (
                    <SelectItem key={item.province} value={item.province}>
                      {item.province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.province && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.province.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="district">District</Label>
              <Select
                value={form.watch("district")}
                onValueChange={(value) => {
                  form.setValue("district", value, { shouldValidate: true });
                }}
                disabled={!selectedProvinceData}
              >
                <SelectTrigger id="district">
                  <SelectValue
                    placeholder={
                      selectedProvinceData
                        ? "Select district"
                        : "Select province first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {selectedProvinceData?.districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.district && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.district.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="street">Street</Label>
              <Input id="street" {...form.register("street")} />
              {form.formState.errors.street && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.street.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-6"
              size="lg"
              disabled={isSubmitting}
            >
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
                  <h3 className="font-medium text-sm line-clamp-2">
                    {item.name}
                  </h3>
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
