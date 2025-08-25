import { Heart, Combine, Share2, Bookmark } from "lucide-react";
import "./PostCard.css";
import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { asyncHomePostToggleLike } from "../../store/Actions/HomePostActions";
import { asyncGetComments } from "../../store/Actions/commentActions";

const PostCard = ({ post }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    return (
        <div className="post">

            <NavLink to={`/other/profile/${post.userData._id}`}>
                <div className="post_top">
                    <div className="post_top_userImg">
                        <img src={post.profileData?.avatarUrl} alt="" />
                    </div>
                    <div className="post_top_userDetails">
                        <div className="userDetails_left">
                            <h2>{post.profileData?.displayName}</h2>
                            <p>@{post.userData?.username}</p>
                        </div>
                        <div className="userDetails_right">
                            <p>
                                {new Intl.DateTimeFormat("en-US", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                }).format(new Date(post.createdAt))}</p>
                        </div>
                    </div>
                </div>
            </NavLink>
            <div
                className="post__image">
                <img src={post.image} alt="" />
            </div>
            <div className="post__content">
                <h2 className="post__username">{post.username}</h2>
                <p className="post__caption">{post.caption.replace(/[*"]+/g, "")}</p>
                <div className="post__actions">
                    <button onClick={() => dispatch(asyncHomePostToggleLike(post._id))}>
                        <Heart
                            stroke={!post.isLiked ? "white" : "none"}
                            fill={post.isLiked ? "red" : "none"}
                        />
                        <span>{post.likesCount}</span>
                    </button>
                    <button onClick={() => {
                        dispatch(asyncGetComments(post._id))
                        navigate(`/Comments/${post._id}`)
                    }} ><Combine /> <span>{post.comments}</span></button>
                    <button><Share2 /> <span>{post.shares}</span></button>
                    <button><Bookmark /> <span>{post.bookmarks}</span></button>
                </div>
            </div>
        </div>
    )
}

export default PostCard