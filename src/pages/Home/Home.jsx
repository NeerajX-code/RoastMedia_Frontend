import React from "react";
import "./Home.css";
import { Heart, Combine, Share2, Bookmark } from "lucide-react";

const Home = () => {

  const posts = [
    {
      username: "JohnDoe",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa2u7UKUlNuOGSrw2-h-oIz99LT8N37JWqXQ&s",
      caption: "My latest selfie!",
      roast: "You look like a potato that just learned about the gym.",
      likes: 99,
      comments: 5,
      shares: 2,
      bookmarks: 3
    },
    {
      username: "JaneSmith",
      image: "https://ik.imagekit.io/nkde9n0dc/b3984cf4-0b18-473d-8ec5-4cf5837f2e06_UDs3mhVzz6",
      caption: "What do you think?",
      roast: "You look like you got lost in a thrift store.",
      likes: 40,
      comments: 10,
      shares: 5,
      bookmarks: 8
    }
  ];

  return (
    <div className="post-feed">
      <div className="post-feed_wrapper">
        <div className="post-feed_options">
            <h2>For You</h2>
            <h2>Following</h2>
        </div>
        <div className="post-feed__list">
          {posts.map((post, i) => (
            <div key={i} className="post">
              <div
                className="post__image">
                <img src={post.image} alt="" />
              </div>
              <div className="post__content">
                <h2 className="post__username">{post.username}</h2>
                <p className="post__caption">{post.caption}</p>
                <p className="post__roast">"{post.roast}"</p>
                <div className="post__actions">
                  <button><Heart /> <span>{post.likes}</span></button>
                  <button><Combine /> <span>{post.comments}</span></button>
                  <button><Share2 /> <span>{post.shares}</span></button>
                  <button><Bookmark /> <span>{post.bookmarks}</span></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
