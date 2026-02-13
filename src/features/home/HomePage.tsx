import { useTrendingMovies, usePopularMovies } from '@/hooks/useMovies';
import MovieCard from '@/components/movies/MovieCard';
import Skeleton from '@/components/common/Skeleton';
import type { Movie } from '@/types/movie';
import { getImageUrl } from '@/lib/api/endpoints';
import { Link } from 'react-router-dom';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

const HomePage = () => {
    const { data: trending, isLoading: trendingLoading } = useTrendingMovies();
    const {
        data: popular,
        isLoading: popularLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = usePopularMovies();

    const { ref } = useInfiniteScroll({
        onIntersect: fetchNextPage,
        isLoading: isFetchingNextPage,
        hasNextPage: !!hasNextPage,
    });

    const featuredMovie = trending?.results[0];

    return (
        <div className="pb-20">
            {/* Hero Section */}
            {trendingLoading ? (
                <div className="w-full h-[70vh] bg-gray-800 animate-pulse" />
            ) : featuredMovie ? (
                <div className="relative h-[70vh] w-full">
                    <div className="absolute inset-0">
                        <img
                            src={getImageUrl(featuredMovie.backdrop_path, 'original')}
                            alt={featuredMovie.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/60 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 md:p-16 max-w-3xl z-10 w-full">
                        <h1 className="text-4xl md:text-7xl font-display text-white mb-4 leading-tight drop-shadow-lg lg:line-clamp-2">
                            {featuredMovie.title}
                        </h1>
                        <p className="text-gray-200 text-sm md:text-lg line-clamp-3 mb-6 md:mb-8 drop-shadow-md">
                            {featuredMovie.overview}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Link to={`/movie/${featuredMovie.id}`} className="px-8 py-3 bg-accent-primary text-white font-bold rounded hover:bg-red-700 transition-colors shadow-lg text-center">
                                Play Now
                            </Link>
                            <Link to={`/movie/${featuredMovie.id}`} className="px-8 py-3 bg-gray-600/80 text-white font-bold rounded hover:bg-gray-600 transition-colors backdrop-blur-sm text-center">
                                More Info
                            </Link>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Trending Section */}
            <section className="container mx-auto px-4 mt-12">
                <h2 className="text-2xl font-display text-white mb-6 border-l-4 border-accent-secondary pl-3">Trending Now</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {trendingLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="aspect-[2/3] w-full" />
                        ))
                    ) : (
                        trending?.results.slice(1, 11).map((movie: Movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    )}
                </div>
            </section>

            {/* Popular Section */}
            <section className="container mx-auto px-4 mt-16">
                <h2 className="text-2xl font-display text-white mb-6 border-l-4 border-accent-primary pl-3">Popular Movies</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {popularLoading ? (
                        Array.from({ length: 10 }).map((_, i) => (
                            <Skeleton key={i} className="aspect-[2/3] w-full" />
                        ))
                    ) : (
                        popular?.pages.map((page) => (
                            page.results.map((movie: Movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))
                        ))
                    )}
                    {isFetchingNextPage && Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={`loading-${i}`} className="aspect-[2/3] w-full" />
                    ))}
                </div>
                <div ref={ref} className="h-10 mt-4" />
            </section>
        </div>
    );
};

export default HomePage;
