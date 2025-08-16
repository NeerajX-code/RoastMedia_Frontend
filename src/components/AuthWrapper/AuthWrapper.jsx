import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Loading from '../Loader/Loading';

const AuthWrapper = ({ children }) => {
  const { token } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/Register");
    }
  }, [token, navigate]);

  if (!token) {
    return <Loading />; // jab tak navigate ho raha hai, kuch render mat karo
  }

  return children;
};

export default AuthWrapper;
