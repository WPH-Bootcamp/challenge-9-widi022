import api from "@/lib/axios";
// import { Movie, MovieResponse } from '@/types/movie';

void api;

// TODO: Create service functions to fetch data from TMDB API
// Reference: https://developer.themoviedb.org/reference/intro/getting-started

// export const movieService = {
  // TODO: Implement getPopularMovies function
  // Endpoint: GET /movie/popular
  // TODO: Implement getNowPlayingMovies function
  // Endpoint: GET /movie/now_playing
  // TODO: Implement getMovieDetails function
  // Endpoint: GET /movie/{movie_id}
  // TODO: Implement searchMovies function
  // Endpoint: GET /search/movie
  // TODO: Add more endpoints as needed
// };

import type {
  MovieCredits,
  MovieDetails,
  MovieResponse,
  SimilarMoviesResponse,
} from "@/types/movie";

export const getPopularMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/movie/popular", {
    params: { page },
  });
  return response.data;
};

export const getNowPlayingMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/movie/now_playing", {
    params: { page },
  });
  return response.data;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const response = await api.get<MovieDetails>(`/movie/${id}`);
  return response.data;
};

export const getMovieCredits = async (id: number): Promise<MovieCredits> => {
  const response = await api.get<MovieCredits>(`/movie/${id}/credits`);
  return response.data;
};

export const getSimilarMovies = async (
  id: number,
  page = 1,
): Promise<SimilarMoviesResponse> => {
  const response = await api.get<SimilarMoviesResponse>(
    `/movie/${id}/similar`,
    {
      params: { page },
    },
  );
  return response.data;
};

export const searchMovies = async (
  query: string,
  page = 1,
): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/search/movie", {
    params: { query, page },
  });
  return response.data;
};

export const getTrendingMovies = async (
  timeWindow: "day" | "week" = "week",
): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>(
    `/trending/movie/${timeWindow}`,
  );
  return response.data;
};

export const movieService = {
  getPopularMovies,
  getNowPlayingMovies,
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
  searchMovies,
  getTrendingMovies,
};

