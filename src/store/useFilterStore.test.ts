import { renderHook, act } from '@testing-library/react';
import { useFilterStore } from './useFilterStore';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useFilterStore', () => {
    beforeEach(() => {
        act(() => {
            useFilterStore.getState().resetMap();
        });
    });

    it('should have initial default values', () => {
        const { result } = renderHook(() => useFilterStore());

        expect(result.current.genreId).toBe(null);
        expect(result.current.year).toBe(null);
        expect(result.current.rating).toBe(null);
        expect(result.current.sortBy).toBe('popularity.desc');
    });

    it('should update genreId', () => {
        const { result } = renderHook(() => useFilterStore());

        act(() => {
            result.current.setGenreId(28);
        });

        expect(result.current.genreId).toBe(28);
    });

    it('should update year', () => {
        const { result } = renderHook(() => useFilterStore());

        act(() => {
            result.current.setYear(2024);
        });

        expect(result.current.year).toBe(2024);
    });

    it('should update rating', () => {
        const { result } = renderHook(() => useFilterStore());

        act(() => {
            result.current.setRating(8);
        });

        expect(result.current.rating).toBe(8);
    });

    it('should update sortBy', () => {
        const { result } = renderHook(() => useFilterStore());

        act(() => {
            result.current.setSortBy('vote_average.desc');
        });

        expect(result.current.sortBy).toBe('vote_average.desc');
    });

    it('should reset filters via resetMap', () => {
        const { result } = renderHook(() => useFilterStore());

        act(() => {
            result.current.setGenreId(28);
            result.current.setYear(2024);
            result.current.resetMap();
        });

        expect(result.current.genreId).toBe(null);
        expect(result.current.year).toBe(null);
    });
});
