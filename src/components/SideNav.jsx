import { useNavigate, useParams } from "react-router-dom";
import Logo from "/assets/icons/tv.png";
import { CalendarIcon, HomeIcon, LogoutIcon, ProjectorIcon, TvIcon } from "../jsx-icons";
import CustomNavLink from "./CustomNavLink";
import useMovies from "../hooks/useMovies";
import useAuth from "../hooks/useAuth";

const SideNav = ({ pathLocation }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isNavHidden, handleNavDisplay } = useMovies();
  const { signOut } = useAuth();

  const isMovie = pathLocation.pathname.includes("movie");
  const isTvSeries = pathLocation.pathname.includes("tv-series");

  const dynamicPath = isMovie ? "movie" : isTvSeries ? "tv-series" : "upcoming";

  const isActivePath = (path) => location.pathname === path;

  const handleSignOut = () => {
    signOut();
    navigate("/sign-in");
  };

  return (
    <nav className="fixed top-0 left-0 overflow-y-scroll hidden-scrollbar transition-1000-in bg-white flex flex-col item-center py-8 gap-18 border-r h-screen border-r-gray-400 rounded-tr-[4%] rounded-br-[4%] z-10">
      <div className="flex items-center gap-3 lg:gap-6 text-lg lg:text-2xl font-bold xl:pl-8 pl-1.5 cursor-pointer" onClick={handleNavDisplay}>
        <img src={Logo} alt="MoviePulse's logo" />
        {!isNavHidden && <span className="text-[#333333] xl:text-2xl text-xl">MoviePulse</span>}
      </div>

      <ol className="flex flex-col w-full items-start justify-center gap-5.5">
        <CustomNavLink to={"/"}>
          <HomeIcon width={"25px"} height={"25px"} fillColor="#808080" />
          {!isNavHidden && <span>home</span>}
        </CustomNavLink>
        <CustomNavLink to={dynamicPath === "movie" ? `/movie/${id}` : "/movies"}>
          <ProjectorIcon width={"25px"} height={"25px"} fillColor={isActivePath(`/movie/${id}`) ? "#000000" : "#808080"} />
          {!isNavHidden && <span>movies</span>}
        </CustomNavLink>
        <CustomNavLink to={dynamicPath === "tv-series" ? `/tv-series/${id}` : "/tv-series"}>
          <TvIcon width={"25px"} height={"25px"} fillColor={isActivePath(`/tv-series/${id}`) ? "#000000" : "#808080"} />
          {!isNavHidden && <span>TV Series</span>}
        </CustomNavLink>
        <CustomNavLink to={dynamicPath === "upcoming" ? `/upcoming/${id}` : "/upcoming"}>
          <CalendarIcon width={"25px"} height={"25px"} fillColor={isActivePath(`/upcoming/${id}`) ? "#000000" : "#808080"} />
          {!isNavHidden && <span>upcoming</span>}
        </CustomNavLink>
      </ol>

      {!isNavHidden && (
        <div className="border border-[#BE123CB2] rounded-[20px] px-4 pt-10.5 pb-5.5 flex items-start gap-2 flex-col mx-10">
          <p className="w-[137px] text-[15px] text-[#333333CC] font-semibold">Play movie quizes and earn free tickets</p>
          <p className="text-[#666666] text-xs w-[139px] font-medium">50k people are playing now</p>
          <button className="border border-[#BE123C33] bg-[#BE123C33] self-center rounded-[30px] py-1.5 px-4 text-[#BE123C] text-xs font-medium cursor-pointer">Start playing</button>
        </div>
      )}

      <button className="flex item-center gap-2.5 px-4 text-[#666666] text-xl font-semibold cursor-pointer xl:ml-10 -mt-6" onClick={handleSignOut}>
        <LogoutIcon width={"25px"} height={"25px"} fillColor="#808080" />
        {!isNavHidden && <span>Log out</span>}
      </button>
    </nav>
  );
};

export default SideNav;
