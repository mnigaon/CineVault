//src/features/watchlist/WatchlistPage.tsx
import { useWatchlist } from '@/hooks/useWatchlist';
import MovieCard from '@/components/movies/MovieCard';
import { useAuthStore } from '@/lib/firebase/auth';
import type { Movie } from '@/types/movie';

const WatchlistPage = () => {
    const { user } = useAuthStore();
    const { watchlist, isLoading } = useWatchlist();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <p className="text-xl">Please sign in to view your watchlist.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 pb-20">
            <h1 className="text-3xl font-display text-white mb-8 border-l-4 border-accent-secondary pl-4">
                Your Watchlist
            </h1>

            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    <div className="h-64 bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-64 bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-64 bg-gray-800 rounded animate-pulse"></div>
                </div>
            ) : watchlist && watchlist.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {watchlist.map((movie: Movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <p className="text-lg mb-4">Your watchlist is empty.</p>
                    <p className="text-sm">Start adding movies you want to watch!</p>
                </div>
            )}
        </div>
    );
};

export default WatchlistPage;
