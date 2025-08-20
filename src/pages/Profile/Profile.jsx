import React, { useState } from "react";
import "./Profile.css";
import { getUserProfile } from "../../store/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ArrowLeft, SquarePen } from "lucide-react";
import Loading from "../../components/Loader/Loading";
import EditUserDetails from "../EditUserDetails/EditUserDetails";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      dispatch(getUserProfile());
    }
    if (user) console.log(user);
  }, [dispatch, user]);

  const posts = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCwCkH5HxagQUH02_QjyXu-J4d5W0J3mGg52L4hPfWee8vwrv_zlO5tPBll1am-r593xqa9Jw0QAHGCq61C431t1-R9lJq7_mUlYOMpPp41B1JTwjiLY1Sptsxs9J4MhLdhVXFvz7UBMwcW5_ax_yG8swWgJumP21JCJ4YQ4acsmpaXVltMbCXvg1P0rVRu1c7LXG4tfImPB8Mjh1cj5osAWzYzUeTJmatg8UvatkT9KT5wo848GbrkUUzJtXZhLyt9YVH76CB90eU",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDLBUlDa8CRqdWmFJxY51-OarnT47EU1PlvdPb4Vr2Zjl80phxUXunvadOf5BrUBf7VWujHAn7TAVHCwAxh55Q96OhtJSYHtr6GoEWHvmKQPx3Q6-Ov2I6-5VvxFe2UkbUnjvjH_6XNwbbm9NfaN5w79Kqp_kXM_jlm3sh2kvJ2wMGPbBSa1u9vxzpcbVOF-fghCA3Y6uv6rqrPcvBPFK2hJmWXX1-MTU9z-Tvt8Uqi3byh3ipL5AT4dnEzi4sZuzzAPkUPcVWw3bI",

    "https://lh3.googleusercontent.com/aida-public/AB6AXuBJqfJIcOj8vPlclc95E7F_y6MKTuos0jUMVFFc4VJTWbJJH7uyyU8Mp0thNO5JcwkwNiVufjFhXnqpbEMV6UxR3IDMDa-RaDJuHjFuKPiTYgRkIBq3lTCfne2wJvHx2rPKLrGf3P4WEuDYU0Abg6w0qomHz1e0GlmsiH9dLcf9ukmoNUdEuVsvvLposq05FfAbsROlCOTnVX56aUAFH4oZIzwDoHjX1pTKG6KJ3ZEzKqU8apQuCZ7ABo5gkkbklwPT20U8OGWPQv8",
    // Add all remaining image URLs here...
  ];

  if (loading) return (
   <Loading />
  )

  const handleEditProfile = () => {
    navigate("/Edit-user-profile");
  };

  const handleBackBtn = () => {
    navigate("/");
  };

  return (
    <div className="profile">
        <div className="profile__nav">
          <div className="profile__back-btn">
            <ArrowLeft size={30} onClick={handleBackBtn} />
          </div>

          <h2 className="profile__username">{user?.displayName}</h2>

          <SquarePen className="profile__edit-btn" onClick={handleEditProfile} />
        </div>

        <div className="info_wrapper">
          <div className="profile__info">
            <div className="profile__avatar" style={{ backgroundImage: `url(${user?.avatarUrl})` }}></div>

            <div className="user_info">
              <p className="profile__name">{user?.displayName}</p>
              <p className="profile__role">{user?.userId?.username}</p>
              <p className="profile__joined">Joined 2021</p>
            </div>
          </div>

          <div className="profile__stats">
            <div className="stat">
              <p className="stat__number">{user?.
                followersCount} </p>
              <p className="stat__label">Followers</p>
            </div>
            <div className="stat">
              <p className="stat__number">{user?.followingCount}</p>
              <p className="stat__label">Following</p>
            </div>
          </div>

          <p className="profile__bio">
            {user?.bio}
          </p>

          <div className="profile__tabs">
            <a href="#" className="active">Posts</a>
          </div>

          <div className="profile__posts">
            {posts.map((url, i) => (
              <div key={i} className="post" style={{ backgroundImage: `url("${url}")` }}></div>
            ))}
          </div>
        </div>

    </div>
  );
};

export default Profile;
