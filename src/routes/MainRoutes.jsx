import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AuthWrapper from "../components/AuthWrapper/AuthWrapper";
import UnAuthWrapper from "../components/UnAuthWrapper/UnAuthWrapper";
import Loading from "../components/Loader/Loading";
import SavePage from "../pages/SavePage/SavePage";

// Lazy imports
const Home = lazy(() => import("../pages/Home/Home"));
const Post = lazy(() => import("../pages/Post/Post"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const EditUserDetailsPage = lazy(() =>
    import("../pages/EditUserDetails/EditUserDetails")
);
const SearchUserPage = lazy(() => import("../pages/SearchUser/SearchUserPage"));
const NotificationPage = lazy(() =>
    import("../pages/Notification/NotificationPage")
);
const Register = lazy(() => import("../pages/Register/Register"));
const Login = lazy(() => import("../pages/Login/Login"));
const OtherProfile = lazy(() => import("../pages/Profile/OtherProfile"));
const Comments = lazy(() => import("../pages/Comments/Comments"));

const MainRoutes = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/Post"
                    element={
                        <AuthWrapper>
                            <Post />
                        </AuthWrapper>
                    }
                />

                <Route path="/Comments/:id" element={<Comments />} />

                <Route
                    path="/Profile"
                    element={
                        <AuthWrapper>
                            <Profile />
                        </AuthWrapper>
                    }
                />

                <Route path="/other/profile/:id" element={<OtherProfile />} />
                <Route path="/Search" element={<SearchUserPage />} />

                <Route
                    path="/Edit-user-profile"
                    element={
                        <AuthWrapper>
                            <EditUserDetailsPage />
                        </AuthWrapper>
                    }
                />

                <Route
                    path="/Notification"
                    element={
                        <AuthWrapper>
                            <NotificationPage />
                        </AuthWrapper>
                    }
                />

                <Route
                    path="/Register"
                    element={
                        <UnAuthWrapper>
                            <Register />
                        </UnAuthWrapper>
                    }
                />

                <Route path="/Save" element={
                    <AuthWrapper>
                        <SavePage />
                    </AuthWrapper>
                } />

                <Route
                    path="/Login"
                    element={
                        <UnAuthWrapper>
                            <Login />
                        </UnAuthWrapper>
                    }
                />
            </Routes>
        </Suspense>
    );
};

export default MainRoutes;
