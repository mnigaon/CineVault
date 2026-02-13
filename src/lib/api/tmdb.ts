import axios from 'axios';
import { TMDB_API_URL } from './endpoints';

const tmdb = axios.create({
    baseURL: TMDB_API_URL,
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: 'en-US',
    },
    timeout: 10000,
});

tmdb.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                console.error('TMDB API Key Error. Check .env.local');
            } else if (status === 429) {
                console.warn('Too many requests (429). Slow down.');
            }
        }
        return Promise.reject(error);
    }
);

export default tmdb;
