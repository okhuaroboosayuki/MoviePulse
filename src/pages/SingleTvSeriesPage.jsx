import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MovieDetails, SideNav, Spinner } from "../components";
import useMovies from "../hooks/useMovies";

const SingleTvSeriesPage = () => {
  const { isLoading, currentSeries, fetchSingleSeries, dispatch } = useMovies();

  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleSeries(id);
  }, [fetchSingleSeries, id]);

  useEffect(() => {
    const onResizeNavDisplay = () => {
      if (window.innerWidth < 1445) dispatch({ type: "navHidden", payload: true });
      if (window.innerWidth >= 1445) dispatch({ type: "navHidden", payload: false });
    };
    window.addEventListener("resize", onResizeNavDisplay);

    return () => window.removeEventListener("resize", onResizeNavDisplay);
  }, [dispatch]);

  useEffect(() => {
    document.title = currentSeries ? `${currentSeries.name} ${currentSeries.first_air_date?.slice(0, 4)} | MoviePulse` : "MoviePulse";

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", `Dive into the details of "${currentSeries.name}", Discover the plot, cast, and more about this captivating TV series on MoviePulse.`);
    }
  }, [currentSeries]);

  return (
    <section className="flex w-full items-center h-full">
      <SideNav pathLocation={location} />

      {isLoading ? <Spinner /> : <MovieDetails movie={currentSeries} pathLocation={location} />}
    </section>
  );
};

export default SingleTvSeriesPage;
