import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  readTime?: string;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  image,
  date,
  author,
  readTime,
}: BlogCardProps) {
  return (
    <Link
      href={`/blogs/${slug}`}
      className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg hover:border-primary transition-all duration-300 group"
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <span>{date}</span>
          {readTime && (
            <>
              <span>•</span>
              <span>{readTime}</span>
            </>
          )}
        </div>
        <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {excerpt}
        </p>
        <div className="text-xs text-muted-foreground">By {author}</div>
      </div>
    </Link>
  );
}
