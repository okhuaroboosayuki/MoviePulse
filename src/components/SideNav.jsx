import { Link } from "react-router-dom";
import Logo from "/assets/icons/tv.png";
import { CalendarIcon, HomeIcon, ProjectorIcon, TvIcon } from "../jsx-icons";

const SideNav = () => {
  return (
    <nav className="flex flex-col item-center py-9 px-8 gap-25">
      <Link to={"/"} className="flex items-center justify-center gap-3 lg:gap-6 text-lg lg:text-2xl font-bold z-50">
        <img src={Logo} alt="MoviePulse's logo" />
        <span className="text-[#333333] text-2xl">MoviePulse</span>
      </Link>

      <ol className="flex flex-col w-full items-start justify-center gap-11.5 px-4">
        <li>
          <Link className="flex item-center capitalize gap-5 justify-center text-[#666666] text-xl font-semibold">
            <HomeIcon width={"25px"} height={"25px"} intensity={500} />
            <span>home</span>
          </Link>
        </li>
        <li>
          <Link className="flex item-center capitalize gap-5 justify-center text-[#666666] text-xl font-semibold">
            <ProjectorIcon width={"25px"} height={"25px"} intensity={500} />
            <span>movies</span>
          </Link>
        </li>
        <li>
          <Link className="flex item-center gap-5 justify-center text-[#666666] text-xl font-semibold">
            <TvIcon width={"25px"} height={"25px"} intensity={500} />
            <span>TV Series</span>
          </Link>
        </li>
        <li>
          <Link className="flex item-center capitalize gap-5 justify-center text-[#666666] text-xl font-semibold">
            <CalendarIcon width={"25px"} height={"25px"} intensity={500} />
            <span>upcoming</span>
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export default SideNav;
