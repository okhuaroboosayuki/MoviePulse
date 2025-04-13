import { forwardRef } from "react";
import SearchIcon from "/assets/icons/Search.svg";

const SearchInput = forwardRef(({ className, textColor }, ref) => {
  return (
    <div className={className}>
      <input
        type="search"
        name=""
        id=""
        placeholder="What do you want to watch?"
        className={`border-none outline-none w-full placeholder:${textColor} focus:placeholder:text-[15px] sm:placeholder:text-[15px] ${textColor} text-base`}
        style={{ textTransform: "lowercase" }}
        ref={ref}
      />
      <img src={SearchIcon} alt="Search'icon" className="cursor-pointer" />
    </div>
  );
});

export default SearchInput;
