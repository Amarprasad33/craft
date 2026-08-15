"use client"
import { useHoverTimeout } from "@/lib/hooks/use-hover-timeout";
import { AnimationPlaybackControls, easeOut, motion, useAnimate, Variants } from "motion/react"
import { useRef } from "react";


export default function LightBlubAnimation() {
  return (
    <div className="flex justify-center items-center w-full bg-white min-h-screen">
      <BlubIcon />
    </div>
  )
}


const BlubIcon = () => {
  const [scope, animate] = useAnimate();
  const controls: AnimationPlaybackControls[] = [];
  const hoverDisabledRef = useRef(false);
  const animationCompletedRef = useRef(false);
  const hoverAnimationOngoing = useRef(false);

  const wholeVariants = {
    initial: {
      transform: "translateY(0%) rotate(0deg) scale(1)",
    },
    hover: {
      transform: [
        "translateY(0px) rotate(0deg) scale(1)",
        "translateY(-6%) rotate(-1.5deg) scale(0.99)",
        "translateY(8%) rotate(2.5deg) scale(1.02)",
        "translateY(6%) rotate(1.5deg) scale(1)",
      ],
      transition: {
        duration: 0.7,
        times: [0, 0.3, 0.6, 1],
        ease: "easeInOut",
      },
    },
    click: {
      transform: [
        "translateY(6%) rotate(1.5deg) scale(1)",
        "translateY(-2%) rotate(-1.5deg) scale(0.99)",
        "translateY(9%) rotate(2.5deg) scale(1.02)",
        "translateY(6%) rotate(1.5deg) scale(1)",
      ],
      transition: {
        duration: 0.7,
        times: [0, 0.3, 0.6, 1],
        ease: "easeInOut",
      },
    },
  };
  const backgroundVariants = {
    initial: {
      transform: "scale(1)",
    },
    hover: {
      transform: ["scale(1)", "scale(0.985)", "scale(1.02)", "scale(1)"],
      transition: {
        duration: 0.7,
        times: [0, 0.3, 0.6, 1],
        ease: "easeInOut",
      },
    },
    click: {
      transform: ["scale(1)", "scale(0.985)", "scale(1.02)", "scale(1)"],
      transition: {
        duration: 0.7,
        times: [0, 0.35, 0.6, 1],
        ease: "easeInOut",
      },
    },
  };
  const bulbVariants = {
    initial: {
      opacity: 1,
      transform: "translateY(0%) translateX(0%)",
    },
    hover: {
      opacity: [0.3, 0.3, 1],
      transform: [
        "translateY(0%) translateX(0%)",
        "translateY(-3%) translateX(3%)",
        "translateY(0%) translateX(0%)",
      ],
      transition: {
        duration: 0.7,
        times: [0.2, 0.45, 0.6],
      },
    },
    // idle: (initialDelay: boolean) => ({
    //   opacity: [1, 0.3, 1, 0.3, 0.3, 1],
    //   transition: {
    //     duration: 0.7,
    //     times: [0, 0.05, 0.1, 0.2, 0.5, 0.7],
    //     delay: initialDelay ? INITIAL_DELAY : REPEAT_DELAY,
    //     repeat: Infinity,
    //     repeatType: "loop",
    //     repeatDelay: REPEAT_DELAY,
    //   },
    // }),
    click: {
      opacity: [0.3, 0.3, 1],
      transform: [
        "translateY(0%) translateX(0%)",
        "translateY(-4%) translateX(3%)",
        "translateY(0%) translateX(0%)",
      ],
      transition: {
        duration: 0.7,
        times: [0.2, 0.45, 0.6],
      },
    },
  };

  const stemVariants = {
    initial: {
      opacity: 1,
    },
    hover: {
      opacity: [0.3, 0.3, 1],
      transform: [
        "translateY(0%) translateX(0%)",
        "translateY(-60%) translateX(3%)",
        "translateY(0%) translateX(0%)",
      ],
      transition: {
        duration: 0.7,
        times: [0.2, 0.45, 0.6],
      },
    },
    // idle: (initialDelay: boolean) => ({
    //   opacity: [1, 0.3, 1, 0.3, 0.3, 1],
    //   transition: {
    //     duration: DURATION,
    //     times: [0, 0.05, 0.1, 0.2, 0.5, 0.7],
    //     delay: initialDelay ? INITIAL_DELAY : REPEAT_DELAY,
    //     repeat: Infinity,
    //     repeatType: "loop",
    //     repeatDelay: REPEAT_DELAY,
    //   },
    // }),
    click: {
      opacity: [0.3, 0.3, 1],
      transition: {
        duration: 0.7,
        times: [0.2, 0.45, 0.6],
      },
    },
  };
  const maskPillVariants = {
    initial: {
      transform: "translateX(0%) translateY(-1%) rotate(0deg)"
    },
    hover: {
      transform: [
        "translateX(0%) translateY(-1%) rotate(0deg)",
        "translateX(0%) translateY(-40%) rotate(3deg)",
        "translateX(0%) translateY(-1%) rotate(0deg)",
        // "translateX(0%) translateY(30%) rotate(0deg)",
      ],
      transition: {
        duration: 0.7,
        times: [0, 0.4, 1],
        ease: "easeInOut",
      },
    },
  }

  

  const { handleMouseEnter, handleMouseLeave } = useHoverTimeout({
    delay: 100,
    disabledRef: hoverDisabledRef,
    onHoverStart: async () => {
      if(hoverAnimationOngoing.current) return;
      console.log("hover call")
      hoverAnimationOngoing.current = true;

      const lineOffsets = [8, 9, 13, 9, 8];
  
      scope.current?.querySelectorAll("[data-animate='line']").forEach((line: SVGLineElement, index: number) => {
        controls.push(
          animate(
            line,
            {
                strokeDashoffset: ["0px", `${lineOffsets[index]}px`, "0px"],
            },
            {
              duration: 0.7,
              times: [0, 0.3, 1],
              ease: easeOut
            }
          )
        )
      });

      controls.push(
        animate(
          '[data-animate="whole"]',
          wholeVariants.hover
        )
      )

      controls.push(
        animate(
          '[data-animate="bulb"]',
          bulbVariants.hover
        )
      )

      controls.push(
        animate(
          '[data-animate="stem"]',
          stemVariants.hover
        )
      )


      controls.push(
        animate(
          '[data-animate="background"]',
          backgroundVariants.hover
        )
      )
  
     
  
      controls.push(
        animate(
          "[data-animate='pill']",
          maskPillVariants.hover
        )
      )
      await Promise.all(controls);
      hoverAnimationOngoing.current = false;
    },
    onHoverEnd: () => {
      animate(
        '[data-animate="whole"]',
        wholeVariants.initial
      )
    
      animate(
        "[data-animate='pill']",
        maskPillVariants.initial
      )
      
    }
  })


  return (
    <svg width="199" height="129" viewBox="0 0 199 129" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip-pill)"
          ref={scope}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <mask id="pill-mask" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="199" height="129">
            <rect width="199" height="129" fill="white" />
            <motion.path 
              data-animate="pill"
              initial={maskPillVariants.initial}
              style={{ transformOrigin: "center" }} 
              d="M93.0077 70.8751C93.6289 70.3273 94.5769 70.3868 95.1249 71.0079C96.8226 72.9317 100.55 73.1028 102.992 70.8888C103.606 70.3324 104.555 70.3787 105.111 70.9923C105.668 71.606 105.621 72.555 105.008 73.1115C101.568 76.2305 95.8832 76.4016 92.8749 72.9923C92.3271 72.3711 92.3866 71.4232 93.0077 70.8751Z" 
              fill="black" 
            />
          </mask>
          <g mask="url(#pill-mask)">
            <motion.g
              data-animate="background"
              initial={backgroundVariants.initial}
            >
              <path d="M113.588 16.0222C117.91 11.4643 121.734 12.6055 124.377 15.0969C126.715 17.2998 126.494 20.8579 125.509 23.915C121.216 37.2251 126.021 44.2365 129.317 46.1841C147.65 53.8507 181.717 75.2841 171.317 99.6841C161.628 122.416 140.496 108.853 130.509 96.245C129.561 95.0483 127.628 95.201 126.89 96.537C106.88 132.726 85.2049 115.326 74.3657 98.413C73.3461 96.822 70.6954 97.227 70.1454 99.0348C65.0406 115.812 53.8806 118.149 43.1633 115.736C31.9276 113.206 24.5433 101.604 27.5745 90.4925C33.2645 69.6357 53.2967 59.0014 69.8167 44.6841C74.5385 40.5919 74.409 30.6576 73.3273 23.3614C72.8379 20.0605 73.3119 16.3864 76.0374 14.461C81.0812 10.8979 85.7572 13.2553 88.6141 16.1294C89.5553 17.0764 91.1649 17.142 92.1185 16.2075C99.3246 9.14594 106.167 12.296 110.003 16.0719C110.979 17.0323 112.646 17.0158 113.588 16.0222Z" fill="#F3F3F3" />
            </motion.g>
            <motion.g
              data-animate="whole"
              initial={wholeVariants.initial}
            >
              <motion.path 
                data-animate="bulb"
                initial={bulbVariants.initial}
                d="M109.181 60.4605C107.372 57.4701 106.615 54.7214 106.41 52.8986C106.265 51.6071 106.003 50.0158 104.936 49.254C101.425 46.7479 96.6127 47.4372 93.9361 49.0107C93.0261 49.5457 92.6892 50.6102 92.5555 51.654C92.3241 53.4604 91.6972 55.3299 91.2244 56.4821C91.0711 56.8556 90.8542 57.198 90.6015 57.5132C88.6979 59.8871 86.5485 62.8158 87 67.4995C87.6747 74.499 92.8878 77.0626 97.2085 77.7952C99.4941 78.1827 101.847 77.7764 103.904 76.7406C110.728 73.3032 113.073 66.8941 109.181 60.4605Z" fill="#8D8D8D" stroke="#F3F3F3" 
              />
              <motion.path 
                data-animate="stem"
                initial={stemVariants.initial}
                d="M93.7527 47.6851C98.4462 45.6702 102.311 46.4232 104.431 47.4275C105.034 47.713 105.823 47.4845 105.967 46.8422C107.926 38.0801 90.1416 38.9193 92.4267 47.1325C92.5805 47.6854 93.2243 47.9119 93.7527 47.6851Z" fill="#8D8D8D" stroke="#F3F3F3" 
              />
              <motion.line data-animate="line" strokeDasharray="6px 7px" strokeDashoffset="0px" x1="115.121" y1="75" x2="117.243" y2="77.1213" stroke="#CECECE" strokeWidth="3" strokeLinecap="round" />
              <motion.line data-animate="line" strokeDasharray="7px 8px" strokeDashoffset="0px" x1="108.993" y1="80.7255" x2="110.684" y2="84.3508" stroke="#CECECE" strokeWidth="3" strokeLinecap="round" />
              <motion.line data-animate="line" strokeDasharray="10px 11px" strokeDashoffset="0px" x1="99.5" y1="83.5" x2="99.5" y2="90.5" stroke="#CECECE" strokeWidth="3" strokeLinecap="round" />
              <motion.line data-animate="line" strokeDasharray="7px 8px" strokeDashoffset="0px" x1="1.5" y1="-1.5" x2="5.5" y2="-1.5" transform="matrix(-0.422618 0.906308 0.906308 0.422618 91.958 80)" stroke="#CECECE" strokeWidth="3" strokeLinecap="round" />
              <motion.line data-animate="line" strokeDasharray="6px 7px" strokeDashoffset="0px" x1="1.5" y1="-1.5" x2="4.5" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 85.2427 75)" stroke="#CECECE" strokeWidth="3" strokeLinecap="round" />
            </motion.g>
          </g>
        </g>
        <defs>
          <clipPath id="clip-pill">
            <rect width="199" height="129" fill="white" />
          </clipPath>
        </defs>
    </svg>
  )
}