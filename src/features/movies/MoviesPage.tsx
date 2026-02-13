import { useState } from 'react';
import { useDiscoverMovies } from '@/hooks/useMovies';
import { useFilterStore } from '@/store/useFilterStore';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import MovieCard from '@/components/movies/MovieCard';
import Skeleton from '@/components/common/Skeleton';
import FilterPanel from '@/components/search/FilterPanel';
import { Filter } from 'lucide-react';
import type { Movie } from '@/types/movie';

const MoviesPage = () => {
    const filters = useFilterStore();
    const {
        data,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useDiscoverMovies({
        genreId: filters.genreId,
        year: filters.year,
        rating: filters.rating,
        sortBy: filters.sortBy
    });

    const { ref } = useInfiniteScroll({
        onIntersect: fetchNextPage,
        isLoading: isFetchingNextPage,
        hasNextPage: !!hasNextPage,
    });

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Mobile Filter Toggle */}
                <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="md:hidden flex items-center justify-center gap-2 w-full py-3 bg-dark-surface rounded-lg mb-4 border border-white/10"
                >
                    <Filter size={20} />
                    <span>Filters</span>
                </button>

                {/* Sidebar Filters */}
                <aside className={`
                    fixed inset-0 z-[60] bg-dark-bg p-4 transition-transform duration-300 transform
                    md:relative md:translate-x-0 md:w-64 md:block md:bg-transparent md:p-0
                    ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <FilterPanel onClose={() => setIsMobileFilterOpen(false)} />
                </aside>

                {/* Movie Grid */}
                <main className="flex-1">
                    <h1 className="text-2xl font-display text-white mb-6">Discover Movies</h1>

                    {isLoading ? (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <Skeleton key={i} className="aspect-[2/3] w-full" />
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {data?.pages.map((page) => (
                                    page.results.map((movie: Movie) => (
                                        <MovieCard key={movie.id} movie={movie} />
                                    ))
                                ))}
                                {isFetchingNextPage && Array.from({ length: 4 }).map((_, i) => (
                                    <Skeleton key={`loading-${i}`} className="aspect-[2/3] w-full" />
                                ))}
                            </div>
                            <div ref={ref} className="h-10 mt-8" />
                            {data?.pages[0].results.length === 0 && (
                                <div className="text-center py-20 text-gray-500">
                                    No movies found matching your filters.
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MoviesPage;
