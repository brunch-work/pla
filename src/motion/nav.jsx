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

export const subNavActiveItemVariants = {
  hidden: {
    opacity: 0,
    display: "none",
    transition: {
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0,
    },
  },
  visible: {
    opacity: 1,
    display: "block",
    transition: {
      delay: 0.5,
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.3,
    },
  }
}

export const plusButtonVariants = {
  hidden: {
    opacity: 0,
    width: 0,
    display: "none",
    transition: {
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    display: "block",
    width: "calc(var(--base-font-size) * 0.8)",
    transition: {
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.3,
      delay: 1,
    },
  }
}