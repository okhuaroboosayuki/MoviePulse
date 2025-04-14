import { memo } from "react";
import MovieCard from "./MovieCard";

const MovieList = memo(function MovieList({ movies }) {
  return (
    <ol className="grid 2xl:grid-cols-4 2xl:grid-row-4 lg:grid-cols-3 lg:grid-rows-3 md:grid-cols-2 md:grid-rows-2 gap-20 w-full place-items-start mt-11">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ol>
  );
});

export default MovieList;
