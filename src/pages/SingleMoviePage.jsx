import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { MovieDetails, SideNav, Spinner } from "../components";
import useMovies from "../hooks/useMovies";

const SingleMoviePage = () => {
  const { isLoading, currentMovie, fetchSingleMovie } = useMovies();

  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleMovie(id);
  }, [fetchSingleMovie, id]);

  return (
    <section className="flex w-full items-center h-full relative">
      <SideNav pathLocation={location} />

      {isLoading ? <Spinner /> : <MovieDetails movie={currentMovie} pathLocation={location} />}
    </section>
  );
};

export default SingleMoviePage;
