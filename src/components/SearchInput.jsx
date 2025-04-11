import SearchIcon from "/assets/icons/Search.svg";

const SearchInput = () => {
  return (
    <div className="lg:w-[525px] md:w-[60%] w-full hidden md:flex border-2 border-white py-1.5 px-2.5 rounded-[6px] focus-within:border-gray-300">
      <input
        type="search"
        name=""
        id=""
        placeholder="What do you want to watch?"
        className="border-none outline-none w-full placeholder:text-white focus:placeholder:text-[15px] sm:placeholder:text-[15px] text-white text-base"
      />
      <img src={SearchIcon} alt="Search'icon" className="cursor-pointer" />
    </div>
  );
};

export default SearchInput;
