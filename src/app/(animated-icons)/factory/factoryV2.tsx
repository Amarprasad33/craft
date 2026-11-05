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
    const backgroundRef = useRef<SVGPathElement>(null);


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
        if (backgroundRef.current) {
            const { transform, transition } = backgroundVariants.click;
            animate(backgroundRef.current, { transform }, transition);
        }

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
        <motion.svg width="85" height="62" style={{ scale: 2 }} viewBox="0 0 85 62" fill="none" xmlns="http://www.w3.org/2000/svg" 
            onMouseEnter={animateSteam}
            onMouseLeave={stopSteam}
            onClick={handleClickAnimations}
        >
            <motion.path ref={backgroundRef} data-animate="background" initial={backgroundVariants.initial} d="M14.0546 62C4.68486 62 0 57.3151 0 47.9454V26.323C0 21.2777 2.00008 17.2163 6.00023 14.1387L22.1089 1.74907C26.1091 -1.32853 28.1092 -0.344706 28.1092 4.70053V13.3495C28.1092 16.9532 29.5381 17.656 32.3958 15.4577L50.2181 1.74907C54.2183 -1.32853 56.2183 -0.344706 56.2183 4.70053V13.3495C56.2183 16.9532 57.6472 17.656 60.505 15.4577L78.3273 1.74907C82.3274 -1.32853 84.3275 -0.344706 84.3275 4.70053V47.9454C84.3275 57.3151 79.6427 62 70.2729 62H14.0546Z" fill="#F3F3F3" />
            {/* Factory sits at (21, 17) on the bg - same offset as the reference svg */}
            <g transform="translate(21 17)">
                <path d="M25.8418 24.8776C25.5105 25.6338 26.4045 26.3341 27.0593 25.8313L36.7029 18.4268C37.0634 18.15 37.5052 18 37.9597 18C38.9217 18 39.7016 18.7799 39.7016 19.7419V37.2339C39.7016 38.1959 38.9217 38.9758 37.9597 38.9758H10.7419C9.77989 38.9758 9 38.1959 9 37.2339V34.8866C9 33.0878 10.4955 31.6504 11.7798 30.3909L23.9542 18.6192C24.365 18.222 24.914 18 25.4854 18C27.0745 18 28.1408 19.6314 27.503 21.0869L25.8418 24.8776Z" fill="#DFDFDF" />
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
            </g>


        </motion.svg>
    )
}



// Same press squish as the other icons' backgrounds
const backgroundVariants = {
    initial: {
        transform: "scale(1)",
    },
    click: {
        transform: ["scale(1)", "scale(0.97)", "scale(1.01)", "scale(1)"],
        transition: {
            duration: 0.45,
            times: [0, 0.3, 0.65, 1],
            ease: easeOut,
        },
    },
};

export default FactoryIconV2;

// Factory with BG shape

{/* <svg width="85" height="62" viewBox="0 0 85 62" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0546 62C4.68486 62 0 57.3151 0 47.9454V26.323C0 21.2777 2.00008 17.2163 6.00023 14.1387L22.1089 1.74907C26.1091 -1.32853 28.1092 -0.344706 28.1092 4.70053V13.3495C28.1092 16.9532 29.5381 17.656 32.3958 15.4577L50.2181 1.74907C54.2183 -1.32853 56.2183 -0.344706 56.2183 4.70053V13.3495C56.2183 16.9532 57.6472 17.656 60.505 15.4577L78.3273 1.74907C82.3274 -1.32853 84.3275 -0.344706 84.3275 4.70053V47.9454C84.3275 57.3151 79.6427 62 70.2729 62H14.0546Z" fill="#F3F3F3"/>
<path d="M46.8418 41.8776C46.5105 42.6338 47.4045 43.3341 48.0593 42.8313L57.7029 35.4268C58.0634 35.15 58.5052 35 58.9597 35C59.9217 35 60.7016 35.7799 60.7016 36.7419V54.2339C60.7016 55.1959 59.9217 55.9758 58.9597 55.9758H31.7419C30.7799 55.9758 30 55.1959 30 54.2339V51.8866C30 50.0878 31.4955 48.6504 32.7798 47.3909L44.9542 35.6192C45.365 35.222 45.914 35 46.4854 35C48.0745 35 49.1408 36.6314 48.503 38.0869L46.8418 41.8776Z" fill="#DFDFDF"/>
<path d="M26.7621 31.1129C25.9637 30.5685 26.0363 29.1169 26.9435 27.7379C27.8508 26.3589 26.6169 24.4718 26 24" stroke-linecap="round" stroke="#C9C9C9"/>
<path d="M33.5036 31.1129C34.302 30.5685 34.2294 29.1169 33.3221 27.7379C32.4149 26.3589 33.6488 24.4718 34.2657 24" stroke-linecap="round" stroke="#C9C9C9"/>
<path d="M29.9933 30.6371C29.5941 30.0565 28.9208 28.2794 29.703 26.8992C31.346 24 27.3459 24.5 29.8459 21" stroke-width="1.2" stroke-linecap="round" stroke="#C9C9C9"/>
<path d="M25.5823 36.0392C25.763 33.7586 27.6665 32 29.9543 32C32.2345 32 34.1343 33.7472 34.3248 36.0194L35.789 53.4834C35.9026 54.8379 34.8338 56 33.4745 56H26.514C25.1589 56 24.0916 54.8447 24.1987 53.4939L25.5823 36.0392Z" fill="#969697"/>
<rect x="40.6049" y="47.7178" width="5.08065" height="3.19355" rx="1.16129" fill="#969697"/>
<rect x="51.7097" y="47.7178" width="5.08065" height="3.19355" rx="1.16129" fill="#969697"/>
<path d="M43.25 44.9502L43.25 46.6863" stroke-width="0.5" stroke-linecap="round" stroke="#666666"/>
<path d="M46.0657 45.1394L45.3321 46.7128" stroke-width="0.5" stroke-linecap="round" stroke="#666666"/>
<path d="M40.279 45.1394L41.0127 46.7128" stroke-width="0.5" stroke-linecap="round" stroke="#666666"/>
<path d="M54.3501 44.9502L54.3501 46.6863" stroke-width="0.5" stroke-linecap="round" stroke="#666666"/>
<path d="M57.1658 45.1394L56.4322 46.7128" stroke-width="0.5" stroke-linecap="round" stroke="#666666"/>
<path d="M51.3791 45.1394L52.1128 46.7128" stroke-width="0.5" stroke-linecap="round" stroke="#666666"/>
</svg> */}

