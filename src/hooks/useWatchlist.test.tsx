import { renderHook, waitFor } from '@testing-library/react';
import { useWatchlist } from './useWatchlist';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Mock dependencies
vi.mock('@/lib/firebase/firestore', () => ({
    getWatchlist: vi.fn(),
    addToWatchlist: vi.fn(),
    removeFromWatchlist: vi.fn(),
}));

vi.mock('@/lib/firebase/auth', () => ({
    useAuthStore: vi.fn(),
}));

import { getWatchlist } from '@/lib/firebase/firestore';
import { useAuthStore } from '@/lib/firebase/auth';

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useWatchlist', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns empty watchlist when user is not logged in', async () => {
        (useAuthStore as any).mockReturnValue({ user: null });

        const { result } = renderHook(() => useWatchlist(), { wrapper: createWrapper() });

        expect(result.current.watchlist).toBeUndefined();
        expect(result.current.isLoading).toBe(false);
    });

    it('fetches watchlist when user is logged in', async () => {
        const mockUser = { uid: 'user123' };
        const mockData = [{ id: 1, title: 'Movie 1' }];

        (useAuthStore as any).mockReturnValue({ user: mockUser });
        (getWatchlist as any).mockResolvedValue(mockData);

        const { result } = renderHook(() => useWatchlist(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.watchlist).toEqual(mockData));
        expect(getWatchlist).toHaveBeenCalledWith('user123');
    });

    it('correctly identifies if a movie is in watchlist', async () => {
        const mockUser = { uid: 'user123' };
        const mockData = [{ id: 1, title: 'Movie 1' }];

        (useAuthStore as any).mockReturnValue({ user: mockUser });
        (getWatchlist as any).mockResolvedValue(mockData);

        const { result } = renderHook(() => useWatchlist(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isInWatchlist(1)).toBe(true));
        expect(result.current.isInWatchlist(2)).toBe(false);
    });
});
