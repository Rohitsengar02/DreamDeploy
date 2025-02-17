"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export const TextGenerateEffect = ({
  words,
  className = "",
}: {
  words: string;
  className?: string;
}) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    });
  }, [controls]);

  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0 }}
      animate={controls}
    >
      <span className="text-black dark:text-white">{words}</span>
    </motion.div>
  );
};
