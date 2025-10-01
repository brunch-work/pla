import { stagger } from "motion";

export const navVariants = {
  hidden: {
    opacity: 0,
    transition: {
      delayChildren: stagger(0.01, {from: "last"}),
      delay: 0.2,
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.01),
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.5,
    },
  }
}