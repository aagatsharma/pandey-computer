"use client";

import { X, Loader2 } from "lucide-react";
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
import { IBrand } from "@/lib/models/Brand";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  superCategoryId: z.string().optional(),
  logo: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BrandModalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    id?: string;
    name: string;
    logo: string;
    superCategoryId?: string;
  }) => Promise<void>;
  editData?: IBrand | null;
}

export default function BrandModalForm({
  open,
  onOpenChange,
  onSubmit,
  editData,
}: BrandModalFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: superCategoriesData } = useSWR("/api/supercategory", fetcher);
  const superCategories = superCategoriesData?.data || [];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      superCategoryId: "",
      logo: undefined,
    },
  });

  useEffect(() => {
    if (editData) {
      form.reset({
        name: editData.name,
        superCategoryId: editData.superCategory?.toString() || "",
        logo: undefined,
      });
      setPreview(editData.logo || null);
    } else {
      form.reset({
        name: "",
        superCategoryId: "",
        logo: undefined,
      });
      setPreview(null);
    }
  }, [editData, form]);

  const handleSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      let imageUrl = preview;

      if (data.logo instanceof File) {
        imageUrl = await imageToBase64(data.logo);
      }

      await onSubmit({
        id: editData?._id?.toString(),
        name: data.name,
        logo: imageUrl || "",
        superCategoryId: data.superCategoryId || undefined,
      });
      form.reset();
      setPreview(null);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving brand:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editData ? "Edit Brand" : "Add Brand"}</DialogTitle>
          <DialogDescription>
            {editData ? "Update brand details" : "Create a new brand"}
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
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="superCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Super Category (Optional)</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    >
                      <option value="">Select super category</option>
                      {superCategories.map(
                        (sc: { _id: string; name: string }) => (
                          <option key={sc._id} value={sc._id}>
                            {sc.name}
                          </option>
                        )
                      )}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>
                    Logo {editData && "(Leave empty to keep current)"}
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPreview(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        {...field}
                      />
                      {preview && (
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
                          <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPreview(null);
                              onChange(undefined);
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
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
