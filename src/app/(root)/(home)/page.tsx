import HeroSection from "@/components/home/hero-section";
import LatestBlogs from "@/components/home/latest-blogs";
import LatestProducts from "@/components/home/latest-products";
import LatestCategories from "@/components/home/latest-categories";
import PopularBrandsSection from "@/components/home/popular-brands-section";
import FeaturedCategories from "@/components/home/featured-categories";
import ProductByCategories from "@/components/home/categories-products/product-by-categories";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PopularBrandsSection />
      <LatestCategories />
      <FeaturedCategories />
      <LatestProducts />
      <ProductByCategories />
      <LatestBlogs />
    </>
  );
}
