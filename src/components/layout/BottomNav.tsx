import { NavLink } from 'react-router-dom';
import { Home, Film, Bookmark } from 'lucide-react';
import { useAuthStore } from '@/lib/firebase/auth';

const BottomNav = () => {
    const { user } = useAuthStore();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur-md border-t border-white/5 px-6 h-16 flex items-center justify-around">
            <NavLink
                to="/"
                className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-accent-primary' : 'text-gray-400 hover:text-white'}`}
            >
                <Home className="w-5 h-5" />
                <span className="text-[10px] font-medium">Home</span>
            </NavLink>

            <NavLink
                to="/movies"
                className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-accent-primary' : 'text-gray-400 hover:text-white'}`}
            >
                <Film className="w-5 h-5" />
                <span className="text-[10px] font-medium">Movies</span>
            </NavLink>

            {user && (
                <NavLink
                    to="/watchlist"
                    className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-accent-primary' : 'text-gray-400 hover:text-white'}`}
                >
                    <Bookmark className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Watchlist</span>
                </NavLink>
            )}
        </nav>
    );
};

export default BottomNav;
