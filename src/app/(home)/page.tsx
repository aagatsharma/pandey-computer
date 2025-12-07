import HeroSection from "@/components/home/hero-section";
import LatestBlogs from "@/components/home/latest-blogs";
import PopularBrandsSection from "@/components/home/popular-brands-section";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <HeroSection />
      <PopularBrandsSection />
      <LatestBlogs />
    </div>
  );
}
