"use client";

import { useRouter, useParams } from "next/navigation";
import { use } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import ProductForm from "@/components/admin/product-form";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const id = params.id as string;

  const { data, isLoading } = useSWR(`/api/products?id=${id}`, fetcher);
  const product = data?.data?.[0];

  const handleSubmit = async (formData: {
    name: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    originalPrice?: number;
    quantity?: number;
    category?: string;
    subCategory?: string;
    brand?: string;
    subBrand?: string;
    images: string[];
    isFeatured: boolean;
    specs?: Record<string, string>;
    features?: string[];
  }) => {
    try {
      const response = await fetch(`/api/products`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, id }),
      });

      if (!response.ok) throw new Error("Failed to update product");

      router.push("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Product not found</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <p className="text-gray-500 mt-1">Update product details</p>
      </div>
      <ProductForm
        editData={product}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/products")}
      />
    </div>
  );
}
