import SearchInput from "./SearchInput";
import Logo from "/assets/icons/tv.png";

const HomeNav = () => {
  return (
    <div className="flex items-center justify-between py-5 w-full">
      <div className="flex items-center justify-center gap-6">
        <img src={Logo} alt="MoviePulse's logo" />
        <span>MoviePulse</span>
      </div>

      <SearchInput />

      <div className="flex items-center gap-7">
        <button>sign in</button>

        <button id="mobileMenuIcon" class="relative flex flex-col items-start justify-center gap-[6px] z-50" role="button" aria-label="mobile menu button" aria-haspopup="true">
          <span class="w-7 h-0.5 bg-gray-800 transition-smooth"></span>
          <span class="w-7 h-0.5 bg-gray-800 transition-smooth"></span>
        </button>
      </div>
    </div>
  );
};

export default HomeNav;
