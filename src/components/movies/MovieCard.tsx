import { motion } from 'framer-motion';
import type { Movie } from '@/types/movie';
import { getImageUrl } from '@/lib/api/endpoints';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <Link to={`/movie/${movie.id}`}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-lg overflow-hidden shadow-lg bg-dark-surface cursor-pointer group h-full"
            >
                <div className="aspect-[2/3] relative">
                    <img
                        src={getImageUrl(movie.poster_path)}
                        alt={movie.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-white font-bold text-lg line-clamp-2 leading-tight">{movie.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1 text-accent-secondary">
                                <Star size={16} fill="currentColor" />
                                <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
                            </div>
                            <span className="text-xs text-gray-300">{movie.release_date?.split('-')[0]}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 line-clamp-3">
                            {movie.overview || "No overview available."}
                        </p>
                    </div>
                    {/* Rating Badge (Always Visible if needed, or remove if overlay is enough. Sticking to design: Badge top-right?) 
                Prompt says: "Rating badge (top-right)"
            */}
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                        <Star size={12} className="text-accent-secondary" fill="currentColor" />
                        <span className="text-xs font-bold text-white">{movie.vote_average.toFixed(1)}</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default MovieCard;
