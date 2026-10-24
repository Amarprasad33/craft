"use client"

import { useHoverTimeout } from "@/lib/hooks/use-hover-timeout";
import { useRef } from "react";
import { motion } from 'motion/react';
import { useAnimateVariant } from "@/lib/hooks/use-animate-variant";




export default function TerminalAnimation() {
    return (
        <div className="w-full min-h-screen flex justify-center bg-white  items-center text-red-600">
            <TerminalIcon />
        </div>
    )
}


const TerminalIcon = () => {
    const hoverDisabledRef = useRef(false);
    const [scope, animateVariant, animate] = useAnimateVariant();

    const { handleMouseEnter, handleMouseLeave } = useHoverTimeout({
        delay: 100,
        disabledRef: hoverDisabledRef,
        onHoverStart: async () => {
            console.log("hover call");
           
        },
        onHoverEnd: () => {
            // Stop the running animations
           
            // animateVariant("[data-animate='sun']", sunVariants.exit)
        }
    })


    const handleClick = async () => {
       
    }
    

    return (
        <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.g
                ref={scope}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                <rect width="84" height="84" rx="21" fill="#F3F3F3"/>
                <g>
                    <path d="M24.9375 28.875L37.1344 41.0719C37.647 41.5845 37.647 42.4155 37.1344 42.9281L24.9375 55.125" strokeWidth="6.5625" strokeLinecap="round" stroke="#989898"/>
                    <path d="M47.9062 55.125H62.3438" strokeWidth="6.5625" strokeLinecap="round" stroke="#989898"/>
                </g>

                <g>
                    <path d="M0 55.7812H84" strokeWidth="1.3125" stroke="#989898"/>
                    <path d="M0 63.6562H84" strokeWidth="1.3125" stroke="#989898"/>
                    <circle cx="3.28125" cy="59.7188" r="1.96875" fill="#989898"/>
                    <circle cx="11.1562" cy="59.7188" r="1.96875" fill="#989898"/>
                    <circle cx="19.0312" cy="59.7188" r="1.96875" fill="#989898"/>
                    <circle cx="26.9062" cy="59.7188" r="1.96875" fill="#989898"/>
                    <circle cx="34.7812" cy="59.7188" r="1.96875" fill="#989898"/>
                    <circle cx="42.6562" cy="59.7188" r="1.96875" fill="#989898"/>
                    <circle cx="50.5312" cy="59.7188" r="1.96875" fill="#989898"/>
                    <circle cx="58.4062" cy="59.7188" r="1.96875" fill="#989898"/>
                    <circle cx="66.2812" cy="59.7188" r="1.96875" fill="#989898"/>
                    <circle cx="74.1562" cy="59.7188" r="1.96875" fill="#989898"/>
                    <circle cx="82.0312" cy="59.7188" r="1.96875" fill="#989898"/>
                </g>
                <g>
                    <path d="M15.0938 16.4062H38.7188" strokeWidth="3.9375" strokeLinecap="round" stroke="#989898"/>
                    <path d="M15.0938 24.2812H53.1562" strokeWidth="3.9375" strokeLinecap="round" stroke="#989898"/>
                    <path d="M15.0938 32.1562H66.2812" strokeWidth="3.9375" strokeLinecap="round" stroke="#989898"/>
                    <path d="M15.0938 40.0312H62.3438" strokeWidth="3.9375" strokeLinecap="round" stroke="#989898"/>
                    <path d="M15.0938 47.9062H68.9062" strokeWidth="3.9375" strokeLinecap="round" stroke="#989898"/>
                    <path d="M18.7472 55.0412C19.0702 54.1683 20.3048 54.1683 20.6278 55.0412L21.3 56.8576C21.4015 57.1321 21.6179 57.3485 21.8924 57.45L23.7088 58.1222C24.5817 58.4452 24.5817 59.6798 23.7088 60.0028L21.8924 60.675C21.6179 60.7765 21.4015 60.9929 21.3 61.2674L20.6278 63.0838C20.3048 63.9567 19.0702 63.9567 18.7472 63.0838L18.075 61.2674C17.9735 60.9929 17.7571 60.7765 17.4826 60.675L15.6662 60.0028C14.7933 59.6798 14.7933 58.4452 15.6662 58.1222L17.4826 57.45C17.7571 57.3485 17.9735 57.1321 18.075 56.8576L18.7472 55.0412Z" fill="#989898"/>
                </g>
            </motion.g>
        </svg>
    )
}