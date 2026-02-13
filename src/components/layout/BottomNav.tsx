import { NavLink } from 'react-router-dom';
import { Home, Film, Bookmark } from 'lucide-react';
import { useAuthStore } from '@/lib/firebase/auth';
import { motion } from 'framer-motion';

const BottomNav = () => {
    const { user } = useAuthStore();

    const navItemVariants = {
        tap: { scale: 0.9 },
        hover: { scale: 1.1 }
    };

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur-md border-t border-white/5 px-6 h-16 flex items-center justify-around pb-safe">
            <motion.div whileTap="tap" variants={navItemVariants}>
                <NavLink
                    to="/"
                    className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-accent-primary' : 'text-gray-400'}`}
                >
                    <Home className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Home</span>
                </NavLink>
            </motion.div>

            <motion.div whileTap="tap" variants={navItemVariants}>
                <NavLink
                    to="/movies"
                    className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-accent-primary' : 'text-gray-400'}`}
                >
                    <Film className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Movies</span>
                </NavLink>
            </motion.div>

            {user && (
                <motion.div whileTap="tap" variants={navItemVariants}>
                    <NavLink
                        to="/watchlist"
                        className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-accent-primary' : 'text-gray-400'}`}
                    >
                        <Bookmark className="w-5 h-5" />
                        <span className="text-[10px] font-medium">Watchlist</span>
                    </NavLink>
                </motion.div>
            )}
        </nav>
    );
};

export default BottomNav;
