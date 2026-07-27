"use client";

import {
  motion,
  useAnimate,
  useMotionValue,
  useTransform,
  easeOut,
  easeInOut,
} from "motion/react";

const handPaths = [
  "M58.5431 71.4419C60.2401 71.6239 61.3091 69.6649 60.2391 68.3369L49.2671 54.7189C48.6804 53.9554 48.4158 52.9927 48.5299 52.0366C48.6439 51.0805 49.1275 50.207 49.8773 49.6028C50.6271 48.9987 51.5835 48.712 52.542 48.804C53.5004 48.8959 54.3849 49.3593 55.0061 50.0949L58.3501 54.2449C58.8429 54.8569 59.5061 55.3089 60.2559 55.5437C61.0057 55.7785 61.8083 55.7855 62.5621 55.5639L70.6681 53.1809C72.8705 52.5335 75.23 52.6775 77.3372 53.5881C79.4444 54.4987 81.1663 56.1184 82.2041 58.1659L84.9681 63.6179C85.7915 65.2412 86.0321 67.098 85.6498 68.8775C85.2675 70.657 84.2855 72.2511 82.8681 73.3929L74.6611 80.0039C73.7139 80.7673 72.604 81.3028 71.417 81.5691C70.23 81.8355 68.9976 81.8255 67.8151 81.5399L55.1911 78.4919C54.2783 78.2707 53.4839 77.7106 52.9688 76.9252C52.4537 76.1399 52.2566 75.188 52.4174 74.2627C52.5781 73.3374 53.0848 72.5078 53.8346 71.9422C54.5844 71.3766 55.5212 71.1173 56.4551 71.2169L58.5431 71.4419Z",
  "M58.7957 70.4997C60.4927 70.6817 61.3092 69.6653 60.2392 68.3373L51.8366 57.8368C51.2499 57.0733 50.867 55.9897 50.981 55.0336C51.0951 54.0776 51.5787 53.204 52.3285 52.5999C53.0783 51.9958 54.0347 51.7091 54.9931 51.801C55.9516 51.893 56.7918 52.4457 57.413 53.1813L58.3502 54.2453C58.8429 54.8573 59.5062 55.3093 60.256 55.5441C61.0058 55.7789 61.8084 55.7859 62.5622 55.5643L70.6681 53.1813C72.8705 52.5339 75.23 52.6779 77.3373 53.5885C79.4445 54.4991 81.1664 56.1187 82.2042 58.1663L84.9682 63.6183C85.7915 65.2416 86.0322 67.0984 85.6499 68.8778C85.2676 70.6573 84.2855 72.2515 82.8682 73.3933L74.6611 80.0043C73.714 80.7677 72.604 81.3032 71.417 81.5695C70.23 81.8358 68.9977 81.8258 67.8151 81.5403L55.5115 77.3318C54.5988 77.1105 53.8043 76.5504 53.2892 75.765C52.7742 74.9797 52.577 74.0279 52.7378 73.1025C52.8986 72.1772 53.4052 71.3476 54.155 70.782C54.9048 70.2165 55.8416 69.9572 56.7755 70.0567L58.7957 70.4997Z",
];

const defaultStrokeDashoffsets = [0, 0.55, 0.9];

export default function ClickAnimation() {
  const [scope, animate] = useAnimate();
  const handPathProgress = useMotionValue(0);
  const handPath = useTransform(handPathProgress, [0, 1], handPaths);

  const handleMouseEnter = () => {
    animate(
      "[data-animate='background']",
      { transform: ["scale(1)", "scale(0.97)", "scale(1.01)", "scale(1)"] },
      {
        duration: 0.53,
        times: [0, 0.2, 0.6, 1],
        ease: easeOut,
        delay: 0.2,
      },
    );

    animate(
      "[data-animate='hand']",
      {
        transform: [
          "translateX(0px) translateY(0px) rotate(0deg)",
          "translateX(-4px) translateY(3px) rotate(25deg)",
        ],
      },
      {
        duration: 0.53,
        times: [0, 0.4],
        ease: easeInOut,
      },
    );

    animate(handPathProgress, [0, 1, 0], {
      duration: 0.53,
      times: [0.4, 0.6, 0.9],
      ease: easeOut,
    });

    scope.current.querySelectorAll("[data-animate='line']").forEach((line: any) => {
      const index = line.getAttribute("data-index");
      animate(
        line,
        {
          strokeDashoffset: index === "1" ? [1.05, 0] : [1.05, 0.4],
        },
        {
          delay: index === "1" ? 0 : 0.04,
          duration: 0.53,
          times: [0.7, 0.9],
        },
      );
    });
  };

  const handleMouseLeave = () => {
    animate("[data-animate='hand']", {
      transform: "translateX(0px) translateY(0px) rotate(0deg)",
    });

    scope.current.querySelectorAll("[data-animate='line']").forEach((line: any) => {
      const index = line.getAttribute("data-index");
      animate(line, {
        strokeDashoffset: defaultStrokeDashoffsets[Number(index)],
      });
    });
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <svg
        width="125"
        height="119"
        viewBox="0 0 125 119"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible!"
      >
        <g
          ref={scope}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.g
            data-animate="background"
            initial={{ transform: "scale(1)" }}
            filter="url(#filter0_i_269_329)"
          >
            <path
              d="M14.9066 10.1626C18.9956 19.8776 23.4146 30.4306 25.5696 35.7296C26.3866 37.7366 25.6336 39.9006 23.7896 41.0376L12.7336 47.8526C12.1283 48.2259 11.6112 48.7261 11.218 49.3187C10.8249 49.9113 10.5651 50.5822 10.4565 51.285C10.3479 51.9879 10.3932 52.7059 10.5891 53.3895C10.7851 54.0732 11.1272 54.7061 11.5916 55.2446L19.3536 64.2426C20.1213 65.1328 20.5445 66.2687 20.5464 67.4443C20.5482 68.6198 20.1286 69.757 19.3636 70.6496L1.34161 91.6766C-1.69439 95.2186 1.45161 100.601 6.02761 99.6936L31.5196 94.6386C32.7448 94.3961 34.0163 94.6291 35.0758 95.2904C36.1353 95.9516 36.9033 96.9915 37.2236 98.1986L41.1356 112.939C42.0306 116.315 46.0646 117.704 48.8496 115.596L60.7136 106.617C61.5752 105.964 62.628 105.614 63.7089 105.62C64.7897 105.627 65.8382 105.99 66.6916 106.654L81.3666 118.048C84.2466 120.285 88.4726 118.716 89.1956 115.143L92.5696 98.4746C92.7053 97.8046 92.9793 97.1702 93.3741 96.6121C93.7689 96.054 94.2759 95.5844 94.8625 95.2333C95.4491 94.8823 96.1026 94.6575 96.781 94.5733C97.4595 94.4892 98.148 94.5475 98.8026 94.7446L115.49 99.7726C119.957 101.119 123.61 96.0636 120.929 92.2446L106.344 71.4686C105.633 70.4557 105.331 69.2121 105.497 67.986C105.663 66.7599 106.286 65.6417 107.241 64.8546L123.32 51.6046C126.177 49.2496 125.503 44.7016 122.085 43.2766L109.166 37.8936C108.082 37.4416 107.195 36.6163 106.667 35.5672C106.139 34.5182 106.004 33.3146 106.287 32.1746L111.616 10.7026C112.746 6.15163 107.466 2.75564 103.793 5.67064L84.2026 21.2176C81.6436 23.2486 77.8526 22.2626 76.6066 19.2426L70.0536 3.36063C68.5736 -0.224368 63.7166 -0.762367 61.4886 2.41363L51.8826 16.1066C51.1775 17.1118 50.1215 17.8164 48.9227 18.0819C47.7239 18.3473 46.4692 18.1542 45.4056 17.5406L21.8996 3.98863C17.8176 1.63563 13.0796 5.82063 14.9066 10.1626Z"
              fill="#F8F8F8"
            />
          </motion.g>

          <motion.path
            d={handPath}
            data-animate="hand"
            initial={{
              transform: "translateX(0%) translateY(0%) rotate(0deg)",
            }}
            fill="#989898"
          />

          <motion.line
            data-animate="line"
            data-index="2"
            initial={{ strokeDashoffset: defaultStrokeDashoffsets[2] }}
            x1="62.8541"
            y1="39.4586"
            x2="64.5595"
            y2="34.929"
            strokeOpacity="0.5"
            strokeWidth="3.7"
            strokeLinecap="round"
            strokeDasharray="1px 1.1px"
            pathLength="1"
            stroke="#989898"
          />
          <motion.line
            data-animate="line"
            data-index="1"
            initial={{ strokeDashoffset: defaultStrokeDashoffsets[1] }}
            x1="53.0633"
            y1="38.313"
            x2="52.2947"
            y2="33.5344"
            strokeOpacity="0.5"
            strokeWidth="3.7"
            strokeLinecap="round"
            strokeDasharray="1px 1.1px"
            pathLength="1"
            stroke="#989898"
          />
          <motion.line
            data-animate="line"
            data-index="0"
            initial={{ strokeDashoffset: defaultStrokeDashoffsets[0] }}
            x1="44.047"
            y1="42.3621"
            x2="41.0059"
            y2="38.5917"
            strokeOpacity="0.5"
            strokeWidth="3.7"
            strokeLinecap="round"
            strokeDasharray="1px 1.1px"
            pathLength="1"
            stroke="#989898"
          />
        </g>

        <defs>
          <filter
            id="filter0_i_269_329"
            x="0"
            y="0"
            width="124.969"
            height="118.764"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="6.551" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_269_329"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}