import React, { useRef, useState, useEffect } from "react";
import "./Post.css";
import { asyncGenerateCaption } from "../../store/Actions/postActions";
import { useDispatch } from "react-redux";
import { clearCaption } from "../../store/Reducers/captionReducer";
import { ChevronDown, X } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

const Post = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [personality, setPersonality] = useState("Desi_Uncle");

  const desktopInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const validateFile = (file) => {
    if (!allowedTypes.includes(file.type)) {
      return "Only image files (JPG, PNG, GIF, WEBP) are allowed";
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
    formData.append("personality", personality);
    dispatch(asyncGenerateCaption(formData));
  };

  const clearPreviewHandler = () => {
    setPreview(null);
    dispatch(clearCaption());
  }

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

      {!preview &&
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
                className="choose-btn desktop-only"
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
                className="choose-btn mobile-only"
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

              {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </div>
          </div>
        </div>
      }

      {preview && (
        <div className="bottom">
          <div className="preview-wrapper">
            <button className="clear-preview" onClick={clearPreviewHandler}><X /></button>

            <img
              src={preview}
              alt="preview"
              style={{
                width: "300px",
                height: "250px",
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
          </div>

          <div className="roast-generator__footer">
            <select
              className="dropdown"
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
            >
              <option value="Desi_Uncle">Desi Uncle</option>
              <option value="Desi_Bua">Desi Bua</option>
              <option value="Desi_Aunty">Desi Aunty</option>
              <option value="Desi_Dost">Desi Dost</option>
              <option value="Shayar_Banda">Shayar Banda</option>
              <option value="Bambaiya_Tapori">Bambaiya Tapori</option>
              <option value="Gyaani_Baba">Gyaani Baba</option>
              <option value="Petty_Aunty">Petty Aunty</option>
              <option value="Delhi_Launda">Delhi Launda</option>
              <option value="Punjabi_Paji">Punjabi Paji</option>
              <option value="South_Anna">South Anna</option>
              <option value="Gujju_Ben">Gujju Ben</option>
              <option value="Tech_Chomu">Tech Chomu</option>
              <option value="Crypto_Fraud">Crypto Fraud</option>
              <option value="TikTokiya">TikTokiya</option>
              <option value="Bollywood_Drama">Bollywood Drama</option>
              <option value="Tharki_Chacha">Tharki Chacha</option>
              <option value="Hostel_Dost">Hostel Dost</option>
              <option value="Shayar_Bewda">Shayar Bewda</option>
              <option value="Petty_Chaiwala">Petty Chaiwala</option>
              <option value="Thug_Dadi">Thug Dadi</option>
              <option value="Rickshaw_Wala">Rickshaw Wala</option>
            </select>

            <button className="generate-btn" type="submit" onClick={submitHandler}>
              Generate
            </button>

            <button className="create_post-btn"><span>Create</span> Post</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
