import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full pt-8 md:pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* Large Featured Box - Spans 2 columns and 2 rows */}
          <Link
            href="/shop"
            className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl group transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            <Image
              src="/home/carousel-1.jpg"
              alt="Featured"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>

          {/* Shop Box */}
          <Link
            href="/shop"
            className="relative overflow-hidden rounded-2xl group transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Image
              src="/home/carousel-2.jpg"
              alt="Shop"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Deals Box */}
          <Link
            href="/shop"
            className="relative overflow-hidden rounded-2xl group transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Image
              src="/home/carousel-1.jpg"
              alt="Deals"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Brands Box - Spans 2 columns */}
          <Link
            href="/brands"
            className="md:col-span-2 relative overflow-hidden rounded-2xl group transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Image
              src="/home/carousel-2.jpg"
              alt="Brands"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
