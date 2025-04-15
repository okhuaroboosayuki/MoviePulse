import { Footer, MovieList, Spinner } from "../components";
import HomeNav from "../components/HomeNav";
import useMovies from "../hooks/useMovies";

const FeaturedMovies = () => {
  const { isLoading, trendingMovies } = useMovies();

  return (
    <div className="flex items-center justify-center h-full flex-col w-full lg:px-15 xl:px-27 sm:px-8 px-3">
      <HomeNav textColor={"text-[#111827]"} borderColor={"border-[#111827]/50"} svgStrokeColor={"#111827"} />

      <div className="mt-13 w-full">{isLoading ? <Spinner /> : <MovieList movies={trendingMovies} title="featured movies" />}</div>

      <Footer />
    </div>
  );
};

export default FeaturedMovies;
