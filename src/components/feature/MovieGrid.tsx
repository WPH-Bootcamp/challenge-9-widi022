
import { motion } from "framer-motion";

import { MovieCard, type MovieMinimal } from "@/components/feature/MovieCard";

export interface MovieGridProps {
  movies: MovieMinimal[];
  className?: string;
  onOpen?: (movie: MovieMinimal) => void;
  // onFavoriteToggle?: (movie: MovieMinimal) => void;
  // favoriteIds?: Array<string | number>;
}

export function MovieGrid({
  movies,
  className,
  onOpen,
  // onFavoriteToggle,
  // favoriteIds = [],
}: MovieGridProps) {
  // const favoriteSet = React.useMemo(() => new Set(favoriteIds), [favoriteIds]);

  return (
    <motion.div
      layout
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie, idx) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(idx * 0.03, 0.6) }}
          >
            <MovieCard
              movie={movie}
              onOpen={onOpen}
              // onFavoriteToggle={onFavoriteToggle}
              // isFavorite={favoriteSet.has(movie.id)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
