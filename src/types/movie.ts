// TODO: Define TypeScript interfaces for Movie data
// Hint: Check TMDB API documentation for the movie object structure
// https://developer.themoviedb.org/reference/movie-details

export interface Movie {
  // TODO: Add movie properties based on TMDB API response
  // Examples: id, title, overview, poster_path, etc.  id: number;
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse {
  // TODO: Add pagination properties
  // Examples: page, results, total_pages, total_results
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// TODO: Add more types as needed (Genre, Video, etc.)
export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  genres: Genre[];
}

export interface MovieCredits {
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }>;
  crew: Array<{
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
  }>;
}

export type SimilarMoviesResponse = MovieResponse;
