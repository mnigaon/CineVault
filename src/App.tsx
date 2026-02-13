import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Skeleton from '@/components/common/Skeleton';
import { useAuthListener } from '@/lib/firebase/auth';

const LazyHome = lazy(() => import('@/features/home/HomePage'));
const LazySearch = lazy(() => import('@/features/search/SearchPage'));
const LazyMovieDetail = lazy(() => import('@/features/movie/MovieDetailPage'));
const LazyWatchlist = lazy(() => import('@/features/watchlist/WatchlistPage'));
const LazyMovies = lazy(() => import('@/features/movies/MoviesPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const GlobalLoading = () => (
  <div className="min-h-screen bg-dark-bg p-8">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <Skeleton className="aspect-[2/3] rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  </div>
);

function App() {
  useAuthListener();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<GlobalLoading />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<LazyHome />} />
              <Route path="/search" element={<LazySearch />} />
              <Route path="/movies" element={<LazyMovies />} />
              <Route path="/movie/:id" element={<LazyMovieDetail />} />
              <Route path="/watchlist" element={<LazyWatchlist />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1a1f3a',
            color: '#fff',
            border: '1px solid #333',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
