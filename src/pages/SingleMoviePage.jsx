import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import { SideNav, Spinner } from "../components";
import useMovies from "../hooks/useMovies";

const URL = import.meta.env.VITE_IMAGE_URL;

const SingleMoviePage = () => {
  const { isLoading, currentMovie, fetchSingleMovie } = useMovies();

  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleMovie(id);
  }, [fetchSingleMovie, id]);

  console.log(currentMovie);
  const videoResults = currentMovie?.videos?.results || [];
  const filteredVideoResults = videoResults?.length > 1 ? videoResults?.filter((video) => video.name === "Official Trailer") : videoResults;
  const videoKey = filteredVideoResults[0]?.key;

  const imageURL = currentMovie.backdrop_path || currentMovie.poster_path ? `${URL}/${currentMovie.backdrop_path || currentMovie.poster_path}` : "/assets/images/no_image_found.png";

  return (
    <section className="flex w-full items-center h-full relative">
      <SideNav pathLocation={location} />

      {isLoading ? (
        <Spinner />
      ) : (
        <section className="flex self-center w-[80%] h-full ml-[18%]">
          {videoKey ? (
            <ReactPlayer
              className="react-player"
              url={`https://www.youtube.com/watch?v=${videoKey}`}
              light={<img src={imageURL} alt={`${currentMovie.title} thumbnail`} />}
              controls={true}
              playing={true}
              fallback={<Spinner />}
            />
          ) : (
            <div
              className="h-[449px] w-full bg-gray-400 bg-blend-multiply rounded-[20px] mt-5 flex items-center justify-center"
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
        </section>
      )}
    </section>
  );
};

export default SingleMoviePage;
