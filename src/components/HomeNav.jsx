import { useEffect } from "react";
import SearchInput from "./SearchInput";
import Logo from "/assets/icons/tv.png";
import { setDocumentOverFlow } from "../utils";

const HomeNav = () => {
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

  useEffect(() => {
    const menuIcon = document.getElementById("mobileMenuIcon");

    window.addEventListener("resize", () => {
      if (menuIcon.classList.contains("toggle-menu")) handleMenuToggle();
    });

    return () => window.removeEventListener("resize", handleMenuToggle);
  }, []);

  return (
    <div className="flex items-center justify-between py-5 w-full z-10">
      <div className="flex items-center justify-center gap-3 lg:gap-6 text-white text-lg lg:text-2xl font-bold z-50">
        <img src={Logo} alt="MoviePulse's logo" />
        <span>MoviePulse</span>
      </div>

      <SearchInput className={"lg:w-[525px] md:w-[60%] w-full hidden md:flex border-2 border-white py-1.5 px-2.5 rounded-[6px] focus-within:border-gray-300"} textColor={"text-white"} />

      <div className="flex items-center gap-7 text-white">
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
            <li className="hover:text-[#BE123C] border-b w-full">
              <a href="">movies</a>
            </li>
            <li className="hover:text-[#BE123C] border-b w-full">
              <a href="">tv series</a>
            </li>
            <li className="hover:text-[#BE123C] border-b w-full">
              <a href="">upcoming</a>
            </li>
            <li className="w-full mt-10 md:hidden block">
              <SearchInput className={"border h-12 w-full text-base p-2 rounded-md"} textColor={"text-[#333333]"} />
            </li>
            <li className="hover:text-[#BE123C] hover:bg-white border bg-[#BE123C] text-white text-center rounded-md p-3 w-full lg:hidden">
              <a href="">sign in</a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
