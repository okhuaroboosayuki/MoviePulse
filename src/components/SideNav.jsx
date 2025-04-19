import { useParams } from "react-router-dom";
import Logo from "/assets/icons/tv.png";
import { CalendarIcon, HomeIcon, LogoutIcon, ProjectorIcon, TvIcon } from "../jsx-icons";
import CustomNavLink from "./CustomNavLink";

const SideNav = ({ pathLocation }) => {
  const { id } = useParams();
  const isMovie = pathLocation.pathname.includes("movie");
  const isTvSeries = pathLocation.pathname.includes("tv-series");

  const dynamicPath = isMovie ? "movie" : isTvSeries ? "tv-series" : "upcoming";

  const isActivePath = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 flex flex-col item-center py-8 pl-8 gap-13 border-r border-r-gray-400 rounded-tr-[4%] rounded-br-[4%]">
      <div className="flex items-center gap-3 lg:gap-6 text-lg lg:text-2xl font-bold pr-10">
        <img src={Logo} alt="MoviePulse's logo" />
        <span className="text-[#333333] text-2xl">MoviePulse</span>
      </div>

      <ol className="flex flex-col w-full items-start justify-center gap-9.5 ">
        <CustomNavLink to={"/"}>
          <HomeIcon width={"25px"} height={"25px"} fillColor="#808080" />
          <span>home</span>
        </CustomNavLink>
        <CustomNavLink to={dynamicPath === "movie" ? `/movie/${id}` : "/movies"}>
          <ProjectorIcon width={"25px"} height={"25px"} fillColor={isActivePath(`/movie/${id}`) ? "#000000" : "#808080"} />
          <span>movies</span>
        </CustomNavLink>
        <CustomNavLink to={dynamicPath === "tv-series" ? `/tv-series/${id}` : "/tv-series"}>
          <TvIcon width={"25px"} height={"25px"} fillColor={isActivePath(`/tv-series/${id}`) ? "#000000" : "#808080"} />
          <span>TV Series</span>
        </CustomNavLink>
        <CustomNavLink to={dynamicPath === "upcoming" ? `/upcoming/${id}` : "/upcoming"}>
          <CalendarIcon width={"25px"} height={"25px"} fillColor={isActivePath(`/upcoming/${id}`) ? "#000000" : "#808080"} />
          <span>upcoming</span>
        </CustomNavLink>
      </ol>

      <div className="border border-[#BE123CB2] rounded-[20px] px-4 pt-10.5 pb-5.5 flex items-start gap-2 flex-col mr-10">
        <p className="w-[137px] text-[15px] text-[#333333CC] font-semibold">Play movie quizes and earn free tickets</p>
        <p className="text-[#666666] text-xs w-[139px] font-medium">50k people are playing now</p>
        <button className="border border-[#BE123C33] bg-[#BE123C33] self-center rounded-[30px] py-1.5 px-4 text-[#BE123C] text-xs font-medium cursor-pointer">Start playing</button>
      </div>

      <button className="flex item-center gap-2.5 px-4 text-[#666666] text-xl font-semibold cursor-pointer">
        <LogoutIcon width={"25px"} height={"25px"} fillColor="#808080" />
        <span>Log out</span>
      </button>
    </nav>
  );
};

export default SideNav;
