export const videoPlayerVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    margin: 0,
    transition: {
      duration: 0.3,
      ease: [0, 0.55, 0.45, 1],
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    margin: "1.2rem 0",
    transition: {
      duration: 0.3,
      ease: [0, 0.55, 0.45, 1],
    },
  },
};