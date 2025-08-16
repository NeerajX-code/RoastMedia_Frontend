import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "../Loader/Loading";

const UnAuthWrapper = ({ children }) => {
    const { token } = useSelector((state) => state.authReducer);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            // agar token hai to register/login pages pe na jane do
            navigate("/");
        }
    }, [token, navigate]);

    if (token) {
        return <Loading />; // jab tak navigate ho raha hai, kuch render na karo
    }

    return children; // jab token nahi hai tabhi ye dikhega
};

export default UnAuthWrapper;
