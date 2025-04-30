// import { Link } from "react-router-dom";
// import Logo from "/assets/icons/tv.png";
import useAuth from "../hooks/useAuth";

const SignInPage = () => {
  const { session, signIn } = useAuth();

  console.log(session);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>
        <p className="text-center mb-6">Welcome back! Please sign in to continue.</p>
        <button onClick={signIn} className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
