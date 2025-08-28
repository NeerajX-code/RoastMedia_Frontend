import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AuthWrapper from "../components/AuthWrapper/AuthWrapper";
import UnAuthWrapper from "../components/UnAuthWrapper/UnAuthWrapper";
import SavePage from "../pages/SavePage/SavePage";

// Lazy imports
const Home = lazy(() => import("../pages/Home/Home"));
const Post = lazy(() => import("../pages/Post/Post"));
const SinglePost = lazy(() => import("../pages/SinglePost/SinglePost"));
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
const FollowersPage = lazy(() => import("../pages/Followers/Followers"));
const FollowingPage = lazy(() => import("../pages/Following/Following"));
const Conversations = lazy(() => import("../pages/Messenger/Conversations"));
const Messenger = lazy(() => import("../pages/Messenger/Messenger"));

const MainRoutes = () => {
    return (
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
                path="/Single-post/:id"
                element={<SinglePost />}
            />

            <Route
                path="/Profile"
                element={
                    <AuthWrapper>
                        <Profile />
                    </AuthWrapper>
                }
            />

            <Route path="/other/profile/:id" element={<OtherProfile />} />
            <Route path="/profile/:id/followers" element={<FollowersPage />} />
            <Route path="/profile/:id/following" element={<FollowingPage />} />
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

            <Route path="/messages" element={<AuthWrapper><Conversations /></AuthWrapper>} />
            <Route path="/messages/:id" element={<AuthWrapper><Messenger /></AuthWrapper>} />

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
    );
};

export default MainRoutes;
