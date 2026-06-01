import { create } from "zustand";
import { persist } from "zustand/middleware";


   export type MovieId = number;


    interface MovieStore {
      favorites: MovieId[];

      addFavorite: (id: MovieId) => void;
      removeFavorite: (id: MovieId) => void;
      toggleFavorite: (id: MovieId) => void;
      isFavorite: (id: MovieId) => boolean;
      clearFavorites: () => void;
    }

    export const useMovieStore = create<MovieStore>()(
      persist(
        (set, get) => ({
          favorites: [],

          addFavorite: (id) => {
            const current = get().favorites;
            if (current.includes(id)) return;
            set({ favorites: [...current, id] });
          },

          removeFavorite: (id) => {
            set({ favorites: get().favorites.filter((x) => x !== id) });
          },

          toggleFavorite: (id) => {
            const current = get().favorites;
            if (current.includes(id)) {
              set({ favorites: current.filter((x) => x !== id) });
            } else {
              set({ favorites: [...current, id] });
            }
          },

          isFavorite: (id) => {
            return get().favorites.includes(id);
          },

          clearFavorites: () => set({ favorites: [] }),
        }),
        {
          name: "movie-favorites",
          version: 1,
          partialize: (state) => ({ favorites: state.favorites }),
        },
      ),
    );
