import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "../Loader/Loading";

const AuthWrapper = ({ children }) => {
  const { isAuthenticated, loading, initialized } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized && !loading && !isAuthenticated) {
      navigate("/Login", { replace: true });
    }
  }, [isAuthenticated, loading, initialized]);

  if (!initialized || loading) {
    return <Loading />; // Wait until auth check finishes
  }

  if (!isAuthenticated) return null; // Will redirect to login

  return children;
};

export default AuthWrapper;
