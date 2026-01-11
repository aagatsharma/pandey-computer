"use client";

import { Upload, X, Loader2 } from "lucide-react";
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

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  logo: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AdminModalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  fieldLabel: string;
  fieldPlaceholder: string;
  onSubmit: (data: {
    id?: string;
    name: string;
    logo: string;
  }) => Promise<void>;
}

export default function AdminModalForm({
  open,
  onOpenChange,
  title,
  description,
  fieldLabel,
  fieldPlaceholder,
  onSubmit,
  editData,
}: AdminModalFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logo: undefined,
    },
  });

  useEffect(() => {
    if (editData) {
      form.reset({
        name: editData.name,
        logo: undefined,
      });
      setPreview(editData.logo || null);
    } else {
      form.reset({
        name: "",
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
        id: editData?._id.toString(),
        name: data.name,
        logo: imageUrl || "",
      });
      form.reset();
      setPreview(null);
      onOpenChange(false);
    } catch (error) {
      console.error(`Error saving ${title.toLowerCase()}:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            {/* Name Input */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    {fieldLabel}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={fieldPlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormField
              control={form.control}
              name="logo"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Logo {editData && "(Leave empty to keep current)"}
                  </FormLabel>
                  <FormControl>
                    <div>
                      {!preview ? (
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                onChange(file);
                                setPreview(URL.createObjectURL(file));
                              }
                            }}
                            className="hidden"
                            id="file-upload"
                            {...field}
                          />
                          <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors"
                          >
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 mb-1">
                              Click to upload
                            </p>
                            <p className="text-xs text-gray-400">
                              PNG, JPG, WEBP
                            </p>
                          </label>
                        </div>
                      ) : (
                        <div className="relative border border-gray-200 rounded-lg p-3 bg-white">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              onChange(undefined);
                              setPreview(null);
                            }}
                            className="absolute top-2 right-2 z-10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <div className="relative w-full h-32">
                            <Image
                              src={preview}
                              alt="Preview"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>
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
