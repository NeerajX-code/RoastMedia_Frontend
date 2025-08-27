import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFollowers } from "../../store/Actions/followActions";
import Loading from "../../components/Loader/Loading";
import { ArrowLeft } from "lucide-react";
import "./Followers.css";

const Followers = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { followers, loading } = useSelector((s) => s.FollowReducer);

  useEffect(() => {
    dispatch(fetchFollowers(id));
  }, [id, dispatch]);

  return (
    <div className="follow-page">
      <div className="follow-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h2>Followers</h2>
      </div>

      {loading ? (
        <Loading />
      ) : followers.length ? (
        <ul className="follow-list">
          {followers.map((f) => (
            <li key={f._id} className="follow-item" onClick={() => navigate(`/other/profile/${f.user._id}`)}>
              <img src={f.user.avatarUrl} alt={f.user.displayName} />
              <div>
                <p className="name">{f.user.displayName}</p>
                <p className="username">@{f.user.username}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">No followers yet.</div>
      )}
    </div>
  );
};

export default Followers;
