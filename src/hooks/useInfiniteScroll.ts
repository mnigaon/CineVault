import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseInfiniteScrollProps {
    onIntersect: () => void;
    isLoading: boolean;
    hasNextPage: boolean;
}

export const useInfiniteScroll = ({ onIntersect, isLoading, hasNextPage }: UseInfiniteScrollProps) => {
    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: '100px',
    });

    const onIntersectRef = useRef(onIntersect);

    useEffect(() => {
        onIntersectRef.current = onIntersect;
    }, [onIntersect]);

    useEffect(() => {
        if (inView && !isLoading && hasNextPage) {
            onIntersectRef.current();
        }
    }, [inView, isLoading, hasNextPage]);

    return { ref };
};
