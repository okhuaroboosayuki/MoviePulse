import { memo } from "react";
import Message from "../Message";
import FavoriteMovieCard from "./FavoriteMovieCard";

const FavoriteMovieList = memo(function MovieList({ movies, msgText }) {
  return (
    <>
      {movies?.length > 0 ? (
        <ol className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-20 p-0 w-full place-items-start">
          {movies?.map((movie) => (
            <FavoriteMovieCard key={movie.id} movie={movie} />
          ))}
        </ol>
      ) : (
        <Message text={msgText} />
      )}
    </>
  );
});

export default FavoriteMovieList;
