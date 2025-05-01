import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { id } = useAuth();

  useEffect(() => {
    if (!id) {
      navigate("/sign-in", { replace: true });
    }
  }, [id, navigate]);

  return id ? children : null;
};

export default ProtectedRoutes;
