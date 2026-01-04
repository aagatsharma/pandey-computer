"use client";

import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
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
import { ISubBrand } from "@/lib/models/SubBrand";
import { IBrand } from "@/lib/models/Brand";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  brand_slug: z.string().min(1, "Please select a brand"),
});

type FormValues = z.infer<typeof formSchema>;

interface SubBrandModalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    id?: string;
    name: string;
    brand_slug: string;
  }) => Promise<void>;
  editData?: ISubBrand | null;
}

type Brand = {
  _id: string;
  name: string;
  slug: string;
};

export default function SubBrandModalForm({
  open,
  onOpenChange,
  onSubmit,
  editData,
}: SubBrandModalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: brandsData } = useSWR("/api/brands", fetcher);
  const brands = brandsData?.data || [];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand_slug: "",
    },
  });

  useEffect(() => {
    if (editData) {
      const brand = editData.brand as unknown as IBrand;
      form.reset({
        name: editData.name,
        brand_slug: brand?.slug || "",
      });
    } else {
      form.reset({
        name: "",
        brand_slug: "",
      });
    }
  }, [editData, form]);

  const handleSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      await onSubmit({
        id: editData?._id?.toString(),
        name: data.name,
        brand_slug: data.brand_slug,
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving sub brand:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editData ? "Edit Sub Brand" : "Add Sub Brand"}
          </DialogTitle>
          <DialogDescription>
            {editData ? "Update sub brand details" : "Create a new sub brand"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            {/* Brand Selection */}
            <FormField
              control={form.control}
              name="brand_slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Parent Brand
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a brand</option>
                      {brands.map((brand: Brand) => (
                        <option key={brand._id} value={brand.slug}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name Input */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Sub Brand Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter sub brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4">
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
