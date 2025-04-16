import { createContext, useCallback, useEffect, useReducer } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const fetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

const MoviesContext = createContext();

const initialState = {
  isLoading: false,
  trendingMovies: [],
  genres: [],
  searchResults: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "trending/loaded":
      return {
        ...state,
        trendingMovies: action.payload,
      };
    case "genres/loaded":
      return {
        ...state,
        genres: action.payload,
      };
    case "searchResults/loaded":
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};

const MoviesProvider = ({ children }) => {
  const [{ isLoading, trendingMovies, genres, searchResults }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchAllData = async () => {
      dispatch({ type: "loading", payload: true });

      try {
        const [moviesResponse, movieGenresResponse, tvGenresResponse] = await Promise.all([
          fetch(`${BASE_URL}/trending/all/day?language=en-US`, fetchOptions).then((res) => res.json()),
          fetch(`${BASE_URL}/genre/movie/list?language=en`, fetchOptions).then((res) => res.json()),
          fetch(`${BASE_URL}/genre/tv/list?language=en`, fetchOptions).then((res) => res.json()),
        ]);

        // Combine genres from both movie and TV genres responses and remove duplicates
        const seenIds = new Set();
        const combinedGenres = [...movieGenresResponse.genres, ...tvGenresResponse.genres].filter((genre) => {
          if (seenIds.has(genre.id)) {
            return false;
          } else {
            seenIds.add(genre.id);
            return true;
          }
        });

        dispatch({ type: "trending/loaded", payload: moviesResponse.results });
        dispatch({ type: "genres/loaded", payload: combinedGenres });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

    fetchAllData();
  }, []);

  const searchMovies = useCallback(
    async (searchQuery) => {
      dispatch({ type: "loading", payload: true });

      try {
        const response = await fetch(`${BASE_URL}/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=1`, fetchOptions);
        const searchData = await response.json();

        dispatch({ type: "searchResults/loaded", payload: searchData.results || [] });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    },
    [dispatch]
  );

  return <MoviesContext.Provider value={{ isLoading, trendingMovies, genres, searchResults, searchMovies, dispatch }}>{children}</MoviesContext.Provider>;
};

export { MoviesProvider, MoviesContext };
