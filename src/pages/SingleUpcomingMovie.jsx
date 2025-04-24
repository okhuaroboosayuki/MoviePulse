import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { MovieDetails, SideNav, Spinner } from "../components";
import useMovies from "../hooks/useMovies";

const SingleUpcomingMovie = () => {
  const { isLoading, currentUpcomingMovie, fetchSingleUpcomingMovie } = useMovies();

  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleUpcomingMovie(id);
  }, [fetchSingleUpcomingMovie, id]);

  return (
    <section className="flex w-full items-center h-full">
      <SideNav pathLocation={location} />

      {isLoading ? <Spinner /> : <MovieDetails movie={currentUpcomingMovie} pathLocation={location} />}
    </section>
  );
};

export default SingleUpcomingMovie;
