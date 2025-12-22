import type { ReactNode } from "react";
import { motion } from "framer-motion";
const Motion = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,

        transition: {
          duration: 0.1,
        },
      }}
      viewport={{
        once: true,
        amount: "all",
      }}
    >
      {children}
    </motion.div>
  );
};

export default Motion;
