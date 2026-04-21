"use client";

import { useRouter, useParams } from "next/navigation";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher, putRequest } from "@/lib/fetcher";
import ProductForm from "@/components/admin/product-form";
import Loader from "@/components/loader";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const id = params.id as string;

  const navigateToProductsList = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/admin/products");
  };

  const handleCancel = () => {
    navigateToProductsList();
  };

  const { data, isLoading } = useSWR(`/api/products?id=${id}`, fetcher);
  const product = data?.data?.[0];

  const { trigger: updateProduct } = useSWRMutation(
    "/api/products",
    putRequest,
  );

  const handleSubmit = async (formData: {
    name: string;
    keyFeatures?: string[];
    price: number;
    originalPrice?: number;
    stock?: boolean;
    categories?: string[];
    subCategories?: string[];
    brand?: string;
    subBrand?: string;
    images: string[];
    hotDeals?: boolean;
    topSelling?: boolean;
    specs?: Record<string, string>;
  }) => {
    try {
      await updateProduct({ ...formData, id });
      navigateToProductsList();
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="text-center py-12 text-red-500">
        Error loading product
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
        onCancel={handleCancel}
      />
    </div>
  );
}
