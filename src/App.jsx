import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Spinner } from "./components";
import { MoviesProvider } from "./contexts/MoviesContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const FeaturedMovies = lazy(() => import("./pages/FeaturedMovies"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const TvSeriesPage = lazy(() => import("./pages/TvSeriesPage"));
const Upcoming = lazy(() => import("./pages/UpcomingPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const SingleTvSeriesPage = lazy(() => import("./pages/SingleTvSeriesPage"));
const SingleMoviePage = lazy(() => import("./pages/SingleMoviePage"));
const SingleUpcomingMovie = lazy(() => import("./pages/SingleUpcomingMovie"));

const App = () => {
  return (
    <MoviesProvider>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="featured-movies" element={<FeaturedMovies />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="tv-series" element={<TvSeriesPage />} />
            <Route path="upcoming" element={<Upcoming />} />

            <Route path="movie/:id" element={<SingleMoviePage />} />
            <Route path="tv-series/:id" element={<SingleTvSeriesPage />} />
            <Route path="upcoming/:id" element={<SingleUpcomingMovie />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MoviesProvider>
  );
};

export default App;
