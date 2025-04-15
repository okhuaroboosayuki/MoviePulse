import { Footer, HomeNav, MovieList, Spinner } from "../components";
import useMovies from "../hooks/useMovies";

const SearchPage = () => {
  const { isLoading, searchResults } = useMovies();

  const sortedSearchResults = searchResults.sort((a, b) => b.vote_count - a.vote_count);

  const totalNumberOfResults = searchResults.length;

  return (
    <div className="flex items-center justify-center h-full flex-col w-full lg:px-15 xl:px-27 sm:px-8 px-3">
      <HomeNav textColor={"text-[#111827]"} borderColor={"border-[#111827]/50"} svgStrokeColor={"#111827"} />

      <div className="mt-13 w-full">{isLoading ? <Spinner /> : <MovieList movies={sortedSearchResults} title="search results:" msgText="no results found" totalNum={totalNumberOfResults} />}</div>

      <Footer />
    </div>
  );
};

export default SearchPage;
