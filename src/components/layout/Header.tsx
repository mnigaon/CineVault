import { Link, NavLink } from 'react-router-dom';
import { Search, Film, LogOut, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '@/lib/firebase/auth';

const Header = () => {
    const { user, logout, setAuthModalOpen } = useAuthStore();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-primary font-display text-2xl tracking-wider text-accent-primary" aria-label="CineVault Home">
                    <Film className="w-6 h-6" aria-hidden="true" />
                    <span>CINEVAULT</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <NavLink to="/" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-white ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        Home
                    </NavLink>
                    <NavLink to="/movies" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-white ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        Movies
                    </NavLink>
                    {user && (
                        <NavLink
                            to="/watchlist"
                            className={({ isActive }) => `text-sm font-medium transition-colors hover:text-white ${isActive ? 'text-white' : 'text-gray-400'}`}
                            aria-label="View your watchlist"
                        >
                            Watchlist
                        </NavLink>
                    )}
                </nav>

                <div className="flex items-center gap-4">
                    <Link to="/search" className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white" aria-label="Search movies">
                        <Search className="w-5 h-5" />
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-3">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-white/20" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                                    <UserIcon className="w-4 h-4 text-gray-300" />
                                </div>
                            )}
                            <button
                                onClick={() => logout()}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white"
                                aria-label="Sign out"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setAuthModalOpen(true)}
                            className="px-4 py-1.5 bg-accent-primary text-white text-sm font-bold rounded hover:bg-red-700 transition-colors"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
