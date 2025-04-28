import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { MovieDetails, SideNav, Spinner } from "../components";
import useMovies from "../hooks/useMovies";

const SingleUpcomingMovie = () => {
  const { isLoading, currentUpcomingMovie, fetchSingleUpcomingMovie, dispatch } = useMovies();

  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleUpcomingMovie(id);
  }, [fetchSingleUpcomingMovie, id]);

  useEffect(() => {
    const onResizeNavDisplay = () => {
      if (window.innerWidth < 1445) dispatch({ type: "navHidden", payload: true });
      if (window.innerWidth >= 1445) dispatch({ type: "navHidden", payload: false });
    };
    window.addEventListener("resize", onResizeNavDisplay);

    return () => window.removeEventListener("resize", onResizeNavDisplay);
  }, [dispatch]);

  useEffect(() => {
    document.title = currentUpcomingMovie ? `${currentUpcomingMovie.title}; Coming Soon | MoviePulse` : "MoviePulse";

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", `Get a sneak peek of "${currentUpcomingMovie.title}", coming soon. Explore the storyline, cast, release date, and more about this anticipated movie on MoviePulse.`);
    }
  }, [currentUpcomingMovie]);

  return (
    <section className="flex w-full items-center h-full">
      <SideNav pathLocation={location} />

      {isLoading ? <Spinner /> : <MovieDetails movie={currentUpcomingMovie} pathLocation={location} />}
    </section>
  );
};

export default SingleUpcomingMovie;
