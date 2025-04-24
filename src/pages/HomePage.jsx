import { Footer, Header, MovieList } from "../components";
import useMovies from "../hooks/useMovies";

const HomePage = () => {
  const { trendingMovies } = useMovies();

  const slicedTrendingMovies = trendingMovies.slice(0, 12);

  return (
    <>
      <title>MoviePulse | Discover Trending, Top-Rated & Upcoming Movies with Trailers</title>
      <meta name="description" content="Discover the latest trending, top-rated, and upcoming movies on MoviePulse. Watch trailers, read reviews, and find your next favorite film." />

      <div className="flex items-center justify-center h-full flex-col w-full relative lg:px-15 xl:px-25 px-8">
        <Header />

        <div className="mt-220 w-full">
          <MovieList movies={slicedTrendingMovies} title="featured movies" enableLink={true} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
