import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data for blogs
const mockBlogs = [
  {
    id: "1",
    slug: "top-10-gaming-laptops-2025",
    title: "Top 10 Gaming Laptops in 2025",
    excerpt:
      "Discover the best gaming laptops that offer incredible performance and value for money.",
    content: `
      <p>Gaming laptops have come a long way in 2025. Here's our comprehensive guide to the best gaming laptops you can buy right now.</p>
      
      <h2>What to Look for in a Gaming Laptop</h2>
      <p>When shopping for a gaming laptop, there are several key factors to consider:</p>
      <ul>
        <li>GPU Performance - The most important factor for gaming</li>
        <li>Display Quality - Look for high refresh rates and good color accuracy</li>
        <li>CPU Power - Ensures smooth gameplay and multitasking</li>
        <li>Cooling System - Prevents thermal throttling</li>
        <li>Build Quality - Durability matters for portability</li>
      </ul>

      <h2>Top 10 Gaming Laptops</h2>
      <p>We've tested dozens of gaming laptops to bring you this definitive list of the best options available in 2025.</p>
    `,
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
      "Learn essential tips and tricks for building your first custom PC with confidence.",
    content: `
      <p>Building your first PC can be intimidating, but with the right guidance, it's easier than you think.</p>
      
      <h2>Essential Tools You'll Need</h2>
      <p>Before you start, make sure you have these tools ready:</p>
      <ul>
        <li>Phillips head screwdriver</li>
        <li>Anti-static wrist strap</li>
        <li>Cable ties</li>
        <li>Thermal paste (usually comes with CPU cooler)</li>
      </ul>

      <h2>Step-by-Step Building Process</h2>
      <p>Follow these steps for a successful build...</p>
    `,
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
      "Everything you need to know before purchasing your next graphics card.",
    content: `
      <p>Choosing the right graphics card is crucial for gaming performance. This guide will help you make an informed decision.</p>
      
      <h2>Understanding GPU Specifications</h2>
      <p>Learn what all those numbers and specs actually mean for your gaming experience.</p>
    `,
    image: "/brands/acer.png",
    date: "December 1, 2025",
    author: "Mike Johnson",
    readTime: "6 min read",
  },
];

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = mockBlogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <article>
        {/* Featured Image - Full Width with Title Overlay */}
        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Title Overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-white/90">
                <span>{blog.date}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
                <span>•</span>
                <span>By {blog.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 pb-12">
          {/* Back Link */}
          {/* <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            ← Back to all articles
          </Link> */}

          {/* Article Body */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return mockBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}
