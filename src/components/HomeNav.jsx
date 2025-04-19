import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Logo from "/assets/icons/tv.png";
import { setDocumentOverFlow } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

const HomeNav = ({ textColor, borderColor, svgStrokeColor }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery);

  const handleMenuToggle = () => {
    const menuIcon = document.getElementById("mobileMenuIcon");
    const menu = document.getElementById("mobileMenu");
    const screenSizeLarge = window.innerWidth <= 640;

    if (menuIcon) {
      menuIcon.classList.toggle("toggle-menu");
      menu.classList.toggle("hidden");

      menuIcon.classList.contains("toggle-menu") && screenSizeLarge ? setDocumentOverFlow(false) : setDocumentOverFlow(true);
    }
  };

  const handleInputChange = (value) => {
    setSearchQuery(value);
  };

  const handleSearchClick = () => {
    const menuIcon = document.getElementById("mobileMenuIcon");
    if (menuIcon.classList.contains("toggle-menu")) handleMenuToggle();

    navigate(`/search?q=${debouncedSearchQuery}`);
  };

  useEffect(() => {
    const menuIcon = document.getElementById("mobileMenuIcon");

    window.addEventListener("resize", () => {
      if (menuIcon.classList.contains("toggle-menu")) handleMenuToggle();
    });

    return () => window.removeEventListener("resize", handleMenuToggle);
  }, []);

  return (
    <div className="flex items-center justify-between py-5 w-full z-10">
      <Link to={"/"} className="flex items-center justify-center gap-3 lg:gap-6 text-lg lg:text-2xl font-bold z-50">
        <img src={Logo} alt="MoviePulse's logo" />
        <span className={textColor}>MoviePulse</span>
      </Link>

      <SearchInput
        className={`lg:w-[525px] md:w-[60%] w-full hidden md:flex border-2 ${borderColor} py-1.5 px-2.5 rounded-[6px] focus-within:border-gray-300`}
        textColor={textColor}
        svgStrokeColor={svgStrokeColor}
        searchQuery={searchQuery}
        onChange={(e) => handleInputChange(e.target.value)}
        onClick={handleSearchClick}
      />

      <div className={`flex items-center gap-7 ${textColor}`}>
        <button className="capitalize font-bold lg:block hidden">sign in</button>

        <button
          id="mobileMenuIcon"
          className="relative flex flex-col items-start justify-center gap-[6px] z-50 rounded-[100%] bg-[#BE123C] px-2.5 py-3.5 cursor-pointer"
          role="button"
          aria-label="mobile menu button"
          aria-haspopup="true"
          onClick={handleMenuToggle}>
          <span className="w-5 h-0.5 bg-white transition-500-in-out"></span>
          <span className="w-5 h-0.5 bg-white transition-500-in-out"></span>
        </button>

        <div
          className="hidden bg-white absolute py-10 px-8 z-20 md:top-18 top-0 lg:right-16 xl:right-20 md:right-8 right-0 text-[#333333] animate-fade-in-scale md:w-[25%] lg:w-[18%] xl:w-[15%] w-full md:min-h-0 min-h-screen"
          id="mobileMenu">
          <ol className="flex flex-col items-start justify-start gap-6 capitalize mt-20 md:mt-0">
            <li className="border-b w-full">
              <Link to={"/movies"} className="hover:text-[#BE123C]">
                movies
              </Link>
            </li>
            <li className="border-b w-full">
              <Link to={"/tv-series"} className="hover:text-[#BE123C]">
                tv series
              </Link>
            </li>
            <li className="border-b w-full">
              <Link to={"/upcoming"} className="hover:text-[#BE123C]">
                upcoming
              </Link>
            </li>
            <li className="w-full mt-10 md:hidden block">
              <SearchInput
                className={"border h-12 w-full text-base p-2 rounded-md flex items-center"}
                textColor={"text-[#333333]"}
                svgStrokeColor={"#333333"}
                searchQuery={searchQuery}
                onChange={(e) => handleInputChange(e.target.value)}
                onClick={handleSearchClick}
              />
            </li>
            <li className="w-full lg:hidden flex items-center">
              <Link to={"/"} className="hover:text-[#BE123C] hover:bg-white border bg-[#BE123C] text-white text-center rounded-md p-3 w-full">
                sign in
              </Link>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
