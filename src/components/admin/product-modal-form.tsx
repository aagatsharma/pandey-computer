/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { imageToBase64 } from "@/lib/image-base64";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { IProduct } from "@/lib/models/Product";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name cannot exceed 200 characters"),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(500, "Short description cannot exceed 500 characters"),
  fullDescription: z
    .string()
    .min(20, "Full description must be at least 20 characters"),
  price: z.number().min(0, "Price must be positive"),
  originalPrice: z
    .number()
    .min(0, "Original price must be positive")
    .optional(),
  quantity: z.number().min(0, "Quantity must be positive").optional(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  brand: z.string().optional(),
  subBrand: z.string().optional(),
  images: z.any().optional(),
  isFeatured: z.boolean().optional(),
  specs: z.string().optional(),
  features: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProductModalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    id?: string;
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
  }) => Promise<void>;
  editData?: IProduct | null;
}

export default function ProductModalForm({
  open,
  onOpenChange,
  onSubmit,
  editData,
}: ProductModalFormProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([
    { key: "", value: "" },
  ]);

  const { data: filterData } = useSWR("/api/products/filters", fetcher);

  const categories = filterData?.data?.categories || [];
  const subCategories = filterData?.data?.subCategories || [];
  const brands = filterData?.data?.brands || [];
  const subBrands = filterData?.data?.subBrands || [];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      fullDescription: "",
      price: 0,
      originalPrice: 0,
      quantity: 0,
      category: "",
      subCategory: "",
      brand: "",
      subBrand: "",
      images: undefined,
      isFeatured: false,
      specs: "",
      features: "",
    },
  });

  // Watch form values for dependent filtering
  const watchedCategory = form.watch("category");
  const watchedBrand = form.watch("brand");

  // Filter sub-categories by selected category
  const filteredSubCategories = watchedCategory
    ? subCategories.filter((subCat: any) => subCat.category === watchedCategory)
    : subCategories;

  // Filter sub-brands by selected brand
  const filteredSubBrands = watchedBrand
    ? subBrands.filter((subBrand: any) => subBrand.brand === watchedBrand)
    : subBrands;

  useEffect(() => {
    if (editData) {
      const specsArray = editData.specs
        ? Object.entries(editData.specs).map(([key, value]) => ({
            key,
            value,
          }))
        : [{ key: "", value: "" }];
      const featuresString = editData.features?.join("\n") || "";

      const categoryId =
        editData.category &&
        typeof editData.category === "object" &&
        "_id" in editData.category
          ? (editData.category as any)._id?.toString()
          : editData.category
            ? String(editData.category)
            : "";

      const subCategoryId =
        editData.subCategory &&
        typeof editData.subCategory === "object" &&
        "_id" in editData.subCategory
          ? (editData.subCategory as any)._id?.toString()
          : editData.subCategory
            ? String(editData.subCategory)
            : "";

      const brandId =
        editData.brand &&
        typeof editData.brand === "object" &&
        "_id" in editData.brand
          ? (editData.brand as any)._id?.toString()
          : editData.brand
            ? String(editData.brand)
            : "";

      const subBrandId =
        editData.subBrand &&
        typeof editData.subBrand === "object" &&
        "_id" in editData.subBrand
          ? (editData.subBrand as any)._id?.toString()
          : editData.subBrand
            ? String(editData.subBrand)
            : "";

      setSpecs(specsArray);
      form.reset({
        name: editData.name,
        shortDescription: editData.shortDescription,
        fullDescription: editData.fullDescription,
        price: editData.price,
        originalPrice: editData.originalPrice || 0,
        quantity: editData.quantity || 0,
        category: categoryId,
        subCategory: subCategoryId,
        brand: brandId,
        subBrand: subBrandId,
        isFeatured: editData.isFeatured || false,
        specs: "",
        features: featuresString,
        images: undefined,
      });
      setPreviews(editData.images || []);
    } else {
      setSpecs([{ key: "", value: "" }]);
      form.reset({
        name: "",
        shortDescription: "",
        fullDescription: "",
        price: 0,
        originalPrice: 0,
        quantity: 0,

        category: "",
        subCategory: "",
        brand: "",
        subBrand: "",
        images: undefined,
        isFeatured: false,
        specs: "",
        features: "",
      });
      setPreviews([]);
    }
  }, [editData, form]);

  const handleSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      let imageUrls = previews;

      if (data.images && data.images.length > 0) {
        const uploadPromises = Array.from(data.images as FileList).map(
          (file: File) => imageToBase64(file),
        );
        imageUrls = await Promise.all(uploadPromises);
      }

      // Parse specs from the state array
      const specsObject: Record<string, string> = {};
      specs.forEach((spec) => {
        if (spec.key && spec.value) {
          specsObject[spec.key.trim()] = spec.value.trim();
        }
      });

      // Parse features from string (one per line)
      const features = data.features
        ? data.features
            .split("\n")
            .map((f) => f.trim())
            .filter((f) => f.length > 0)
        : [];

      await onSubmit({
        id: editData?._id?.toString(),
        name: data.name,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        price: data.price,
        originalPrice: data.originalPrice || undefined,
        quantity: data.quantity || 0,
        category: data.category || undefined,
        subCategory: data.subCategory || undefined,
        brand: data.brand || undefined,
        subBrand: data.subBrand || undefined,
        images: imageUrls,
        isFeatured: data.isFeatured || false,
        specs: Object.keys(specsObject).length > 0 ? specsObject : undefined,
        features: features.length > 0 ? features : undefined,
      });

      form.reset();
      setPreviews([]);
      setSpecs([{ key: "", value: "" }]);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            {editData ? "Update product details" : "Create a new product"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief product summary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Complete product description"
                      className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        {...form.register("price", {
                          setValueAs: (value: string) => parseFloat(value),
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="originalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Original Price (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        {...form.register("originalPrice", {
                          setValueAs: (value: string) => parseFloat(value),
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      {...form.register("quantity", {
                        setValueAs: (value: string) => parseFloat(value),
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          // Auto-clear sub-category when category changes
                          if (e.target.value !== field.value) {
                            form.setValue("subCategory", "");
                          }
                        }}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      >
                        <option value="">Select category</option>
                        {categories.map(
                          (category: { _id: string; name: string }) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ),
                        )}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Category</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={!watchedCategory}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">
                          {watchedCategory
                            ? "Select sub category"
                            : "Select category first"}
                        </option>
                        {filteredSubCategories.map(
                          (subCat: { _id: string; name: string }) => (
                            <option key={subCat._id} value={subCat._id}>
                              {subCat.name}
                            </option>
                          ),
                        )}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          // Auto-clear sub-brand when brand changes
                          if (e.target.value !== field.value) {
                            form.setValue("subBrand", "");
                          }
                        }}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      >
                        <option value="">Select brand</option>
                        {brands.map((brand: { _id: string; name: string }) => (
                          <option key={brand._id} value={brand._id}>
                            {brand.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subBrand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Brand</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={!watchedBrand}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">
                          {watchedBrand
                            ? "Select sub brand"
                            : "Select brand first"}
                        </option>
                        {filteredSubBrands.map(
                          (subBrand: { _id: string; name: string }) => (
                            <option key={subBrand._id} value={subBrand._id}>
                              {subBrand.name}
                            </option>
                          ),
                        )}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3">
              <FormLabel>Specifications</FormLabel>
              {specs.map((spec, index) => (
                <div key={index} className="grid grid-cols-12 gap-2">
                  <Input
                    placeholder="Key (e.g., Processor)"
                    value={spec.key}
                    onChange={(e) => {
                      const newSpecs = [...specs];
                      newSpecs[index].key = e.target.value;
                      setSpecs(newSpecs);
                    }}
                    className="col-span-5"
                  />
                  <Input
                    placeholder="Value (e.g., Intel i7)"
                    value={spec.value}
                    onChange={(e) => {
                      const newSpecs = [...specs];
                      newSpecs[index].value = e.target.value;
                      setSpecs(newSpecs);
                    }}
                    className="col-span-5"
                  />
                  <div className="col-span-2 flex gap-2">
                    {specs.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newSpecs = specs.filter((_, i) => i !== index);
                          setSpecs(newSpecs);
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                    {index === specs.length - 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSpecs([...specs, { key: "", value: "" }]);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features (One per line)</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Fast processing&#10;Large storage&#10;High quality display"
                      className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>
                    Images {editData && "(Leave empty to keep current)"}
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            onChange(files);
                            const newPreviews: string[] = [];
                            Array.from(files).forEach((file) => {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                newPreviews.push(reader.result as string);
                                if (newPreviews.length === files.length) {
                                  setPreviews(newPreviews);
                                }
                              };
                              reader.readAsDataURL(file);
                            });
                          }
                        }}
                        {...field}
                        value={undefined}
                      />
                      {previews.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                          {previews.map((preview, index) => (
                            <div
                              key={index}
                              className="relative w-full h-24 rounded-lg overflow-hidden border"
                            >
                              <Image
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4"
                    />
                  </FormControl>
                  <FormLabel className="mt-0!">Featured Product</FormLabel>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {editData ? "Updating..." : "Creating..."}
                  </>
                ) : editData ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
