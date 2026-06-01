import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingSection } from "@/components/section/TrendingSection";
import {
  useNowPlayingMovies,
  usePopularMovies,
  useSearchMovies,
  useTrendingMovies,
} from "@/hooks/useMovies";
import type { Movie } from "@/types/movie";

import { MovieGrid } from "@/components/feature/MovieGrid";
import { SearchBar } from "@/components/feature/SearchBar";
import { FilterSection } from "@/components/feature/FilterSection";

import { HeroSection } from "@/components/section/heroSection";

import { useMovieStore } from "@/store/movieStore";

const Home = () => {
  const [category, setCategory] = useState<
    "popular" | "now_playing" | "favorites"
  >("popular");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: popularData,
    isLoading: popularLoading,
    isError: popularError,
  } = usePopularMovies();
  const {
    data: nowPlayingData,
    isLoading: nowPlayingLoading,
    isError: nowPlayingError,
  } = useNowPlayingMovies();
  
  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchError,
  } = useSearchMovies(searchQuery);
  
  const favorites = useMovieStore((s) => s.favorites);
  
  const allMovies =[
    ...(popularData?.results??[]),
    ...(nowPlayingData?.results??[]),
    ...(searchData?.results??[])
  ];
  
  const movies: Movie[] =
  searchQuery.trim().length > 0
  ? (searchData?.results ?? [])
  : category === "now_playing"
  ? (nowPlayingData?.results ?? [])
  : category === "favorites"
  ? allMovies.filter((m)=> 
    favorites.includes(m.id))
  : (popularData?.results ?? []);
  
  const loading =
  searchQuery.trim().length > 0
  ? searchLoading
  : category === "now_playing"
  ? nowPlayingLoading
  : popularLoading;
  const error =
  searchQuery.trim().length > 0
  ? searchError
  : category === "now_playing"
  ? nowPlayingError
  : popularError;
  
  const featuredMovie = (popularData?.results?.[0] ??
    nowPlayingData?.results?.[0] ??
    searchData?.results?.[0] ??
    null) as Movie | null;
    
    const {data: trendingData } = useTrendingMovies();
    
    return (
      <motion.div
      className="mx-auto w-full max-w-6xl px-4 py-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      >
      <HeroSection featuredMovie={featuredMovie} />

      <TrendingSection title="Trending Now" movies={trendingData?.results?? []}/>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="w-full sm:max-w-xl">
          <SearchBar
            value={searchQuery}
            onChange={(q) => {
              setSearchQuery(q);
              if (q.trim().length > 0) setCategory("popular");
            }}
          />
        </div>
        <div className="w-full sm:max-w-xs">
          <FilterSection
            value={{ query: "", sortBy: "popular", minRating: undefined }}
            onChange={() => {}}
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-4 text-sm text-red-200">
          Failed to load movies. Please try again.
        </div>
      ) : null}

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="animate-pulse rounded-lg bg-slate-800">
              <div className="aspect-[2/3] w-full" />
              <div className="h-4 w-3/4 bg-slate-700" />
            </div>
          ))}
        </div>
      ) : (
        <MovieGrid movies={movies} />
      )}
      {category === "favorites" && movies.length === 0 && !loading && (
        <div className="py-20 text-center text-muted-foreground">
          Belum ada film favorit woy 😅 Klik ❤️ di card buat nambahin
        </div>
      )}


      <MovieGrid movies={movies}/>
    </motion.div>
  );
};

export default Home;
