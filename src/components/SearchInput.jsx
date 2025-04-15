import { forwardRef } from "react";

const SearchInput = forwardRef(({ className, textColor, svgStrokeColor, searchQuery, onChange, onClick }, ref) => {
  const handleEnterKeyPress = (e) => {
    if (onClick) {
      if (e.key === "Enter") {
        e.preventDefault();
        onClick();
      }
    }
  };

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
        value={searchQuery}
        onChange={onChange}
        onKeyDown={handleEnterKeyPress}
      />

      <div className="flex items-center justify-center cursor-pointer" onClick={onClick}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
            stroke={svgStrokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
});

export default SearchInput;
