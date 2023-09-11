import { forwardRef, useState } from "react";
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
    },
    animating: {
      opacity: 1,
    },
    exitting: {
      opacity: 0,
    },
  },
  transition: {
    duration: 1.5
  }
};

export const PageFade = forwardRef<HTMLDivElement, PageFadeProps>(function PageFade({ id, children, className }, ref) {
  const { asPath: _asPath } = useRouter();
  const [asPath] = useState<string>(_asPath);

  return (
    <motion.div
      initial="entering"
      animate="animating"
      exit="exitting"
      variants={animation.variants}
      transition={animation.transition}
      key={asPath}
      id={id}
      className={className}
      ref={ref}
    >
      {children}
    </motion.div>
  );
});