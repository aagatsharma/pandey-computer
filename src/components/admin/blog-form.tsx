"use client";

import { Loader2, Upload } from "lucide-react";
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
import { IBlog } from "@/lib/models/Blog";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

const formSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title cannot exceed 200 characters"),
  excerpt: z
    .string()
    .max(500, "Excerpt cannot exceed 500 characters")
    .optional(),
  content: z.string().min(20, "Content must be at least 20 characters"),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BlogFormProps {
  onSubmit: (data: {
    title: string;
    excerpt?: string;
    content: string;
    image?: string;
  }) => Promise<void>;
  onCancel: () => void;
  editData?: IBlog | null;
}

export default function BlogForm({
  onSubmit,
  onCancel,
  editData,
}: BlogFormProps) {
  const [preview, setPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageInputType, setImageInputType] = useState<"url" | "upload">("url");
  const [contentHtml, setContentHtml] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      image: undefined,
    },
  });

  useEffect(() => {
    if (editData) {
      form.reset({
        title: editData.title,
        excerpt: editData.excerpt || "",
        content: editData.content,
        image: undefined,
      });
      setPreview(editData.image || "");
      setContentHtml(editData.content || "");
    } else {
      form.reset({
        title: "",
        excerpt: "",
        content: "",
        image: undefined,
      });
      setPreview("");
      setContentHtml("");
    }
  }, [editData, form]);

  const handleSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      let imageUrl = preview;

      if (imageInputType === "upload" && data.image) {
        imageUrl = await imageToBase64(data.image as File);
      }

      await onSubmit({
        title: data.title,
        excerpt: data.excerpt || undefined,
        content: contentHtml,
        image: imageUrl || undefined,
      });

      form.reset();
      setPreview("");
      setContentHtml("");
    } catch (error) {
      console.error("Error saving blog:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    const base64 = await imageToBase64(file);
    setPreview(base64);
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter blog title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Brief summary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              <RichTextEditor
                content={contentHtml}
                onChange={setContentHtml}
                placeholder="Write your blog content here..."
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>Image (Optional)</FormLabel>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={imageInputType === "url" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImageInputType("url")}
                >
                  URL
                </Button>
                <Button
                  type="button"
                  variant={imageInputType === "upload" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImageInputType("upload")}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>

              {imageInputType === "url" ? (
                <Input
                  type="text"
                  placeholder="Enter image URL"
                  value={preview}
                  onChange={(e) => setPreview(e.target.value)}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, ...field } }) => (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                          handleImageUpload(file);
                        }
                      }}
                      {...field}
                      value={undefined}
                    />
                  )}
                />
              )}

              {preview && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </FormItem>

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
                "Update Blog"
              ) : (
                "Create Blog"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
