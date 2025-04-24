import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import MovieCard from "./MovieCard";
import rightArrow from "/assets/icons/right_icon.svg";
import Message from "./Message";

const MovieList = memo(function MovieList({ movies, title, msgText, queryText, enableLink = false, media }) {
  const totalNumberOfResults = movies.length;
  const location = useLocation();
  const isLocationSearch = location.pathname === "/search";

  return (
    <div className="flex items-center justify-center flex-col w-full gap-4">
      <div className={`flex items-center gap-2 sm:gap-0 justify-between ${(queryText || isLocationSearch) && totalNumberOfResults > 0 && "flex-col sm:flex-row"} w-full`}>
        <h1 className="font-bold md:text-4xl sm:text-2xl text-[20px] capitalize">{title}</h1>

        {enableLink && (
          <Link to={"featured-movies"} className="flex items-center justify-center gap-2">
            <span className="sm:text-lg text-base text-[#BE123C]">See more</span>
            <img src={rightArrow} alt="right arrow icon" />
          </Link>
        )}

        {(queryText || isLocationSearch) && totalNumberOfResults > 0 && (
          <p className="flex items-center justify-center gap-1 font-medium text-gray-500 sm:text-lg text-base">
            <span>
              Results for{" "}
              <span className={isLocationSearch ? "lowercase" : "uppercase"}>
                "{queryText}"{isLocationSearch && ":"}
              </span>
            </span>
            <span>{!isLocationSearch && "region:"}</span>
            <span>{totalNumberOfResults} movies</span>
          </p>
        )}
      </div>

      {movies.length > 0 ? (
        <ol className="grid 2xl:grid-cols-4 2xl:grid-row-4 lg:grid-cols-3 lg:grid-rows-3 md:grid-cols-2 md:grid-rows-2 gap-20 w-full place-items-start mt-11">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} media={media} />
          ))}
        </ol>
      ) : (
        <Message text={msgText} />
      )}
    </div>
  );
});

export default MovieList;
