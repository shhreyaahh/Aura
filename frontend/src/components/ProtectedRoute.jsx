import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);

  useEffect(() => {
    if (token && !user) {
      getCurrentUser();
    }
  }, [token, user, getCurrentUser]);

  if (!token) return <Navigate to="/login" replace />;

  // Show loading while validating token
  if (token && !user) return <div>Loading...</div>;

  return children;
};

export default ProtectedRoute;
