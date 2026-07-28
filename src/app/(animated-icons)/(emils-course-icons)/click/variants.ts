import { easeOut, easeInOut } from "motion/react";

const REPEAT_DELAY = 6;
const DURATION = 0.53;
const IDLE_DURATION = 0.63;

const backgroundVariants = {
  initial: {
    transform: "scale(1)",
  },
  hover: {
    transform: ["scale(1)", "scale(0.97)", "scale(1.01)", "scale(1)"],
    transition: {
      duration: DURATION,
      times: [0, 0.2, 0.6, 1],
      ease: easeOut,
      delay: 0.2,
    },
  },
  idle: {
    transform: ["scale(1)", "scale(0.97)", "scale(1.01)", "scale(1)"],
    transition: {
      duration: IDLE_DURATION,
      times: [0.2, 0.5, 0.85, 1],
      ease: easeOut,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: REPEAT_DELAY,
      delay: REPEAT_DELAY,
    },
  },
  click: {
    transform: ["scale(1)", "scale(0.97)", "scale(1.01)", "scale(1)"],
    transition: {
      duration: DURATION,
      times: [0.1, 0.3, 0.65, 1],
      ease: "easeOut",
    },
  },
};

const defaultStrokeDashoffsets = [0, 0.55, 0.9];

const lineVariants = {
  initial: (i: number) => ({
    strokeDashoffset: defaultStrokeDashoffsets[i],
  }),
  hover: (i: number) => {
    return {
      strokeDashoffset: i === 1 ? [1.05, 0] : [1.05, 0.4],
      transition: {
        delay: i === 1 ? 0 : 0.04,
        duration: DURATION,
        times: [0.7, 0.9],
      },
    };
  },
  idle: (i: number) => {
    const strokeDashoffset = defaultStrokeDashoffsets[i];
    return {
      strokeDashoffset: [strokeDashoffset, 1.05, strokeDashoffset],
      transition: {
        times: [0.5, 0.5, 0.8],
        delay: REPEAT_DELAY,
        duration: IDLE_DURATION,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: REPEAT_DELAY,
      },
    };
  },
  click: (i: number) => {
    return {
      strokeDashoffset: i === 1 ? [1.05, 0] : [1.05, 0.4],
      transition: {
        delay: i === 1 ? 0 : 0.04,
        times: [0.4, 0.6],
        duration: DURATION,
      },
    };
  },
};

const handVariants = {
  initial: {
    transform: "translateX(0px) translateY(0px) rotate(0deg)",
  },
  hover: {
    transform: [
      "translateX(0px) translateY(0px) rotate(0deg)",
      "translateX(-4px) translateY(3px) rotate(25deg)",
    ],
    transition: {
      duration: DURATION,
      times: [0, 0.4],
      ease: easeInOut,
    },
  },
  click: {
    transform: "translateX(-4px) translateY(3px) rotate(25deg)",
  },
};

export {
  backgroundVariants,
  DURATION,
  handVariants,
  IDLE_DURATION,
  lineVariants,
  REPEAT_DELAY,
  defaultStrokeDashoffsets
};
