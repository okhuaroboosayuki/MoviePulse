import { memo } from "react";
import MovieCard from "./MovieCard";
import rightArrow from "/assets/icons/right_icon.svg";
import { Link } from "react-router-dom";

const MovieList = memo(function MovieList({ movies, title, enableLink = false }) {
  return (
    <div className="flex items-center justify-center flex-col w-full gap-4">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-bold md:text-4xl sm:text-2xl text-[20px] capitalize">{title}</h1>

        {enableLink && (
          <Link to={"/featured-movies"} className="flex items-center justify-center gap-2">
            <span className="sm:text-lg text-base text-[#BE123C]">See more</span>
            <img src={rightArrow} alt="right arrow icon" />
          </Link>
        )}
      </div>

      <ol className="grid 2xl:grid-cols-4 2xl:grid-row-4 lg:grid-cols-3 lg:grid-rows-3 md:grid-cols-2 md:grid-rows-2 gap-20 w-full place-items-start mt-11">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ol>
    </div>
  );
});

export default MovieList;
