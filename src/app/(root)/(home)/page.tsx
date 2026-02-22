import HeroSection from "@/components/home/hero-section";
// import LatestBlogs from "@/components/home/latest-blogs";
import LatestProducts from "@/components/home/latest-products";
import LatestCategories from "@/components/home/latest-categories";
import PopularBrandsSection from "@/components/home/popular-brands-section";
import ProductByCategories from "@/components/home/categories-products/product-by-categories";
import HotDeals from "@/components/home/hot-deals";
import TopSelling from "@/components/home/top-selling";

export const metadata = {
  title: "Pandey Computer - Best Computer & Gaming Store in Pokhara",
  description:
    "Pandey Computer is Pokhara's premier destination for gaming laptops, PC accessories, custom builds, and computer hardware. Best prices and expert service in Pokhara, Nepal.",
  openGraph: {
    title: "Pandey Computer - Best Computer & Gaming Store in Pokhara",
    description:
      "Pokhara's premier destination for gaming laptops, PC accessories, and custom builds.",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Pandey Computer",
    "@id": process.env.NEXT_PUBLIC_BASE_URL,
    url: process.env.NEXT_PUBLIC_BASE_URL,
    telephone: ["061-585498", "+977-9856035498"],
    email: "pandeycomputer7@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Newroad",
      addressLocality: "Pokhara",
      addressRegion: "Gandaki",
      postalCode: "33700",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.217570600000002,
      longitude: 83.98639519999999,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "20:00",
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61567056315599",
      "https://www.instagram.com/pandey.computer/",
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection />
      <HotDeals />
      <TopSelling />
      <PopularBrandsSection />
      <LatestProducts />
      <ProductByCategories />
      <LatestCategories />
      {/* <LatestBlogs /> */}
    </>
  );
}
