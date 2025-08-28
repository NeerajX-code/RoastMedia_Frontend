import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UnAuthWrapper = ({ children }) => {
  const { isAuthenticated, initialized, loading } = useSelector((state) => state.authReducer);

  if (!initialized || loading) return null;
  if (isAuthenticated) return <Navigate to="/" replace />;

  return children;
};

export default UnAuthWrapper;
