import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* Hero Section with Carousel */}
      <section className="w-full">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            <CarouselItem>
              <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
                <Image
                  src="/home/carousel-1.jpg"
                  alt="Hero Image 1"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
                <Image
                  src="/home/carousel-2.jpg"
                  alt="Hero Image 2"
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>
    </div>
  );
}
