import { Heart, Combine, Share2, Bookmark } from "lucide-react";
import "./PostCard.css";
import { NavLink } from "react-router";

const PostCard = ({ post }) => {

    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

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
                        <p>{post.createdAt}</p>
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
                    <button><Heart /> <span>{post.likesCount}</span></button>
                    <button><Combine /> <span>{post.comments}</span></button>
                    <button><Share2 /> <span>{post.shares}</span></button>
                    <button><Bookmark /> <span>{post.bookmarks}</span></button>
                </div>
            </div>
        </div>
    )
}

export default PostCard