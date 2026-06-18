import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // Logged in
  if (user && token) {
    return children;
    
  }

  // User registered but not logged in
  if (user && !token) {
    return <Navigate to="/login" />;
  }

  // New user
  return <Navigate to="/signup" />;
};

export default ProtectedRoute;
