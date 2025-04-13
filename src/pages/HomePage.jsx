import { Footer, Header, MovieList } from "../components";
import rightArrow from "/assets/icons/right_icon.svg";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-full flex-col w-full relative">
      <Header />

      <div className="flex items-center justify-center flex-col w-full mt-20 lg:px-15 xl:px-27 px-8">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-bold md:text-4xl sm:text-2xl text-[20px] capitalize">featured movie</h1>

          <div className="flex items-center justify-center gap-2">
            <span className="sm:text-lg text-base text-[#BE123C]">See more</span>
            <img src={rightArrow} alt="right arrow icon" />
          </div>
        </div>

        <MovieList />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
