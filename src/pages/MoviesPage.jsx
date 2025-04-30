import { useEffect } from "react";
import { Footer, HomeNav, MovieList, Spinner } from "../components";
import useMovies from "../hooks/useMovies";
import { setDocumentOverFlowDisplay } from "../utils";

const MoviesPage = () => {
  const { isLoading, allMovies, fetchMovies } = useMovies();

  useEffect(() => {
    fetchMovies("us");
    setDocumentOverFlowDisplay(false);
  }, [fetchMovies]);

  const sortedMovies = (Array.isArray(allMovies) ? allMovies : []).sort((a, b) => b.vote_average - a.vote_average);

  return (
    <>
      <title>Popular Movies | MoviePulse</title>
      <meta name="description" content="Explore the best popular movies from various genres on MoviePulse. Find top-rated films, watch trailers, and dive into an incredible cinematic experience" />

      <div className="flex items-center justify-center h-full flex-col w-full lg:px-15 xl:px-27 sm:px-8 px-3">
        <HomeNav textColor={"text-[#111827]"} borderColor={"border-[#111827]/50"} svgStrokeColor={"#111827"} />

        <div className="mt-13 w-full">{isLoading ? <Spinner /> : <MovieList movies={sortedMovies} title="movies" media="movie" />}</div>

        <Footer />
      </div>
    </>
  );
};

export default MoviesPage;
