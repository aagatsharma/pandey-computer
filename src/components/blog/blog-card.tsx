import { IBlog } from "@/lib/models/Blog";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";

export function BlogCard({ blog }: { blog: IBlog }) {
  const { slug, title, excerpt, image } = blog;
  return (
    <Link href={`/blogs/${slug}`}>
      <Card className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg hover:border-primary transition-all duration-300 group py-0 gap-0">
        {image && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {excerpt}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
