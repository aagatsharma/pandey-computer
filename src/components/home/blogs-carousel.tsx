"use client";

import { BlogCard } from "@/components/blog/blog-card";
import { IBlog } from "@/lib/models/Blog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface BlogsCarouselProps {
  blogs: IBlog[];
}

export function BlogsCarousel({ blogs }: BlogsCarouselProps) {
  return (
    <div className="relative px-2 sm:px-0">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {blogs.map((blog) => (
            <CarouselItem
              key={blog.slug}
              className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <BlogCard blog={blog} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-3 lg:-left-12 size-10 max-md:hidden" />
        <CarouselNext className="-right-3 lg:-right-12 size-10 max-md:hidden" />
      </Carousel>
    </div>
  );
}
