import { useEffect } from "react";
import { Footer, HomeNav, MovieList, Spinner } from "../components";
import useMovies from "../hooks/useMovies";
import { setDocumentOverFlowDisplay } from "../utils";

const TvSeriesPage = () => {
  const { isLoading, allTvSeries, fetchSeries } = useMovies();

  useEffect(() => {
    fetchSeries();
    setDocumentOverFlowDisplay(false);
  }, [fetchSeries]);

  const sortedSeries = (Array.isArray(allTvSeries) ? allTvSeries : []).sort((a, b) => b.vote_average - a.vote_average);

  return (
    <>
      <title>Top Rated TV Series | MoviePulse</title>
      <meta name="description" content="Stay up-to-date with top rated TV series on MoviePulse. From gripping dramas to binge-worthy comedies, find your next series obsession here." />

      <div className="flex items-center justify-center h-full flex-col w-full lg:px-15 xl:px-27 sm:px-8 px-3">
        <HomeNav textColor={"text-[#111827]"} borderColor={"border-[#111827]/50"} svgStrokeColor={"#111827"} />

        <div className="mt-13 w-full">{isLoading ? <Spinner /> : <MovieList movies={sortedSeries} title="tv series" media="tv-series" />}</div>

        <Footer />
      </div>
    </>
  );
};

export default TvSeriesPage;
