"use client";

import { useRouter, useParams } from "next/navigation";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher, putRequest } from "@/lib/fetcher";
import BlogForm from "@/components/admin/blog-form";
import Loader from "@/components/loader";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams() as { slug: string };
  const slug = params.slug;

  const { data, isLoading } = useSWR(`/api/blogs/${slug}`, fetcher);
  const blog = data?.data;

  const { trigger: updateBlog } = useSWRMutation(
    `/api/blogs/${slug}`,
    putRequest,
  );

  const handleSubmit = async (formData: {
    title: string;
    excerpt?: string;
    content: string;
    image?: string;
  }) => {
    try {
      await updateBlog(formData);
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Blog not found</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Blog</h1>
        <p className="text-gray-500 mt-1">Update blog post</p>
      </div>
      <BlogForm
        editData={blog}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/blogs")}
      />
    </div>
  );
}
