import { useEffect } from "react";
import { FavoriteMovieList, Footer, HomeNav, Spinner } from "../components";
import { supabase } from "../supabase/supabaseClient";
import { setDocumentOverFlowDisplay } from "../utils";
import useMovies from "../hooks/useMovies";
import useAuth from "../hooks/useAuth";

const FavoriteMoviesPage = () => {
  const { isLoading, userFavoriteMovies, fetchUserFavoriteMovies } = useMovies();
  const { id } = useAuth();

  const totalNumberOfResults = userFavoriteMovies?.length;

  useEffect(() => {
    fetchUserFavoriteMovies(id);
    setDocumentOverFlowDisplay(false);
  }, [fetchUserFavoriteMovies, id]);

  useEffect(() => {
    const channel = supabase.channel("favorite-movies");

    channel
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "favorite_movies" }, () => {
        fetchUserFavoriteMovies(id);
      })
      .subscribe();
  }, [fetchUserFavoriteMovies, id]);

  return (
    <>
      <title>Featured Trending Movies & TV Series | MoviePulse</title>
      <meta name="description" content="Stay up-to-date with the latest trending movies and TV series on MoviePulse. Browse top picks, watch trailers, and discover your next favorite film or show." />

      <section className="flex items-center justify-center h-full flex-col w-full lg:px-15 xl:px-27 sm:px-8 px-3">
        <HomeNav textColor={"text-[#111827]"} borderColor={"border-[#111827]/50"} svgStrokeColor={"#111827"} />

        <div className="mt-13 w-full flex flex-col items-center justify-center gap-8 lg:gap-10 px-4 sm:px-0">
          <div className={`flex items-center gap-2 sm:gap-0 justify-between ${totalNumberOfResults > 0 && "flex-col sm:flex-row"} w-full`}>
            <h1 className="font-bold md:text-4xl sm:text-2xl text-[20px] capitalize">favorites</h1>

            {totalNumberOfResults > 0 && (
              <p className="flex items-center justify-center gap-1 font-medium text-gray-500 sm:text-lg text-base">
                <span>"{totalNumberOfResults}" favorite movies</span>
              </p>
            )}
          </div>

          {isLoading ? <Spinner /> : <FavoriteMovieList movies={userFavoriteMovies} msgText="you have no favorite movies or show" />}
        </div>

        <Footer />
      </section>
    </>
  );
};

export default FavoriteMoviesPage;
