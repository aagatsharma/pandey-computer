"use client";

import { useState, useEffect } from "react";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogSkeleton } from "@/components/blog/blog-skeleton";

// Mock data for blogs
const mockBlogs = [
  {
    id: "1",
    slug: "top-10-gaming-laptops-2025",
    title: "Top 10 Gaming Laptops in 2025",
    excerpt:
      "Discover the best gaming laptops that offer incredible performance and value for money. We've tested dozens of models to bring you this comprehensive guide.",
    image: "/brands/acer.png",
    date: "December 5, 2025",
    author: "John Doe",
    readTime: "5 min read",
  },
  {
    id: "2",
    slug: "best-pc-building-tips-beginners",
    title: "Best PC Building Tips for Beginners",
    excerpt:
      "Learn essential tips and tricks for building your first custom PC with confidence. From choosing components to cable management.",
    image: "/brands/acer.png",
    date: "December 3, 2025",
    author: "Jane Smith",
    readTime: "8 min read",
  },
  {
    id: "3",
    slug: "graphics-card-buying-guide-2025",
    title: "Graphics Card Buying Guide 2025",
    excerpt:
      "Everything you need to know before purchasing your next graphics card. Compare specs, prices, and performance benchmarks.",
    image: "/brands/acer.png",
    date: "December 1, 2025",
    author: "Mike Johnson",
    readTime: "6 min read",
  },
  {
    id: "4",
    slug: "rgb-setup-ideas-gaming-desk",
    title: "RGB Setup Ideas for Your Gaming Desk",
    excerpt:
      "Transform your gaming setup with these creative RGB lighting ideas and accessories. Create an immersive gaming environment.",
    image: "/brands/acer.png",
    date: "November 28, 2025",
    author: "Sarah Williams",
    readTime: "4 min read",
  },
  {
    id: "5",
    slug: "ultimate-guide-mechanical-keyboards",
    title: "Ultimate Guide to Mechanical Keyboards",
    excerpt:
      "Explore different switch types, keycap materials, and find the perfect mechanical keyboard for your typing style and gaming needs.",
    image: "/brands/acer.png",
    date: "November 25, 2025",
    author: "David Brown",
    readTime: "7 min read",
  },
  {
    id: "6",
    slug: "monitor-selection-guide",
    title: "Monitor Selection: What You Need to Know",
    excerpt:
      "Understanding refresh rates, response times, and panel types to choose the perfect monitor for gaming or productivity.",
    image: "/brands/acer.png",
    date: "November 22, 2025",
    author: "Emily Davis",
    readTime: "6 min read",
  },
  {
    id: "7",
    slug: "cable-management-tips-clean-setups",
    title: "Cable Management Tips for Clean Setups",
    excerpt:
      "Professional cable management techniques to keep your PC setup organized and aesthetically pleasing. Step-by-step guide included.",
    image: "/brands/acer.png",
    date: "November 20, 2025",
    author: "John Doe",
    readTime: "5 min read",
  },
  {
    id: "8",
    slug: "best-gaming-headsets-under-100",
    title: "Best Gaming Headsets Under $100",
    excerpt:
      "Quality gaming audio doesn't have to break the bank. Check out our top picks for budget-friendly gaming headsets.",
    image: "/brands/acer.png",
    date: "November 18, 2025",
    author: "Jane Smith",
    readTime: "5 min read",
  },
  {
    id: "9",
    slug: "water-cooling-vs-air-cooling",
    title: "Water Cooling vs Air Cooling: Which is Better?",
    excerpt:
      "Compare the pros and cons of water cooling and air cooling systems. Learn which cooling solution is right for your build.",
    image: "/brands/acer.png",
    date: "November 15, 2025",
    author: "Mike Johnson",
    readTime: "7 min read",
  },
];

export default function BlogsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredBlogs = mockBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

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
        <div className="flex flex-col gap-6 mb-8">
          {/* Search Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="w-full sm:w-96">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="text-sm text-muted-foreground whitespace-nowrap">
              {filteredBlogs.length} article
              {filteredBlogs.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                slug={blog.slug}
                title={blog.title}
                excerpt={blog.excerpt}
                image={blog.image}
                date={blog.date}
                author={blog.author}
                readTime={blog.readTime}
              />
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
