
import { useEffect } from "react";
import { useAuthStore } from "@/lib/store";
import { Navigate, useNavigate } from "react-router-dom";
import api from "@/api";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await api.get("/auth/me");
      } catch (err: any) {
        logout();
        localStorage.removeItem("auth_token");
        navigate("/login", { replace: true });
      }
    };
    if (isAuthenticated) verify();
  }, [isAuthenticated, logout, navigate]);

  if (!isAuthenticated) {
    console.log("Not Authenticated");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
