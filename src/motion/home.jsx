import { stagger } from "motion";

export const homeVariants = {
  hidden: {
  },
  visible: {
    transition: {
      delayChildren: stagger(0.05),
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 1,
    },
  },
};

export const homeItemVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(3px)",
    y: 50,
  },
  visible: {
    opacity: 1,
    filter: "none",
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.75,
      delay: 0.75
    },
  },
};

export const featuredVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    filter: "none",
    transition: {
      ease: [0, 0.55, 0.45, 1],
      type: "tween",
      duration: 0.5,
      delay: 1,
    },
  },
}

export const latestVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.5,
      ease: [0, 0.55, 0.45, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0.55, 0.45, 1],
      delay: 0.75
    },
  },
}

export const preloaderVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0, 0.55, 0.45, 1],
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0, 0.55, 0.45, 1],
    },
  },
}

export const preloaderLogoVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.3,
      ease: [0, 0.55, 0.45, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0, 0.55, 0.45, 1],
    },
  },
}

export const preloaderTitleVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.5,
      ease: [0, 0.55, 0.45, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0.55, 0.45, 1],
      delay: 0.1
    },
  },
}