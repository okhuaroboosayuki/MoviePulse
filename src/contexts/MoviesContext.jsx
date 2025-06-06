import { createContext, useCallback, useEffect, useReducer } from "react";
import { supabase } from "../supabase/supabaseClient";

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
  isNavHidden: false,
  trendingMovies: [],
  genres: [],
  searchResults: [],
  allMovies: [],
  allTvSeries: [],
  upcomingMovies: [],
  currentMovie: {},
  currentSeries: {},
  currentUpcomingMovie: {},
  userFavoriteMovies: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "navHidden":
      return {
        ...state,
        isNavHidden: action.payload,
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
    case "movies/loaded":
      return {
        ...state,
        allMovies: action.payload,
      };
    case "series/loaded":
      return {
        ...state,
        allTvSeries: action.payload,
      };
    case "upcoming/loaded":
      return {
        ...state,
        upcomingMovies: action.payload,
      };
    case "singleMovie/loaded":
      return {
        ...state,
        currentMovie: action.payload,
      };
    case "singleSeries/loaded":
      return {
        ...state,
        currentSeries: action.payload,
      };
    case "singleUpcomingMovie/loaded":
      return {
        ...state,
        currentUpcomingMovie: action.payload,
      };
    case "favoriteMovies/loaded":
      return {
        ...state,
        userFavoriteMovies: action.payload,
      };
    default:
      return state;
  }
};

const MoviesProvider = ({ children }) => {
  const [{ ...state }, dispatch] = useReducer(reducer, initialState);

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

  const fetchMovies = useCallback(async () => {
    dispatch({ type: "loading", payload: true });

    try {
      const response = await fetch(`${BASE_URL}/movie/popular?language=en-US&page=1`, fetchOptions);
      const moviesData = await response.json();

      dispatch({ type: "movies/loaded", payload: moviesData.results || [] });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }, [dispatch]);

  const fetchSeries = useCallback(async () => {
    dispatch({ type: "loading", payload: true });

    try {
      const response = await fetch(`${BASE_URL}/tv/top_rated?language=en-US&page=1`, fetchOptions);
      const tvSeriesData = await response.json();

      dispatch({ type: "series/loaded", payload: tvSeriesData.results || [] });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }, [dispatch]);

  const fetchUpcomingMovies = useCallback(
    async (region) => {
      dispatch({ type: "loading", payload: true });

      try {
        const response = await fetch(`${BASE_URL}/movie/upcoming?language=en-US&page=1&region=${region}`, fetchOptions);
        const upcomingMoviesData = await response.json();

        dispatch({ type: "upcoming/loaded", payload: upcomingMoviesData.results || [] });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    },
    [dispatch]
  );

  const fetchSingleMovie = useCallback(
    async (id) => {
      dispatch({ type: "loading", payload: true });

      try {
        const response = await fetch(`${BASE_URL}/movie/${id}?append_to_response=videos,credits,similar&language=en-US`, fetchOptions);
        const currentMovieData = await response.json();

        dispatch({ type: "singleMovie/loaded", payload: currentMovieData || {} });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    },
    [dispatch]
  );

  const fetchSingleSeries = useCallback(
    async (id) => {
      dispatch({ type: "loading", payload: true });

      try {
        const response = await fetch(`${BASE_URL}/tv/${id}?append_to_response=videos,credits,similar&language=en-US`, fetchOptions);
        const currentSeriesData = await response.json();

        dispatch({ type: "singleSeries/loaded", payload: currentSeriesData || {} });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    },
    [dispatch]
  );

  const fetchSingleUpcomingMovie = useCallback(
    async (id) => {
      dispatch({ type: "loading", payload: true });

      try {
        const response = await fetch(`${BASE_URL}/movie/${id}?append_to_response=videos,credits,similar&language=en-US`, fetchOptions);
        const currentUpcomingMovieData = await response.json();

        dispatch({ type: "singleUpcomingMovie/loaded", payload: currentUpcomingMovieData || {} });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    },
    [dispatch]
  );

  const fetchUserFavoriteMovies = useCallback(
    async (id) => {
      dispatch({ type: "loading", payload: true });
      try {
        const { data } = await supabase.from("favorite_movies").select("*").eq("user_id", id);
        dispatch({ type: "favoriteMovies/loaded", payload: data });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    },
    [dispatch]
  );

  const handleNavDisplay = () => {
    dispatch({ type: "navHidden", payload: !state.isNavHidden });
  };

  return (
    <MoviesContext.Provider
      value={{
        ...state,
        searchMovies,
        fetchUpcomingMovies,
        fetchMovies,
        fetchSeries,
        fetchSingleMovie,
        fetchSingleSeries,
        fetchSingleUpcomingMovie,
        fetchUserFavoriteMovies,
        handleNavDisplay,
        dispatch,
      }}>
      {children}
    </MoviesContext.Provider>
  );
};

export { MoviesProvider, MoviesContext };
