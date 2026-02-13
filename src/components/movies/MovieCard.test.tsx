import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieCard from './MovieCard';
import { describe, it, expect } from 'vitest';
import type { Movie } from '@/types/movie';

const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    original_title: 'Test Movie Original',
    overview: 'This is a test movie overview.',
    poster_path: '/test-poster.jpg',
    backdrop_path: '/test-backdrop.jpg',
    release_date: '2023-01-01',
    vote_average: 8.5,
    vote_count: 100,
    popularity: 50,
    genre_ids: [28, 12],
    adult: false,
    video: false,
};

describe('MovieCard', () => {
    it('renders movie title and rating', () => {
        render(
            <BrowserRouter>
                <MovieCard movie={mockMovie} />
            </BrowserRouter>
        );

        expect(screen.getByText('Test Movie')).toBeInTheDocument();
        const ratings = screen.getAllByText('8.5');
        expect(ratings.length).toBeGreaterThanOrEqual(1);
    });

    it('renders movie release year', () => {
        render(
            <BrowserRouter>
                <MovieCard movie={mockMovie} />
            </BrowserRouter>
        );

        expect(screen.getByText('2023')).toBeInTheDocument();
    });
});
