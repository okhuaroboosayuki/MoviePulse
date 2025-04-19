import { NavLink, useMatch, useResolvedPath } from "react-router-dom";

const CustomNavLink = ({ to, children }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname });

  return (
    <li className={isActive && "border-r-[6px] border-r-[#BE123C] w-full"}>
      <NavLink to={to} className={`flex capitalize gap-5 justify-center px-4 ${isActive ? "text-[#BE123C] py-4 bg-[#BE123C]/20 justify-start" : "text-[#666666]"} text-xl font-semibold item-center`}>
        {children}
      </NavLink>
    </li>
  );
};

export default CustomNavLink;
