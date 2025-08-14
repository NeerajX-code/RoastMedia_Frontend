import React from "react";
import "./Post.css";

const Post = () => {
  return (
    <div className="roast-generator">
      {/* Header */}
      <div className="roast-generator__header">
        <div className="roast-generator__back-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </div>
        <h2 className="roast-generator__title">Roast Generator</h2>
      </div>

      {/* Heading */}
      <h2 className="roast-generator__main-title">
        Drag &amp; Drop Your Image
      </h2>
      <p className="roast-generator__subtitle">
        Our AI will generate a savage roast caption instantly.
      </p>

      {/* Dropzone */}
      <div className="roast-generator__dropzone-wrapper">
        <div className="roast-generator__dropzone">
          <div className="roast-generator__dropzone-texts">
            <p className="dropzone-title">Drop your image here</p>
            <p className="dropzone-subtitle">Or browse your files</p>
          </div>
          <button className="dropzone-btn">Browse Files</button>
        </div>
      </div>

      {/* Footer Button */}
      <div className="roast-generator__footer">
        <button className="post-btn">Post Roast</button>
        <div className="footer-space"></div>
      </div>
    </div>
  );
};

export default Post;
