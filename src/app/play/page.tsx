"use client";
import { animate, easeOut, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";


// valley hero interaction
export default function Play() {
  return <div className="flex flex-col items-center justify-center h-screen">
    <div className="flex flex-col items-center justify-end ">
      <Bar />
    </div>
  </div>;
}

// Figma exports each height from its own top-left, so bottoms differ (50, 40.5, 57).
// Re-anchor every path to y=57 so morphing only moves the top — like a box squeezing from above.
const BAR_PATHS = [
  "M3.8894 12.2748C4.1642 9.2866 6.6706 7 9.6715 7H18.6449C21.634 7 24.1348 9.2693 24.4241 12.2444L28.5291 54.4526C28.6619 55.8177 27.589 57 26.2174 57H2.3228C0.9561 57 -0.1152 55.8257 0.01 54.4648L3.8894 12.2748Z",
  // "M3.7344 21.6515C4.0676 18.717 6.5504 16.5 9.5038 16.5H18.7079C21.647 16.5 24.1226 18.6961 24.4729 21.6142L28.4096 54.4005C28.5756 55.7831 27.4961 57 26.1035 57H2.32284C0.9363 57 -0.1413 55.7931 0.0151 54.4154L3.7344 21.6515Z",
  "M3.97205 5.33963C4.21531 2.32363 6.73391 0 9.7597 0H18.6102C21.6257 0 24.1393 2.30831 24.3956 5.31288L28.5902 54.48C28.7058 55.8357 27.6366 57 26.276 57H2.32264C0.966285 57 -0.101473 55.8426 0.0075742 54.4907L3.97205 5.33963Z",
] as const;


export const Bar = () => {
  const barProgress = useMotionValue(0);
  const barPath = useTransform(barProgress, [0, 1], [...BAR_PATHS]);

  useEffect(() => {
    animate(barProgress, [0, 1, 0], {
      ease: easeOut,
      duration: 1.6,
      times: [0, 0.32, 0.9],
      repeat: Infinity,
      repeatDelay: 1.2
    });
  }, []);

  return (
    <motion.svg
      width="29"
      height="57"
      viewBox="0 0 29 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path d={barPath} fill="#DCDCDE" />
    </motion.svg>
  )
}
