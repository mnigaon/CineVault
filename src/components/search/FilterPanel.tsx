import { useFilterStore } from '@/store/useFilterStore';
import { useGenres } from '@/hooks/useMovies';
import { X } from 'lucide-react';

interface FilterPanelProps {
    onClose?: () => void;
}

const FilterPanel = ({ onClose }: FilterPanelProps) => {
    const {
        genreId, year, rating, sortBy,
        setGenreId, setYear, setRating, setSortBy, resetMap
    } = useFilterStore();

    const { data: genreData } = useGenres();

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, i) => currentYear - i);
    const ratings = [9, 8, 7, 6, 5, 4, 3, 2, 1];

    return (
        <div className="bg-dark-surface p-6 rounded-lg border border-white/5 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-display text-white">Filters</h2>
                {onClose && (
                    <button onClick={onClose} className="md:hidden text-gray-400">
                        <X size={24} />
                    </button>
                )}
            </div>

            {/* Sort By */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Sort By</h3>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-dark-bg text-white border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-primary"
                >
                    <option value="popularity.desc">Popularity (High to Low)</option>
                    <option value="popularity.asc">Popularity (Low to High)</option>
                    <option value="vote_average.desc">Rating (High to Low)</option>
                    <option value="vote_average.asc">Rating (Low to High)</option>
                    <option value="primary_release_date.desc">Newest First</option>
                    <option value="primary_release_date.asc">Oldest First</option>
                </select>
            </div>

            {/* Genres */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Genres</h3>
                <div className="flex flex-wrap gap-2">
                    {genreData?.genres.map((g) => (
                        <button
                            key={g.id}
                            onClick={() => setGenreId(genreId === g.id ? null : g.id)}
                            className={`px-3 py-1 text-xs rounded-full border transition-colors ${genreId === g.id
                                    ? 'bg-accent-secondary border-accent-secondary text-dark-bg font-bold'
                                    : 'border-white/20 text-gray-300 hover:border-white/50'
                                }`}
                        >
                            {g.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Year */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Release Year</h3>
                <select
                    value={year || ''}
                    onChange={(e) => setYear(e.target.value ? Number(e.target.value) : null)}
                    className="w-full bg-dark-bg text-white border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-primary"
                >
                    <option value="">All Years</option>
                    {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>

            {/* Rating */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Min Rating</h3>
                <div className="flex flex-wrap gap-2">
                    {ratings.map(r => (
                        <button
                            key={r}
                            onClick={() => setRating(rating === r ? null : r)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full border transition-colors text-sm ${rating === r
                                    ? 'bg-accent-primary border-accent-primary text-white font-bold'
                                    : 'border-white/20 text-gray-300 hover:border-white/50'
                                }`}
                        >
                            {r}+
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={resetMap}
                className="w-full py-2 border border-white/20 text-gray-300 rounded hover:bg-white/5 transition-colors text-sm"
            >
                Reset Filters
            </button>
        </div>
    );
};

export default FilterPanel;
