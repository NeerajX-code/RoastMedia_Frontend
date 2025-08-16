import React, { useRef, useState } from "react";
import "./Post.css";

const Post = () => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const desktopInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Handle file selection (from input or drop)
  const handleImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    
    if (file) {
      setPreview(URL.createObjectURL(file));
      console.log(file);
    }
  };

  // Drag over event (prevents browser from opening the file)
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Drag leave event (when leaving dropzone)
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Drop event (when user drops file)
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    console.log(file);
    
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = () => {
    console.log('hello');
  }

  return (
    <div className="roast-generator">
      <div className="roast-generator__header">
        <h2 className="roast-generator__title">Roast Generator</h2>
      </div>

      <div className="roast-generator__content">
        <h2 className="roast-generator__main-title">Drag &amp; Drop <span style={{
          color: "#39E079",
        }}>Your Image</span></h2>

        <p className="roast-generator__subtitle">
          and See the magic
        </p>
      </div>

      <div className="roast-generator__dropzone-wrapper">
        <div
          className={`roast-generator__dropzone ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="roast-generator__dropzone-texts">
            <p className="dropzone-title">Drop your image here</p>
            <p className="dropzone-subtitle">Or browse your files</p>
          </div>

          <div className="roast-generator__capture-btn">
            <button
              type="button"
              className="post-btn desktop-only"
              onClick={() => desktopInputRef.current.click()}
            >
              Choose Image
            </button>
            <input
              ref={desktopInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />

            <button
              type="button"
              className="post-btn mobile-only"
              onClick={() => galleryInputRef.current.click()}
            >
              Gallery
            </button>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>

      {preview && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <img
            src={preview}
            alt="preview"
            style={{
              width: "200px",
              height: "fit-content",
              objectFit: "contain",
              borderRadius: "12px",
            }}
          />
        </div>
      )}

      <div className="roast-generator__footer">
        <button className="post-btn" type="submit" onClick={submitHandler}>
          Generate magic
        </button>
      </div>
    </div>
  );
};

export default Post;
