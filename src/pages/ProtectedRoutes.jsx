import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuth) {
      navigate("/sign-in", { replace: true });
    }
  }, [isAuth, navigate]);

  return isAuth && children;
};

export default ProtectedRoutes;
