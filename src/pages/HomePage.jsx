import { Footer, Header, MovieList } from "../components";
import useMovies from "../hooks/useMovies";

const HomePage = () => {
  const { trendingMovies } = useMovies();

  const slicedTrendingMovies = trendingMovies.slice(0, 12);

  return (
    <div className="flex items-center justify-center h-full flex-col w-full relative lg:px-15 xl:px-25 px-8">
      <Header />

      <div className="mt-220">
        <MovieList movies={slicedTrendingMovies} title="featured movies" enableLink={true} />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
