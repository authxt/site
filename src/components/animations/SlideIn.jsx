import React from "react";
import { motion } from "framer-motion";

const SlideIn = ({ children }) => {
  return (
    <motion.div
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
