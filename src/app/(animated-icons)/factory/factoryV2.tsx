import {
    AnimatePresence,
    AnimationPlaybackControls,
    easeOut,
    motion,
    useAnimate,
    useMotionValue,
    useTransform
} from "motion/react";
import { useEffect, useRef } from "react";



const FactoryIconV2 = () => {
    const [scope, animate] = useAnimate();

    const CHIMNEY_PATHS = [
        "M4.53675 22.0367C4.74384 19.7507 6.66028 18 8.95564 18C11.2422 18 13.1543 19.7377 13.3724 22.0138L14.7562 36.4559C14.8869 37.8199 13.8145 39 12.4442 39H5.5425C4.17704 39 3.1062 37.8278 3.22939 36.4679L4.53675 22.0367Z",
        "M4.58226 19.0392C4.76304 16.7586 6.66653 15 8.95434 15C11.2345 15 13.1343 16.7472 13.3248 19.0194L14.789 36.4834C14.9026 37.8379 13.8338 39 12.4745 39H5.51397C4.1589 39 3.09158 37.8447 3.19866 36.4939L4.58226 19.0392Z"
    ]
    const lineOffsets = [
        { start: 8, end: -8, duration: 1, delay: 0.4 },
        { start: 10, end: -10, duration: 1, delay: 0.6 },
        { start: 8, end: -8, duration: 1, delay: 0.78 },
    ];

    const barProgress = useMotionValue(0);
    const barPath = useTransform(barProgress, [0, 1], [...CHIMNEY_PATHS]);
    const controls: AnimationPlaybackControls[] = [];
    const stopSteamControls: AnimationPlaybackControls[] = [];
    const hoverAnimationCompleted = useRef(true);


    const animateSteam = async () => {
        hoverAnimationCompleted.current = false;
        animate(barProgress, [0, 1, 0], {
            ease: easeOut,
            duration: 1.6,
            times: [0, 0.32, 0.9],
            // repeat: Infinity,
            // repeatDelay: 1.2
        });
        controls.length = 0;

        scope.current?.querySelectorAll("[data-animate='line']")
            .forEach((line: SVGPathElement, index: number) => {

                const { start, end, duration, delay } = lineOffsets[index];

                controls.push(
                    animate(
                        line,
                        {
                            strokeDashoffset: [`${start}px`, "0px", `${end}px`],
                        },
                        {
                            duration,
                            delay,
                            ease: easeOut,
                            // repeat: Infinity,
                            // repeatDelay: 1.92,
                        }
                    )
                )

            });
        await Promise.all(controls);
        // console.log("done")
        hoverAnimationCompleted.current = true;
    };

    const handleClickAnimations = () => {
        
        scope.current?.querySelectorAll("[data-animate='ray']")
            .forEach((line: SVGLineElement, index: number) => {

                controls.push(
                    animate(
                        line,
                        {
                            strokeDashoffset: ["0px", "-2.8px", "0px"],
                        },
                        {
                            duration: 0.3,
                            ease: easeOut,
                            // repeat: Infinity,
                            // repeatDelay: 1.92,
                        }
                    )
                )

            });
    }

    const stopSteam = async () => {
        controls.forEach(control => control.stop());
        // console.log("hoverRemove")
        scope.current
            ?.querySelectorAll("[data-animate='line']").forEach((line: SVGPathElement, index: number) => {
                stopSteamControls.push(
                    animate(
                        line,
                        { strokeDashoffset: `${lineOffsets[index].end}px` },
                        { duration: 0.5 }
                    )
                )
            });
        await animate(barProgress, 0, {
            ease: easeOut,
            duration: 1.6,
            times: [0, 0.32, 0.9]
        });
        await Promise.all(stopSteamControls);
        hoverAnimationCompleted.current = true;
        // console.log('hover DONEEEE')
        setTimeout(() =>  IdleAnimationSequence(), 4000);
    };

    const lineOffsetsOnIdle = [
        { start: 8, end: -8, duration: 1, delay: 0.4 },
        { start: 10, end: -10, duration: 1, delay: 0.6 },
        { start: 8, end: -8, duration: 1, delay: 0.78 },
    ];

    const IdleAnimationSequence = () => {
        if(!hoverAnimationCompleted.current) return;
        animate(barProgress, [0, 1, 0], {
            ease: easeOut,
            duration: 1.6,
            times: [0, 0.32, 0.9],
            repeat: Infinity,
            repeatDelay: 5.2
        });

        scope.current?.querySelectorAll("[data-animate='line']")
            .forEach((line: SVGPathElement, index: number) => {

                const { start, end, duration, delay } = lineOffsetsOnIdle[index];

                controls.push(
                    animate(
                        line,
                        {
                            strokeDashoffset: [`${start}px`, "0px", `${end}px`],
                        },
                        {
                            duration,
                            delay,
                            ease: easeOut,
                            repeat: Infinity,
                            repeatDelay: 5.8,
                        }
                    )
                )

            });
    }

    useEffect(() => {
        IdleAnimationSequence();
    }, []);

    return (
        <motion.svg width="43" height="43" style={{ scale: 2 }} viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg" 
            onMouseEnter={animateSteam}
            onMouseLeave={stopSteam}
            onClick={handleClickAnimations}
        >
            <path d="M25.8418 24.8776C25.5105 25.6338 26.4045 26.3341 27.0593 25.8313L36.7029 18.4268C37.0634 18.15 37.5052 18 37.9597 18C38.9217 18 39.7016 18.7799 39.7016 19.7419V37.2339C39.7016 38.1959 38.9217 38.9758 37.9597 38.9758H10.7419C9.77989 38.9758 9 38.1959 9 37.2339V34.8866C9 33.0878 10.4955 31.6504 11.7798 30.3909L23.9542 18.6192C24.365 18.222 24.914 18 25.4854 18C27.0745 18 28.1408 19.6314 27.503 21.0869L25.8418 24.8776Z" fill="#D1D2D4" />
            <AnimatePresence mode="popLayout">
                <motion.g ref={scope} >
                    <motion.path
                        data-animate="line"
                        d="M5.76209 14.1129C4.96371 13.5685 5.03629 12.1169 5.94355 10.7379C6.85081 9.35887 5.61694 7.47177 5 7"
                        stroke="#C9C9C9"
                        strokeLinecap="round"
                        strokeDasharray="7.11px 8.5px"
                        strokeDashoffset="8px"
                        pathLength="7.11"

                    />
                    <motion.path
                        data-animate="line"
                        d="M8.99328 13.6371C8.59407 13.0565 7.92075 11.2794 8.70295 9.89919C10.346 7 6.34595 7.5 8.8459 4"
                        stroke="#C9C9C9"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeDasharray="9.64px 11px"
                        strokeDashoffset="10px"
                        pathLength="9.64"

                    />
                    <motion.path
                        data-animate="line"
                        d="M12.5035 14.1129C13.3019 13.5685 13.2293 12.1169 12.3221 10.7379C11.4148 9.35887 12.6487 7.47177 13.2656 7"
                        stroke="#C9C9C9"
                        strokeLinecap="round"
                        strokeDasharray="7.11px 8.5px"
                        strokeDashoffset="8px"
                        pathLength="7.11"

                    />


                    <motion.line data-animate="ray" strokeDasharray="2.24px 3px" strokeDashoffset="0px" x1="22.25" y1="27.95" x2="22.25" y2="29.686" stroke="#666666" strokeWidth="0.5" strokeLinecap="round"/>
                    <motion.line data-animate="ray" strokeDasharray="2.24px 3px" strokeDashoffset="0px" x1="25.0657" y1="28.1391" x2="24.3321" y2="29.7125" stroke="#666666" strokeWidth="0.5" strokeLinecap="round"/>
                    <motion.line data-animate="ray" strokeDasharray="2.24px 3px" strokeDashoffset="0px" x1="0.25" y1="-0.25" x2="1.98607" y2="-0.25" transform="matrix(0.422618 0.906308 0.906308 -0.422618 19.3999 27.8069)" stroke="#666666" strokeWidth="0.5" strokeLinecap="round"/>
                    <motion.line data-animate="ray" strokeDasharray="2.24px 3px" strokeDashoffset="0px" x1="33.3501" y1="27.95" x2="33.3501" y2="29.686" stroke="#666666" strokeWidth="0.5" strokeLinecap="round"/>
                    <motion.line data-animate="ray" strokeDasharray="2.24px 3px" strokeDashoffset="0px" x1="36.1658" y1="28.1391" x2="35.4322" y2="29.7125" stroke="#666666" strokeWidth="0.5" strokeLinecap="round"/>
                    <motion.line data-animate="ray" strokeDasharray="2.24px 3px" strokeDashoffset="0px" x1="0.25" y1="-0.25" x2="1.98607" y2="-0.25" transform="matrix(0.422618 0.906308 0.906308 -0.422618 30.5 27.8069)" stroke="#666666" strokeWidth="0.5" strokeLinecap="round"/>


                    <rect x="19.605" y="30.7178" width="5.08065" height="3.19355" rx="1.16129" fill="#969697" />
                    <rect x="30.7097" y="30.7178" width="5.08065" height="3.19355" rx="1.16129" fill="#969697" />

                </motion.g>
            </AnimatePresence>

            <motion.path d={barPath} fill="#969697" />


        </motion.svg>
    )
}



export default FactoryIconV2;

// Factory with BG shape
{/* <svg width="234" height="234" viewBox="0 0 234 234" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M81.1898 107.739C73.3757 90.8468 90.8469 73.3756 107.739 81.1898L116.673 85.3226L125.607 81.1898C142.498 73.3756 159.97 90.8469 152.155 107.739L148.023 116.673L152.155 125.607C159.97 142.498 142.498 159.97 125.607 152.155L116.673 148.023L107.739 152.155C90.8469 159.97 73.3757 142.498 81.1898 125.607L85.3226 116.673L81.1898 107.739Z" fill="#F4F4F4"/>
<path d="M122.014 115.05C121.683 115.806 122.577 116.507 123.232 116.004L132.876 108.599C133.236 108.323 133.678 108.173 134.132 108.173C135.094 108.173 135.874 108.952 135.874 109.915V127.406C135.874 128.369 135.094 129.148 134.132 129.148H106.915C105.952 129.148 105.173 128.369 105.173 127.406V125.059C105.173 123.26 106.668 121.823 107.952 120.564L120.127 108.792C120.538 108.395 121.087 108.173 121.658 108.173C123.247 108.173 124.313 109.804 123.676 111.259L122.014 115.05Z" fill="#E5E5E5"/>
<path d="M101.935 104.286C101.136 103.741 101.209 102.29 102.116 100.911C103.023 99.5315 101.79 97.6444 101.173 97.1726" stroke="#C9C9C9" stroke-linecap="round"/>
<path d="M108.676 104.286C109.475 103.741 109.402 102.29 108.495 100.911C107.587 99.5315 108.821 97.6444 109.438 97.1726" stroke="#C9C9C9" stroke-linecap="round"/>
<path d="M105.166 103.81C104.767 103.229 104.093 101.452 104.876 100.072C106.519 97.1726 102.519 97.6726 105.019 94.1726" stroke="#C9C9C9" stroke-width="1.2" stroke-linecap="round"/>
<path d="M100.755 109.212C100.936 106.931 102.839 105.173 105.127 105.173C107.407 105.173 109.307 106.92 109.497 109.192L110.962 126.656C111.075 128.01 110.006 129.173 108.647 129.173H101.687C100.332 129.173 99.2642 128.017 99.3713 126.666L100.755 109.212Z" fill="#969697"/>
<rect x="115.778" y="120.89" width="5.08065" height="3.19355" rx="1.16129" fill="#969697"/>
<rect x="126.882" y="120.89" width="5.08065" height="3.19355" rx="1.16129" fill="#969697"/>
<line x1="118.423" y1="118.123" x2="118.423" y2="119.859" stroke="#666666" stroke-width="0.5" stroke-linecap="round"/>
<line x1="121.238" y1="118.312" x2="120.505" y2="119.885" stroke="#666666" stroke-width="0.5" stroke-linecap="round"/>
<line x1="0.25" y1="-0.25" x2="1.98607" y2="-0.25" transform="matrix(0.422618 0.906308 0.906308 -0.422618 115.573 117.98)" stroke="#666666" stroke-width="0.5" stroke-linecap="round"/>
<line x1="129.523" y1="118.123" x2="129.523" y2="119.859" stroke="#666666" stroke-width="0.5" stroke-linecap="round"/>
<line x1="132.338" y1="118.312" x2="131.605" y2="119.885" stroke="#666666" stroke-width="0.5" stroke-linecap="round"/>
<line x1="0.25" y1="-0.25" x2="1.98607" y2="-0.25" transform="matrix(0.422618 0.906308 0.906308 -0.422618 126.673 117.98)" stroke="#666666" stroke-width="0.5" stroke-linecap="round"/>
</svg> */}
