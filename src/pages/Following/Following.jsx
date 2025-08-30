import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFollowing } from "../../store/Actions/followActions";
import Loading from "../../components/Loader/Loading";
import { ArrowLeft } from "lucide-react";
import "./Following.css";

const Following = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { following, loading } = useSelector((s) => s.FollowReducer);
  const me = useSelector((s) => s.userReducer.user);

  useEffect(() => {
    dispatch(fetchFollowing(id));
  }, [id, dispatch]);

  return (
    <div className="follow-page">
      <div className="follow-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h2>Following</h2>
      </div>

      {loading ? (
        <Loading />
      ) : following.length ? (
        <ul className="follow-list">
          {following.map((f) => (
            <li
              key={f._id}
              className="follow-item"
              onClick={() => {
                const self = me?.userId?._id && String(me.userId._id) === String(f.user._id);
                navigate(self ? "/Profile" : `/other/profile/${f.user._id}`);
              }}
            >
              <img src={f.user.avatarUrl} alt={f.user.displayName} />
              <div>
                <p className="name">{f.user.displayName}</p>
                <p className="username">@{f.user.username}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">Not following anyone yet.</div>
      )}
    </div>
  );
};

export default Following;
