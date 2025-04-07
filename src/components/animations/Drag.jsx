import React from "react";
import { motion } from "framer-motion";

const Drag = ({ children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      whileDrag={{ scale: 0.9, rotate: 10 }}
      drag
    >
      {children}
    </motion.div>
  );
};

export default Drag;
