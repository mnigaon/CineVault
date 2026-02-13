import { useSearchParams } from 'react-router-dom';
import { useSearchMovies } from '@/hooks/useMovies';
import MovieCard from '@/components/movies/MovieCard';
import Skeleton from '@/components/common/Skeleton';
import SearchBar from '@/components/search/SearchBar';
import type { Movie } from '@/types/movie';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const { data, isLoading } = useSearchMovies(query);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <SearchBar />
            </div>

            {query && (
                <h2 className="text-xl text-gray-400 mb-6">
                    Search results for <span className="text-white font-bold">"{query}"</span>
                </h2>
            )}

            {!query ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <p className="text-lg">Type something to search for movies...</p>
                </div>
            ) : isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <Skeleton key={i} className="aspect-[2/3] w-full" />
                    ))}
                </div>
            ) : data?.results.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <p className="text-lg">No movies found for "{query}"</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {data?.results.map((movie: Movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
