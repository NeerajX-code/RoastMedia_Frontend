import React from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import { asyncRegisterUser } from "../../store/Actions/authActions";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import Loading from "../../components/Loader/Loading";

export default function Register() {

    const { loading, error } = useSelector((state) => state.authReducer)

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

        if (error) console.log(error);

    }, [loading])


    if (loading) return (
        <Loading />
    )

    else return (
        <div className="register-page">
            <div className="register-header">
                <h2 className="login-logo">RoastMe</h2>
                <ArrowLeft className="login-backbtn" size={36} />
            </div>

            <div className="form">
                <h1>Become our Family</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                    <div className="form-group">
                        <input
                            placeholder="Username"
                            {...register("username", { required: "Username is required" })}
                        />
                        {errors.username && <span>{errors.username.message}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            placeholder="Email"
                            type="email"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            placeholder="Password"
                            type="password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>

                    <button type="submit" className="register-btn">
                        Register
                    </button>

                </form>

                <p className="register-type">Already have an account ?
                    <NavLink to={"/login"}>
                        <span> Sign in</span>
                    </NavLink>{" "}
                </p>

                <div className="divider">
                    <span>or</span>
                </div>

                <button className="google-btn">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="google img" />
                    <h3>Sign up with Google</h3>
                </button>
            </div>
        </div>
    );
}
