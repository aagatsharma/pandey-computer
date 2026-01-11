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
import { ICategory } from "@/lib/models/Category";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  logo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CategoryModalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    id?: string;
    name: string;
    logo: string;
  }) => Promise<void>;
  editData?: ICategory | null;
}

export default function CategoryModalForm({
  open,
  onOpenChange,
  onSubmit,
  editData,
}: CategoryModalFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageInputType, setImageInputType] = useState<"url" | "upload">("url");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logo: "",
    },
  });

  useEffect(() => {
    if (editData) {
      form.reset({
        name: editData.name,
        logo: editData.logo || "",
      });
      setPreview(editData.logo || null);
      setImageInputType(editData.logo?.startsWith("data:") ? "upload" : "url");
    } else {
      form.reset({
        name: "",
        logo: "",
      });
      setPreview(null);
      setImageInputType("url");
    }
  }, [editData, form]);

  const handleSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      let imageUrl = data.logo || "";

      // If upload type and there's a file selected, it's already base64 in the form
      if (
        imageInputType === "upload" &&
        preview &&
        preview.startsWith("data:")
      ) {
        imageUrl = preview;
      }

      await onSubmit({
        id: editData?._id?.toString(),
        name: data.name,
        logo: imageUrl,
      });
      form.reset();
      setPreview(null);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editData ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <DialogDescription>
            {editData ? "Update category details" : "Create a new category"}
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
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Logo {editData && "(Leave empty to keep current)"}
                  </FormLabel>
                  <div className="flex gap-2 mb-2">
                    <Button
                      type="button"
                      size="sm"
                      variant={imageInputType === "url" ? "default" : "outline"}
                      onClick={() => {
                        setImageInputType("url");
                        setPreview(null);
                        field.onChange("");
                      }}
                    >
                      URL
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={
                        imageInputType === "upload" ? "default" : "outline"
                      }
                      onClick={() => {
                        setImageInputType("upload");
                        setPreview(null);
                        field.onChange("");
                      }}
                    >
                      Upload
                    </Button>
                  </div>
                  <FormControl>
                    <div className="space-y-3">
                      {imageInputType === "url" ? (
                        <Input
                          placeholder="Enter image URL"
                          value={field.value || ""}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setPreview(e.target.value || null);
                          }}
                        />
                      ) : (
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const base64 = await imageToBase64(file);
                              setPreview(base64);
                              field.onChange(base64);
                            }
                          }}
                        />
                      )}
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
                              field.onChange("");
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
