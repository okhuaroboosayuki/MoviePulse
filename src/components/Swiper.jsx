import PlayIcon from "/assets/icons/play_Icon.svg";
import ImdbIcon from "/assets/icons/imdb_icon.svg";
import RottenIcon from "/assets/icons/rotten_tomatoes_icon.svg";
import useMovies from "../hooks/useMovies";
import { truncateDecimals } from "../utils";

import { Link } from "react-router-dom";
import { Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

const URL = import.meta.env.VITE_IMAGE_URL;

const screenSizeLarge = window.matchMedia("(min-width: 1024px)").matches;

const SwiperCarousel = () => {
  const { isLoading, trendingMovies } = useMovies();

  const slicedData = trendingMovies.slice(15, 20);

  const pagination = {
    clickable: true,
    el: ".swiper-pagination",
    renderBullet: function (index, className) {
      return `<span class="${className}">${index + 1}</span>`;
    },
  };

  return (
    <Swiper
      modules={[Pagination, Scrollbar, A11y, Autoplay]}
      direction="horizontal"
      allowTouchMove={!screenSizeLarge ? true : false}
      loop={true}
      speed={2500}
      slidesPerView={1}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={pagination}
      effect="fade"
      fadeEffect={{ crossFade: true }}>
      {!isLoading &&
        slicedData.map((movie) => {
          const imageURL = `${URL}/${movie.backdrop_path}`;
          const mediaType = movie.media_type === "movie" ? "movie" : "tv-series";

          return (
            <SwiperSlide key={movie.id}>
              <div
                className="flex flex-col justify-center w-full h-full bg-gray-600 bg-blend-multiply"
                style={{
                  backgroundImage: `url(${imageURL})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}>
                <div className="sm:w-[604px] w-full xl:ml-25 lg:ml-15 sm:ml-10 px-9 flex flex-col sm:items-start items-center justify-center gap-6">
                  <h1 className="text-white sm:text-5xl text-3xl font-bold text-center sm:text-start">{movie.title || movie.name}</h1>

                  <div className="flex items-center justify-center gap-10 text-[15px] sm:text-base">
                    <p className="flex items-center justify-center gap-2.5 text-white font-normal">
                      <img src={ImdbIcon} alt="IMDB icon" />
                      <span>{truncateDecimals(movie.vote_average * 10, 1)} / 100</span>
                    </p>

                    <p className="flex items-center justify-center gap-2.5 text-white font-normal">
                      <img src={RottenIcon} alt="Rotten Tomatoes icon" />
                      <span>{Math.ceil(movie.vote_average * 10)}%</span>
                    </p>
                  </div>

                  <p className="text-white font-medium text-center sm:text-start text-balance sm:text-base text-[15px]">{movie.overview}</p>

                  <Link to={`/${mediaType}/${movie.id}`} className="flex items-center gap-2 bg-[#BE123C] py-3 px-6 text-white rounded-md text-[15px] sm:text-base">
                    <img src={PlayIcon} alt="Play icon" />
                    <span className="uppercase font-bold">watch trailer</span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

      <div className="swiper-pagination-wrapper">
        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
  );
};

export default SwiperCarousel;
