import React from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import { asyncRegisterUser } from "../../store/Actions/userActions";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";

export default function Register() {

    const { registerLoading, error } = useSelector((state) => state.userReducer)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log("Form submitted:", data);
        dispatch(asyncRegisterUser(data));
    };

    useEffect(() => {

        if(error) console.log(error);
      
    }, [registerLoading])
    

    if (registerLoading) return (
        <div className="loading">
            <div className="loader"></div>

        </div>
    )
    else return (
        <div className="register-page">
            {/* Header */}
            <div className="register-header">
                <div className="back-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        viewBox="0 0 256 256">
                        <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
                    </svg>
                </div>
                <h2>Create Account</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                {/* Username */}
                <div className="form-group">
                    <input
                        placeholder="Username"
                        {...register("username", { required: "Username is required" })}
                    />
                    {errors.username && <span>{errors.username.message}</span>}
                </div>

                {/* Email */}
                <div className="form-group">
                    <input
                        placeholder="Email"
                        type="email"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>

                {/* Password */}
                <div className="form-group">
                    <input
                        placeholder="Password"
                        type="password"
                        {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                {/* Register Button */}
                <button type="submit" className="register-btn">
                    Register
                </button>

            </form>

            {/* Footer */}
            <div className="register-footer">
                <p>Already have an account? Sign in</p>
            </div>
        </div>
    );
}
