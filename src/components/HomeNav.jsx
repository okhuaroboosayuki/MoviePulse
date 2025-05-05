import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import { setDocumentOverFlowDisplay } from "../utils";
import useDebounce from "../hooks/useDebounce";
import useAuth from "../hooks/useAuth";
import Logo from "/assets/icons/tv.png";
import NoPicFound from "/assets/images/no_profile_image.webp";

const HomeNav = ({ textColor, borderColor, svgStrokeColor }) => {
  const { session, signOut } = useAuth();

  const { avatar_url } = session?.user?.identities[0]?.identity_data || {};
  const avatarImage = avatar_url ? avatar_url : NoPicFound;

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery);

  const handleMenuToggle = () => {
    const menuIcon = document.getElementById("mobileMenuIcon");
    const menu = document.getElementById("mobileMenu");
    const profileOptions = document.getElementById("profileOptions");
    const isScreenSizeSmall = window.innerWidth <= 640;

    if (menuIcon) {
      if (profileOptions && !profileOptions.classList.contains("hidden")) profileOptions.classList.add("hidden");

      menuIcon.classList.toggle("toggle-menu");
      menu.classList.toggle("hidden");

      menuIcon.classList.contains("toggle-menu") && isScreenSizeSmall ? setDocumentOverFlowDisplay(true) : setDocumentOverFlowDisplay(false);
    }
  };

  const handleProfileOptionsToggle = () => {
    const profileOptions = document.getElementById("profileOptions");
    const menuIcon = document.getElementById("mobileMenuIcon");
    const menu = document.getElementById("mobileMenu");
    const isScreenSizeSmall = window.innerWidth <= 640;

    if (profileOptions) {
      if (menuIcon.classList.contains("toggle-menu")) {
        menuIcon.classList.remove("toggle-menu");
        menu.classList.add("hidden");

        if (isScreenSizeSmall) setDocumentOverFlowDisplay(false);
      }

      profileOptions.classList.toggle("hidden");
    }
  };

  const handleInputChange = (value) => {
    setSearchQuery(value);
  };

  const handleSearchClick = () => {
    const menuIcon = document.getElementById("mobileMenuIcon");
    if (menuIcon.classList.contains("toggle-menu")) handleMenuToggle();

    if (debouncedSearchQuery.length > 0) {
      navigate(`/search?q=${debouncedSearchQuery}`);
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate("/sign-in");
  };

  useEffect(() => {
    const handleResize = () => {
      const menuIcon = document.getElementById("mobileMenuIcon");
      const profileOptions = document.getElementById("profileOptions");

      if (menuIcon?.classList.contains("toggle-menu")) {
        handleMenuToggle();
      }

      if (profileOptions && !profileOptions.classList.contains("hidden")) {
        handleProfileOptionsToggle();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", () => handleResize);
  }, []);

  return (
    <nav className="flex items-center justify-between py-5 w-full z-10">
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

      <div className={`flex items-center sm:gap-7 gap-3 ${textColor}`}>
        {session ? (
          <div className="relative flex flex-col items-center justify-center gap-2 w-full">
            <img src={avatarImage} alt="" className="rounded-full cursor-pointer z-30" loading="lazy" width={38} height={38} onClick={handleProfileOptionsToggle} />

            <div className={`hidden bg-white absolute py-5 px-8 z-20 top-12 text-[#333333] animate-fade-in-scale w-fit md:min-h-0 h-fit rounded-md border ${borderColor}`} id="profileOptions">
              <ol className="flex flex-col items-start justify-start gap-6 capitalize mt-0">
                <li className="border-b w-full">
                  <Link to={"/favorite-movies"} className="hover:text-[#BE123C]">
                    favourites
                  </Link>
                </li>
              </ol>
            </div>
          </div>
        ) : (
          <Link to={"sign-in"} className="capitalize font-bold lg:block hidden hover:underline">
            sign in
          </Link>
        )}

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
          className={`hidden bg-white absolute py-10 px-8 z-20 md:top-18 top-0 lg:right-16 xl:right-20 md:right-8 right-0 text-[#333333] animate-fade-in-scale md:w-[25%] lg:w-[18%] xl:w-[15%] w-full md:min-h-0 min-h-screen rounded-md border ${borderColor}`}
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
            <li className="w-full flex items-center">
              {session ? (
                <button onClick={handleSignOut} className="hover:text-[#BE123C] cursor-pointer hover:bg-white border bg-[#BE123C] text-white text-center rounded-md p-3 w-full">
                  Sign out
                </button>
              ) : (
                <Link to={"sign-in"} className="hover:text-[#BE123C] lg:hidden block hover:bg-white border bg-[#BE123C] text-white text-center rounded-md p-3 w-full">
                  sign in
                </Link>
              )}
            </li>
          </ol>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
