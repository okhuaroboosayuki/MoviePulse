import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const { data } = useMovies();

  return (
    <ol className="grid grid-cols-4 grid-row-4 gap-20 w-full place-items-start mt-11">
      {data.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ol>
  );
};

export default MovieList;
