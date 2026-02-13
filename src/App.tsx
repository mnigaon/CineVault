import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from '@/components/layout/MainLayout';
import HomePage from '@/features/home/HomePage';
import SearchPage from '@/features/search/SearchPage';
import MovieDetailPage from '@/features/movie/MovieDetailPage';
import WatchlistPage from '@/features/watchlist/WatchlistPage';
import MoviesPage from '@/features/movies/MoviesPage';
import { useAuthListener } from '@/lib/firebase/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  useAuthListener();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
          </Route>
        </Routes>
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
