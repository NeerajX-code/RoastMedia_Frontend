import "./Profile.css";
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import Loading from '../../components/Loader/Loading';
import { ArrowLeft } from 'lucide-react';
import { clearOtherProfileData, clearProfileError } from "../../store/Reducers/otherProfileReducer";
import { getOtherUserPosts, getOtherUserProfile } from '../../store/Actions/otherProfileActions';
import UserPostCard from '../../components/UserPostCard/UserPostCard';
import ErrorCard from '../../components/ErrorCard/ErrorCard';
import { followUser as followUserAction, unfollowUser as unfollowUserAction, checkIsFollowing } from "../../store/Actions/followActions";
import { useSelector as useReduxSelector } from 'react-redux';

const OtherProfile = () => {
    const { id } = useParams();
    console.log(id);

    const { user, posts, profileLoading, postsLoading, profileError } = useSelector((state) => state.OtherProfileReducer);
    console.log(user);
    
    const authUser = useReduxSelector((state) => state.userReducer.user);
    const isFollowingMap = useReduxSelector((state) => state.FollowReducer.isFollowingMap);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // If trying to view own profile via /other/profile/:id, redirect to /Profile
        if (authUser?.userId && authUser.userI === id) {
            navigate('/Profile', { replace: true });
            return;
        }

        dispatch(getOtherUserProfile(id));
        let postTimer = setTimeout(() => {
            dispatch(getOtherUserPosts(id));
        }, 500);

        dispatch(checkIsFollowing(id));

        return () => {
            dispatch(clearOtherProfileData());
            clearTimeout(postTimer);
        };
    }, [id, dispatch, authUser, navigate]);

    if (profileLoading) {
        return <Loading />
    }

    if (user) {
        return (
            <div className="profile">
                {/* Header */}
                <div className="profile__nav">
                    <div className="profile__back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={30} />
                    </div>
                    <h2 className="profile__username">{user?.displayName}</h2>
                </div>

                {profileError && <ErrorCard message={profileError} clearAction={clearProfileError} isvisible={true} />}

                <div className="info_wrapper">
                    {/* Profile Info */}
                    <div className="profile__info">
                        <div className="profile__avatar" style={{ backgroundImage: `url(${user?.avatarUrl})` }}></div>

                        <div className="user_info">
                            <p className="profile__name">{user?.displayName}</p>
                            <p className="profile__role">{user?.userId?.username}</p>
                            <p className="profile__joined">Joined 2021</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="profile__stats">
                        <div className="stat">
                            <p className="stat__number">{user?.followersCount}</p>
                            <p className="stat__label" onClick={() => navigate(`/profile/${user?.userId}/followers`)} style={{ cursor: "pointer" }}>Followers</p>
                        </div>
                        <div className="stat">
                            <p className="stat__number">{user?.followingCount}</p>
                            <p className="stat__label" onClick={() => navigate(`/profile/${user?.userId}/following`)} style={{ cursor: "pointer" }}>Following</p>
                        </div>
                    </div>

                    {/* Bio */}
                    <p className="profile__bio">
                        {user?.bio}
                    </p>

                    {/* Follow/Unfollow button (if not self) */}
                    {authUser?.userId !== user?.userId && (
                        <div style={{ padding: "0 1rem 1rem" }}>
                            {isFollowingMap[id] ? (
                                <button className="btn btn-secondary" onClick={() => dispatch(unfollowUserAction(id)).then(() => dispatch(getOtherUserProfile(id)))}>Unfollow</button>
                            ) : (
                                <button className="btn btn-primary" onClick={() => dispatch(followUserAction(id)).then(() => dispatch(getOtherUserProfile(id)))}>Follow</button>
                            )}
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="profile__tabs">
                        <a href="#" className="active">Posts</a>
                    </div>
                    {postsLoading ? (
                        <div style={{ flex: "1", padding: "4rem 1rem", textAlign: "center" }}>
                            <p>Posts Fetching...</p>
                        </div>
                    ) : posts?.length > 0 ? (
                        <div className="profile__posts" >
                            {posts.map((post, i) => (
                                <UserPostCard key={i} post={post} />
                            ))}
                        </div>
                    ) : (
                        <p style={{ width: "100%", padding: "4rem 1rem", textAlign: "center" }}>No posts yet.</p>
                    )}
                </div>

            </div>
        )
    }

}

export default OtherProfile