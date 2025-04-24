import { useEffect } from "react";
import { Footer, HomeNav, MovieList, Spinner } from "../components";
import useMovies from "../hooks/useMovies";

const UpcomingPage = () => {
  const { isLoading, upcomingMovies, fetchUpcomingMovies } = useMovies();

  useEffect(() => {
    fetchUpcomingMovies("us");
  }, [fetchUpcomingMovies]);

  const sortedUpcomingMovies = upcomingMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

  return (
    <div className="flex items-center justify-center h-full flex-col w-full lg:px-15 xl:px-27 sm:px-8 px-3">
      <HomeNav textColor={"text-[#111827]"} borderColor={"border-[#111827]/50"} svgStrokeColor={"#111827"} />

      <div className="mt-13 w-full">{isLoading ? <Spinner /> : <MovieList movies={sortedUpcomingMovies} title="upcoming movies" queryText={"us"} media="upcoming" />}</div>

      <Footer />
    </div>
  );
};

export default UpcomingPage;
