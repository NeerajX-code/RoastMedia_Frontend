import React from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const PreviousComments = ({ setShowCurrentCaption }) => {
  const { captions } = useSelector((state) => state.CaptionReducer);

  const captionSubmitHandler = (caption) => {
    setShowCurrentCaption(caption);
  };

  return (
    <>
      {captions.length > 0 ? (
        <motion.div
          className="previous_caption"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <AnimatePresence>
            {captions.map((caption, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ul style={{ padding: "10px 30px" }}>
                  <li
                    onClick={() => captionSubmitHandler(caption.response)}
                    style={{
                      color: "white",
                      cursor: "pointer",
                    }}
                    whileHover={{ scale: 1.05, color: "#a29bfe" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {caption.response}
                  </li>
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.p
          style={{
            padding: "clamp(0.8rem,1vw,1rem)",
            color: "white",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          there is no such comments
        </motion.p>
      )}
    </>
  );
};

export default PreviousComments;
