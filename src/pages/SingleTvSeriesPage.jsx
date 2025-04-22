import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MovieDetails, SideNav, Spinner } from "../components";
import useMovies from "../hooks/useMovies";

const SingleTvSeriesPage = () => {
  const { isLoading, currentSeries, fetchSingleSeries } = useMovies();

  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleSeries(id);
  }, [fetchSingleSeries, id]);
  console.log(currentSeries);

  return (
    <section className="flex w-full items-center h-full">
      <SideNav pathLocation={location} />

      {isLoading ? <Spinner /> : <MovieDetails movie={currentSeries} pathLocation={location} />}
    </section>
  );
};

export default SingleTvSeriesPage;
