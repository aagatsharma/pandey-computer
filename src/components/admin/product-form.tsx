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
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { IProduct } from "@/lib/models/Product";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name cannot exceed 200 characters"),
  keyFeatures: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  originalPrice: z
    .number()
    .min(0, "Original price must be positive")
    .optional(),
  categories: z.array(z.string()).optional(),
  subCategories: z.array(z.string()).optional(),
  brand: z.string().optional(),
  subBrand: z.string().optional(),
  images: z.any().optional(),
  hotDeals: z.boolean().optional(),
  topSelling: z.boolean().optional(),
  stock: z.boolean().optional(),
  specs: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  onSubmit: (data: {
    name: string;
    keyFeatures?: string[];
    price: number;
    originalPrice?: number;
    categories?: string[];
    subCategories?: string[];
    brand?: string;
    stock?: boolean;
    subBrand?: string;
    images: string[];
    hotDeals?: boolean;
    topSelling?: boolean;
    specs?: Record<string, string>;
  }) => Promise<void>;
  onCancel: () => void;
  editData?: IProduct | null;
}

export default function ProductForm({
  onSubmit,
  onCancel,
  editData,
}: ProductFormProps) {
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
      keyFeatures: "",
      price: 0,
      originalPrice: 0,
      categories: [],
      subCategories: [],
      brand: "",
      subBrand: "",
      images: undefined,
      hotDeals: false,
      stock: false,
      topSelling: false,
      specs: "",
    },
  });

  // Watch form values for dependent filtering
  const watchedCategories = form.watch("categories");
  const watchedBrand = form.watch("brand");

  // Filter sub-categories by selected categories (compare as strings)
  const filteredSubCategories =
    watchedCategories && watchedCategories.length > 0
      ? subCategories.filter((subCat: any) =>
          watchedCategories.includes(String(subCat.category)),
        )
      : [];

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

      // Handle categories array
      const categoryIds = editData.categories
        ? editData.categories.map((cat: any) =>
            typeof cat === "object" && "_id" in cat
              ? cat._id?.toString()
              : String(cat),
          )
        : [];

      // Handle subcategories array
      const subCategoryIds = editData.subCategories
        ? editData.subCategories.map((subCat: any) =>
            typeof subCat === "object" && "_id" in subCat
              ? subCat._id?.toString()
              : String(subCat),
          )
        : [];

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
        keyFeatures: editData.keyFeatures?.join("\n") || "",
        price: editData.price,
        originalPrice: editData.originalPrice || 0,
        categories: categoryIds,
        subCategories: subCategoryIds,
        brand: brandId,
        subBrand: subBrandId,
        hotDeals: editData.hotDeals || false,
        topSelling: editData.topSelling || false,
        stock: editData.stock || false,
        specs: "",
        images: undefined,
      });
      setPreviews(editData.images || []);
    } else {
      setSpecs([{ key: "", value: "" }]);
      form.reset({
        name: "",
        keyFeatures: "",
        price: 0,
        originalPrice: 0,

        categories: [],
        subCategories: [],
        brand: "",
        subBrand: "",
        images: undefined,
        hotDeals: false,
        topSelling: false,
        stock: false,
        specs: "",
      });
      setPreviews([]);
    }
  }, [editData, form]);

  const makePrimaryImage = (index: number) => {
    setPreviews((prev) => {
      if (index === 0) return prev;

      const newPreviews = [...prev];
      const [selected] = newPreviews.splice(index, 1);
      newPreviews.unshift(selected);

      return newPreviews;
    });
  };

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

      await onSubmit({
        name: data.name,
        keyFeatures: data.keyFeatures
          ? data.keyFeatures
              .split("\n")
              .map((f) => f.trim())
              .filter((f) => f.length > 0)
          : [],
        price: data.price,
        originalPrice: data.originalPrice || undefined,
        categories:
          data.categories && data.categories.length > 0
            ? data.categories
            : undefined,
        subCategories:
          data.subCategories && data.subCategories.length > 0
            ? data.subCategories
            : undefined,
        brand: data.brand || undefined,
        subBrand: data.subBrand || undefined,
        images: imageUrls,
        hotDeals: data.hotDeals || false,
        topSelling: data.topSelling || false,
        stock: data.stock || false,
        specs: Object.keys(specsObject).length > 0 ? specsObject : undefined,
      });

      form.reset();
      setPreviews([]);
      setSpecs([{ key: "", value: "" }]);
    } catch (error) {
      console.error("Error saving product:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
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
            name="keyFeatures"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Features (One per line)</FormLabel>
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

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Categories (Select Multiple)
                    {field.value && field.value.length > 0 && (
                      <span className="ml-2 text-xs text-primary font-normal">
                        ({field.value.length} selected)
                      </span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <div className="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto bg-white">
                      {categories.length === 0 ? (
                        <p className="text-sm text-gray-500">
                          No categories available
                        </p>
                      ) : (
                        categories.map(
                          (category: { _id: string; name: string }) => (
                            <label
                              key={category._id}
                              className="flex items-center space-x-2 py-1 cursor-pointer hover:bg-gray-50 rounded px-1"
                            >
                              <input
                                type="checkbox"
                                value={category._id}
                                checked={
                                  field.value?.includes(category._id) || false
                                }
                                onChange={(e) => {
                                  const currentValues = field.value || [];
                                  let newValues;

                                  if (e.target.checked) {
                                    newValues = [
                                      ...currentValues,
                                      category._id,
                                    ];
                                  } else {
                                    newValues = currentValues.filter(
                                      (id) => id !== category._id,
                                    );

                                    // Remove subcategories that belong to this category
                                    const currentSubCategories =
                                      form.getValues("subCategories") || [];
                                    const validSubCategories =
                                      currentSubCategories.filter(
                                        (subCatId) => {
                                          const subCat = subCategories.find(
                                            (sc: any) => sc._id === subCatId,
                                          );
                                          return (
                                            subCat &&
                                            String(subCat.category) !==
                                              category._id
                                          );
                                        },
                                      );
                                    form.setValue(
                                      "subCategories",
                                      validSubCategories,
                                    );
                                  }

                                  field.onChange(newValues);
                                }}
                                className="rounded border-gray-300"
                              />
                              <span className="text-sm">{category.name}</span>
                            </label>
                          ),
                        )
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subCategories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Sub Categories (Select Multiple)
                    {field.value && field.value.length > 0 && (
                      <span className="ml-2 text-xs text-primary font-normal">
                        ({field.value.length} selected)
                      </span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <div
                      className={cn(
                        "border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto bg-white",
                        (!watchedCategories ||
                          watchedCategories.length === 0) &&
                          "bg-gray-50",
                      )}
                    >
                      {!watchedCategories || watchedCategories.length === 0 ? (
                        <p className="text-sm text-gray-500">
                          Select categories first
                        </p>
                      ) : filteredSubCategories.length === 0 ? (
                        <p className="text-sm text-gray-500">
                          No subcategories available for selected categories
                        </p>
                      ) : (
                        filteredSubCategories.map(
                          (subCat: { _id: string; name: string }) => (
                            <label
                              key={subCat._id}
                              className="flex items-center space-x-2 py-1 cursor-pointer hover:bg-gray-50 rounded px-1"
                            >
                              <input
                                type="checkbox"
                                value={subCat._id}
                                checked={
                                  field.value?.includes(subCat._id) || false
                                }
                                onChange={(e) => {
                                  const currentValues = field.value || [];
                                  if (e.target.checked) {
                                    field.onChange([
                                      ...currentValues,
                                      subCat._id,
                                    ]);
                                  } else {
                                    field.onChange(
                                      currentValues.filter(
                                        (id) => id !== subCat._id,
                                      ),
                                    );
                                  }
                                }}
                                className="rounded border-gray-300"
                              />
                              <span className="text-sm">{subCat.name}</span>
                            </label>
                          ),
                        )
                      )}
                    </div>
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
                            onClick={() => makePrimaryImage(index)}
                            className={cn(
                              "relative w-full aspect-square rounded-lg overflow-hidden border cursor-pointer",
                              index === 0
                                ? "ring-2 ring-primary"
                                : "hover:ring-2 hover:ring-gray-300",
                            )}
                          >
                            <Image
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              fill
                              sizes="(max-width: 768px) 50vw, 25vw"
                              className="object-cover"
                            />

                            {index === 0 && (
                              <div className="absolute top-1 left-1 bg-primary text-white text-xs px-2 py-0.5 rounded">
                                Primary
                              </div>
                            )}
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
            name="stock"
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
                <FormLabel className="mt-0!">In Stock</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hotDeals"
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
                <FormLabel className="mt-0!">Hot Deals</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="topSelling"
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
                <FormLabel className="mt-0!">Top Selling</FormLabel>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
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
                "Update Product"
              ) : (
                "Create Product"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
