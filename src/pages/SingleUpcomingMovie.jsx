import { useLocation } from "react-router-dom";
import { SideNav } from "../components";

const SingleUpcomingMovie = () => {
  const location = useLocation();

  return (
    <section className="flex w-full items-center h-full">
      <SideNav pathLocation={location} />

      <section>single upcoming</section>
    </section>
  );
};

export default SingleUpcomingMovie;
