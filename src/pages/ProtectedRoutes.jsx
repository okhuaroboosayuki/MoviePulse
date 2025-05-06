import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Spinner from "./../components/Spinner";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { id, loading } = useAuth();

  useEffect(() => {
    if (!id && !loading) {
      navigate("/sign-in", { replace: true });
    }
  }, [id, loading, navigate]);

  return <>{loading ? <Spinner /> : <>{id ? children : null}</>}</>;
};

export default ProtectedRoutes;
