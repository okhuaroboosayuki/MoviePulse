import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Spinner } from "./components";
import { MoviesProvider } from "./contexts/MoviesContext";
import PageNotFound from "./pages/PageNotFound";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const FeaturedMovies = lazy(() => import("./pages/FeaturedMovies"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const TvSeriesPage = lazy(() => import("./pages/TvSeriesPage"));
const Upcoming = lazy(() => import("./pages/UpcomingPage"));
const FavoriteMoviesPage = lazy(() => import("./pages/FavoriteMoviesPage"));

const SingleTvSeriesPage = lazy(() => import("./pages/SingleTvSeriesPage"));
const SingleMoviePage = lazy(() => import("./pages/SingleMoviePage"));
const SingleUpcomingMovie = lazy(() => import("./pages/SingleUpcomingMovie"));

const App = () => {
  return (
    <AuthProvider>
      <MoviesProvider>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="sign-in" element={<SignInPage />} />

              <Route
                path="featured-movies"
                element={
                  <ProtectedRoutes>
                    <FeaturedMovies />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="search"
                element={
                  <ProtectedRoutes>
                    <SearchPage />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="movies"
                element={
                  <ProtectedRoutes>
                    <MoviesPage />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="tv-series"
                element={
                  <ProtectedRoutes>
                    <TvSeriesPage />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="upcoming"
                element={
                  <ProtectedRoutes>
                    <Upcoming />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="favorite-movies"
                element={
                  <ProtectedRoutes>
                    <FavoriteMoviesPage />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="movie/:id"
                element={
                  <ProtectedRoutes>
                    <SingleMoviePage />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="tv-series/:id"
                element={
                  <ProtectedRoutes>
                    <SingleTvSeriesPage />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="upcoming/:id"
                element={
                  <ProtectedRoutes>
                    <SingleUpcomingMovie />
                  </ProtectedRoutes>
                }
              />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </MoviesProvider>
    </AuthProvider>
  );
};

export default App;
