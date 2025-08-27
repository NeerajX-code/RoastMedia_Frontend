import { Heart, Combine, Share2, Bookmark } from "lucide-react";
import "./PostCard.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncHomePostToggleLike, asyncUpdateShareCount } from "../../store/Actions/HomePostActions";
import { asyncGetComments } from "../../store/Actions/commentActions";
import { asyncToggleSave } from "../../store/Actions/saveActions"

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
                    }} ><Combine /> <span>{post.commentCount}</span>
                    </button>

                    <button
                        onClick={async () => {
                            dispatch(asyncUpdateShareCount(post._id));

                            const text = `${window.location.origin}/Single-post/${post._id}`;
                            const html = `
                            <a href="${text}" target="_blank">
                            <strong>Check this Post!</strong><br/>
                            <img src={${post.image}} width="200"/>
                            <p>{${post.caption.replace(/[*"]+/g, "")}}</p>
                            </a>`;

                            try {
                                await navigator.clipboard.write([
                                    new ClipboardItem({
                                        "text/plain": new Blob([text], { type: "text/plain" }),
                                        "text/html": new Blob([html], { type: "text/html" }),
                                    }),
                                ]);
                                alert("Rich content copied to clipboard!");
                            } catch (err) {
                                console.error("Failed:", err);
                            }
                        }}
                    >
                        <Share2 /> <span>{post.shareCount}</span>
                    </button>

                    <button
                        onClick={() => dispatch(asyncToggleSave(post._id))}
                    ><Bookmark stroke={!post?.saved ? "white" : "none"}
                        fill={post?.saved ? "white" : "none"} /></button>
                </div>
            </div>
        </div >
    )
}

export default PostCard