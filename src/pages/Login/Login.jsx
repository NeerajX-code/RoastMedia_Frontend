import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoginUser } from "../../store/Actions/authActions";
import "./Login.css";
import { ArrowLeft } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../../components/Loader/Loading";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.authReducer);


  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form SUbmitted:" + data);
    dispatch(asyncLoginUser(data));
  };


  // useEffect(() => {
  //   if (token) {
  //     console.log(token);
  //     navigate("/Profile");
  //   }
  // }, [token, navigate]);

  if (loading) return (
    <Loading />
  )

  return (
    <div className="login-container">
      <div className="login-header">
        <h2 className="login-logo">RoastMe</h2>
        <ArrowLeft className="login-backbtn" size={36} />
      </div>

      <div className="login-content">
        <h1>Welcome Back</h1>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <input
              type="text"
              placeholder="Enter Username/Email"
              {...register("identifier", { required: "Email is required" })}
            />
            {errors.identifier && (
              <span className="error-message">{errors.identifier.message}</span>
            )}
          </label>

          <label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </label>

          <p className="forgot-password">Forgot Password ?</p>

          <button type="submit" className="login-button">
            Log in
          </button>
        </form>

        <p className="login-type">
          Don't have an account ?
          <NavLink to={"/register"}>
            <span> Sign Up</span>
          </NavLink>{" "}
        </p>
      </div>
    </div>
  );
}
