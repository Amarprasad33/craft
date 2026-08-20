
"use client"
import { useHoverTimeout } from '@/lib/hooks/use-hover-timeout'
import { AnimationPlaybackControls, easeOut, motion, useAnimate } from 'motion/react'
import { useRef } from 'react'

export default function WeatherPage() {
    return (
        <div className="w-full min-h-screen flex justify-center bg-white  items-center">
            <WaveIcon />
        </div>
    )
}

const waveVariants = {
    initial: {
        transform: ""
    }
}



const WaveIcon = () => {
    const [scope, animate] = useAnimate();
    const animationControlsRef = useRef<AnimationPlaybackControls[]>([]);

    const hoverDisabledRef = useRef(false);







    const { handleMouseEnter, handleMouseLeave } = useHoverTimeout({
        delay: 100,
        disabledRef: hoverDisabledRef,
        onHoverStart: () => {

        },
        onHoverEnd: () => {

        }
    })


    return (
        <svg width="195" height="234" viewBox="0 0 195 234" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M99.8818 0.133455C120.618 3.24143 109.115 45.1553 127.072 55.9807C142.551 65.3115 166.763 36.2693 180.085 48.483C192.177 59.5698 169.424 79.8856 170.961 96.2192C172.206 109.451 206.516 132.457 190 149.5C180.574 159.226 145.814 177.719 135.602 186.617C120.69 199.612 119.661 232.872 99.8818 233.066C80.2203 233.259 80.1018 198.348 63.8215 187.322C50.7571 178.475 25.0382 191.836 18.0868 177.672C10.2243 161.651 33.9748 145.228 34.4072 127.387C33 121 25 105 20.109 94.235C13.8203 75.0477 -9.86577 50.5432 4.60688 36.4634C20.2733 21.2222 48.0378 54.9833 68.4606 47.1958C86.309 40.3899 80.9908 -2.69796 99.8818 0.133455Z" fill="#F7F7F7" />
            <path d="M59 118.5H77.0362C77.3304 118.5 77.6096 118.37 77.7996 118.146L82.1591 112.994C82.5836 112.492 83.3682 112.529 83.7434 113.069L89.8193 121.803C90.2968 122.489 91.3559 122.321 91.5975 121.521L97.9877 100.353C98.2784 99.3903 99.6491 99.411 99.9106 100.382L108.694 133.005C108.946 133.943 110.252 134.007 110.595 133.098L118.87 111.169C119.146 110.438 120.116 110.292 120.595 110.908L126.2 118.114C126.389 118.358 126.68 118.5 126.989 118.5H155" stroke="#BFBFBF" stroke-width="4" stroke-linecap="round" />
        </svg>

    )
}





