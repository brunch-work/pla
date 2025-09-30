import { stagger } from "motion";

export const menuVariants = {
  hidden: {
    opacity: 0,
    transition: {
      delayChildren: stagger(0.01, {from: "last"}),
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.2,
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
  },
};

export const menuItemVariants = {
  hidden: {
    opacity: 0,
    y: -5,
    height: 0,
    transition: {
      delayChildren: stagger(0.01, {from: "last"}),
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: {
      delayChildren: stagger(0.01),
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.3,
    },
  },
};
