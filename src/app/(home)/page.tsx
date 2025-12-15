import HeroSection from "@/components/home/hero-section";
import LatestBlogs from "@/components/home/latest-blogs";
import LatestProducts from "@/components/home/latest-products";
import LatestCategories from "@/components/home/latest-categories";
import PopularBrandsSection from "@/components/home/popular-brands-section";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <HeroSection />
      <PopularBrandsSection />
      <LatestCategories />
      <LatestProducts />
      <LatestBlogs />
    </div>
  );
}
