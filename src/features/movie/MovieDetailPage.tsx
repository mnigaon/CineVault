//src/features/movie/MovieDetailPage.tsx
import { useParams } from 'react-router-dom';
import { useMovieDetail } from '@/hooks/useMovies';
import Skeleton from '@/components/common/Skeleton';
import { getImageUrl } from '@/lib/api/endpoints';
import { Star, Clock, Calendar, Check, Plus } from 'lucide-react';
import CastList from '@/components/movies/CastList';
import MovieCard from '@/components/movies/MovieCard';
import type { Movie } from '@/types/movie';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useAuthStore } from '@/lib/firebase/auth';
import toast from 'react-hot-toast';

const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: movie, isLoading } = useMovieDetail(id);
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
    const { user } = useAuthStore();

    const inWatchlist = movie ? isInWatchlist(movie.id) : false;

    const handleWatchlistClick = () => {
        if (!user) {
            toast.error('Please sign in to add to watchlist');
            return;
        }
        if (movie) {
            if (inWatchlist) {
                removeFromWatchlist(movie.id);
            } else {
                addToWatchlist(movie);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-dark-bg">
                <div className="h-[50vh] bg-gray-800 animate-pulse" />
                <div className="container mx-auto px-4 -mt-32 relative z-10">
                    <div className="flex flex-col md:flex-row gap-8">
                        <Skeleton className="w-64 h-96 rounded-lg shadow-xl" />
                        <div className="flex-1 pt-32 md:pt-0">
                            <Skeleton className="h-10 w-3/4 mb-4" />
                            <Skeleton className="h-6 w-1/2 mb-8" />
                            <Skeleton className="h-32 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!movie) return <div className="text-center py-20">Movie not found</div>;

    const trailer = movie.videos?.results.find(v => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube');

    return (
        <div className="min-h-screen bg-dark-bg pb-20">
            {/* Backdrop Banner */}
            <div className="relative h-[50vh] md:h-[60vh] w-full">
                <div className="absolute inset-0">
                    <img
                        src={getImageUrl(movie.backdrop_path, 'original')}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent" />
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 -mt-32 md:-mt-48 relative z-10">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                        <img
                            src={getImageUrl(movie.poster_path)}
                            alt={movie.title}
                            className="w-64 rounded-lg shadow-2xl border-4 border-white/5"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-white pt-4 md:pt-32">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">{movie.title}</h1>
                        {movie.tagline && <p className="text-lg text-gray-400 italic mb-4">"{movie.tagline}"</p>}

                        <div className="flex flex-wrap items-center gap-6 mb-6 text-sm md:text-base">
                            <div className="flex items-center gap-2 text-accent-secondary">
                                <Star size={20} fill="currentColor" />
                                <span className="font-bold text-lg">{movie.vote_average.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <Clock size={18} />
                                <span>{movie.runtime} min</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <Calendar size={18} />
                                <span>{movie.release_date.split('-')[0]}</span>
                            </div>
                            <div className="flex gap-2">
                                {movie.genres.map(g => (
                                    <span key={g.id} className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition-colors">
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8 max-w-3xl">
                            <h3 className="text-xl font-display mb-2">Overview</h3>
                            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mb-10">
                            {trailer && (
                                <a
                                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-accent-primary text-white font-bold rounded hover:bg-red-700 transition-colors"
                                >
                                    Watch Trailer
                                </a>
                            )}
                            <button
                                onClick={handleWatchlistClick}
                                className={`px-6 py-3 font-bold rounded transition-colors flex items-center gap-2 ${inWatchlist
                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                    : 'bg-gray-700 text-white hover:bg-gray-600'
                                    }`}
                            >
                                {inWatchlist ? (
                                    <>
                                        <Check size={20} />
                                        In Watchlist
                                    </>
                                ) : (
                                    <>
                                        <Plus size={20} />
                                        Add to Watchlist
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Cast */}
                        <CastList cast={movie.credits.cast} />
                    </div>
                </div>

                {/* Similar Movies */}
                {movie.similar?.results.length > 0 && (
                    <div className="mt-16">
                        <h3 className="text-2xl font-display text-white mb-6">Similar Movies</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {movie.similar.results.slice(0, 5).map((m: Movie) => (
                                <MovieCard key={m.id} movie={m} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetailPage;
