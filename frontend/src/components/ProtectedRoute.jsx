// File: frontend/src/components/ProtectedRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <div className="loader">Checking login status...</div>;
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
