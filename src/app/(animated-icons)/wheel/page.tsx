"use client"
import { useHoverTimeout } from "@/lib/hooks/use-hover-timeout";
import { useRef } from "react";
import {AnimationPlaybackControls, easeInOut, easeOut, motion, useAnimate} from 'motion/react'
import { useAnimateVariant } from "@/lib/hooks/use-animate-variant";



export default function CarWheelAnimation() {
    return (
        <div className="w-full min-h-screen flex justify-center bg-white  items-center text-red-600">
            <CarWheelIcon />
        </div>
    )
}

const backgroundVariants = {
    initial: {
        transform: "scale(1) rotate(24deg)",

    },
    hover: {
        transform: ["scale(1) rotate(24deg)", "scale(0.98) rotate(24deg)", "scale(1) rotate(24deg)"],
        transition: {
            duration: 0.45,
            times: [0.75, 0.8, 1],
            ease: "easeInOut",
        }
    },
    click: {
        transform: ["scale(1) rotate(24deg)", "scale(0.98) rotate(24deg)", "scale(1) rotate(24deg)"],
        transition: {
            duration: 0.25,
            ease: "easeOut",
        }
    }
}
const wholeCarVariants = {
    click: {
        transform: "translateX(-140px) translateY(0px) rotate(0deg)",
        transition: {
            delay: 0.1,
            duration: 0.9,
            ease: [0.5, 0.01, 0, 1],
            // ease: easeInOut,
        }
    },
    restore: {
        transform: "translateX(0px) translateY(0px) rotate(0deg)",
        transition: {
            duration: 0.5,
            ease: "easeOut",
        }
    },
}
const airlinesVariants = {
    initial: {

    },
    hover: {

    },
    click: {

    }
}
const carBodyVariants = {
    initial: {
        transform: 'translateX(0px) translateY(0px) rotate(0deg)'
    },
    hover: {
        transform: [
            'translateX(0px) translateY(0px) rotate(0deg)',
            'translateX(-2px) translateY(1px) rotate(0deg)',
            'translateX(1px) translateY(-1px) rotate(0deg)',
            'translateX(-1px) translateY(0.5px) rotate(0deg)',
            'translateX(1px) translateY(1px) rotate(0deg)',
            'translateX(0px) translateY(0px) rotate(0deg)'
        ],
        transition: {
            duration: 0.3,
            ease: "easeOut",
        }
    },
    click: {

    }
}
const carWheelVariants = {
    initial: {
        transform: 'translateX(0px) translateY(0px) rotate(0deg)'
    },
    hover: {
        transform: [
            'translateX(0px) translateY(0px) rotate(0deg)'
        ],
        transition: {
            duration: 0.3,
            ease: "easeOut",
        }
    },
    click: {
        transform: 'translateX(0px) translateY(0px) rotate(-360deg)',
        transition: {
            delay: 0.1,
            duration: 0.9,
            ease: [0.5, 0.01, 0, 1]
        }
        
    },
    restore: {
        transform:   'translateX(0px) translateY(0px) rotate(0deg)',
            // 'translateX(0px) translateY(0px) rotate(-360deg)',
            // 'translateX(0px) translateY(0px) rotate(-180deg)',
          
        // ],
        transition: {
            duration: 0.5,
            // times: [0, 0.9, 1],
            ease: "easeOut",
        }
    }
}


const CarWheelIcon = () => {
    const hoverDisabledRef = useRef(false);
    const clickAnimationRunning = useRef(false);
    const [scope, animateVariant, animate] = useAnimateVariant();
    const animationControlsRef = useRef<AnimationPlaybackControls[]>([]);
    const restoreAfterClick = useRef(false);


    const { handleMouseEnter, handleMouseLeave } = useHoverTimeout({
        delay: 100,
        disabledRef: hoverDisabledRef,
        onHoverStart: async () => {
            console.log("hover call");
            await animateVariant("[data-animate='car-body']", carBodyVariants.hover);
            animationControlsRef.current = [];
            scope.current?.querySelectorAll("[data-animate='smoke-line']").forEach((line, index: number) => {
                animationControlsRef.current.push(
                    animate(
                        line,
                        {
                            strokeDashoffset: [`6.5px`, "0px", `-6.5px`],
                        },
                        {
                            ease: easeOut,
                            // duration: 0.2,
                            repeat: Infinity,
                            repeatDelay: 0.05
                        }
                    )
                )
            });

        },
        onHoverEnd: () => {
            // Stop the running animations
            animationControlsRef.current.forEach((control) => {
                control.stop();
            });
            scope.current?.querySelectorAll("[data-animate='smoke-line']").forEach((line, index: number) => {
                animate(
                    line,
                    {
                        strokeDashoffset: ['-6.5px'],
                    },
                    {
                        ease: easeOut,
                        duration: 0.1
                    }
                )
                
            });
            
            // Click animation is still running.
            // Don't restore yet — mark it for later.
            if (clickAnimationRunning.current) {
                restoreAfterClick.current = true;
                return;
            }
            restoreCarToInitialPosition();
            // animateVariant("[data-animate='sun']", sunVariants.exit)
        }
    })

    const handleClick = async () => {
        clickAnimationRunning.current = true;
        scope.current?.querySelectorAll("[data-animate='air-line']").forEach((line, index: number) => {
            animate(
                line,
                {
                    strokeDashoffset: ['40px', '0px', '-40px'],
                },
                {
                    ease: easeOut,
                    delay: 0.1*index,
                    duration: 0.3
                }
            )
        });
        animateVariant("[data-animate='car-wheel']", carWheelVariants.click);
        await animateVariant("[data-animate='whole-car']", wholeCarVariants.click);

        clickAnimationRunning.current = false;

         // Cursor was already removed while click animation was running
        if (restoreAfterClick.current) {
            restoreAfterClick.current = false;
            restoreCarToInitialPosition();
        }

    }

    const restoreCarToInitialPosition = () => {
        animateVariant("[data-animate='car-wheel']", carWheelVariants.restore);
        animateVariant("[data-animate='whole-car']", wholeCarVariants.restore);
    }

    return (
        <motion.svg width="150" height="108" viewBox="0 0 150 108" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.g
                ref={scope}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                <mask id="mask0_566_3" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="150" height="108">
                    <path d="M65.0846 6.71153C29.0769 -2.18853 23.5767 -0.188489 19.0766 1.31147C-2.92396 8.64469 -9.64144 64.6112 19.2462 91.8943C41.8165 113.211 84.0258 102.09 90.8435 102.606C97.6611 103.122 110.295 114.077 113.797 102.606C117.299 91.1351 145.353 69.2019 148.737 61.7998C152.008 54.6455 131.008 30.8252 122.997 26.0144C122.522 25.7288 122.192 25.2403 122.175 24.6858C121.856 13.87 126.445 5.00968 128.844 1.86581C107.931 5.9463 114.602 18.9508 65.0846 6.71153Z" fill="#F7F7F7" />
                </mask>
                <g mask="url(#mask0_566_3)">
                    <rect x="-2.98425" y="-5.7793" width="154.043" height="117.827" fill="#F7F7F7" />
                    <motion.g data-animate="whole-car" >
                        <motion.g clipPath="url(#clip0_566_3)" data-animate='car-wheel' style={{transformOrigin: 'center'}} initial={carWheelVariants.initial}>
                            <path d="M47.4863 51.4313C47.4863 51.4313 47.1306 55.4824 47.3164 59.215C47.5021 62.9477 48.6391 67.6039 48.6391 67.6039" stroke="#2B2727" strokeWidth="1.74883" />
                            <path d="M49.3038 51.1762C49.3038 51.1762 50.7623 54.9723 51.6126 58.6116C52.4629 62.2509 52.6534 67.0401 52.6534 67.0401" stroke="#2B2727" strokeWidth="1.74883" />
                            <path d="M30.1732 68.8519C30.1732 68.8519 33.8878 70.5071 37.4776 71.5467C41.0674 72.5863 45.8401 73.0273 45.8401 73.0273" stroke="#2B2727" strokeWidth="1.74883" />
                            <path d="M30.5641 67.0504C30.5641 67.0504 34.6283 66.9072 38.3462 67.2881C42.064 67.669 46.6543 69.048 46.6543 69.048" stroke="#2B2727" strokeWidth="1.74883" />
                            <path d="M41.0359 90.7891C41.0359 90.7891 43.8103 87.8158 45.962 84.76C48.1137 81.7042 50.0844 77.3351 50.0844 77.3351" stroke="#2B2727" strokeWidth="1.74883" />
                            <path d="M39.447 89.8715C39.447 89.8715 40.6348 85.9822 42.2054 82.5909C43.7759 79.1996 46.5743 75.3083 46.5743 75.3083" stroke="#2B2727" strokeWidth="1.74883" />
                            <path d="M65.8637 87.4107C65.8637 87.4107 63.9556 83.8194 61.7668 80.7901C59.5781 77.7608 56.0886 74.475 56.0886 74.475" stroke="#2B2727" strokeWidth="1.74883" />
                            <path d="M64.4782 88.6147C64.4782 88.6147 61.1874 86.2254 58.4922 83.6363C55.797 81.0472 53.0288 77.1344 53.0288 77.1344" stroke="#2B2727" strokeWidth="1.74883" />
                            <path d="M69.6172 62.1161C69.6172 62.1161 65.671 63.0987 62.2021 64.4896C58.7333 65.8805 54.7009 68.4714 54.7009 68.4714" stroke="#2B2727" strokeWidth="1.74883" />
                            <path d="M70.4502 63.7511C70.4502 63.7511 67.3357 66.3661 64.1716 68.3549C61.0074 70.3437 56.5411 72.083 56.5411 72.083" stroke="#2B2727" strokeWidth="1.74883" />
                            <circle cx="51.0833" cy="72.2626" r="6.12055" fill="#2B2727" />
                            <circle cx="51.0833" cy="72.2624" r="2.04018" fill="#D9D9D9" />
                            <circle cx="48.1686" cy="68.7649" r="1.16582" fill="#D9D9D9" />
                            <circle cx="46.8571" cy="74.011" r="1.16582" fill="#D9D9D9" />
                            <circle cx="51.3749" cy="76.6346" r="1.16582" fill="#D9D9D9" />
                            <circle cx="55.4554" cy="73.2825" r="1.16582" fill="#D9D9D9" />
                            <circle cx="53.4151" cy="68.4734" r="1.16582" fill="#D9D9D9" />
                            <path d="M51.6774 71.2596L51.4925 72.0862L52.2215 72.5175L51.3782 72.5971L51.1933 73.4237L50.857 72.6463L50.0138 72.7258L50.6492 72.1658L50.3129 71.3884L51.0419 71.8197L51.6774 71.2596Z" fill="#0A0A0A" />
                            <circle cx="51.0838" cy="72.2625" r="18.7999" stroke="#939393" strokeWidth="5.24649" />
                            <path d="M47.0823 52.5989C44.1632 52.7927 41.0076 54.7321 39.6459 55.767C39.5208 55.8621 39.4996 56.0394 39.5939 56.1651L40.3161 57.128C40.4225 57.2699 40.6297 57.2845 40.7609 57.1652C42.6863 55.4156 45.7773 54.4729 47.5005 54.234C47.6903 54.2076 47.8127 54.014 47.7472 53.8338L47.3666 52.7874C47.3234 52.6685 47.2086 52.5905 47.0823 52.5989Z" fill="#6F6F6F" />
                            <path d="M39.98 88.6758C42.1302 90.6596 45.7093 91.6132 47.3973 91.8883C47.5525 91.9136 47.6956 91.8069 47.7219 91.652L47.9231 90.4652C47.9527 90.2903 47.8207 90.1301 47.6438 90.117C45.0493 89.9251 42.2377 88.3322 40.878 87.2469C40.7282 87.1273 40.5035 87.1719 40.418 87.3434L39.921 88.3398C39.8645 88.453 39.887 88.59 39.98 88.6758Z" fill="#6F6F6F" />
                            <path d="M68.6132 81.9056C70.4012 79.59 71.0379 75.9412 71.1642 74.2356C71.1758 74.0788 71.0571 73.9456 70.9004 73.933L69.7006 73.8364C69.5238 73.8221 69.3757 73.9677 69.3781 74.145C69.4141 76.7464 68.0733 79.6866 67.1111 81.136C67.0051 81.2957 67.0692 81.5157 67.2476 81.5859L68.2836 81.9938C68.4014 82.0401 68.5359 82.0057 68.6132 81.9056Z" fill="#6F6F6F" />
                        </motion.g>
                        <motion.g data-animate="car-body" initial={carBodyVariants.initial}>
                            <path d="M105.662 67.1626C105.254 67.`1626 103.962 67.3326 103.367 67.4176C103.163 67.8257 103.452 70.4779 103.622 71.753L105.662 67.1626Z" fill="#333232" />
                            <path d="M74.5474 83.9951C75.3125 82.7199 76.2476 79.0643 76.5877 77.3641C79.8521 72.8754 94.1003 68.1827 100.816 66.3975C101.581 66.6525 103.163 67.2136 103.367 67.4176C103.571 67.6216 103.622 72.2633 103.622 74.5587H102.346C101.326 76.3439 97.1607 78.0442 95.2054 78.8943C94.8654 79.3194 94.0323 80.2205 93.4202 80.4245C92.8081 80.6286 92.655 80.1695 92.655 79.9145C91.8389 80.3225 80.2432 82.8049 74.5474 83.9951Z" fill="#232323" />
                            <path d="M101.326 74.5582V68.9476C101.122 66.4994 102.771 66.3974 103.621 66.6524V74.5582H101.326Z" fill="#080808" />
                            <path d="M72.7618 60.0877C72.5578 59.4756 71.4867 58.3875 70.9767 57.7925H71.9968C72.4048 57.9965 73.3569 59.3226 73.7819 60.0877H72.7618Z" fill="#F9403B" />
                            <path d="M74.037 60.5977H73.0169C74.037 61.6178 74.972 65.1031 75.3121 66.7183C76.5872 65.9532 75.3121 62.6379 74.037 60.5977Z" fill="#F9403B" />
                            <path d="M29.9155 59.578C25.1365 66.9384 25.4098 77.0906 26.345 81.5113C22.4684 80.491 13.3381 80.0661 9.25746 79.9812C1.09625 78.706 -8.17012 79.3011 -11.6556 79.7262L3.39159 12.6512C7.98228 12.1412 29.1504 14.6915 30.4256 14.9466C31.4458 15.1506 32.7209 15.9667 33.231 16.2218C52.8689 19.0272 81.4332 27.6985 83.7285 28.2086C86.0239 28.7186 90.6145 29.4837 92.1448 28.9736C93.675 28.4635 97.2455 28.2085 98.7757 28.4635C100.306 28.7186 101.326 29.2286 101.836 29.7387C102.346 30.2488 102.346 32.034 102.346 32.2891C102.346 32.4931 101.666 33.5643 101.326 34.0744C99.6939 35.5026 100.306 37.0498 100.816 37.6449C102.006 39.6852 104.438 44.1228 104.642 45.5511C104.897 47.3363 104.897 52.6921 104.897 54.2223C104.897 55.4465 105.237 56.2626 105.407 56.5177L106.172 58.813C106.257 59.4081 106.376 60.7003 106.172 61.1084C105.917 61.6184 104.132 62.8936 104.387 63.1487C104.591 63.3527 104.642 64.0838 104.642 64.4239H105.662C105.917 64.9339 106.376 66.0051 106.172 66.2091C105.917 66.4642 102.346 66.9742 101.836 67.2293C101.326 67.4843 99.0308 69.2696 98.5207 71.3099C98.1126 72.9421 96.5654 73.3501 95.9703 73.3501L76.8425 77.1757C76.5875 71.3098 75.5673 67.7393 75.5673 67.4842C75.5673 67.2292 75.8223 66.9742 76.0774 66.4641C76.1927 66.2335 76.2591 65.9921 76.2951 65.7951C76.3373 65.5638 76.3108 65.3275 76.2579 65.0984C75.4006 61.3912 72.7542 57.7851 72.5069 57.5378C72.3028 57.3337 72.0818 57.2827 71.9968 57.2827L70.7216 57.2828C70.5176 57.2828 70.2965 57.1127 70.2115 57.0277C66.896 52.182 59.4999 47.3362 49.5534 47.8463C41.6473 48.3917 34.7612 52.1148 29.9155 59.578Z" fill="#B5B5B5" />
                            <path d="M39.8621 50.3296C23.2847 60.2761 26.0899 76.3434 26.345 81.6992C24.7128 81.0872 21.7543 80.9341 20.9892 80.6791C21.6013 62.1123 33.8262 52.6249 39.8621 50.3296Z" fill="black" />
                        </motion.g>
                        <g>
                            <path d="M107 69C107.87 68.5 108.478 69 109.174 68.875C110.13 68.75 110.652 68.125 111.522 68.375C112.13 68.5 112.565 68.25 113 68" data-animate='smoke-line' stroke="#C9C9C9" strokeWidth="0.608179" strokeDasharray="6px 7px" strokeDashoffset="6.5px" strokeLinecap="round"/>
                            <path d="M107 71C107.676 70.5 108.268 71 108.944 70.875C109.789 70.75 110.465 70 111.141 70.25C111.901 70.625 112.408 70.375 113 70" data-animate='smoke-line' stroke="#C9C9C9" strokeWidth="0.608179" strokeDasharray="6px 7px" strokeDashoffset="6.5px" strokeLinecap="round"/>
                            <path d="M107 73C107.818 72.4286 108.364 73 109.091 72.8571C110 72.7143 110.455 72 111.182 72.2857C112 72.7143 112.545 72.4286 113 72" data-animate='smoke-line' stroke="#C9C9C9" strokeWidth="0.608179" strokeDasharray="6px 7px" strokeDashoffset="6.5px" strokeLinecap="round"/>
                        </g>
                        <g style={{ transform: 'translateX(8px)' }}>
                            <path d="M107 69C107.87 68.5 108.478 69 109.174 68.875C110.13 68.75 110.652 68.125 111.522 68.375C112.13 68.5 112.565 68.25 113 68" data-animate='smoke-line-2' stroke="#C9C9C9" strokeWidth="0.608179" strokeDasharray="6px 7px" strokeDashoffset="6.5px" strokeLinecap="round"/>
                            <path d="M107 71C107.676 70.5 108.268 71 108.944 70.875C109.789 70.75 110.465 70 111.141 70.25C111.901 70.625 112.408 70.375 113 70" data-animate='smoke-line-2' stroke="#C9C9C9" strokeWidth="0.608179" strokeDasharray="6px 7px" strokeDashoffset="6.5px" strokeLinecap="round"/>
                            <path d="M107 73C107.818 72.4286 108.364 73 109.091 72.8571C110 72.7143 110.455 72 111.182 72.2857C112 72.7143 112.545 72.4286 113 72" data-animate='smoke-line-2' stroke="#C9C9C9" strokeWidth="0.608179" strokeDasharray="6px 7px" strokeDashoffset="6.5px" strokeLinecap="round"/>
                        </g>
                    </motion.g>
                    <g>
                        <line x1="10.4053" y1="24.6977" x2="49.4261" y2="24.6977" stroke="#D6D6D6" data-animate="air-line" strokeDasharray="39.28px 40px" strokeDashoffset="40px" strokeWidth="0.4" strokeLinecap="round" />
                        <line x1="74.6748" y1="30.309" x2="113.696" y2="30.309" stroke="#D6D6D6" data-animate="air-line" strokeDasharray="39.28px 40px" strokeDashoffset="40px" strokeWidth="0.4" strokeLinecap="round" />
                        <line x1="53.2517" y1="14.4965" x2="92.2725" y2="14.4965" stroke="#D6D6D6" data-animate="air-line" strokeDasharray="39.28px 40px" strokeDashoffset="40px" strokeWidth="0.4" strokeLinecap="round" />
                        <line x1="46.1106" y1="44.5907" x2="85.1313" y2="44.5907" stroke="#D6D6D6" data-animate="air-line" strokeDasharray="39.28px 40px" strokeDashoffset="40px" strokeWidth="0.4" strokeLinecap="round" />
                        <line x1="-2.3466" y1="57.8529" x2="36.6742" y2="57.853" stroke="#D6D6D6" data-animate="air-line" strokeDasharray="39.28px 40px" strokeDashoffset="40px" strokeWidth="0.4" strokeLinecap="round" />
                        <line x1="102.219" y1="49.6918" x2="141.24" y2="49.6918" stroke="#D6D6D6" data-animate="air-line" strokeDasharray="39.28px 40px" strokeDashoffset="40px" strokeWidth="0.4" strokeLinecap="round" />
                        <line x1="85.3864" y1="84.3774" x2="124.407" y2="84.3774" stroke="#D6D6D6" data-animate="air-line" strokeDasharray="39.28px 40px" strokeDashoffset="40px" strokeWidth="0.4" strokeLinecap="round" />
                    </g>
                </g>
                <defs>
                    <clipPath id="clip0_566_3">
                        <rect width="42.8464" height="42.8464" fill="white" transform="translate(29.6606 50.8394)" />
                    </clipPath>
                </defs>
            </motion.g>
            
        </motion.svg>

    )
}




// style={{display: 'none'}}