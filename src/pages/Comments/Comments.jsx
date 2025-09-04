import { useEffect, useState } from "react";
import "./CommentsPage.css";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteComment, asyncEditComment, asyncGetComments, asyncPostComment } from "../../store/Actions/commentActions";
import { CheckCircle, Delete, Edit, Loader, Loader2 } from "lucide-react";
import Loading from "../../components/Loader/Loading";
import { useToast } from "../../components/Toast/useToast";

const CommentsPage = () => {

    const { id } = useParams();
    const [editId, setEditId] = useState(null);      // which comment is in edit mode
    const [editedComment, setEditedComment] = useState("");
    const { comments, loading } = useSelector((state) => state.CommentsReducer);
    const { user } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const avatar = user?.avatarUrl
    const { toast } = useToast();

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!comment.trim()) return;
        if (!user) {
            toast.error("Please login to comment.");
            return;
        }
        try {
            await Promise.resolve(dispatch(asyncPostComment({ id, comment })));
            toast.success("Comment posted", { duration: 2200 });
            setComment("");
        } catch (err) {
            toast.error(err?.message || "Failed to post comment", { duration: 3000 });
        }
    };

    useEffect(() => {
        if (id) dispatch(asyncGetComments(id));
    }, [dispatch, id])

    if (loading) {
        return <Loading />
    }

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

                                {c.user === user?.userId?._id && (
                                    <div className="actions">
                                        <button
                                            onClick={async () => {
                                                try {
                                                    await Promise.resolve(
                                                        dispatch(
                                                            asyncDeleteComment({
                                                                postId: id,
                                                                commentId: c._id,
                                                            })
                                                        )
                                                    );
                                                    toast.success("Comment deleted", { duration: 2000 });
                                                } catch (err) {
                                                    toast.error(err?.message || "Failed to delete comment");
                                                }
                                            }}
                                        >
                                            <i className="ri-delete-bin-4-line delete__cmnt"></i>
                                        </button>
                                    </div>
                                )}
                            </div>

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
                            `url('${avatar}')`,
                    }}
                />
                <form className="input-box" onSubmit={handleSend}>
                    <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        type="text"
                        placeholder="Add a comment..."
                    />
                    <button
                        className="send-btn"
                        disabled={!comment.trim()}
                        type="submit"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CommentsPage;