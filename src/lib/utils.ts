import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';


// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO: Add utility functions for image URLs
// Hint: TMDB returns relative paths, you need to construct full image URLs
// Reference: https://developer.themoviedb.org/docs/image-basics

export function getImageUrl(path: string, size: string = 'original'): string {
  // Fallback implementation to keep app compiling.
  // TMDB image basics: https://developer.themoviedb.org/docs/image-basics
  // Common base: https://image.tmdb.org/t/p/
  // Env var can override.
  const base = import.meta.env.VITE_TMDB_IMAGE_BASE_URL as
    | string
    | undefined;

  const normalizedBase = base?.replace(/\/+$/, '') ?? 'https://image.tmdb.org/t/p';
  const normalizedPath = path.replace(/^\/+/, '');

  // If caller already passes full url, just return it.
  if (/^https?:\/\//.test(path)) return path;

  return `${normalizedBase}/${size}/${normalizedPath}`;
}


// TODO: Add more utility functions as needed
// Examples: formatDate, formatRuntime, etc.
