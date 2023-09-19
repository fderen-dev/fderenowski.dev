import { forwardRef } from "react";
import { motion } from "framer-motion"

interface PageFadeProps { 
  children: React.ReactNode,
  className?: string
  id?: string;
}

const animation = {
  variants: {
    entering: {
      clipPath: "inset(100% 0 0 0)",
    },
    animating: {
      clipPath: "inset(0)",
      transition: {
        delay: 0.5,
        duration: 0.75,
      },
    },
    exitting: {
      clipPath: "inset(100% 0 0 0)",
      transition: {
        duration: 0.5,
      },
    },
  },
};

export const PageFade = forwardRef<HTMLDivElement, PageFadeProps>(function PageFade({ id, children, className }, ref) {

  return (
    <motion.div
      initial="entering"
      animate="animating"
      exit="exitting"
      variants={animation.variants}
      id={id}
      className={className}
      ref={ref}
    >
      {children}
    </motion.div>
  );
});