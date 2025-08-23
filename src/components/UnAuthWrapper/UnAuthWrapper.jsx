import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UnAuthWrapper = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.authReducer);

  if (isAuthenticated) {
    return <Navigate to="/Profile" replace />;
  }

  return children;
};

export default UnAuthWrapper;
