"use client";

import { animate, AnimatePresence, easeOut, motion, useAnimate, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import FactoryIconV2 from "./factoryV2";

export default function FactoryPage() {
    return (
        <>
            <div className="flex bg-zinc-100 min-h-screen w-full flex-col items-center justify-center overflow-x-hidden">
              
                {/* <FactoryIconExp /> */}

                <FactoryIconV2 />

            </div>
        </>
    )
}


const FactoryIconExp = () => {
    const [scope, animate] = useAnimate();

    const CHIMNEY_PATHS = [
        "M4.53675 22.0367C4.74384 19.7507 6.66028 18 8.95564 18C11.2422 18 13.1543 19.7377 13.3724 22.0138L14.7562 36.4559C14.8869 37.8199 13.8145 39 12.4442 39H5.5425C4.17704 39 3.1062 37.8278 3.22939 36.4679L4.53675 22.0367Z",
        "M4.58226 19.0392C4.76304 16.7586 6.66653 15 8.95434 15C11.2345 15 13.1343 16.7472 13.3248 19.0194L14.789 36.4834C14.9026 37.8379 13.8338 39 12.4745 39H5.51397C4.1589 39 3.09158 37.8447 3.19866 36.4939L4.58226 19.0392Z"
    ]

    const barProgress = useMotionValue(0);
    const barPath = useTransform(barProgress, [0, 1], [...CHIMNEY_PATHS]);

    useEffect(() => {
        animate(barProgress, [0, 1, 0], {
            ease: easeOut,
            duration: 1.6,
            times: [0, 0.32, 0.9],
            repeat: Infinity,
            repeatDelay: 1.2
        });

        // scope.current.querySelectorAll("[data-animate='line']").forEach((line: any) => {
        //     animate(
        //       line,
        //       {
        //         strokeDashoffset: 0,
        //       },
        //       {
        //         delay: 0.04,
        //         duration: 0.53,
        //         times: [0.7, 0.9],
        //       },
        //     );
        //   });


    }, []);

    return (
        <motion.svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.8418 24.8776C25.5105 25.6338 26.4045 26.3341 27.0593 25.8313L36.7029 18.4268C37.0634 18.15 37.5052 18 37.9597 18C38.9217 18 39.7016 18.7799 39.7016 19.7419V37.2339C39.7016 38.1959 38.9217 38.9758 37.9597 38.9758H10.7419C9.77989 38.9758 9 38.1959 9 37.2339V34.8866C9 33.0878 10.4955 31.6504 11.7798 30.3909L23.9542 18.6192C24.365 18.222 24.914 18 25.4854 18C27.0745 18 28.1408 19.6314 27.503 21.0869L25.8418 24.8776Z" fill="#9295FE" />
            <AnimatePresence mode="popLayout">
            <motion.g ref={scope} >
                <motion.path
                    data-animate="line"
                    d="M5.76209 14.1129C4.96371 13.5685 5.03629 12.1169 5.94355 10.7379C6.85081 9.35887 5.61694 7.47177 5 7"
                    stroke="#9295FE"
                    strokeLinecap="round"
                    strokeDasharray="7.11px 8.5px" 
                    strokeDashoffset="8px"
                    pathLength="7.11"
                    initial={{ strokeDashoffset: "8px" }}
                    animate={{ strokeDashoffset: ["8px", "0px", "-8px"] }}
                    transition={{ duration: 1, ease: easeOut, repeat: Infinity, repeatDelay: 1.96, delay: 0.4 }}
                />
                <motion.path
                    data-animate="line"
                    d="M8.99328 13.6371C8.59407 13.0565 7.92075 11.2794 8.70295 9.89919C10.346 7 6.34595 7.5 8.8459 4"
                    stroke="#9295FE"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeDasharray="9.64px 11px" 
                    strokeDashoffset="10px"
                    pathLength="9.64"
                    initial={{ strokeDashoffset: "10px" }}
                    animate={{ strokeDashoffset: ["10px", "0px", "-10px"] }}
                    transition={{ duration: 0.9, ease: easeOut, repeat: Infinity, repeatDelay: 1.9, delay: 0.66 }}
                />
                <motion.path
                    data-animate="line"
                    d="M12.5035 14.1129C13.3019 13.5685 13.2293 12.1169 12.3221 10.7379C11.4148 9.35887 12.6487 7.47177 13.2656 7"
                    stroke="#9295FE"
                    strokeLinecap="round"
                    strokeDasharray="7.11px 8.5px" 
                    strokeDashoffset="8px"
                    pathLength="7.11"
                    initial={{ strokeDashoffset: "8px" }}
                    animate={{ strokeDashoffset: ["8px", "0px", "-8px"] }}
                    transition={{ duration: 1, ease: easeOut, repeat: Infinity, repeatDelay: 1.96, delay: 0.77 }}
                />
                
            </motion.g>
            </AnimatePresence>

            <motion.path d={barPath} fill="#363DEE" />
            <rect x="19.605" y="30.7178" width="5.08065" height="3.19355" rx="1.16129" fill="#4E28F5" />
            <rect x="30.7097" y="30.7178" width="5.08065" height="3.19355" rx="1.16129" fill="#4E28F5" />
        </motion.svg>
    )
}

