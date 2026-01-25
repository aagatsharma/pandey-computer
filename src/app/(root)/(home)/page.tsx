import HeroSection from "@/components/home/hero-section";
import LatestBlogs from "@/components/home/latest-blogs";
import LatestProducts from "@/components/home/latest-products";
import LatestCategories from "@/components/home/latest-categories";
import PopularBrandsSection from "@/components/home/popular-brands-section";
import ProductByCategories from "@/components/home/categories-products/product-by-categories";
import HotDeals from "@/components/home/hot-deals";
import TopSelling from "@/components/home/top-selling";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <HeroSection />
      <HotDeals />
      <TopSelling />
      <PopularBrandsSection />
      <LatestProducts />
      <ProductByCategories />
      <LatestCategories />
      <LatestBlogs />
    </>
  );
}
