"use client"
import { useAnimateVariant } from "@/lib/hooks/use-animate-variant"
import { useHoverTimeout } from "@/lib/hooks/use-hover-timeout"
import { useMotionValue, useTransform, motion, easeOut } from "motion/react"
import { useRef } from "react"



export default function CatAnimation() {
    return (
        <div className="w-full min-h-screen flex justify-center bg-white  items-center text-red-600">
            <CatIcon />
        </div>
    )
}


const catEmoPaths = {

}

const normalRightEyeWhitesLEFT = [
    "M27.5906 36.9569C27.5906 40.9059 24.4531 43.5631 21.0621 43.5631C17.6712 43.5631 14.3005 40.9059 14.3005 36.9569C14.3005 33.0079 17.6712 29.8066 21.0621 29.8066C24.4531 29.8066 27.5906 33.0079 27.5906 36.9569Z",
    "M27.5906 37.1101C27.5906 41.059 24.453 43.7163 21.0621 43.7163C17.6711 43.7163 14.3004 41.059 14.3004 37.1101C14.3004 34.0386 14.5336 34.5047 21.0621 34.5048C27.5906 34.505 27.5906 34.1162 27.5906 37.1101Z"
]
const normalRightEyeWhitesRIGHT = [
    "M48.4196 36.6463C48.4196 40.5953 45.2821 43.2526 41.8911 43.2526C38.5001 43.2526 35.1295 40.5953 35.1295 36.6463C35.1295 32.6974 38.5001 29.4961 41.8911 29.4961C45.2821 29.4961 48.4196 32.6974 48.4196 36.6463Z",
    "M48.4196 36.6462C48.4196 40.5952 45.2821 43.2524 41.8911 43.2524C38.5001 43.2524 35.1295 40.5952 35.1295 36.6462C35.1294 33.5747 35.3626 34.0408 41.8911 34.041C48.4196 34.0411 48.4196 33.6524 48.4196 36.6462Z"
]

const CatIcon = () => {
    const hoverDisabledRef = useRef(false);
    const isHoveringRef = useRef(false);
    const [scope, animateVariant, animate] = useAnimateVariant();

    const leftEyePathProgress = useMotionValue(0);
    const leftEyeWhitePath = useTransform(leftEyePathProgress, [0, 1], [...normalRightEyeWhitesLEFT]);
    
    const rightEyePathProgress = useMotionValue(0);
    const rightEyeWhitePath = useTransform(rightEyePathProgress, [0, 1], [...normalRightEyeWhitesRIGHT]);


    const { handleMouseEnter, handleMouseLeave } = useHoverTimeout({
        delay: 100,
        disabledRef: hoverDisabledRef,
        onHoverStart: async () => {
            console.log("hover call");
            
            animate(leftEyePathProgress, [0, 1], {
                ease: easeOut,
                duration: 0.25,
                // times: [0, 0.32, 0.9],
            });
            animate(rightEyePathProgress, [0, 1], {
                ease: easeOut,
                duration: 0.25,
                // times: [0, 0.32, 0.9],
            });
            animateVariant("[data-animate='left-pupil']", PupilVariants.leftPupilVariants.hover)
            animateVariant("[data-animate='right-pupil']", PupilVariants.rightPupilVariants.hover)
        },
        onHoverEnd: () => {
            // Invalidate the current rain loop
            animate(leftEyePathProgress, [1, 0], {
                ease: easeOut,
                duration: 0.25,
                // times: [0, 0.32, 0.9],
            });
            animate(rightEyePathProgress, [1, 0], {
                ease: easeOut,
                duration: 0.25,
                // times: [0, 0.32, 0.9],
            });
            animateVariant("[data-animate='left-pupil']", PupilVariants.leftPupilVariants.initial)
            animateVariant("[data-animate='right-pupil']", PupilVariants.rightPupilVariants.initial)
        }
    })

    const handleClick = () => {
       
    }

    return (
        <motion.svg width="61" height="87" viewBox="0 0 61 87" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.g
                ref={scope}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                <g data-animate="moustache">
                    <path d="M48.4197 45.1178C50.2591 44.6255 55.0259 43.7499 59.3782 44.1851" stroke="#010101" strokeWidth="0.621761" strokeLinecap="round" />
                    <path d="M48.5751 48.1492C51.4766 48.0196 57.8238 48.1803 59.9999 49.859" stroke="#010101" strokeWidth="0.621761" strokeLinecap="round" />
                    <path d="M46.0103 51.1797C48.7046 51.5424 53.3937 52.9673 56.4248 54.9102" stroke="#010101" strokeWidth="0.621761" strokeLinecap="round" />
                    <path d="M11.6112 44.5981C9.72027 44.3747 4.87714 44.1915 0.632168 45.2462" stroke="#010101" strokeWidth="0.621761" strokeLinecap="round" />
                    <path d="M11.8919 47.6205C9.00176 47.9083 2.7432 48.9772 0.830185 50.9506" stroke="#010101" strokeWidth="0.621761" strokeLinecap="round" />
                    <path d="M14.8647 50.252C12.2503 50.9972 7.81387 53.0796 5.09262 55.437" stroke="#010101" strokeWidth="0.621761" strokeLinecap="round" />
                </g>

                <path data-animate="body" d="M11.5803 75.1267C10.2746 77.0541 7.66834 83.2873 6.52844 86.1629L45.2331 86.1629C45.3367 86.1629 45.0155 84.7018 42.9015 78.8572C40.7875 73.0126 39.5336 61.8624 39.1709 57.0179C38.2901 51.5256 36.2331 39.2821 35.0517 34.2459C33.5751 27.9505 26.0362 31.1371 25.0258 35.9557C24.0155 40.7744 19.1191 54.2199 18.8082 57.0179C18.4973 59.8158 13.2124 72.7174 11.5803 75.1267Z" fill="#010101" />
                <path data-animate="face-bg" d="M13.7564 51.491C14.6114 52.1128 17.8756 53.9781 18.7305 54.2112C23.6508 55.5531 30.2378 56 39.4818 54.6776C41.2694 54.2631 44.6891 53.2786 46.6321 51.491C48.5751 49.7035 50.6735 46.2838 51.2176 42.8641C51.6528 40.1283 51.088 37.1128 50.7512 35.947C50.5181 35.1698 50.4922 33.9781 50.6735 33.6154C51.2331 30.6931 50.9844 25.3512 50.7512 23.0455C45 21.4133 34.6632 21.8019 33.4974 21.6465C32.5647 21.5222 28.6269 21.6465 26.9689 21.7242C20.5181 21.7242 8.47147 23.9781 8.00515 25.7657C7.53883 27.5532 7.75964 32.7686 8.08286 33.6154C8.39375 34.4299 8.54919 35.7511 8.47147 35.947C8.05696 37.0351 7.38339 39.9418 8.00515 42.8641C8.93779 47.1387 12.9015 50.8693 13.7564 51.491Z" fill="#010101" />
                <g data-animate="ears">
                    <path d="M33.8083 20.6363C33.4974 21.4446 32.9015 21.8021 32.6425 21.8798C40.1658 28.284 47.9015 25.8954 50.829 23.9006C50.9067 17.6052 46.4766 5.01455 45.8549 3.84875C45.2331 2.68295 43.2124 -1.3585 40.4922 2.29435C37.772 5.94719 34.1969 19.6259 33.8083 20.6363Z" fill="#010101" />
                    <path d="M16.0103 1.4394C9.55951 11.543 7.5906 24.4187 7.92738 28.0197C22.601 29.3876 26.8393 24.4964 27.1243 21.8798C26.8756 21.8798 26.8134 21.4653 26.8134 21.258C26.5025 16.3617 21.917 5.01455 19.974 1.4394C18.5483 -1.18395 16.6838 0.377226 16.0103 1.4394Z" fill="#010101" />
                </g>
                <g data-animate="left-eye">
                    <motion.path data-animate="left-eye-white" d={leftEyeWhitePath} fill="#F6F6F6" />
                    <motion.path initial={PupilVariants.leftPupilVariants.initial} data-animate="left-pupil" d="M22.8638 33.4764C21.2036 35.5373 21.9637 38.3003 22.6811 39.2308C22.791 39.3734 22.9431 39.4768 23.1144 39.532C23.3106 39.5953 23.484 39.6091 23.6314 39.5958C23.9657 39.5657 24.1967 39.2775 24.3246 38.9672C25.252 36.7179 24.5464 34.0578 24.0296 33.4764C23.4769 32.8546 23.0452 33.2432 22.8638 33.4764Z" fill="black" />
                </g>
                <g data-animate="right-eye">
                    <motion.path data-animate="right-eye-white" d={rightEyeWhitePath} fill="#F6F6F6" />
                    <motion.path initial={PupilVariants.rightPupilVariants.initial} data-animate="right-pupil" d="M38.6411 32.953C36.9779 35.0176 37.6776 38.2319 38.3858 39.2267C38.4901 39.3733 38.6426 39.4767 38.8139 39.5319C39.0102 39.5952 39.1836 39.609 39.3309 39.5957C39.6652 39.5656 39.8963 39.2774 40.0227 38.9666C40.9624 36.6573 40.3241 33.5349 39.8069 32.953C39.2542 32.3312 38.8224 32.7198 38.6411 32.953Z" fill="black" />
                </g>
                <path data-animate="nose" d="M31.3989 42.2422H33.2642" stroke="#F6F6F6" strokeWidth="1.24352" strokeLinecap="round" />
            </motion.g>
        </motion.svg>

        // <svg width="61" height="87" viewBox="0 0 61 87" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M48.4197 45.1178C50.2591 44.6255 55.0259 43.7499 59.3782 44.1851" stroke-width="0.621761" stroke-linecap="round" stroke="#010101" />
        //     <path d="M48.5751 48.1492C51.4767 48.0196 57.8238 48.1803 60 49.859" stroke-width="0.621761" stroke-linecap="round" stroke="#010101" />
        //     <path d="M46.0104 51.1797C48.7047 51.5424 53.3938 52.9673 56.4249 54.9102" stroke-width="0.621761" stroke-linecap="round" stroke="#010101" />
        //     <path d="M11.6112 44.5981C9.72021 44.3747 4.87708 44.1915 0.632106 45.2462" stroke-width="0.621761" stroke-linecap="round" stroke="#010101" />
        //     <path d="M11.8919 47.6205C9.00176 47.9083 2.7432 48.9772 0.830186 50.9506" stroke-width="0.621761" stroke-linecap="round" stroke="#010101" />
        //     <path d="M14.8647 50.252C12.2502 50.9972 7.81381 53.0796 5.09256 55.437" stroke-width="0.621761" stroke-linecap="round" stroke="#010101" />
        //     <path d="M11.5803 75.1257C10.2746 77.0532 7.66834 83.2863 6.52844 86.162L45.2331 86.1619C45.3367 86.1619 45.0155 84.7008 42.9015 78.8562C40.7875 73.0117 39.5336 61.8614 39.1709 57.0169C38.2901 51.5247 36.2331 39.2812 35.0517 34.2449C33.5751 27.9496 26.0362 31.1361 25.0258 35.9547C24.0155 40.7734 19.1191 54.219 18.8082 57.0169C18.4973 59.8148 13.2124 72.7164 11.5803 75.1257Z" fill="#010101" />
        //     <path d="M13.7564 51.491C14.6113 52.1128 17.8755 53.9781 18.7305 54.2112C23.6507 55.5531 30.2377 56 39.4818 54.6776C41.2693 54.2631 44.689 53.2786 46.632 51.491C48.575 49.7035 50.6735 46.2838 51.2175 42.8641C51.6527 40.1283 51.088 37.1128 50.7512 35.947C50.518 35.1698 50.4921 33.9781 50.6735 33.6154C51.233 30.6931 50.9843 25.3512 50.7512 23.0455C44.9999 21.4133 34.6631 21.8019 33.4973 21.6465C32.5647 21.5222 28.6268 21.6465 26.9688 21.7242C20.518 21.7242 8.47141 23.9781 8.00509 25.7657C7.53877 27.5532 7.75958 32.7686 8.0828 33.6154C8.39369 34.4299 8.54913 35.7511 8.47141 35.947C8.0569 37.0351 7.38333 39.9418 8.00509 42.8641C8.93773 47.1387 12.9015 50.8693 13.7564 51.491Z" fill="#010101" />
        //     <path d="M33.8081 20.6363C33.4973 21.4446 32.9014 21.8021 32.6423 21.8798C40.1656 28.284 47.9014 25.8954 50.8289 23.9006C50.9066 17.6052 46.4765 5.01455 45.8548 3.84875C45.233 2.68295 43.2123 -1.3585 40.4921 2.29435C37.7719 5.94719 34.1967 19.6259 33.8081 20.6363Z" fill="#010101" />
        //     <path d="M16.0103 1.4394C9.55951 11.543 7.5906 24.4187 7.92738 28.0197C22.601 29.3876 26.8393 24.4964 27.1243 21.8798C26.8756 21.8798 26.8134 21.4653 26.8134 21.258C26.5025 16.3617 21.917 5.01455 19.974 1.4394C18.5483 -1.18395 16.6838 0.377226 16.0103 1.4394Z" fill="#010101" />
        //     <path data-i="left white" d="M27.5906 37.1101C27.5906 41.059 24.453 43.7163 21.0621 43.7163C17.6711 43.7163 14.3004 41.059 14.3004 37.1101C14.3004 34.0386 14.5336 34.5047 21.0621 34.5048C27.5906 34.505 27.5906 34.1162 27.5906 37.1101Z" fill="#F6F6F6" />
        //     <path d="M24.0007 31.4764C22.329 33.5517 23.1113 38.0579 23.833 39.2197C23.9279 39.3726 24.08 39.4768 24.2513 39.532C24.4475 39.5953 24.6209 39.6091 24.7683 39.5958C25.1026 39.5657 25.3345 39.2776 25.4537 38.9638C26.3929 36.4915 25.6848 32.0595 25.1665 31.4764C24.6138 30.8546 24.1821 31.2432 24.0007 31.4764Z" fill="black" />
        //     <path data-i="right white" d="M48.4196 36.6462C48.4196 40.5952 45.2821 43.2524 41.8911 43.2524C38.5001 43.2524 35.1295 40.5952 35.1295 36.6462C35.1294 33.5747 35.3626 34.0408 41.8911 34.041C48.4196 34.0411 48.4196 33.6524 48.4196 36.6462Z" fill="#F6F6F6" />
        //     <path d="M44.0814 31.5789C42.4027 33.6628 43.1312 39.5695 43.846 40.8973C43.9313 41.0558 44.083 41.1616 44.2543 41.2168C44.4505 41.2801 44.6239 41.294 44.7713 41.2807C45.1056 41.2506 45.3374 40.9626 45.4518 40.6471C46.4078 38.0091 45.7666 32.1632 45.2472 31.5789C44.6946 30.9571 44.2628 31.3458 44.0814 31.5789Z" fill="black" />
        //     <path d="M31.3989 42.2422H33.2642" stroke-width="1.24352" stroke-linecap="round" stroke="#F6F6F6" />
        // </svg>


    )
}


const PupilVariants = {
    leftPupilVariants: {
        initial: {
            transform: "translateX(0px) translateY(0px) rotate(0deg)",
        },
        hover: {
            transform: "translateX(1px) translateY(0px) rotate(0deg)",
            transition: {
                duration: 0.25,
                ease: "easeOut",
            },
        }
    },
    rightPupilVariants: {
        initial: {
            transform: "translateX(0px) translateY(0px) rotate(0deg)",
        },
        hover: {
            transform: "translateX(6px) translateY(0px) rotate(0deg)",
            transition: {
                duration: 0.25,
                ease: "easeOut",
            },
        }
    }
}