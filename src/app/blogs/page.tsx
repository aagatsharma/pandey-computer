"use client";

import { BlogCard } from "@/components/blog/blog-card";
import { BlogSkeleton } from "@/components/blog/blog-skeleton";
import useSWR from "swr";
import { IBlog } from "@/lib/models/Blog";
import { fetcher } from "@/lib/fetcher";

export default function BlogsPage() {
  const { data: blogsData, isLoading } = useSWR<{ data: IBlog[] }>(
    "/api/blogs?limit=10",
    fetcher
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Stay updated with the latest tech news, guides, and insights from
            our experts
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Blogs Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </div>
        ) : blogsData && blogsData?.data?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogsData?.data?.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No articles found matching your criteria
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
