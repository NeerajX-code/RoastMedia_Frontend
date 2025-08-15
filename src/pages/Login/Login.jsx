import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoginUser } from "../../store/Actions/authActions";
import "./Login.css";
import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.authReducer);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const onSubmit = (data) => {
        console.log("Form SUbmitted:" + data);
        dispatch(asyncLoginUser(data));
    };

    if (loading) return (
        <div className="loading">
            <div className="loader"></div>

        </div>
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

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>
            </div>

            {/* Footer */}
            <div className="login-footer">
                <p>Don't have an account? Sign Up</p>
            </div>
        </div>
    );
}
