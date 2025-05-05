import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { formatDate, truncateDecimals } from "../../utils";
import useAuth from "../../hooks/useAuth";
import ImdbIcon from "/assets/icons/imdb_icon.svg";
import RottenIcon from "/assets/icons/rotten_tomatoes_icon.svg";

const URL = import.meta.env.VITE_IMAGE_URL;

const FavoriteMovieCard = ({ movie }) => {
  const { id } = useAuth();

  const [isMovieInFavorites, setIsMovieInFavorites] = useState(false);

  const currentMovieGenres = movie?.movie_genres;

  const imageURL = movie?.movie_poster_path ? `${URL}/${movie.movie_poster_path}` : "/assets/images/no_image_found.png";

  const releaseYear = formatDate(movie?.movie_release_date, "yyyy");

  const mediaType = movie?.movie_media_type;

  const removeFavoriteMovie = async () => {
    if (!id) return;
    await supabase.from("favorite_movies").delete().eq("user_id", id).eq("movie_id", movie.movie_id);
    setIsMovieInFavorites(false);
  };

  useEffect(() => {
    const checkIfMovieIsFavorite = async () => {
      const { data, error } = await supabase.from("favorite_movies").select("*").eq("user_id", id).eq("movie_id", movie.movie_id);

      if (error) {
        console.error("Error checking favorite movies:", error);
      } else if (data.length > 0) {
        // True is movie already exists in the favorites list
        setIsMovieInFavorites(true);
      }
    };

    checkIfMovieIsFavorite();
  }, [id, movie.movie_id]);

  return (
    <li className="w-full h-fit flex flex-col items-start justify-center gap-3">
      <div
        className="lg:h-[490px] sm:h-[600px] h-[530px] w-full bg-gray-400 bg-blend-multiply"
        style={{
          backgroundImage: `url(${imageURL})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}>
        <div className="w-full flex items-center justify-between pt-4 px-4">
          <span className={mediaType === "tv-series" ? "py-[3px] px-2 rounded-xl uppercase bg-[#F3F4F680] text-[14px]" : ""}>{mediaType === "tv-series" ? "tv series" : ""}</span>

          <span className="cursor-pointer" onClick={() => isMovieInFavorites && removeFavoriteMovie()}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <foreignObject x="-2" y="-1.42105" width="34" height="33.2105">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    backdropFilter: "blur(1px)",
                    WebkitBackdropFilter: "blur(1px)", // For Safari support
                    clipPath: "url(#bgblur_0_44049_78_clip_path)",
                    height: "100%",
                    width: "100%",
                  }}></div>
              </foreignObject>
              <ellipse data-figma-bg-blur-radius="2" cx="15" cy="15.1842" rx="15" ry="14.6053" fill="#F3F4F6" fillOpacity="0.5" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.17157 10.4828C9.73367 8.96185 12.2663 8.96185 13.8284 10.4828L15 11.6236L16.1716 10.4828C17.7337 8.96185 20.2663 8.96185 21.8284 10.4828C23.3905 12.0038 23.3905 14.4698 21.8284 15.9908L15 22.6396L8.17157 15.9908C6.60948 14.4698 6.60948 12.0038 8.17157 10.4828Z"
                fill={isMovieInFavorites ? "#BE123C" : "#D1D5DB"}
              />
              <defs>
                <clipPath id="bgblur_0_44049_78_clip_path" transform="translate(2 1.42105)">
                  <ellipse cx="15" cy="15.1842" rx="15" ry="14.6053" />
                </clipPath>
              </defs>
            </svg>
          </span>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center gap-3 w-full">
        <div className="text-[#9CA3AF] font-bold text-[14px] flex gap-2 items-start w-full">
          {movie.movie_origin_country && (
            <p className="flex items-center justify-center gap-0.5">
              {movie.movie_origin_country.length > 1
                ? movie.movie_origin_country.map((c, i) => (
                    <span key={i}>
                      {c}
                      {i < movie.movie_origin_country.length - 1 && ", "}
                    </span>
                  ))
                : movie.movie_origin_country}
            </p>
          )}
          <span>{releaseYear}</span>
        </div>

        <Link to={`/${mediaType}/${movie.movie_id}`} className="w-fit">
          <h2 className="text-[#111827] text-lg font-bold w-full">{movie.movie_title}</h2>
        </Link>

        <div className="flex items-center justify-between md:w-full w-[250px] text-[#111827] text-[15px]">
          <p className="flex items-center justify-center gap-2.5  font-normal">
            <img src={ImdbIcon} alt="IMDB icon" />
            <span>{truncateDecimals(movie.movie_vote_average * 10, 1)} / 100</span>
          </p>

          <p className="flex items-center justify-center gap-2.5 font-normal">
            <img src={RottenIcon} alt="Rotten Tomatoes icon" />
            <span>{Math.ceil(movie.movie_vote_average * 10)}%</span>
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-1 w-full text-[#9CA3AF] text-[14px] font-bold">
          {currentMovieGenres.map((genre, index) => (
            <p key={index}>
              {genre}
              {index < currentMovieGenres.length - 1 && ","}
            </p>
          ))}
        </div>
      </div>
    </li>
  );
};

export default FavoriteMovieCard;
