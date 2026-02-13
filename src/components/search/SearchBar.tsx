import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchBar = () => {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [inputValue, setInputValue] = useState(initialQuery);
    const debouncedValue = useDebounce(inputValue, 500);
    const navigate = useNavigate();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (debouncedValue) {
            navigate(`/search?q=${encodeURIComponent(debouncedValue)}`);
        } else if (!isFirstRender.current && inputValue === '') {
            // Clear search or navigate back? Maybe just stay or go to /search without query
            // For now, let's keep it simple. If empty, maybe don't navigate automatically or go to main search page
            if (initialQuery) navigate('/search');
        }
    }, [debouncedValue, navigate, initialQuery, inputValue]);

    // Update input if URL changes externally (e.g. back button)
    useEffect(() => {
        setInputValue(searchParams.get('q') || '');
    }, [searchParams]);

    const handleClear = () => {
        setInputValue('');
        navigate('/search');
    };

    return (
        <div className="relative w-full max-w-xl mx-auto">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search for movies, TV shows..."
                    aria-label="Search movies"
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:bg-white/20 transition-all backdrop-blur-md"
                />
                {inputValue && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
                        aria-label="Clear search"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
