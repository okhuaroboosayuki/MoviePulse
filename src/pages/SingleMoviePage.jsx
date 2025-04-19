import { useLocation } from "react-router-dom";
import { SideNav } from "../components";

const SingleMoviePage = () => {
  const location = useLocation();

  return (
    <section className="flex w-full items-center h-full">
      <SideNav pathLocation={location} />

      <section>single movie</section>
    </section>
  );
};

export default SingleMoviePage;
