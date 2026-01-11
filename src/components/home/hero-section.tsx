import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/lib/mongoose";
import HomeWallpaper from "@/lib/models/HomeWallpaper";

interface IHomeWallpaper {
  _id: string;
  title: string;
  image: string;
  route: string;
  order: number;
  isActive: boolean;
  gridSpan?: {
    cols: number;
    rows: number;
  };
}

async function getWallpapers(): Promise<IHomeWallpaper[]> {
  try {
    await dbConnect();

    const wallpapers = await HomeWallpaper.find({ isActive: true })
      .sort({ order: 1 })
      .lean();

    return JSON.parse(JSON.stringify(wallpapers));
  } catch (error) {
    console.error("Error fetching wallpapers:", error);
    return [];
  }
}

export default async function HeroSection() {
  const wallpapers = await getWallpapers();

  if (wallpapers.length === 0) {
    return (
      <section className="w-full py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {/* Fallback content */}
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
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {wallpapers.map((wallpaper, index) => {
            const cols = wallpaper.gridSpan?.cols || 1;
            const rows = wallpaper.gridSpan?.rows || 1;

            return (
              <Link
                key={wallpaper._id}
                href={wallpaper.route}
                className={`relative overflow-hidden rounded-2xl group transition-all duration-300 shadow-lg hover:shadow-xl ${
                  cols === 2 ? "md:col-span-2" : ""
                } ${rows === 2 ? "md:row-span-2" : ""}`}
              >
                <Image
                  src={wallpaper.image}
                  alt={wallpaper.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={index === 0}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
