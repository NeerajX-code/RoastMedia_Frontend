import { useEffect, useState } from "react";
import "./CommentsPage.css";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteComment, asyncEditComment, asyncGetComments, asyncPostComment } from "../../store/Actions/commentActions";
import { CheckCircle, Delete, Edit } from "lucide-react";

const CommentsPage = () => {

    const { id } = useParams();
    const [editId, setEditId] = useState(null);      // which comment is in edit mode
    const [editedComment, setEditedComment] = useState("");
    const { comments } = useSelector((state) => state.CommentsReducer);
    const { user } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [comment, setComment] = useState("");

    const handleSend = () => {
        if (!comment.trim()) return;
        if (comment.trim() === editedComment.trim()) return;

        console.log(comment, id)
        dispatch(asyncPostComment({ id, comment }));

        setComment("");
    };

    useEffect(() => {

        dispatch(asyncGetComments(id));
    }, [dispatch])

    return (
        <div className="comments-page">
            {/* Header */}
            <header className="comments-header">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                    >
                        <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                    </svg>
                </button>
                <h2>Comments</h2>
            </header>

            {/* Comments List */}
            <div className="comments-list">
                {comments.map((c) => (
                    <div className="comment" key={c._id}>
                        <div
                            className="avatar"
                            style={{ backgroundImage: `url(${c.profile?.avatarUrl})` }}
                        />
                        <div className="content">
                            <div className="content_top">
                                <div className="meta">
                                    <p className="name">{c.profile?.displayName || "Unknown User"}</p>
                                    <p className="time">
                                        {new Date(c.createdAt).toLocaleString("en-IN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            day: "2-digit",
                                            month: "short",
                                        })}
                                    </p>
                                </div>
                                {c.user === user.userId._id && (
                                    <div className="actions">
                                        {editId !== c._id ? (
                                            <button
                                                onClick={() => {
                                                    setEditId(c._id);
                                                    setEditedComment(c.comment);
                                                }}
                                            >
                                                <Edit />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    console.log((editedComment))
                                                    if (editedComment.trim()) {
                                                        dispatch(
                                                            asyncEditComment({
                                                                postId: id,
                                                                commentId: c._id,
                                                                newComment: editedComment,
                                                            })
                                                        );
                                                    }
                                                    setEditId(null);
                                                    setEditedComment("");
                                                }}
                                            >
                                                <CheckCircle />
                                            </button>
                                        )}

                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    asyncDeleteComment({
                                                        postId: id,
                                                        commentId: c._id,
                                                    })
                                                )
                                            }
                                        >
                                            <Delete />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Comment Text or Input */}
                            {editId !== c._id ? (
                                <p className="text">{c.comment}</p>
                            ) : (
                                <input
                                    type="text"
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                />
                            )}

                        </div>
                    </div>
                ))}
            </div>

            {/* Input Section */}
            <div className="comment-input">
                <div
                    className="avatar"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9K8SNwVV0f4ggstewz9DwgsIXj0JuFeFTx67LPknsj1wuAkdGqqQ2fyKZA82CFK1Eg6OVyMHmOq7TrQubDv77OnHj8VFS7j_Yk5GYjGhlp-Us7dLxdNVIgVby14LpvDTOzjKLTAHAWe8-o-XDl1ZSh-wEa4-mZo2WUwJvEDD_iSUVgS17De-T6zTtqJfnGEKhg9eMH0k2o6cHdH8fcfhywPXFpxYt70zuICP8xpikc5CjxgMPJgFQHdqD7ajIRsmsWHGol0HDxMk')",
                    }}
                />
                <div className="input-box">
                    <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        type="text"
                        placeholder="Add a comment..."
                    />
                    <button
                        className="send-btn"
                        onClick={handleSend}
                        disabled={!comment.trim()}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentsPage;