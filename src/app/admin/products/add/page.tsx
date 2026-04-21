"use client";

import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { sendRequest } from "@/lib/fetcher";
import ProductForm from "@/components/admin/product-form";

export default function AddProductPage() {
  const router = useRouter();

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

  const { trigger: createProduct } = useSWRMutation(
    "/api/products",
    sendRequest,
  );

  const handleSubmit = async (formData: {
    name: string;
    keyFeatures?: string[];
    price: number;
    originalPrice?: number;
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
      await createProduct(formData);
      navigateToProductsList();
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
      <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}
