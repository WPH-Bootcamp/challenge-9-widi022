import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { MovieCard } from "@/components/feature/MovieCard";
import type { Movie } from "@/types/movie";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TrendingSectionProps {
  title: string;
  movies: Movie[];
}

export function TrendingSection({ title, movies }: TrendingSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -clientWidth * 0.8 : clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  if (!movies.length) return null;

  return (
    <section className="py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          {title}
        </h2>
        <div className="hidden gap-2 sm:flex">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => scroll("left")}
            className="rounded-full bg-black/50 hover:bg-black/70"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => scroll("right")}
            className="rounded-full bg-black/50 hover:bg-black/70"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={cn(
          "flex gap-4 overflow-x-auto pb-4",
          "scroll-smooth snap-x snap-mandatory",
          "[-ms-overflow-style:none] [scrollbar-width:none]",
          "[&::-webkit-scrollbar]:hidden",
        )}
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="relative w-[140px] shrink-0 snap-start sm:w-[180px] lg:w-[200px] group"
          >
            {/* Nomor Ranking */}
            <span className="container bottom-0 z-10 text-[2rem] font-black leading-none 
            text-white/90 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] lg:text-[3rem]">
              {index + 1}
            </span>
            
            <div className="ml-8 sm:ml-1 lg:ml-2">
              <MovieCard movie={movie} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
