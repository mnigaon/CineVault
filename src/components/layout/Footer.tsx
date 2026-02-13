const Footer = () => {
    return (
        <footer className="bg-dark-surface py-8 mt-auto border-t border-white/5">
            <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} CineVault. All rights reserved.</p>
                <p className="mt-2 text-xs">Powered by TMDB API. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
            </div>
        </footer>
    );
};

export default Footer;
