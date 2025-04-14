import HomeNav from "./HomeNav";
import SwiperCarousel from "./Swiper";

const Header = () => {
  return (
    <header className="absolute top-0 w-full flex flex-col items-center lg:px-15 xl:px-25 px-8 h-screen">
      <HomeNav textColor={"text-white"} borderColor={"border-white"} />
      <SwiperCarousel />
    </header>
  );
};

export default Header;
