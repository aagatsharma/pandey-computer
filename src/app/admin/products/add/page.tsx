"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/admin/product-form";

export default function AddProductPage() {
  const router = useRouter();

  const handleSubmit = async (formData: {
    name: string;
    keyFeatures?: string[];
    price: number;
    originalPrice?: number;
    quantity?: number;
    category?: string;
    subCategory?: string;
    brand?: string;
    subBrand?: string;
    images: string[];
    isFeatured: boolean;
    hotDeals?: boolean;
    topSelling?: boolean;
    specs?: Record<string, string>;
    features?: string[];
  }) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create product");

      router.push("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add Product</h1>
        <p className="text-gray-500 mt-1">Create a new product</p>
      </div>
      <ProductForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/products")}
      />
    </div>
  );
}
