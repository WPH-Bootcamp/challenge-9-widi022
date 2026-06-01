import { motion } from "framer-motion";
import { Heart } from "lucide-react"; 
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, getImageUrl } from "@/lib/utils";
import { useMovieStore } from "@/store/movieStore"; 

export type MovieMinimal = {
  id: string | number;
  title?: string;
  overview?: string;
  poster_path?: string | null;
  vote_average?: number | null;
};

export interface MovieCardProps {
  movie: MovieMinimal;
  className?: string;
  imageClassName?: string;
  onOpen?: (movie: MovieMinimal) => void;
}

const posterFallback =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="750">
    <rect width="100%" height="100%" fill="#111827"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9CA3AF" font-family="Arial" font-size="18">No Image</text>
  </svg>`);

function getPosterSrc(posterPath?: string | null) {
  if (!posterPath) return posterFallback;
  if (posterPath.startsWith("http")) return posterPath;
  return getImageUrl(posterPath, "w500");
}

export function MovieCard({
  movie,
  className,
  imageClassName,
  onOpen,
}: MovieCardProps) {
 
  const { toggleFavorite, isFavorite } = useMovieStore();
  const favorite = isFavorite(Number(movie.id)); 

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn("h-full group", className)}
    >
      <Card className="h-full overflow-hidden bg-card/60 backdrop-blur relative">
        <button
          type="button"
          className="w-full text-left"
          onClick={() => onOpen?.(movie)}
          aria-label={movie.title ? `Open ${movie.title}` : "Open movie"}
        >
          <div className="relative overflow-hidden">
            <img
              src={getPosterSrc(movie.poster_path)}
              alt={movie.title ?? "Movie poster"}
              className={cn(
                "h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105",
                imageClassName,
              )}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/90 to-transparent" />
          </div>

          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <CardTitle className="line-clamp-1 text-base">
                  {movie.title ?? "Untitled"}
                </CardTitle>
                {typeof movie.vote_average === "number" ? (
                  <CardDescription className="mt-1">
                    <Badge variant="secondary">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </Badge>
                  </CardDescription>
                ) : (
                  <CardDescription className="mt-1 text-muted-foreground">
                    &nbsp;
                  </CardDescription>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {movie.overview ?? ""}
            </p>
          </CardContent>
        </button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(Number(movie.id));
          }}
          className="absolute right-2 top-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
        >
          <Heart
            className={`h-5 w-5 ${favorite ? "fill-red-500 text-red-500" : "text-white"}`}
          />
          <span className="sr-only">Toggle favorite</span>
        </Button>
      </Card>
    </motion.div>
  );
}
