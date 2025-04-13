import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";

const useMovies = () => {
  const context = useContext(MoviesContext);

  if (context === undefined) {
    throw new Error("useMovies must be used within a CitiesProvider");
  }
  return context;
};

export default useMovies;
