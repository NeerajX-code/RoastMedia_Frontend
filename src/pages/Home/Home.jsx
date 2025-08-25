import React, { useState } from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loader/Loading";
import { getHomePosts } from "../../store/Actions/HomePostActions";
import { useEffect } from "react";
import PostCard from "../../components/PostCard/PostCard";
import ErrorCard from "../../components/ErrorCard/ErrorCard";

const Home = () => {

  const { posts, loading, error } = useSelector((state) => state.HomePostReducer);
  const dispatch = useDispatch()



  useEffect(() => {

    if (posts.length == 0) {
      dispatch(getHomePosts());
    }

    // if (posts.length > 0) {
    //   console.log(posts);
    // }

  }, [posts, dispatch])


  if (loading) {
    return <Loading />
  }


  return (
    <div className="post-feed" style={{position:"relative"}}>
      <div className="post-feed_wrapper">
        <div className="post-feed_options">
          <h2>For You</h2>
          <h2>Following</h2>
        </div>
        <ErrorCard message={error} loading={loading} action={getHomePosts} />
        <div className="post-feed__list">
          {posts?.map((post, i) => (
            <PostCard key={i} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
