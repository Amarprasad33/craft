"use client"
import { useAnimateVariant } from '@/lib/hooks/use-animate-variant'
import { useHoverTimeout } from '@/lib/hooks/use-hover-timeout'
import { AnimationPlaybackControls, easeOut, motion, useMotionValue, useTransform } from 'motion/react'
import { useCallback, useRef } from 'react'

export default function WavePage() {
    return (
        <div className="w-full min-h-screen flex justify-center bg-white  items-center">
            <WaveIcon />
        </div>
    )
}

const BLOB_PATH = "M99.8818 0.133455C120.618 3.24143 109.115 45.1553 127.072 55.9807C142.551 65.3115 166.763 36.2693 180.085 48.483C192.177 59.5698 169.424 79.8856 170.961 96.2192C172.206 109.451 206.516 132.457 190 149.5C180.574 159.226 145.814 177.719 135.602 186.617C120.69 199.612 119.661 232.872 99.8818 233.066C80.2203 233.259 80.1018 198.348 63.8215 187.322C50.7571 178.475 25.0382 191.836 18.0868 177.672C10.2243 161.651 33.9748 145.228 34.4072 127.387C33 121 25 105 20.109 94.235C13.8203 75.0477 -9.86577 50.5432 4.60688 36.4634C20.2733 21.2222 48.0378 54.9833 68.4606 47.1958C86.309 40.3899 80.9908 -2.69796 99.8818 0.133455Z"

const WAVE_PATHS = {
    idle: "M53.5 118.5C55.333 118.5 57.167 118.5 59 118.5C65.012 118.5 71.024 118.5 77.036 118.5C77.33 118.5 77.61 118.37 77.8 118.146C79.253 116.429 80.706 114.711 82.159 112.994C82.584 112.492 83.368 112.529 83.743 113.069C85.769 115.98 87.794 118.892 89.819 121.803C90.297 122.489 91.356 122.321 91.597 121.521C93.728 114.465 95.858 107.409 97.988 100.353C98.278 99.39 99.649 99.411 99.911 100.382C102.838 111.256 105.766 122.131 108.694 133.005C108.946 133.943 110.252 134.007 110.595 133.098C113.353 125.788 116.112 118.479 118.87 111.169C119.146 110.438 120.116 110.292 120.595 110.908C122.463 113.31 124.332 115.712 126.2 118.114C126.389 118.358 126.68 118.5 126.989 118.5C136.326 118.5 145.663 118.5 155 118.5C157.5 118.5 160 118.5 162.5 118.5",
    hover: "M53.5 118.5C57.453 118.5 61.405 118.5 65.358 118.5C67.011 118.5 68.554 117.68 69.556 116.366C70.776 114.767 72.579 112.55 74.481 110.733C76.384 108.917 78.385 107.5 80 107.5C82.25 107.5 84.5 110.125 86.188 112.75C87.875 115.375 89 118 89 118C89 118 90.25 121.125 92.313 124.25C94.375 127.375 97.25 130.5 100.5 130.5C103.75 130.5 106.75 127.25 108.938 124C111.125 120.75 112.5 117.5 112.5 117.5C112.5 117.5 113.75 114.625 115.563 111.75C117.375 108.875 119.75 106 122 106C125.042 106 128.313 111.484 130.113 115.037C131.011 116.812 132.786 118.021 134.775 118.053C139.396 118.127 144.017 118.202 148.637 118.276C150.948 118.314 153.258 118.351 155.569 118.388C157.879 118.425 160.19 118.463 162.5 118.5",
    pull: "M53.5 118.5C55.917 118.5 58.333 118.5 60.75 118.5C63.167 118.5 65.583 118.5 68 118.5C68 118.5 69.625 118.5 71.875 118.188C74.125 117.875 77 117.25 79.5 116C82 114.75 83.125 113.75 84.125 112.563C85.125 111.375 86 110 88 108C90 106 92.25 104.875 94.5 104.313C96.75 103.75 99 103.75 101 104C103 104.25 105.459 105.125 107.75 106.188C110.042 107.25 112.167 108.5 113.5 109.5C116.079 111.434 118.814 113.836 120.348 114.444C120.448 114.484 120.544 114.533 120.631 114.597C125.284 118 131.5 118 131.5 118C134.083 118.042 136.667 118.083 139.25 118.125C141.833 118.167 144.417 118.208 147 118.25C149.583 118.292 152.167 118.333 154.75 118.375C157.333 118.417 159.917 118.458 162.5 118.5",
    rope: "M53.5 118.5C54.167 118.5 54.833 118.5 55.5 118.5C55.5 118.5 64 118.866 66 117.866C68.5 116.5 70 114.857 72.5 112C74.25 110 75.125 108.375 76.063 107.063C77 105.75 78 104.75 80 104C80.878 103.671 82.628 103.296 84.658 103.816C86.689 104.335 89 105.75 91 109C93 112.251 94.25 114.126 95.5 115.25C96.75 116.375 98 116.75 100 117C102 117.125 104.969 117.25 108.297 117.367C111.625 117.484 115.313 117.594 118.75 117.688C122.188 117.781 125.375 117.859 127.703 117.914C130.031 117.969 131.5 118 131.5 118C134.083 118.042 136.667 118.083 139.25 118.125C141.833 118.167 144.417 118.208 147 118.25C149.583 118.292 152.167 118.333 154.75 118.375C157.333 118.417 159.917 118.458 162.5 118.5",
}

const HOVER_EASE = [0.22, 1, 0.36, 1] as const

const backgroundVariants = {
    initial: {
        transform: "scale(1)",
        opacity: 0.7,
    },
    exit: {
        transform: "scale(1)",
        opacity: 0.7,
        transition: {
            duration: 0.45,
            ease: easeOut,
        },
    },
    hover: {
        opacity: 1,
        transform: ["scale(1)", "scale(0.985)", "scale(1)"],
        transition: {
            duration: 0.7,
            times: [0, 0.4, 1],
            ease: HOVER_EASE,
        },
    },
    click: {
        transform: ["scale(1)", "scale(0.97)", "scale(1.02)", "scale(1)"],
        opacity: 1,
        transition: {
            duration: 0.45,
            times: [0, 0.25, 0.7, 1],
            ease: "easeOut",
        },
    },
}
// AI Crappier version where click doesn't work as I wanted.
const WaveIcon = () => {
    const animationControlsRef = useRef<AnimationPlaybackControls[]>([]);
    const hoverDisabledRef = useRef(false);
    const isHoveringRef = useRef(false);
    const [scope, animateVariant, animate] = useAnimateVariant();
    const hoverAnimDone = useRef(false);
    const isUserClicking = useRef(false);
    const motionGenRef = useRef(0);

    const progress = useMotionValue(0);
    const floatY = useMotionValue(0);

    const wavePath = useTransform(
        progress,
        [0, 1, 1.7, 2],
        [WAVE_PATHS.idle, WAVE_PATHS.hover, WAVE_PATHS.pull, WAVE_PATHS.rope],
    );
    const strokeWidth = useTransform(progress, [0, 1, 2], [4, 3.5, 4]);

    const stopAnimations = () => {
        animationControlsRef.current.forEach((control) => control.stop());
        animationControlsRef.current = [];
    };

    const track = (control: AnimationPlaybackControls) => {
        animationControlsRef.current.push(control);
        return control;
    };

    const animateFloat = useCallback(async () => {
        while (isHoveringRef.current && !isUserClicking.current) {
            const control = animate(
                floatY,
                [0, -1.5, 0.4, 0],
                {
                    duration: 2.8,
                    times: [0, 0.45, 0.78, 1],
                    ease: "easeInOut",
                },
            );
            track(control);
            await control;
        }
    }, [animate, floatY]);

    const { handleMouseEnter, handleMouseLeave } = useHoverTimeout({
        delay: 100,
        disabledRef: hoverDisabledRef,
        onHoverStart: async () => {
            const gen = ++motionGenRef.current;
            stopAnimations();
            isHoveringRef.current = true;
            hoverAnimDone.current = false;
            isUserClicking.current = false;

            animateVariant("[data-animate='background']", backgroundVariants.hover);

            await track(animate(progress, 1, {
                duration: 0.7,
                ease: HOVER_EASE,
            }));
            if (gen !== motionGenRef.current) return;

            await track(animate(floatY, -1, {
                duration: 0.4,
                ease: HOVER_EASE,
            }));
            if (gen !== motionGenRef.current || !isHoveringRef.current) return;

            hoverAnimDone.current = true;
            animateFloat();
        },
        onHoverEnd: () => {
            motionGenRef.current += 1;
            isHoveringRef.current = false;
            hoverAnimDone.current = false;
            stopAnimations();

            animateVariant("[data-animate='background']", backgroundVariants.exit);
            animate(progress, 0, {
                duration: 0.55,
                ease: HOVER_EASE,
            });
            animate(floatY, 0, {
                duration: 0.35,
                ease: easeOut,
            });
            isUserClicking.current = false;
        },
    });

    const handleClick = async () => {
        if (!hoverAnimDone.current) return;

        const gen = ++motionGenRef.current;
        isHoveringRef.current = false;
        stopAnimations();

        if (isUserClicking.current) {
            animateVariant("[data-animate='background']", backgroundVariants.click);
            track(animate(progress, [2, 1.78, 2], {
                type: "spring",
                stiffness: 220,
                damping: 16,
                mass: 0.7,
            }));
            return;
        }

        animateVariant("[data-animate='background']", backgroundVariants.click);

        await track(animate(progress, 1.15, {
            type: "spring",
            stiffness: 260,
            damping: 18,
            mass: 0.65,
        }));
        if (gen !== motionGenRef.current) return;

        await track(animate(floatY, 1, {
            type: "spring",
            stiffness: 240,
            damping: 16,
        }));
        if (gen !== motionGenRef.current) return;

        await track(animate(progress, 1.85, {
            type: "spring",
            stiffness: 260,
            damping: 13,
            mass: 0.7,
        }));
        if (gen !== motionGenRef.current) return;

        await track(animate(progress, 2, {
            type: "spring",
            stiffness: 180,
            damping: 20,
            mass: 0.7,
        }));
        if (gen !== motionGenRef.current) return;

        track(animate(floatY, 0, {
            type: "spring",
            stiffness: 180,
            damping: 18,
        }));

        isUserClicking.current = true;
    };

    return (
        <svg width="195" height="234" viewBox="0 0 195 234" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.g
                ref={scope}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                className="cursor-pointer"
            >
                <motion.path
                    data-animate="background"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d={BLOB_PATH}
                    fill="#F7F7F7"
                    initial={backgroundVariants.initial}
                    style={{ transformOrigin: "50% 50%" }}
                />
                <motion.path
                    d={wavePath}
                    fill="none"
                    stroke="#BFBFBF"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    style={{ y: floatY }}
                />
            </motion.g>
        </svg>
    )
}

// svg path stage 2
{/* <svg width="195" height="234" viewBox="0 0 195 234" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M99.8818 0.133455C120.618 3.24143 109.115 45.1553 127.072 55.9807C142.551 65.3115 166.763 36.2693 180.085 48.483C192.177 59.5698 169.424 79.8856 170.961 96.2192C172.206 109.451 206.516 132.457 190 149.5C180.574 159.226 145.814 177.719 135.602 186.617C120.69 199.612 119.661 232.872 99.8818 233.066C80.2203 233.259 80.1018 198.348 63.8215 187.322C50.7571 178.475 25.0382 191.836 18.0868 177.672C10.2243 161.651 33.9748 145.228 34.4072 127.387C33 121 25 105 20.109 94.235C13.8203 75.0477 -9.86577 50.5432 4.60688 36.4634C20.2733 21.2222 48.0378 54.9833 68.4606 47.1958C86.309 40.3899 80.9908 -2.69796 99.8818 0.133455Z" fill="#F7F7F7"/>
<path d="M53.5 118.5H65.3575C67.0108 118.5 68.5542 117.68 69.5565 116.366C71.9949 113.167 76.7702 107.5 80 107.5C84.5 107.5 89 118 89 118C89 118 94 130.5 100.5 130.5C107 130.5 112.5 117.5 112.5 117.5C112.5 117.5 117.5 106 122 106C125.042 106 128.313 111.484 130.113 115.037C131.011 116.812 132.786 118.021 134.775 118.053L162.5 118.5" stroke="#BFBFBF" stroke-width="4" stroke-linecap="round"/>
</svg> */}

// stage 3
{/* <svg width="195" height="234" viewBox="0 0 195 234" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M99.8818 0.133455C120.618 3.24143 109.115 45.1553 127.072 55.9807C142.551 65.3115 166.763 36.2693 180.085 48.483C192.177 59.5698 169.424 79.8856 170.961 96.2192C172.206 109.451 206.516 132.457 190 149.5C180.574 159.226 145.814 177.719 135.602 186.617C120.69 199.612 119.661 232.872 99.8818 233.066C80.2203 233.259 80.1018 198.348 63.8215 187.322C50.7571 178.475 25.0382 191.836 18.0868 177.672C10.2243 161.651 33.9748 145.228 34.4072 127.387C33 121 25 105 20.109 94.235C13.8203 75.0477 -9.86577 50.5432 4.60688 36.4634C20.2733 21.2222 48.0378 54.9833 68.4606 47.1958C86.309 40.3899 80.9908 -2.69796 99.8818 0.133455Z" fill="#F7F7F7"/>
<path d="M53.5 118.5H68C68 118.5 74.5 118.5 79.5 116C84.5 113.5 84 112 88 108C92 104 97 103.5 101 104C105 104.5 110.834 107.5 113.5 109.5C116.079 111.434 118.814 113.836 120.348 114.444C120.448 114.484 120.544 114.533 120.631 114.597C125.284 118 131.5 118 131.5 118L162.5 118.5" stroke="#BFBFBF" stroke-width="4" stroke-linecap="round"/>
</svg> */}

// Stage 4
{/* <svg width="195" height="234" viewBox="0 0 195 234" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M99.8818 0.133455C120.618 3.24143 109.115 45.1553 127.072 55.9807C142.551 65.3115 166.763 36.2693 180.085 48.483C192.177 59.5698 169.424 79.8856 170.961 96.2192C172.206 109.451 206.516 132.457 190 149.5C180.574 159.226 145.814 177.719 135.602 186.617C120.69 199.612 119.661 232.872 99.8818 233.066C80.2203 233.259 80.1018 198.348 63.8215 187.322C50.7571 178.475 25.0382 191.836 18.0868 177.672C10.2243 161.651 33.9748 145.228 34.4072 127.387C33 121 25 105 20.109 94.235C13.8203 75.0477 -9.86577 50.5432 4.60688 36.4634C20.2733 21.2222 48.0378 54.9833 68.4606 47.1958C86.309 40.3899 80.9908 -2.69796 99.8818 0.133455Z" fill="#F7F7F7"/>
<path d="M53.5 118.5L55.5 118.5C55.5 118.5 64 118.866 66 117.866C68.5 116.5 70 114.857 72.5 112C76 108 76 105.5 80 104C81.7553 103.342 87 102.5 91 109C95 115.501 96 116.5 100 117C108 117.5 131.5 118 131.5 118L162.5 118.5" stroke="#BFBFBF" stroke-width="4" stroke-linecap="round"/>
</svg> */}
