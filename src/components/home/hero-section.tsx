import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HeroSection = () => {
  return (
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
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center px-4 max-w-5xl">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
                    Pokhara&apos;s Premier Gaming Paradise
                  </h1>
                  <p className="text-xl md:text-2xl lg:text-3xl text-white/90 drop-shadow-lg mb-8">
                    Where Gamers Level Up Their Experience
                  </p>
                  <button className="bg-white text-black font-bold px-8 py-4 rounded-full text-lg md:text-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl">
                    Shop Now
                  </button>
                </div>
              </div>
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
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center px-4 max-w-5xl">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
                    Elevate Your Setup with Premium PC Gear
                  </h1>
                  <p className="text-xl md:text-2xl lg:text-3xl text-white/90 drop-shadow-lg mb-8">
                    Authentic Brands | Expert Guidance | Unmatched Quality
                  </p>
                  <button className="bg-white text-black font-bold px-8 py-4 rounded-full text-lg md:text-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
};

export default HeroSection;
