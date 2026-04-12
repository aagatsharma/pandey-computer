"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface HeroWallpaper {
  _id: string;
  title: string;
  image: string;
  route: string;
}

interface HeroCarouselProps {
  wallpapers: HeroWallpaper[];
}

const AUTO_SCROLL_DELAY_MS = 5000;
const TRANSITION_DURATION_MS = 700;

export function HeroCarousel({ wallpapers }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const totalSlides = wallpapers.length;

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  };

  useEffect(() => {
    if (totalSlides <= 1 || !isPlaying) {
      return;
    }

    let rafId = 0;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const nextProgress = Math.min(
        (elapsed / AUTO_SCROLL_DELAY_MS) * 100,
        100,
      );
      setProgress(nextProgress);

      if (elapsed >= AUTO_SCROLL_DELAY_MS) {
        setActiveIndex((prev) => (prev + 1) % totalSlides);
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [activeIndex, isPlaying, totalSlides]);

  if (totalSlides === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative w-full h-65 sm:h-75 md:h-90 lg:h-105">
        {wallpapers.map((wallpaper, index) => (
          <Image
            key={wallpaper._id}
            src={wallpaper.image}
            alt={wallpaper.title || "Hero wallpaper"}
            fill
            style={{ transitionDuration: `${TRANSITION_DURATION_MS}ms` }}
            className={`absolute h-full w-full object-cover object-center
              ${index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"}`}
            sizes="100vw"
            priority={index === 0}
            aria-hidden={index !== activeIndex}
          />
        ))}
      </div>

      {totalSlides > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white backdrop-blur-sm transition hover:bg-black/60"
            aria-label="Previous wallpaper"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white backdrop-blur-sm transition hover:bg-black/60"
            aria-label="Next wallpaper"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/45 px-3 py-2 text-white backdrop-blur-sm">
            <div className="flex items-center gap-1.5">
              {wallpapers.map((wallpaper, index) => (
                <button
                  key={wallpaper._id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    setProgress(0);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`relative h-2 overflow-hidden rounded-full transition-all ${
                    index === activeIndex
                      ? "w-10 bg-white/35"
                      : "w-2 bg-white/50"
                  }`}
                >
                  {index === activeIndex && (
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-white"
                      style={{ width: `${isPlaying ? progress : 0}%` }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
              className="grid h-6 w-6 place-items-center rounded-full border border-white/50 bg-white/10 transition hover:bg-white/20"
            >
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5" />
              ) : (
                <Play className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
