import HeroSection from "@/components/home/hero-section";
import LatestBlogs from "@/components/home/latest-blogs";
import LatestProducts from "@/components/home/latest-products";
import LatestCategories from "@/components/home/latest-categories";
import PopularBrandsSection from "@/components/home/popular-brands-section";
import FeaturedCategories from "@/components/home/featured-categories";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <HeroSection />
      <PopularBrandsSection />
      <LatestCategories />
      <FeaturedCategories />
      <LatestProducts />
      <LatestBlogs />
    </div>
  );
}
