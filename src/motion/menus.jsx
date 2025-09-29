export const menuVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.01,
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
    transition: {
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.01,
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.3,
    },
  },
};
