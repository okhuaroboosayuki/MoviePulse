import { Footer, Header, MovieList } from "../components";

const HomePage = () => {
  return (
    <div className="flex items-center justify-between h-full flex-col w-full">
      <Header />
      <MovieList />
      <Footer />
    </div>
  );
};

export default HomePage;
