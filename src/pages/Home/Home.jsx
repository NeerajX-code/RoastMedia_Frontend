import React from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loader/Loading";
import { getHomePosts } from "../../store/Actions/HomePostActions";
import { useEffect } from "react";
import PostCard from "../../components/PostCard/PostCard";

const Home = () => {

  const { posts, loading } = useSelector((state) => state.HomePostReducer);
  const dispatch = useDispatch()

  // const posts = [
  //   // {
  //   //   username: "JohnDoe",
  //   //   image: "",
  //   //   caption: "My latest selfie!",
  //   //   roast: "You look like a potato that just learned about the gym.",
  //   //   likes: 24,
  //   //   comments: 5,
  //   //   shares: 2,
  //   //   bookmarks: 3
  //   // },
  //   {
  //     username: "JaneSmith",
  //     image: "https://ik.imagekit.io/nkde9n0dc/b3984cf4-0b18-473d-8ec5-4cf5837f2e06_UDs3mhVzz6",
  //     caption: "What do you think?",
  //     roast: "You look like you got lost in a thrift store.",
  //     likes: 40,
  //     comments: 10,
  //     shares: 5,
  //     bookmarks: 8
  //   }
  // ];

  useEffect(() => {

    if (posts.length == 0) {
      dispatch(getHomePosts());
    }

    if (posts.length > 0) {
      console.log(posts);
    }

  }, [posts, dispatch])


  if (loading) {
    return <Loading />
  }
  return (
    <div className="post-feed">
      <div className="post-feed_wrapper">
        <div className="post-feed_options">
          <h2>For You</h2>
          <h2>Following</h2>
        </div>
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
