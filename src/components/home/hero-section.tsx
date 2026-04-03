import Image from "next/image";
import dbConnect from "@/lib/mongoose";
import HomeWallpaper from "@/lib/models/HomeWallpaper";
import { HeroCarousel } from "./hero-carousel";

interface IHomeWallpaper {
  _id: string;
  title: string;
  image: string;
  route: string;
  order: number;
  gridSpan?: {
    cols: number;
    rows: number;
  };
}

async function getWallpapers(): Promise<IHomeWallpaper[]> {
  try {
    await dbConnect();

    const wallpapers = await HomeWallpaper.find().sort({ order: 1 }).lean();

    return JSON.parse(JSON.stringify(wallpapers));
  } catch (error) {
    console.error("Error fetching wallpapers:", error);
    return [];
  }
}

export default async function HeroSection() {
  const wallpapers = await getWallpapers();

  if (wallpapers.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      <HeroCarousel wallpapers={wallpapers} />
    </section>
  );
}
