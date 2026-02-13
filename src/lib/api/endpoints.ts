export const TMDB_API_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p';

export const endpoints = {
    trending: '/trending/movie/week',
    popular: '/movie/popular',
    topRated: '/movie/top_rated',
    upcoming: '/movie/upcoming',
    search: '/search/movie',
    movieDetail: (id: number) => `/movie/${id}`,
    discover: '/discover/movie',
    genres: '/genre/movie/list',
};

export const getImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500') => {
    if (!path) return 'https://placehold.co/500x750?text=No+Image';
    return `${TMDB_IMAGE_URL}/${size}${path}`;
};
