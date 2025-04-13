import { createContext, useEffect, useReducer } from "react";

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
  data: [],
  genres: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "data/loaded":
      return {
        ...state,
        data: action.payload,
      };
    case "genres/loaded":
      return {
        ...state,
        genres: action.payload,
      };
    default:
      return state;
  }
};

const MoviesProvider = ({ children }) => {
  const [{ isLoading, data, genres }, dispatch] = useReducer(reducer, initialState);

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

        dispatch({ type: "data/loaded", payload: moviesResponse.results });
        dispatch({ type: "genres/loaded", payload: combinedGenres });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

    fetchAllData();
  }, []);

  return <MoviesContext.Provider value={{ isLoading, data, genres }}>{children}</MoviesContext.Provider>;
};

export { MoviesProvider, MoviesContext };
