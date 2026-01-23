// import mongoose connection and Blog model here (to be implemented)
import { IBlog } from "@/lib/models/Blog";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getItemDetails(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getItemDetails(slug);

  if (!data) {
    notFound();
  }

  const blog: IBlog = data.data;

  return (
    <div className="min-h-screen bg-background">
      <article>
        {/* Featured Image - Full Width with Title Overlay */}
        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
          {blog.image && (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          )}
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Title Overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-white/90">
                <span>{blog.createdAt.toString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 pb-12">
          {/* Article Body */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </article>
    </div>
  );
}
