import ReactPlayer from "react-player/lazy";
import { formatDate, formatNumber, formatRuntime, truncateDecimals } from "../utils";
import StarIcon from "/assets/icons/star_icon.svg";
import TicketsIcon from "/assets/icons/tickets_icon.svg";
import ListIcon from "/assets/icons/list_icon.svg";
import Spinner from "./Spinner";
import useMovies from "../hooks/useMovies";

const URL = import.meta.env.VITE_IMAGE_URL;

const MovieDetails = ({ movie, pathLocation }) => {
  const { isNavHidden, handleNavDisplay } = useMovies();

  const handleBodyClick = () => {
    if (!isNavHidden && window.innerWidth < 1440) {
      handleNavDisplay();
    }
  };

  const isMovie = pathLocation.pathname.includes("movie");
  const isTvSeries = pathLocation.pathname.includes("tv-series");

  const dynamicPath = isMovie ? "movie" : isTvSeries ? "tv-series" : "upcoming";

  const movieTitle = dynamicPath === "movie" ? movie?.title : dynamicPath === "tv-series" ? movie?.name : movie?.title;
  const movieReleaseDate = dynamicPath === "movie" || dynamicPath === "upcoming" ? movie?.release_date : movie?.first_air_date;

  const movieCast = movie?.credits?.cast || [];
  const movieCrew = movie?.credits?.crew || [];

  const director_or_producer =
    dynamicPath === "movie" || dynamicPath === "upcoming"
      ? movieCrew?.filter((crew) => crew.department === "Directing").filter((director) => director.job === "Director")
      : movieCrew?.filter((crew) => crew.department === "Production").filter((producer) => producer.job === "Executive Producer");
  const directors_or_producers_tag = dynamicPath === "movie" || dynamicPath === "upcoming" ? "Director(s)" : "Executive Producer(s)";

  const writers = dynamicPath === "movie" ? movieCrew?.filter((crew) => crew.department === "Writing") : movieCrew?.filter((crew) => crew.known_for_department === "Writing");
  const filteredWriters = writers.find((writer) => writer.job === "Story") ? writers.filter((writer) => writer.job === "Story") : writers;

  const videoResults = movie?.videos?.results || [];
  const filteredVideoResults = videoResults?.length > 1 ? videoResults?.filter((video) => video.name === "Official Trailer") : videoResults;
  const videoKey = filteredVideoResults[0]?.key;

  const imageURL = movie.backdrop_path || movie.poster_path ? `${URL}/${movie.backdrop_path || movie.poster_path}` : "/assets/images/no_image_found.png";

  return (
    <section className="flex flex-col self-center w-full h-full 2xl:ml-[16.5%] xl:ml-[10%] ml-[55px] px-5 py-5" onClick={handleBodyClick}>
      {videoKey ? (
        <div className="h-[449px] w-full bg-gray-400 bg-blend-multiply rounded-[20px] flex items-center justify-center">
          <ReactPlayer
            className="react-player"
            url={`https://www.youtube.com/watch?v=${videoKey}`}
            light={<img src={imageURL} alt={`${movie?.title} thumbnail`} />}
            controls={true}
            playing={true}
            fallback={<Spinner />}
          />
        </div>
      ) : (
        <div
          className="h-[449px] w-full bg-gray-400 bg-blend-multiply rounded-[20px] flex items-center justify-center"
          style={{
            backgroundImage: `url(${imageURL})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            objectFit: "cover",
          }}>
          <div className="bg-[#ffffff]/70 border-2 border-[#E8E8E833]/20 p-4 rounded-md">
            <p className="text-lg text-[#000000] font-semibold capitalize">no trailer available</p>
          </div>
        </div>
      )}

      <section className="flex items-start justify-between sm:px-5 py-7 gap-4">
        <div className="flex flex-col gap-6 items-start justify-center w-full">
          <div className="flex items-center w-full justify-between gap-4 lg:gap-8 flex-wrap">
            {/* title, genre */}
            <div className="flex items-center gap-4 lg:gap-8 flex-wrap">
              <p className="flex flex-wrap items-center md:justify-center gap-2 text-xl sm:text-[23px] w-fit text-[#404040] font-medium">
                <span title="Movie title">{movieTitle}</span>
                <span title="Release date">{`• ${movieReleaseDate ? (dynamicPath === "upcoming" ? formatDate(movieReleaseDate, "dd-mm-yyyy") : formatDate(movieReleaseDate, "yyyy")) : "N/A"} •`}</span>
                <span title="Motion Picture Association Rating">{movie?.adult === false ? "PG-13" : "PG"}</span>
                <span title="Runtime">{movie?.runtime === 0 ? "" : `• ${formatRuntime(movie?.runtime)}`}</span>
              </p>

              <p className="flex sm:items-center flex-wrap sm:justify-center sm:gap-1 gap-2 text-[#B91C1C] text-[15px] font-medium capitalize">
                {movie?.genres?.map((genre) => (
                  <span className="border border-[#F8E7EB] rounded-[15px] py-1 sm:px-4 px-2" key={genre.id} title="Genre">
                    {genre.name}
                  </span>
                ))}
              </p>
            </div>

            {/* rating */}
            <div className="flex items-center justify-end gap-1 text-lg sm:text-xl text-[#666666] font-medium">
              <img src={StarIcon} width={25} /> <span title="Average ratings">{truncateDecimals(Number(movie?.vote_average), 1)}</span> |{" "}
              <span title="Popularity">{formatNumber(movie?.popularity)}</span>
            </div>
          </div>

          {/* overview, cast, showtimes */}
          <div className="flex xl:flex-row flex-col xl:items-center items-start gap-5 w-full">
            <div className="flex flex-col gap-5">
              {/* overview */}
              <p className="xl:w-[674px] text-justify w-full text-lg sm:text-xl text-[#333333]">{movie.overview}</p>

              {/* cast */}
              <div className="flex flex-col flex-wrap text-[#333333] text-lg sm:text-xl gap-7 w-full">
                <p className="flex flex-wrap items-center justify-start gap-1.5 w-full">
                  {directors_or_producers_tag}:{" "}
                  {director_or_producer.length < 1 ? (
                    <span className="text-[#BE123C] capitalize">data unavailable</span>
                  ) : (
                    director_or_producer?.slice(0, 3).map((d, i) => (
                      <a href={`https://en.wikipedia.org/wiki/${d.name}`} key={d.credit_id} className="text-[#BE123C] underline text-lg" target="_blank" rel="noreferrer">
                        {d.name}
                        {i < director_or_producer.length - 1 && ","}
                      </a>
                    ))
                  )}
                </p>

                <p className="flex items-center gap-2 w-full flex-wrap">
                  Writer(s):
                  <span className="flex items-center sm:justify-center flex-wrap gap-1.5">
                    {filteredWriters.length < 1 ? (
                      <span className="text-[#BE123C] capitalize">data unavailable</span>
                    ) : (
                      filteredWriters?.slice(0, 3).map((writer, index) => (
                        <a href={`https://en.wikipedia.org/wiki/${writer.name}`} key={writer.credit_id} className="text-[#BE123C] underline text-lg" target="_blank" rel="noreferrer">
                          {writer.name}
                          {index < writers.length - 1 && ","}
                        </a>
                      ))
                    )}
                  </span>
                </p>

                <p className="flex items-center gap-2 w-full flex-wrap">
                  Stars:
                  <span className="flex items-center md:justify-center flex-wrap gap-1.5">
                    {movieCast?.length < 1 ? (
                      <span className="text-[#BE123C] capitalize">data unavailable</span>
                    ) : (
                      movieCast?.slice(0, 4).map((cast, index) => (
                        <a href={`https://en.wikipedia.org/wiki/${cast.name}`} key={cast.credit_id} className="text-[#BE123C] underline text-lg" target="_blank" rel="noreferrer">
                          {cast.name}
                          {index < movieCast.length - 1 && ","}
                        </a>
                      ))
                    )}
                  </span>
                </p>
              </div>
            </div>

            {/* showtimes */}
            <div className="flex flex-col md:items-start xl:items-center self-start gap-8 w-full">
              <div className="flex flex-col gap-3 text-lg sm:text-xl w-full items-center justify-center">
                <div className="bg-[#BE123C] py-3.5 w-full md:px-24.5 rounded-[10px] flex items-center justify-center gap-2.5 text-white capitalize cursor-pointer" role="button">
                  <img src={TicketsIcon} alt="tickets icon" />
                  <span>see showtimes</span>
                </div>

                <div
                  className="bg-[#BE123C]/10 border border-[#BE123C] py-3.5 w-full md:px-19 rounded-[10px] flex items-center justify-center gap-2.5 text-[#333333] capitalize cursor-pointer"
                  role="button">
                  <img src={ListIcon} alt="list icon" />
                  <span>more watch options</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default MovieDetails;
