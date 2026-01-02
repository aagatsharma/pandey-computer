"use client";

import Link from "next/link";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogSkeleton } from "@/components/blog/blog-skeleton";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { IBlog } from "@/lib/models/Blog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const LatestBlogs = () => {
  const { data: blogsData, isLoading } = useSWR<{ data: IBlog[] }>(
    "/api/blogs?limit=10",
    fetcher
  );

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
        <div className="relative px-2 sm:px-0">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {blogsData?.data?.map((blog) => (
                <CarouselItem
                  key={blog.slug}
                  className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <BlogCard key={blog.slug} blog={blog} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 sm:-left-4 lg:-left-12 h-10 w-10" />
            <CarouselNext className="-right-2 sm:-right-4 lg:-right-12 h-10 w-10" />
          </Carousel>
        </div>
      )}
    </section>
  );
};

export default LatestBlogs;
