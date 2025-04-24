import { Link } from "react-router-dom";
import { HomeNav } from "../components";
import PeepsImage from "/assets/images/peeps.png";
import BackArrowCurved from "/assets/icons/back_arrow_curved.svg";

const PageNotFound = () => {
  return (
    <>
      <title>404</title>
      <meta name="description" content="Page not found" />

      <section className="flex items-center justify-center h-full flex-col w-full lg:px-15 xl:px-27 sm:px-8 px-3">
        <HomeNav />

        <section className="flex flex-col items-center justify-center h-full w-full text-black gap-10 mt-7">
          <div className="flex flex-col items-center justify-center text-center gap-2 font-black">
            <h1 className="text-5xl">
              <span className="text-7xl">o</span>ops!
            </h1>
            <p className="text-2xl">
              Welcome to the <span>70's</span>
            </p>
          </div>

          <div className="p-8">
            <img src={PeepsImage} alt="404 Not Found" className="w-full h-auto max-w-[400px] mx-auto" />
          </div>

          <Link to={"/"} className="flex items-center justify-center text-2xl font-medium gap-2 capitalize border-b-2 border-b-black pb-2">
            <img src={BackArrowCurved} alt="Back Arrow" />
            <span>go home</span>
          </Link>
        </section>
      </section>
    </>
  );
};

export default PageNotFound;
