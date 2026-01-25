export const revalidate = 86400; // 24 hours, blogs rarely change

import Image from "next/image";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongoose";
import Blog from "@/lib/models/Blog";
import { IBlog } from "@/lib/models/Blog";

async function getBlog(slug: string): Promise<IBlog | null> {
  await dbConnect();
  const blog = await Blog.findOne({ slug }).lean();
  if (!blog) return null;
  return JSON.parse(JSON.stringify(blog)) as IBlog;
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

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
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-white/90">
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 pb-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </article>
    </div>
  );
}
