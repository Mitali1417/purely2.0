
import { useEffect } from "react";
import { useAuthStore } from "@/lib/store";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import api from "@/api";
import { useLoginDialogStore } from "@/components/shared/LoginRequiredDialog";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { openDialog } = useLoginDialogStore();

  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      logout();
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, logout, navigate]);

  if (!isAuthenticated) {
    if (location.pathname !== "/") {
      openDialog("Login first to continue.");
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
