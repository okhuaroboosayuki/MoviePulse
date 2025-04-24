import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { MovieDetails, SideNav, Spinner } from "../components";
import useMovies from "../hooks/useMovies";

const SingleMoviePage = () => {
  const { isLoading, currentMovie, fetchSingleMovie, dispatch } = useMovies();

  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleMovie(id);
  }, [fetchSingleMovie, id]);

  useEffect(() => {
    const onResizeNavDisplay = () => {
      if (window.innerWidth < 1440) dispatch({ type: "navHidden", payload: true });
      if (window.innerWidth >= 1440) dispatch({ type: "navHidden", payload: false });
    };
    window.addEventListener("resize", onResizeNavDisplay);

    return () => window.removeEventListener("resize", onResizeNavDisplay);
  }, [dispatch]);

  useEffect(() => {
    document.title = currentMovie ? `${currentMovie.title} ${currentMovie.release_date?.slice(0, 4)} | MoviePulse` : "MoviePulse";

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", `Discover details about "${currentMovie.title}", released in ${currentMovie.release_date?.slice(0, 4)}. Explore its cast, synopsis, and trailers.`);
    }
  }, [currentMovie]);

  return (
    <section className="flex w-full items-center h-full relative">
      <SideNav pathLocation={location} />

      {isLoading ? <Spinner /> : <MovieDetails movie={currentMovie} pathLocation={location} />}
    </section>
  );
};

export default SingleMoviePage;
