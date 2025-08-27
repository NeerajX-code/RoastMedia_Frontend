import "./Profile.css";
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loading from '../../components/Loader/Loading';
import { ArrowLeft } from 'lucide-react';
import { clearOtherProfileData, clearProfileError } from "../../store/Reducers/otherProfileReducer";
import { getOtherUserPosts, getOtherUserProfile } from '../../store/Actions/otherProfileActions';
import UserPostCard from '../../components/UserPostCard/UserPostCard';
import ErrorCard from '../../components/ErrorCard/ErrorCard';

const OtherProfile = () => {
    const { id } = useParams();   
    const { user, posts, profileLoading, postsLoading, profileError } = useSelector((state) => state.OtherProfileReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOtherUserProfile(id));
        let postTimer = setTimeout(() => {
            dispatch(getOtherUserPosts(id));
        }, 500);

        return () => {
            dispatch(clearOtherProfileData());
            clearTimeout(postTimer);
        };
    }, [id, dispatch]);

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
                            <p className="stat__number">{user?.
                                followersCount} </p>
                            <p className="stat__label">Followers</p>
                        </div>
                        <div className="stat">
                            <p className="stat__number">{user?.followingCount}</p>
                            <p className="stat__label">Following</p>
                        </div>
                    </div>

                    {/* Bio */}
                    <p className="profile__bio">
                        {user?.bio}
                    </p>

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