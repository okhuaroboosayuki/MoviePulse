import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Spinner } from "./components";
import { MoviesProvider } from "./contexts/MoviesContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const SingleMoviePage = lazy(() => import("./pages/SingleMoviePage"));
const FeaturedMovies = lazy(() => import("./pages/FeaturedMovies"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const App = () => {
  return (
    <MoviesProvider>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie" element={<SingleMoviePage />} />
            <Route path="/featured-movies" element={<FeaturedMovies />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MoviesProvider>
  );
};

export default App;
