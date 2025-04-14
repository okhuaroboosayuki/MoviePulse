import { Footer, MovieList, Spinner } from "../components";
import HomeNav from "../components/HomeNav";
import useMovies from "../hooks/useMovies";

const FeaturedMovies = () => {
  const { isLoading, trendingMovies } = useMovies();

  return (
    <div className="flex items-center justify-center h-full flex-col w-full lg:px-15 xl:px-27 sm:px-8 px-3">
      <HomeNav textColor={"text-[#111827]"} borderColor={"border-[#111827]/50"} />

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex items-center justify-center flex-col w-full mt-20">
          <div className="flex items-center justify-center w-full">
            <h1 className="font-bold md:text-4xl sm:text-2xl text-[20px] capitalize">featured movies</h1>
          </div>

          <MovieList movies={trendingMovies} />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default FeaturedMovies;
