export const infoVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.3,
    },
  },
};

export const videosVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.3,
    },
  },
};

export const videoVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.3,
    },
  },
};
