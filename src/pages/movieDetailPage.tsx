import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  useMovieCredits,
  useMovieDetails,
  useSimilarMovies,
} from "@/hooks/useMovies";
import { useMovieStore } from "@/store/movieStore";
import { MovieGrid } from "@/components/feature/MovieGrid";
import { Button } from "@/components/ui/button";
import type { Movie } from "@/types/movie";

function MovieDetail() {
  const params = useParams();
  const id = params.id;

  const movieId = useMemo(() => {
    if (!id) return null;
    const n = Number(id);
    return Number.isFinite(n) ? n : null;
  }, [id]);

  const {
    data: details,
    isLoading: detailsLoading,
    isError: detailsError,
  } = useMovieDetails(movieId);

  const {
    data: credits,
    isLoading: creditsLoading,
    isError: creditsError,
  } = useMovieCredits(movieId);

  const {
    data: similar,
    isLoading: similarLoading,
    isError: similarError,
  } = useSimilarMovies(movieId);

  const toggleFavorite = useMovieStore((s) => s.toggleFavorite);
  const isFavorite = useMovieStore((s) =>
    movieId ? s.isFavorite(movieId) : false,
  );

  const posterUrl = details?.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : null;

  const backdropUrl = details?.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
    : null;

  const similarMovies: Movie[] = similar?.results ?? [];

  return (
    <motion.div
      className="mx-auto w-full max-w-6xl px-4 py-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/"
          className="text-sm text-slate-300 underline underline-offset-4 hover:text-red-400"
        >
          ← Back to home
        </Link>

        <Button
          type="button"
          variant={"secondary"}
          onClick={() => movieId && toggleFavorite(movieId)}
          className="gap-2 bg-red-500/95 text-white hover:bg-red-500 hover:text-white disabled:bg-slate-800"
          disabled={!movieId}
        >
          <span aria-hidden>❤</span>
          {isFavorite ? "Remove" : "Add"} to favorites
        </Button>
      </div>

      {detailsError || creditsError || similarError ? (
        <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-4 text-sm text-red-200">
          Failed to load movie details.
        </div>
      ) : null}

      {detailsLoading ? (
        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-6">
          <div className="h-10 w-48 animate-pulse rounded bg-slate-800" />
          <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-800" />
          <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-800" />
        </div>
      ) : details ? (
        <div className="relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900/40">
          {backdropUrl ? (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url(${backdropUrl})`,
                backgroundSize: "cover",
              }}
              aria-hidden
            />
          ) : null}

          <div className="relative grid grid-cols-1 gap-6 p-6 md:grid-cols-[220px_1fr]">
            <motion.div
              className="w-full md:w-[220px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={details.title}
                  className="aspect-[2/3] w-full rounded object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="aspect-[2/3] w-full rounded bg-slate-800" />
              )}
            </motion.div>

            <div>
              <motion.h1
                className="text-2xl font-semibold text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {details.title}
              </motion.h1>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                <span className="rounded bg-slate-800 px-3 py-1">
                  ⭐ {details.vote_average.toFixed(1)}
                </span>
                <span className="rounded bg-slate-800 px-3 py-1">
                  {details.release_date || "N/A"}
                </span>
                {details.runtime ? (
                  <span className="rounded bg-slate-800 px-3 py-1">
                    {details.runtime} min
                  </span>
                ) : null}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {details.overview || "No overview available."}
              </p>

              {details.genres?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {details.genres.map((g) => (
                    <span
                      key={g.id}
                      className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <motion.section
        className="mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
      >
        <h2 className="mb-3 text-lg font-semibold text-white">Cast & Crew</h2>

        {movieId && creditsLoading ? (
          <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
            <div className="h-4 w-56 animate-pulse rounded bg-slate-800" />
            <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-800" />
          </div>
        ) : credits ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">Cast</h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                {credits.cast.slice(0, 6).map((c) => (
                  <li key={c.id} className="flex flex-col">
                    <span className="font-medium text-white">{c.name}</span>
                    <span className="text-xs text-slate-400">
                      {c.character}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-200">Crew</h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                {credits.crew.slice(0, 6).map((c) => (
                  <li key={c.id} className="flex flex-col">
                    <span className="font-medium text-white">{c.name}</span>
                    <span className="text-xs text-slate-400">{c.job}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </motion.section>

      {/* movies serupa */}
      <motion.section
        className="mt-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.08 }}
      >
        <h2 className="mb-3 text-lg font-semibold text-white">
          Similar Movies
        </h2>

        {similarLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="animate-pulse rounded-lg bg-slate-800">
                <div className="aspect-[2/3] w-full" />
                <div className="h-4 w-3/4 bg-slate-700" />
              </div>
            ))}
          </div>
        ) : (
          <MovieGrid
            movies={similarMovies}
         
          />
        )}
      </motion.section>
    </motion.div>
  );
}

export default MovieDetail;
