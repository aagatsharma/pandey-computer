import Link from "next/link";
import { ShoppingBag, BookOpen, Tag, Grid3x3 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="w-full pt-8 md:pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="grid grid-cols-1 gap-4">
            {/* Main Banner */}
            <Link
              href="/shop"
              className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 min-h-[400px] flex flex-col justify-center items-center text-center"
            >
              <span className="text-xs font-medium text-indigo-600 mb-2">
                WELCOME TO PANDEY COMPUTER
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Your Tech Destination
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Laptops • Monitors • Accessories • Expert Service
              </p>
              <p className="text-lg font-semibold text-indigo-600">
                Explore Our Collection
              </p>
            </Link>

            {/* 2nd Banner */}
            <Link
              href="/shop"
              className="bg-rose-50 border border-rose-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 min-h-[200px] flex items-center justify-center text-center"
            >
              <div>
                <span className="text-xs font-medium text-rose-600 mb-1 block">
                  SPECIAL DEALS
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  Limited Time Offers
                </h3>
                <p className="text-xs text-gray-600">
                  Check out our latest deals and discounts
                </p>
              </div>
            </Link>
          </div>

          {/* Right Column */}
          <div className="grid grid-cols-2 gap-4">
            {/* Shop */}
            <Link
              href="/shop"
              className="bg-blue-50 border border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 min-h-60 flex flex-col justify-center items-center"
            >
              <ShoppingBag
                className="w-12 h-12 mb-3 text-blue-600"
                strokeWidth={2}
              />
              <h3 className="text-lg font-bold text-gray-900">Shop</h3>
            </Link>

            {/* Blogs */}
            <Link
              href="/blogs"
              className="bg-purple-50 border border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 min-h-60 flex flex-col justify-center items-center"
            >
              <BookOpen
                className="w-12 h-12 mb-3 text-purple-600"
                strokeWidth={2}
              />
              <h3 className="text-lg font-bold text-gray-900">Blogs</h3>
            </Link>

            {/* Brands */}
            <Link
              href="/brands"
              className="bg-orange-50 border border-orange-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 min-h-60 flex flex-col justify-center items-center"
            >
              <Tag className="w-12 h-12 mb-3 text-orange-600" strokeWidth={2} />
              <h3 className="text-lg font-bold text-gray-900">Brands</h3>
            </Link>

            {/* Categories */}
            <Link
              href="/shop"
              className="bg-green-50 border border-green-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 min-h-60 flex flex-col justify-center items-center"
            >
              <Grid3x3
                className="w-12 h-12 mb-3 text-green-600"
                strokeWidth={2}
              />
              <h3 className="text-lg font-bold text-gray-900">Categories</h3>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
