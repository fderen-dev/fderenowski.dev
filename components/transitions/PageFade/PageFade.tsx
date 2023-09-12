import { forwardRef } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion"

interface PageFadeProps { 
  children: React.ReactNode,
  className?: string
  id?: string;
}

const animation = {
  variants: {
    entering: {
      opacity: 0,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    },
    animating: {
      opacity: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    },
    exitting: {
      opacity: 0,
      clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
    },
  },
  transition: {
    exitting: {
      delay: 0.75
    }
  },
};

export const PageFade = forwardRef<HTMLDivElement, PageFadeProps>(function PageFade({ id, children, className }, ref) {

  return (
    <motion.div
      initial="entering"
      animate="animating"
      exit="exitting"
      variants={animation.variants}
      transition={animation.transition}
      id={id}
      className={className}
      ref={ref}
    >
      {children}
    </motion.div>
  );
});