import { db } from './auth';
import { doc, setDoc, deleteDoc, getDoc, collection, getDocs, query } from 'firebase/firestore';
import type { Movie } from '@/types/movie';

export const addToWatchlist = async (userId: string, movie: Movie) => {
    try {
        // Save all necessary fields for MovieCard and filtering
        await setDoc(doc(db, 'users', userId, 'watchlist', String(movie.id)), {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path || null,
            vote_average: movie.vote_average,
            release_date: movie.release_date || '',
            overview: movie.overview || '',
            genre_ids: movie.genre_ids || [],
            adult: movie.adult || false,
            video: movie.video || false,
            original_title: movie.original_title || movie.title,
            popularity: movie.popularity || 0,
            vote_count: movie.vote_count || 0,
            addedAt: new Date().toISOString(),
        });
    } catch (error: any) {
        console.error('Error adding to watchlist:', error);
        throw error;
    }
};

export const removeFromWatchlist = async (userId: string, movieId: number) => {
    try {
        await deleteDoc(doc(db, 'users', userId, 'watchlist', String(movieId)));
    } catch (error) {
        console.error('Error removing from watchlist', error);
        throw error;
    }
};

export const getWatchlist = async (userId: string) => {
    try {
        const q = query(collection(db, 'users', userId, 'watchlist'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as Movie);
    } catch (error) {
        console.error('Error getting watchlist', error);
        throw error;
    }
};

export const checkIsInWatchlist = async (userId: string, movieId: number) => {
    try {
        const docRef = doc(db, 'users', userId, 'watchlist', String(movieId));
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    } catch (error) {
        console.error('Error checking watchlist', error);
        return false;
    }
}
