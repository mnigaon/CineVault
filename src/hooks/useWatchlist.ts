//src/hooks/useWatchlist.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToWatchlist, removeFromWatchlist, getWatchlist } from '@/lib/firebase/firestore';
import { useAuthStore } from '@/lib/firebase/auth';
import type { Movie } from '@/types/movie';
import toast from 'react-hot-toast';

export const useWatchlist = () => {
    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const userId = user?.uid;

    const { data: watchlist, isLoading } = useQuery({
        queryKey: ['watchlist', userId],
        queryFn: () => (userId ? getWatchlist(userId) : Promise.resolve([])),
        enabled: !!userId,
    });

    const addMutation = useMutation({
        mutationFn: (movie: Movie) => {
            if (!userId) throw new Error('User not logged in');
            return addToWatchlist(userId, movie);
        },
        onSuccess: () => {
            toast.success('Added to watchlist');
            queryClient.invalidateQueries({ queryKey: ['watchlist', userId] });
        },
        onError: () => toast.error('Failed to add to watchlist'),
    });

    const removeMutation = useMutation({
        mutationFn: (movieId: number) => {
            if (!userId) throw new Error('User not logged in');
            return removeFromWatchlist(userId, movieId);
        },
        onSuccess: () => {
            toast.success('Removed from watchlist');
            queryClient.invalidateQueries({ queryKey: ['watchlist', userId] });
        },
        onError: () => toast.error('Failed to remove from watchlist'),
    });

    return {
        watchlist,
        isLoading,
        addToWatchlist: addMutation.mutate,
        removeFromWatchlist: removeMutation.mutate,
        isInWatchlist: (movieId: number) => watchlist?.some(m => m.id === movieId) ?? false,
    };
};
