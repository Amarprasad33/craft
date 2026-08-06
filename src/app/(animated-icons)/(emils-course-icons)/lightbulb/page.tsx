"use client"
import { motion, useAnimate, Variants } from "motion/react"


export default function LightBlubAnimation() {
  return (
    <div className="flex justify-center items-center w-full bg-white min-h-screen">
      <BlubIcon />
    </div>
  )
}


const BlubIcon = () => {
  const [scope, animate] = useAnimate();

  const backgroundVariants = {
    initial: {
      transform: "scale(1)",
    },
    animate: {
      transform: ["scale(1)", "scale(0.985)", "scale(1.02)", "scale(1)"],
      transition: {
        duration: 0.5,
        times: [0, 0.25, 0.6, 1],
        ease: "easeInOut",
      },
    },
    click: {
      transform: ["scale(1)", "scale(0.985)", "scale(1.02)", "scale(1)"],
      transition: {
        duration: 0.5,
        times: [0, 0.25, 0.6, 1],
        ease: "easeInOut",
      },
    },
  };


  const handleMouseEnter = () => {
    animate(
      '[data-animate="background"]',
      backgroundVariants.animate
    )
  }
  const handleMouseLeave = () => {

  }

  return (
    <svg width="148" height="106" viewBox="0 0 148 106" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.g
        ref={scope}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.g
          data-animate="background"
          initial={backgroundVariants.initial}
        >
          <path d="M87.588 4.02225C91.9098 -0.535706 95.7335 0.605462 98.3775 3.0969C100.715 5.29978 100.494 8.8579 99.5086 11.915C95.2163 25.2251 100.021 32.2365 103.317 34.1841C121.65 41.8507 155.717 63.2841 145.317 87.6841C135.628 110.416 114.496 96.8525 104.509 84.245C103.561 83.0483 101.628 83.201 100.89 84.537C80.88 120.726 59.2049 103.326 48.3657 86.413C47.3461 84.822 44.6954 85.227 44.1454 87.0348C39.0406 103.812 27.8806 106.149 17.1633 103.736C5.92756 101.206 -1.4567 89.6035 1.57452 78.4925C7.26451 57.6357 27.2967 47.0014 43.8167 32.6841C48.5385 28.5919 48.409 18.6576 47.3273 11.3614C46.8379 8.0605 47.3119 4.38643 50.0374 2.46104C55.0812 -1.10208 59.7572 1.25531 62.6141 4.12945C63.5553 5.07637 65.1649 5.142 66.1185 4.20753C73.3246 -2.85406 80.1665 0.295974 84.0033 4.07193C84.9791 5.03229 86.646 5.01577 87.588 4.02225Z" fill="#F3F3F3"/>
        </motion.g>
        <path d="M83.181 48.4605C81.3718 45.4701 80.615 42.7214 80.4102 40.8986C80.2651 39.6071 80.0028 38.0158 78.9357 37.254C75.4253 34.7479 70.6127 35.4372 67.9361 37.0107C67.0261 37.5457 66.6892 38.6102 66.5555 39.654C66.3241 41.4604 65.6972 43.3299 65.2244 44.4821C65.0711 44.8556 64.8542 45.198 64.6015 45.5132C62.6979 47.8871 60.5485 50.8158 61 55.4995C61.6747 62.499 66.8878 65.0626 71.2085 65.7952C73.4941 66.1827 75.8474 65.7764 77.9037 64.7406C84.7278 61.3032 87.0732 54.8941 83.181 48.4605Z" fill="#8D8D8D" stroke="#F3F3F3"/>
        <path d="M67.7527 35.6851C72.4462 33.6702 76.3106 34.4232 78.4313 35.4275C79.0343 35.713 79.8231 35.4845 79.9667 34.8422C81.9261 26.0801 64.1416 26.9193 66.4267 35.1325C66.5805 35.6854 67.2243 35.9119 67.7527 35.6851Z" fill="#8D8D8D" stroke="#F3F3F3"/>
        <line x1="89.1213" y1="63" x2="91.2426" y2="65.1213" stroke="#CECECE" strokeWidth="3" strokeLinecap="round"/>
        <line x1="82.9934" y1="68.7255" x2="84.6839" y2="72.3508" stroke="#CECECE" strokeWidth="3" strokeLinecap="round"/>
        <line x1="73.5" y1="71.5" x2="73.5" y2="78.5" stroke="#CECECE" strokeWidth="3" strokeLinecap="round"/>
        <line x1="1.5" y1="-1.5" x2="5.5" y2="-1.5" transform="matrix(-0.422618 0.906308 0.906308 0.422618 65.9583 68)" stroke="#CECECE" strokeWidth="3" strokeLinecap="round"/>
        <line x1="1.5" y1="-1.5" x2="4.5" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 59.2427 63)" stroke="#CECECE" strokeWidth="3" strokeLinecap="round"/>
        <motion.g
          data-animate="shine-pill"
        >
          <path d="M68 60C70.3529 62.6667 75.0588 62.6667 78 60" stroke="#F3F3F3" strokeWidth="3" strokeLinecap="round"/>
        </motion.g>
      </motion.g>
    </svg>

  )
}