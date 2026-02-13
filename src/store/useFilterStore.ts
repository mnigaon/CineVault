import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterState {
    genreId: number | null;
    year: number | null;
    rating: number | null;
    sortBy: string;
    setGenreId: (id: number | null) => void;
    setYear: (year: number | null) => void;
    setRating: (rating: number | null) => void;
    setSortBy: (sort: string) => void;
    resetMap: () => void;
}

export const useFilterStore = create<FilterState>()(
    persist(
        (set) => ({
            genreId: null,
            year: null,
            rating: null,
            sortBy: 'popularity.desc',
            setGenreId: (id) => set({ genreId: id }),
            setYear: (year) => set({ year }),
            setRating: (rating) => set({ rating }),
            setSortBy: (sortBy) => set({ sortBy }),
            resetMap: () => set({ genreId: null, year: null, rating: null, sortBy: 'popularity.desc' }),
        }),
        {
            name: 'movie-filters',
        }
    )
);
