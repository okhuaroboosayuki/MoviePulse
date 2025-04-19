import { useEffect } from "react";
import { Footer, HomeNav, MovieList, Spinner } from "../components";
import useMovies from "../hooks/useMovies";

const MoviesPage = () => {
  const { isLoading, allMovies, fetchMovies } = useMovies();

  useEffect(() => {
    fetchMovies("us");
  }, [fetchMovies]);

  const sortedMovies = (Array.isArray(allMovies) ? allMovies : []).sort((a, b) => b.vote_average - a.vote_average);

  return (
    <div className="flex items-center justify-center h-full flex-col w-full lg:px-15 xl:px-27 sm:px-8 px-3">
      <HomeNav textColor={"text-[#111827]"} borderColor={"border-[#111827]/50"} svgStrokeColor={"#111827"} />

      <div className="mt-13 w-full">{isLoading ? <Spinner /> : <MovieList movies={sortedMovies} title="movies" media="movie" />}</div>

      <Footer />
    </div>
  );
};

export default MoviesPage;
