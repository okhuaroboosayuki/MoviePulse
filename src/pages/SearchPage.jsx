import { useSearchParams } from "react-router-dom";
import { Footer, HomeNav, MovieList, Spinner } from "../components";
import useMovies from "../hooks/useMovies";
import { useEffect } from "react";

const SearchPage = () => {
  const { isLoading, searchResults, searchMovies } = useMovies();

  const [searchQuery] = useSearchParams();
  const query = searchQuery.get("q");

  useEffect(() => {
    searchMovies(query);

    document.title = query ? `Search Results for “${query}” | MoviePulse` : "MoviePulse";

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        query
          ? `Explore MoviePulse’s search results for “${query}”—browse matching movies and TV shows by rating, watch trailers, and discover your next favorite title.`
          : "Discover trending, top-rated & upcoming movies and TV series on MoviePulse."
      );
    }
  }, [query, searchMovies]);

  const sortedSearchResults = (Array.isArray(searchResults) ? searchResults : []).sort((a, b) => b.vote_average - a.vote_average);

  return (
    <div className="flex items-center justify-center h-full flex-col w-full lg:px-15 xl:px-27 sm:px-8 px-3">
      <HomeNav textColor={"text-[#111827]"} borderColor={"border-[#111827]/50"} svgStrokeColor={"#111827"} />

      <div className="mt-13 w-full">{isLoading ? <Spinner /> : <MovieList movies={sortedSearchResults} title="search results:" msgText="no results found" queryText={query} />}</div>

      <Footer />
    </div>
  );
};

export default SearchPage;
