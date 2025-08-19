import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UnAuthWrapper = ({ children }) => {
  const { token } = useSelector((state) => state.authReducer);

  if (token) {
    // agar token hai to register/login pages pe na jane do
    return <Navigate to="/Profile" replace />;
  }

  // jab token nahi hai tabhi children dikhega
  return children;
};

export default UnAuthWrapper;
