import { Link } from "react-router-dom";
import Logo from "/assets/icons/tv.png";
import useAuth from "../hooks/useAuth";
import GoogleIcon from "/assets/icons/google_icon.svg";

const SignInPage = () => {
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    await signIn();
  };

  return (
    <>
      <title>Sign In With Google | MoviePulse</title>
      <meta name="description" content="Sign in to MoviePulse using your Google account." />

      <div className="w-full flex flex-col items-center px-10 xl:px-20 h-screen bg-gray-100">
        <header className="w-full flex flex-col items-start px-10 xl:px-20 p-8">
          <Link to={"/"} className="flex items-center justify-center gap-3 lg:gap-6 text-lg lg:text-2xl font-bold z-50">
            <img src={Logo} alt="MoviePulse's logo" />
            <span className={"text-[#111827]"}>MoviePulse</span>
          </Link>
        </header>

        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-20">
          <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>

          <p className="text-center mb-6">Please sign in to continue.</p>

          <button
            onClick={handleSignIn}
            className="w-full py-2 px-4 flex items-center justify-center gap-4 bg-[#BE123C] text-white rounded-lg hover:bg-[#BE123C]/80 hover:font-medium transition-500-in-out cursor-pointer">
            <img src={GoogleIcon} alt="google icon" loading="lazy" width={25} height={25} />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
