import { motion } from "framer-motion";
import "./AppLoader.css";

const AppLoader = () => {
  return (
    <div className="app_loader">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [1, 0.6, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "2px solid white",
        }}
      />

      {/* Text reveal */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          fontSize: "1.2rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        Loading...
      </motion.span>
    </div>
  );
};

export default AppLoader;
