import Link from "next/link";
import dbConnect from "@/lib/mongoose";
import Blog, { IBlog } from "@/lib/models/Blog";
import { BlogsCarousel } from "./blogs-carousel";

async function getLatestBlogs(): Promise<IBlog[]> {
  try {
    await dbConnect();

    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(10).lean();

    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function LatestBlogs() {
  const blogs = await getLatestBlogs();

  if (blogs.length === 0) {
    return null;
  }

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

      <BlogsCarousel blogs={blogs} />
    </section>
  );
}
