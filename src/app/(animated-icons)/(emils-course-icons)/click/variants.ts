import { easeOut } from "motion";

const DURATION = 0.53;

export const backgroundVariants = {
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
        // ...
      },
    },
    click: {
      transform: ["scale(1)", "scale(0.97)", "scale(1.01)", "scale(1)"],
      transition: {
        // ...
      },
    },
}

