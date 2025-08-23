import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "../Loader/Loading";
import Register from "../../pages/Register/Register";

const AuthWrapper = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/Register");
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return <Loading />; // jab tak auth check ho raha hai
  }

  if (!isAuthenticated) {
    return <Register />; // navigate hone se pehle kuch render mat karo
  }

  return children;
};

export default AuthWrapper;
