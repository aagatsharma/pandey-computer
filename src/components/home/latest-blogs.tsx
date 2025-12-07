"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogSkeleton } from "@/components/blog/blog-skeleton";

// Mock data for blogs
const mockBlogs = [
  {
    id: "1",
    slug: "top-10-gaming-laptops-2025",
    title: "Top 10 Gaming Laptops in 2025",
    excerpt:
      "Discover the best gaming laptops that offer incredible performance and value for money.",
    image: "/brands/acer.png",
    date: "December 5, 2025",
    author: "John Doe",
  },
  {
    id: "2",
    slug: "best-pc-building-tips-beginners",
    title: "Best PC Building Tips for Beginners",
    excerpt:
      "Learn essential tips and tricks for building your first custom PC with confidence.",
    image: "/brands/acer.png",
    date: "December 3, 2025",
    author: "Jane Smith",
  },
  {
    id: "3",
    slug: "graphics-card-buying-guide-2025",
    title: "Graphics Card Buying Guide 2025",
    excerpt:
      "Everything you need to know before purchasing your next graphics card.",
    image: "/brands/acer.png",
    date: "December 1, 2025",
    author: "Mike Johnson",
  },
  {
    id: "4",
    slug: "rgb-setup-ideas-gaming-desk",
    title: "RGB Setup Ideas for Your Gaming Desk",
    excerpt:
      "Transform your gaming setup with these creative RGB lighting ideas and accessories.",
    image: "/brands/acer.png",
    date: "November 28, 2025",
    author: "Sarah Williams",
  },
];

const LatestBlogs = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="container mx-auto my-20 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Latest Blogs
        </h2>
        <Link
          href="/blogs"
          className="text-sm sm:text-base font-medium text-primary hover:opacity-80 transition-opacity"
        >
          View All →
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <BlogSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              slug={blog.slug}
              title={blog.title}
              excerpt={blog.excerpt}
              image={blog.image}
              date={blog.date}
              author={blog.author}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestBlogs;
