"use client";

import { Upload, X, Loader2 } from "lucide-react";
import { useState } from "react";
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
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  logo: z
    .any()
    .refine((file) => file instanceof File, "Please upload a logo image"),
});

type FormValues = z.infer<typeof formSchema>;

interface AdminFormProps {
  title: string;
  description: string;
  fieldLabel: string;
  fieldPlaceholder: string;
  onSubmit: (data: { name: string; logo: string }) => Promise<void>;
  isSubmitting: boolean;
}

export default function AdminForm({
  title,
  description,
  fieldLabel,
  fieldPlaceholder,
  onSubmit,
  isSubmitting,
}: AdminFormProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logo: undefined,
    },
  });

  const handleSubmit = async (data: FormValues) => {
    try {
      const imageUrl = await imageToBase64(data.logo);
      await onSubmit({ name: data.name, logo: imageUrl });
      form.reset();
      setPreview(null);
    } catch (error) {
      console.error(`Error creating ${title.toLowerCase()}:`, error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      {/* Form Card */}
      <Card>
        <CardContent className="pt-6">
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
                    <FormLabel className="text-sm font-medium">Logo</FormLabel>
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
                              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors"
                            >
                              <Upload className="w-10 h-10 text-gray-400 mb-2" />
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
                              size="icon-sm"
                              onClick={() => {
                                onChange(undefined);
                                setPreview(null);
                              }}
                              className="absolute top-2 right-2"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            <div className="flex items-center justify-center">
                              <Image
                                height={150}
                                width={150}
                                src={preview}
                                alt="Preview"
                                className="h-32 w-32 object-cover rounded"
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
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
