"use client"
import { useAnimateVariant } from "@/lib/hooks/use-animate-variant"
import { useHoverTimeout } from "@/lib/hooks/use-hover-timeout"
import { delay } from "motion"
import { useMotionValue, useTransform, motion, easeOut, AnimationPlaybackControls } from "motion/react"
import { useEffect, useRef } from "react"



export default function CatAnimation() {
    return (
        <div className="w-full min-h-screen flex justify-center bg-white  items-center text-red-600">
            <CatIcon />
        </div>
    )
}


const judgyEyeWhitePathsLEFT = [
    "M27.5906 36.9569C27.5906 40.9059 24.4531 43.5631 21.0621 43.5631C17.6712 43.5631 14.3005 40.9059 14.3005 36.9569C14.3005 33.0079 17.6712 29.8066 21.0621 29.8066C24.4531 29.8066 27.5906 33.0079 27.5906 36.9569Z",
    "M27.5906 37.2367C27.5906 41.0189 24.4531 43.5638 21.0621 43.5638C17.6712 43.5638 14.3005 41.0189 14.3005 37.2367C14.3005 33.4546 17.6712 34.6632 21.0621 34.6632C24.4531 34.6632 27.5906 33.4546 27.5906 37.2367Z"
]

const squintEyeWhitesLEFT = [
    "M27.5906 36.9569C27.5906 40.9059 24.4531 43.5631 21.0621 43.5631C17.6712 43.5631 14.3005 40.9059 14.3005 36.9569C14.3005 33.0079 17.6712 29.8066 21.0621 29.8066C24.4531 29.8066 27.5906 33.0079 27.5906 36.9569Z",
    "M27.5906 37.1101C27.5906 41.059 24.453 43.7163 21.0621 43.7163C17.6711 43.7163 14.3004 41.059 14.3004 37.1101C14.3004 34.0386 14.5336 34.5047 21.0621 34.5048C27.5906 34.505 27.5906 34.1162 27.5906 37.1101Z",
    // squint judgy one - left
    "M27.5906 37.2367C27.5906 41.0189 24.4531 43.5638 21.0621 43.5638C17.6712 43.5638 14.3005 41.0189 14.3005 37.2367C14.3005 33.4546 17.6712 34.6632 21.0621 34.6632C24.4531 34.6632 27.5906 33.4546 27.5906 37.2367Z"
]
const squintEyeWhitesRIGHT = [
    "M48.4196 36.6463C48.4196 40.5953 45.2821 43.2526 41.8911 43.2526C38.5001 43.2526 35.1295 40.5953 35.1295 36.6463C35.1295 32.6974 38.5001 29.4961 41.8911 29.4961C45.2821 29.4961 48.4196 32.6974 48.4196 36.6463Z",
    "M48.4196 36.6462C48.4196 40.5952 45.2821 43.2524 41.8911 43.2524C38.5001 43.2524 35.1295 40.5952 35.1295 36.6462C35.1294 33.5747 35.3626 34.0408 41.8911 34.041C48.4196 34.0411 48.4196 33.6524 48.4196 36.6462Z"
]

const pupilEnlargePathsLEFT = [
    "M24.8682 36.6406C24.8682 38.5736 24.1967 40.1406 23.3682 40.1406C22.5398 40.1406 21.8682 38.5736 21.8682 36.6406C21.8682 34.7076 22.5398 33.1406 23.3682 33.1406C24.1967 33.1406 24.8682 34.7076 24.8682 36.6406Z",
    "M26 37C26 39.7614 23.7614 42 21 42C18.2386 42 16 39.7614 16 37C16 34.2386 18.2386 32 21 32C23.7614 32 26 34.2386 26 37Z"
]
const pupilEnlargePathsRIGHT = [
    "M40.6166 36.1172C40.6166 38.0502 39.945 39.6172 39.1166 39.6172C38.2882 39.6172 37.6166 38.0502 37.6166 36.1172C37.6166 34.1842 38.2882 32.6172 39.1166 32.6172C39.945 32.6172 40.6166 34.1842 40.6166 36.1172Z",
    "M47 37C47 39.7614 44.7614 42 42 42C39.2386 42 37 39.7614 37 37C37 34.2386 39.2386 32 42 32C44.7614 32 47 34.2386 47 37Z"
]

const CatIcon = () => {
    const hoverDisabledRef = useRef(false);
    const isHoveringRef = useRef(false);
    const [scope, animateVariant, animate] = useAnimateVariant();

    const leftEyePathProgress = useMotionValue(0);
    const leftEyeWhitePath = useTransform(leftEyePathProgress, [0, 1, 2], [...squintEyeWhitesLEFT]);
    
    const rightEyePathProgress = useMotionValue(0);
    const rightEyeWhitePath = useTransform(rightEyePathProgress, [0, 1], [...squintEyeWhitesRIGHT]);

    const hoverAnimationSequenceCompleted = useRef(true);
    const idleRunIdRef = useRef(0);
    const idleControlsRef = useRef<AnimationPlaybackControls[]>([]);

    const leftPupilProgress = useMotionValue(0);
    const leftPupilPath = useTransform(leftPupilProgress, [0, 1], [...pupilEnlargePathsLEFT]);

    const rightPupilProgress = useMotionValue(0);
    const rightPupilPath = useTransform(rightPupilProgress, [0, 1], [...pupilEnlargePathsRIGHT]);

    const clickVariantRef = useRef<0 | 1>(0);

    const { handleMouseEnter, handleMouseLeave } = useHoverTimeout({
        delay: 100,
        disabledRef: hoverDisabledRef,
        onHoverStart: async () => {
            // console.log("hover call");
            hoverAnimationSequenceCompleted.current = false;
            stopIdleAnimations();
            
            if(leftEyePathProgress.get() === 0){
                animate(leftEyePathProgress, [0, 1], {
                    ease: easeOut,
                    duration: 0.25,
                    // times: [0, 0.32, 0.9],
                });
            }
            
            if(rightEyePathProgress.get() === 0){
                animate(rightEyePathProgress, [0, 1], {
                    ease: easeOut,
                    duration: 0.25,
                    // times: [0, 0.32, 0.9],
                });
            }
            animateVariant("[data-animate='left-pupil']", PupilVariants.leftPupilVariants.hover)
            await animateVariant("[data-animate='right-pupil']", PupilVariants.rightPupilVariants.hover);

            animateVariant("[data-animate='left-pupil']", PupilVariants.leftPupilVariants.lookLeft)
            await animateVariant("[data-animate='right-pupil']", PupilVariants.rightPupilVariants.lookLeft);
            
            // console.log("hover end");
        },
        onHoverEnd: () => {
            if(leftEyePathProgress.get() >= 1){
                animate(leftEyePathProgress, [1, 0], {
                    ease: easeOut,
                    duration: 0.25,
                });
            }
            if(rightEyePathProgress.get() === 1){
                animate(rightEyePathProgress, [1, 0], {
                    ease: easeOut,
                    duration: 0.25,
                });
            }
            animateVariant("[data-animate='left-pupil']", PupilVariants.leftPupilVariants.initial)
            animateVariant("[data-animate='right-pupil']", PupilVariants.rightPupilVariants.initial)
            animateVariant("[data-animate='head']", headVariants.initial)

            // reseting the pupils to normal size if they are ENLARGED
            if(leftPupilProgress.get() === 1){
                animate(leftPupilProgress, [1, 0], {
                    ease: easeOut,
                    duration: 0.25
                })
            }
            if(rightPupilProgress.get() === 1){
                animate(rightPupilProgress, [1, 0], {
                    ease: easeOut,
                    duration: 0.25
                })
            }
            hoverAnimationSequenceCompleted.current = true;
            idleRunIdRef.current = 0;
        }
    })

    const handleClick = async () => {
        const variant = clickVariantRef.current;

        clickVariantRef.current = variant === 0 ? 1 : 0;

        if (variant === 0) {
            animate(leftEyePathProgress, [1, 2], {
                ease: easeOut,
                duration: 0.25,
            });
            animate(rightEyePathProgress, [1, 0], {
                ease: easeOut,
                duration: 0.15,
            });
            animateVariant("[data-animate='head']", headVariants.click)
        }else{
            // Click 2nd variant
            animate(leftEyePathProgress, [1, 0], {
                ease: easeOut,
                duration: 0.25,
            });
            animate(rightEyePathProgress, [1, 0], {
                ease: easeOut,
                duration: 0.15,
            });
            animateVariant("[data-animate='left-pupil']", PupilVariants.leftPupilVariants.initial)
            animateVariant("[data-animate='right-pupil']", PupilVariants.rightPupilVariants.initial)
            animate(leftPupilProgress, [0, 1], {
                ease: easeOut,
                duration: 0.25
            })
            animate(rightPupilProgress, [0, 1], {
                ease: easeOut,
                duration: 0.25
            })
            animateVariant("[data-animate='head']", headVariants.clickSlow)
        }



    }

    const stopIdleAnimations = () => {
        // Invalidate any running async idle sequence
        idleRunIdRef.current++;
      
        // Stop only the idle animation controls
        idleControlsRef.current.forEach((control) => control.stop());
        idleControlsRef.current = [];
    };
    
    const trackIdleAnimation = (control: AnimationPlaybackControls | undefined) => {
        if(control)
            idleControlsRef.current.push(control);
        
        return control;
    };

    const runIdleAnimations = async () => {
        const runId = idleRunIdRef.current;

        // for invalidation of running animation
        const isCancelled = () => runId !== idleRunIdRef.current;

        if(!hoverAnimationSequenceCompleted.current) return;
        
        trackIdleAnimation(
            animate(leftEyePathProgress, [0, 1], {
              ease: easeOut,
              duration: 0.25,
            })
        );
        
        trackIdleAnimation(
            animate(rightEyePathProgress, [0, 1], {
              ease: easeOut,
              duration: 0.25,
            })
        );

        if (isCancelled()) return;

        trackIdleAnimation(
            animateVariant("[data-animate='left-pupil']", PupilVariants.leftPupilVariants.idle)
        )

        // animateVariant("[data-animate='left-pupil']", PupilVariants.leftPupilVariants.idle)
        await trackIdleAnimation(
            animateVariant("[data-animate='right-pupil']", PupilVariants.rightPupilVariants.idle)
        )

        if (isCancelled()) return;

        trackIdleAnimation(
            animateVariant("[data-animate='left-pupil']", PupilVariants.leftPupilVariants.lookRightOnIdle)
        )
        await trackIdleAnimation(
            animateVariant("[data-animate='right-pupil']", PupilVariants.rightPupilVariants.lookRightOnIdle)
        )
        if (isCancelled()) return;

        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (isCancelled()) return;

        trackIdleAnimation(
            animate(leftEyePathProgress, [1, 0], {
              ease: easeOut,
              duration: 0.25,
            })
        );
        
        trackIdleAnimation(
            animate(rightEyePathProgress, [1, 0], {
              ease: easeOut,
              duration: 0.25,
            })
        );
        if (isCancelled()) return;

        animateVariant("[data-animate='left-pupil']", PupilVariants.leftPupilVariants.initial)
        animateVariant("[data-animate='right-pupil']", PupilVariants.rightPupilVariants.initial)
    }

    useEffect(() => {
        let cancelled = false;
        let timer: ReturnType<typeof setTimeout>;

        const delay = (ms: number) =>
            new Promise<void>((resolve) => {timer = setTimeout(resolve, ms)});

        async function initAnim() {
            // Initial delay only
            await delay(3000);

            while (!cancelled) {
                await runIdleAnimations();
                // console.log("anim--")
              
                if (cancelled) break;
              
                // Delay between subsequent cycles
                await delay(6000);
            }
        }

        initAnim();

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };

    }, []);

    return (
        <motion.svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(35 22)">
                <motion.g
                    ref={scope}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    <path data-animate="body" d="M11.5803 75.1267C10.2746 77.0541 7.66834 83.2873 6.52844 86.1629L45.2331 86.1629C45.3367 86.1629 45.0155 84.7018 42.9015 78.8572C40.7875 73.0126 39.5336 61.8624 39.1709 57.0179C38.2901 51.5256 36.2331 39.2821 35.0517 34.2459C33.5751 27.9505 26.0362 31.1371 25.0258 35.9557C24.0155 40.7744 19.1191 54.2199 18.8082 57.0179C18.4973 59.8158 13.2124 72.7174 11.5803 75.1267Z" fill="#010101" />

                    <motion.g  
                        data-animate="head"
                        initial={headVariants.initial}
                    >
                        <g data-animate="moustache">
                            <path d="M48.4197 45.1178C50.2591 44.6255 55.0259 43.7499 59.3782 44.1851" stroke="#010101" strokeWidth="0.621761" strokeLinecap="round" />
                            <path d="M48.5751 48.1492C51.4766 48.0196 57.8238 48.1803 59.9999 49.859" stroke="#010101" strokeWidth="0.621761" strokeLinecap="round" />
                            <path d="M46.0103 51.1797C48.7046 51.5424 53.3937 52.9673 56.4248 54.9102" stroke="#010101" strokeWidth="0.621761" strokeLinecap="round" />
                            <path d="M11.6112 44.5981C9.72027 44.3747 4.87714 44.1915 0.632168 45.2462" stroke="#010101" strokeWidth="0.621761" strokeLinecap="round" />
                            <path d="M11.8919 47.6205C9.00176 47.9083 2.7432 48.9772 0.830185 50.9506" stroke="#010101" strokeWidth="0.621761" strokeLinecap="round" />
                            <path d="M14.8647 50.252C12.2503 50.9972 7.81387 53.0796 5.09262 55.437" stroke="#010101" strokeWidth="0.621761" strokeLinecap="round" />
                        </g>

                        
                        <path data-animate="face-bg" d="M13.7564 51.491C14.6114 52.1128 17.8756 53.9781 18.7305 54.2112C23.6508 55.5531 30.2378 56 39.4818 54.6776C41.2694 54.2631 44.6891 53.2786 46.6321 51.491C48.5751 49.7035 50.6735 46.2838 51.2176 42.8641C51.6528 40.1283 51.088 37.1128 50.7512 35.947C50.5181 35.1698 50.4922 33.9781 50.6735 33.6154C51.2331 30.6931 50.9844 25.3512 50.7512 23.0455C45 21.4133 34.6632 21.8019 33.4974 21.6465C32.5647 21.5222 28.6269 21.6465 26.9689 21.7242C20.5181 21.7242 8.47147 23.9781 8.00515 25.7657C7.53883 27.5532 7.75964 32.7686 8.08286 33.6154C8.39375 34.4299 8.54919 35.7511 8.47147 35.947C8.05696 37.0351 7.38339 39.9418 8.00515 42.8641C8.93779 47.1387 12.9015 50.8693 13.7564 51.491Z" fill="#010101" />
                        <g data-animate="ears">
                            <path d="M33.8083 20.6363C33.4974 21.4446 32.9015 21.8021 32.6425 21.8798C40.1658 28.284 47.9015 25.8954 50.829 23.9006C50.9067 17.6052 46.4766 5.01455 45.8549 3.84875C45.2331 2.68295 43.2124 -1.3585 40.4922 2.29435C37.772 5.94719 34.1969 19.6259 33.8083 20.6363Z" fill="#010101" />
                            <path d="M16.0103 1.4394C9.55951 11.543 7.5906 24.4187 7.92738 28.0197C22.601 29.3876 26.8393 24.4964 27.1243 21.8798C26.8756 21.8798 26.8134 21.4653 26.8134 21.258C26.5025 16.3617 21.917 5.01455 19.974 1.4394C18.5483 -1.18395 16.6838 0.377226 16.0103 1.4394Z" fill="#010101" />
                        </g>
                        <g data-animate="left-eye">
                            <motion.path data-animate="left-eye-white" d={leftEyeWhitePath} fill="#F6F6F6" />
                            <motion.path initial={PupilVariants.leftPupilVariants.initial} data-animate="left-pupil" d={leftPupilPath} fill="black"/>
                            {/* <motion.path initial={PupilVariants.leftPupilVariants.initial} data-animate="left-pupil" d="M22.8638 33.4764C21.2036 35.5373 21.9637 38.3003 22.6811 39.2308C22.791 39.3734 22.9431 39.4768 23.1144 39.532C23.3106 39.5953 23.484 39.6091 23.6314 39.5958C23.9657 39.5657 24.1967 39.2775 24.3246 38.9672C25.252 36.7179 24.5464 34.0578 24.0296 33.4764C23.4769 32.8546 23.0452 33.2432 22.8638 33.4764Z" fill="black" /> */}
                        </g>
                        <g data-animate="right-eye">
                            <motion.path data-animate="right-eye-white" d={rightEyeWhitePath} fill="#F6F6F6" />
                            <motion.path initial={PupilVariants.rightPupilVariants.initial} data-animate="right-pupil" d={rightPupilPath} fill="#010101"/>
                            {/* <motion.path initial={PupilVariants.rightPupilVariants.initial} data-animate="right-pupil" d="M38.6411 32.953C36.9779 35.0176 37.6776 38.2319 38.3858 39.2267C38.4901 39.3733 38.6426 39.4767 38.8139 39.5319C39.0102 39.5952 39.1836 39.609 39.3309 39.5957C39.6652 39.5656 39.8963 39.2774 40.0227 38.9666C40.9624 36.6573 40.3241 33.5349 39.8069 32.953C39.2542 32.3312 38.8224 32.7198 38.6411 32.953Z" fill="black" /> */}
                        </g>
                        <path data-animate="nose" d="M31.3989 42.2422H33.2642" stroke="#F6F6F6" strokeWidth="1.24352" strokeLinecap="round" />
                    </motion.g>
                </motion.g>
            </g>

        </motion.svg>
    )
}


const PupilVariants = {
    leftPupilVariants: {
        idle: {
            transform: "translateX(0px) translateY(-3px) rotate(0deg)",
            transition: {
                duration: 0.25,
                ease: "easeOut",
            },
        },
        initial: {
            transform: "translateX(0px) translateY(0px) rotate(0deg)",
        },
        hover: {
            transform: "translateX(1px) translateY(0px) rotate(0deg)",
            transition: {
                duration: 0.25,
                ease: "easeOut",
            },
        },
        lookLeft: {
            transform: "translateX(-6px) translateY(0px) rotate(0deg)",
            transition: {
                delay: 0.28,
                duration: 0.27,
                ease: [0.215, 0.61, 0.355, 1],
            },
        },
        lookRightOnIdle: {
            transform: "translateX(1px) translateY(-2px) rotate(0deg)",
            transition: {
                delay: 0.45,
                duration: 0.27,
                ease: [0.215, 0.61, 0.355, 1],
            },
        }
    },
    rightPupilVariants: {
        idle: {
            transform: "translateX(0px) translateY(-2px) rotate(0deg)",
            transition: {
                duration: 0.25,
                ease: "easeOut",
            },
        },
        initial: {
            transform: "translateX(0px) translateY(0px) rotate(0deg)",
        },
        hover: {
            transform: "translateX(6px) translateY(0px) rotate(0deg)",
            transition: {
                duration: 0.25,
                ease: "easeOut",
            },
        },
        lookLeft: {
            transform: "translateX(-1px) translateY(0px) rotate(0deg)",
            transition: {
                delay: 0.28,
                duration: 0.27,
                ease: [0.215, 0.61, 0.355, 1],
            },
        },
        lookRightOnIdle: {
            transform: "translateX(6px) translateY(-1px) rotate(0deg)",
            transition: {
                delay: 0.45,
                duration: 0.27,
                ease: [0.215, 0.61, 0.355, 1],
            },
        }
    }
}
const headVariants = {
    initial: {
        transform: "translateX(0px) translateY(0px) rotate(0deg)",
    },
    click: {
        transform: "translateX(-3px) translateY(0px) rotate(-7deg)",
        transition: {
            duration: 0.25,
            ease: easeOut,
        },
    },
    clickSlow: {
        transform: "translateX(-3px) translateY(0px) rotate(-7deg)",
        transition: {
            duration: 0.45,
            ease: easeOut,
        },
    }
}