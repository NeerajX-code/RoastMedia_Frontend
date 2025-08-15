import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";

export default function Login() {
    const dispatch = useDispatch();
    //   const { loginLoading, error } = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form SUbmitted:"+data);
        // dispatch(asyncLoginUser(data));
    };

    return (
        <div className="login-container">
            <div className="login-content">
                {/* Header */}
                <div className="login-header">
                    <h2>RoastMe</h2>
                    <button className="help-button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 256 256"
                        >
                            <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                        </svg>
                    </button>
                </div>

                {/* Title */}
                <h1>Welcome back</h1>
                <p>Enter your email and password to continue</p>

                {/* Form */}
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        <input
                            type="text"
                            placeholder="Enter Username/Email"
                            {...register("identifier", { required: "Email is required" })}
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email.message}</span>
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

                    {/* {error && <span className="error-message">{error}</span>} */}

                    <p className="forgot-password">Forgot Password?</p>

                    <button type="submit" className="login-button">
                        {/* {loginLoading ? "Logging in..." : "Log In"} */}Log In
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
