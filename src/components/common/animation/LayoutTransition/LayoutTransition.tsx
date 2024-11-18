"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import FrozenRouter from "../FrozenRouter/FrozenRouter";
 
interface LayoutTransitionProps {
  children: React.ReactNode;
  className?: React.ComponentProps<typeof motion.div>["className"];
  style?: React.ComponentProps<typeof motion.div>["style"];
  initial: React.ComponentProps<typeof motion.div>["initial"];
  animate: React.ComponentProps<typeof motion.div>["animate"];
  exit: React.ComponentProps<typeof motion.div>["exit"];
}

export function LayoutTransition({
  children,
  className,
  style,
  initial,
  animate,
  exit,
}: LayoutTransitionProps) {
  const segment = useSelectedLayoutSegment();

  console.log(segment)
 
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        style={style}
        key={segment}
        initial={initial}
        animate={animate}
        exit={exit}
      >
        <FrozenRouter>
          {children}
        </FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}

