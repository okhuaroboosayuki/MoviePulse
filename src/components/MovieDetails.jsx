import ReactPlayer from "react-player/lazy";
import { formatDate, formatNumber, formatRuntime, truncateDecimals } from "../utils";
import StarIcon from "/assets/icons/star_icon.svg";
import TicketsIcon from "/assets/icons/tickets_icon.svg";
import ListIcon from "/assets/icons/list_icon.svg";
import Spinner from "./Spinner";

const URL = import.meta.env.VITE_IMAGE_URL;

const MovieDetails = ({ movie, pathLocation }) => {
  const isMovie = pathLocation.pathname.includes("movie");
  const isTvSeries = pathLocation.pathname.includes("tv-series");

  const dynamicPath = isMovie ? "movie" : isTvSeries ? "tv-series" : "upcoming";

  const movieTitle = dynamicPath === "movie" ? movie?.title : movie?.name;
  const movieReleaseDate = dynamicPath === "movie" ? movie?.release_date : movie?.first_air_date;

  const movieCast = movie?.credits?.cast || [];
  const movieCrew = movie?.credits?.crew || [];

  const director_or_producer =
    dynamicPath === "movie"
      ? movieCrew?.filter((crew) => crew.department === "Directing").filter((director) => director.job === "Director")
      : movieCrew?.filter((crew) => crew.department === "Production").filter((producer) => producer.job === "Executive Producer");

  const writers = dynamicPath === "movie" ? movieCrew?.filter((crew) => crew.department === "Writing") : movieCrew?.filter((crew) => crew.known_for_department === "Writing");
  const filteredWriters = writers.find((writer) => writer.job === "Story") ? writers.filter((writer) => writer.job === "Story") : writers;

  console.log(movieCrew);

  const videoResults = movie?.videos?.results || [];
  const filteredVideoResults = videoResults?.length > 1 ? videoResults?.filter((video) => video.name === "Official Trailer") : videoResults;
  const videoKey = filteredVideoResults[0]?.key;

  const imageURL = movie.backdrop_path || movie.poster_path ? `${URL}/${movie.backdrop_path || movie.poster_path}` : "/assets/images/no_image_found.png";

  return (
    <section className="flex flex-col self-center w-[80%] h-full ml-[18%]">
      {videoKey ? (
        <ReactPlayer
          className="react-player"
          url={`https://www.youtube.com/watch?v=${videoKey}`}
          light={<img src={imageURL} alt={`${movie.title} thumbnail`} />}
          controls={true}
          playing={true}
          fallback={<Spinner />}
        />
      ) : (
        <section
          className="h-[449px] w-full bg-gray-400 bg-blend-multiply rounded-[20px] mt-9 flex items-center justify-center"
          style={{
            backgroundImage: `url(${imageURL})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            objectFit: "cover",
          }}>
          <div className="bg-[#ffffff]/70 border-2 border-[#E8E8E833]/20 p-4 rounded-md">
            <p className="text-lg text-[#000000] font-semibold capitalize">no trailer available</p>
          </div>
        </section>
      )}

      <section className="flex items-start justify-between px-5 py-7 gap-4">
        <div className="flex flex-col gap-6 items-start justify-center w-full">
          <div className="flex items-center gap-8 flex-wrap">
            <p className="flex items-center justify-center gap-2 text-[23px] w-fit text-[#404040] font-medium">
              <span title="Movie title">{movieTitle}</span>•<span title="Release date">{movieReleaseDate ? formatDate(movieReleaseDate, "yyyy") : "N/A"}</span>•
              <span title="Motion Picture Association Rating">{movie?.adult === false ? "PG-13" : "PG"}</span>•<span title="Runtime">{movie?.runtime && formatRuntime(movie?.runtime)}</span>
            </p>

            <p className="flex items-center flex-wrap justify-center gap-1 text-[#B91C1C] text-[15px] font-medium capitalize">
              {movie?.genres?.map((genre) => (
                <span className="border border-[#F8E7EB] rounded-[15px] py-1 px-4" key={genre.id} title="Genre">
                  {genre.name}
                </span>
              ))}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <p className="w-[700px] text-xl text-[#333333]">{movie.overview}</p>

            <div className="flex flex-col text-[#333333] text-xl gap-7">
              <p className="flex items-center justify-start gap-1.5">
                {dynamicPath === "movie" ? "Director(s)" : "Executive Producer(s)"}:{" "}
                {director_or_producer.length < 1 ? (
                  <span className="text-[#BE123C] capitalize">data unavailable</span>
                ) : (
                  director_or_producer?.slice(0, 3).map((d, i) => (
                    <a href={`https://en.wikipedia.org/wiki/${d.name}`} key={d.credit_id} className="text-[#BE123C] underline" target="_blank" rel="noreferrer">
                      {d.name}
                      {i < director_or_producer.length - 1 && ","}
                    </a>
                  ))
                )}
              </p>

              <p className="flex items-center gap-2">
                Writer(s):
                <span className="flex items-center justify-center gap-1.5">
                  {filteredWriters.length < 1 ? (
                    <span className="text-[#BE123C] capitalize">data unavailable</span>
                  ) : (
                    filteredWriters?.slice(0, 3).map((writer, index) => (
                      <a href={`https://en.wikipedia.org/wiki/${writer.name}`} key={writer.credit_id} className="text-[#BE123C] underline" target="_blank" rel="noreferrer">
                        {writer.name}
                        {index < writers.length - 1 && ","}
                      </a>
                    ))
                  )}
                </span>
              </p>

              <p className="flex items-center gap-2">
                Stars:
                <span className="flex items-center justify-center gap-1.5">
                  {movieCast?.length < 1 ? (
                    <span className="text-[#BE123C] capitalize">data unavailable</span>
                  ) : (
                    movieCast?.slice(0, 4).map((cast, index) => (
                      <a href={`https://en.wikipedia.org/wiki/${cast.name}`} key={cast.credit_id} className="text-[#BE123C] underline" target="_blank" rel="noreferrer">
                        {cast.name}
                        {index < movieCast.length - 1 && ","}
                      </a>
                    ))
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col px-1 gap-8 w-full">
          <div className="flex items-center justify-end gap-1 text-xl text-[#666666] font-medium">
            <img src={StarIcon} width={25} /> <span title="Average ratings">{truncateDecimals(movie?.vote_average, 1)}</span> | <span title="Popularity">{formatNumber(movie?.popularity)}</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="bg-[#BE123C] py-3.5 px-19.5 rounded-[10px] flex items-center justify-center gap-2.5 text-white text-xl capitalize cursor-pointer" role="button">
              <img src={TicketsIcon} alt="tickets icon" />
              <span>see showtimes</span>
            </div>
            <div
              className="bg-[#BE123C]/10 border border-[#BE123C] py-3.5 px-19.5 rounded-[10px] flex items-center justify-center gap-2.5 text-[#333333] text-xl capitalize cursor-pointer"
              role="button">
              <img src={ListIcon} alt="tickets icon" />
              <span>more watch options</span>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default MovieDetails;
