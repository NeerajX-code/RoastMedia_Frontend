import React, { useRef, useState, useEffect } from "react";
import "./Post.css";
import { asyncGenerateCaption } from "../../store/Actions/postActions";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const Post = ({ onSubmit }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const desktopInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const validateFile = (file) => {
    if (!file.type.startsWith("image/")) {
      return "Only image files are allowed";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be under 5MB";
    }
    return null;
  };

  const handleFileSelect = (file) => {
    const errorMsg = validateFile(file);
    if (errorMsg) {
      setError(errorMsg);
      setFile(null);
      setPreview(null);
      return;
    }
    setError(null);
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const submitHandler = () => {
    if (!file) {
      setError("Please select an image before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
      
    asyncGenerateCaption(formData)
    
  };

  return (
    <div className="roast-generator">
      <div className="roast-generator__header">
        <h2 className="roast-generator__title">Roast Generator</h2>
      </div>

      <div className="roast-generator__content">
        <h2 className="roast-generator__main-title">
          Give{" "}
          <span style={{ color: "#39E079", fontSize: "clamp(1.9rem, 2vw, 2.1rem)" }}>
            Your Image
          </span>
        </h2>
        <p className="roast-generator__subtitle">and See the magic</p>
      </div>

      <div className="roast-generator__dropzone-wrapper">
        <div
          className="roast-generator__dropzone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="roast-generator__dropzone-texts">
            <p className="dropzone-title">Drop your image here</p>
            <p className="dropzone-or">Or</p>
            <p className="dropzone-subtitle">Browse your files</p>
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

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

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
