import { BlogCard } from "@/components/blog/blog-card";
import { IBlog } from "@/lib/models/Blog";
import dbConnect from "@/lib/mongoose";
import Blog from "@/lib/models/Blog";

export const metadata = {
  title: "Tech Blogs & News",
  description:
    "Stay updated with the latest tech news, guides, and insights from our experts. Read about gaming laptops, PC builds, hardware reviews and more.",
  openGraph: {
    title: "Tech Blogs & News | Pandey Computer",
    description:
      "Stay updated with the latest tech news, guides, and insights from our experts.",
  },
};

async function getBlogs(): Promise<IBlog[]> {
  try {
    await dbConnect();
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(20).lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

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

      {/* Blogs Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogs.map((blog) => (
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
