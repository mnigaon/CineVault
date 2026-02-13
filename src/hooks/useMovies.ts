import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import tmdb from '@/lib/api/tmdb';
import { endpoints } from '@/lib/api/endpoints';
import type { Movie, MovieDetail, PaginatedResponse } from '@/types/movie';

// ... existing hooks ...

export const movieKeys = {
    all: ['movies'] as const,
    popular: () => [...movieKeys.all, 'popular'] as const,
    trending: () => [...movieKeys.all, 'trending'] as const,
    detail: (id: number) => [...movieKeys.all, 'detail', id] as const,
    search: (query: string) => [...movieKeys.all, 'search', query] as const,
    discover: (filters: Record<string, any>) => [...movieKeys.all, 'discover', filters] as const,
    genres: () => [...movieKeys.all, 'genres'] as const,
};

// ... existing hooks (usePopularMovies, useTrendingMovies, useMovieDetail, useSearchMovies) ...

export const useDiscoverMovies = (filters: {
    genreId: number | null;
    year: number | null;
    rating: number | null;
    sortBy: string;
}) => {
    return useInfiniteQuery<PaginatedResponse<Movie>>({
        queryKey: movieKeys.discover(filters),
        queryFn: async ({ pageParam }) => {
            const params: Record<string, any> = {
                page: pageParam,
                sort_by: filters.sortBy,
                include_adult: false,
                include_video: false,
            };

            if (filters.genreId) params.with_genres = filters.genreId;
            if (filters.year) params.primary_release_year = filters.year;
            if (filters.rating) params['vote_average.gte'] = filters.rating;

            const { data } = await tmdb.get(endpoints.discover, { params });
            return data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
        },
    });
};

export const useGenres = () => {
    return useQuery<{ genres: { id: number; name: string }[] }>({
        queryKey: movieKeys.genres(),
        queryFn: async () => {
            const { data } = await tmdb.get(endpoints.genres);
            return data;
        },
        staleTime: Infinity, // Genres rarely change
    });
};

export const usePopularMovies = () => {
    return useInfiniteQuery<PaginatedResponse<Movie>>({
        queryKey: movieKeys.popular(),
        queryFn: async ({ pageParam }) => {
            const { data } = await tmdb.get(endpoints.popular, {
                params: { page: pageParam },
            });
            return data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
        },
    });
};

export const useTrendingMovies = () => {
    return useQuery<PaginatedResponse<Movie>>({
        queryKey: movieKeys.trending(),
        queryFn: async () => {
            const { data } = await tmdb.get(endpoints.trending);
            return data;
        },
    });
};

export const useMovieDetail = (id: string | undefined) => {
    return useQuery<MovieDetail>({
        queryKey: movieKeys.detail(Number(id)),
        queryFn: async () => {
            if (!id) throw new Error('Movie ID is required');
            const { data } = await tmdb.get(endpoints.movieDetail(Number(id)), {
                params: { append_to_response: 'credits,similar,videos' },
            });
            return data;
        },
        enabled: !!id,
    });
};

export const useSearchMovies = (query: string) => {
    return useQuery<PaginatedResponse<Movie>>({
        queryKey: movieKeys.search(query),
        queryFn: async () => {
            if (!query) return { page: 1, results: [], total_pages: 0, total_results: 0 };
            const { data } = await tmdb.get(endpoints.search, {
                params: { query },
            });
            return data;
        },
        enabled: query.length > 0,
    });
};
