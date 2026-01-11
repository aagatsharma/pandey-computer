"use client";

import { useRouter } from "next/navigation";
import BlogForm from "@/components/admin/blog-form";

export default function AddBlogPage() {
  const router = useRouter();

  const handleSubmit = async (data: {
    title: string;
    excerpt?: string;
    content: string;
    image?: string;
  }) => {
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create blog");

      router.push("/admin/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add Blog</h1>
        <p className="text-gray-500 mt-1">Create a new blog post</p>
      </div>
      <BlogForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/blogs")}
      />
    </div>
  );
}
