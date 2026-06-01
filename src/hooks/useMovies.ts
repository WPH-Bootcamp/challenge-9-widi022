// import { useQuery } from '@tanstack/react-query';
// import { movieService } from '@/services/movieService';

// TODO: Create custom hooks using React Query
// Reference: https://tanstack.com/query/latest/docs/framework/react/overview

// Example: Hook to fetch popular movies


// TODO: Add more hooks for different endpoints
// Examples: useMovieDetails, useSearchMovies, useNowPlayingMovies


import { useQuery } from "@tanstack/react-query";

import { movieService } from "@/services/movieService";

export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: ["movies", "popular", page] as const,
    queryFn: () => movieService.getPopularMovies(page),
  });
};

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ["movies","trending"],
    queryFn: () => movieService.getTrendingMovies("week"),
  });
};

export const useNowPlayingMovies = (page = 1) => {
  return useQuery({
    queryKey: ["movies", "now_playing", page] as const,
    queryFn: () => movieService.getNowPlayingMovies(page),
  });
};

export const useMovieDetails = (id: number | null) => {
  return useQuery({
    queryKey: ["movie", "details", id] as const,
    queryFn: () => {
      if (!id) throw new Error("Movie id is missing");
      return movieService.getMovieDetails(id);
    },
    enabled: !!id,
  });
};

export const useMovieCredits = (id: number | null) => {
  return useQuery({
    queryKey: ["movie", "credits", id] as const,
    queryFn: () => {
      if (!id) throw new Error("Movie id is missing");
      return movieService.getMovieCredits(id);
    },
    enabled: !!id,
  });
};

export const useSimilarMovies = (id: number | null, page = 1) => {
  return useQuery({
    queryKey: ["movie", "similar", id, page] as const,
    queryFn: () => {
      if (!id) throw new Error("Movie id is missing");
      return movieService.getSimilarMovies(id, page);
    },
    enabled: !!id,
  });
};


export const useSearchMovies = (query: string, page = 1) => {
  const trimmed = query.trim();
  return useQuery({
    queryKey: ["movies", "search", trimmed, page] as const,
    queryFn: () => movieService.searchMovies(trimmed, page),
    enabled: trimmed.length > 0,
  });
};
