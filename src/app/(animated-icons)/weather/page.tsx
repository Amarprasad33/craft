"use client"
import {motion, useAnimate} from 'motion/react'

export default function WeatherPage() {
    return (
        <div className="w-full min-h-screen flex justify-center bg-white  items-center">
            <WeatherIcon />
        </div>
    )
}

const sunVariants = {
    initial: {
        transform: "translateX(15px) translateY(14px) rotate(0deg)"
    }
}



const WeatherIcon = () => {
    const [scope, animate] = useAnimate();


    return (
        <svg width="188" height="168" viewBox="0 0 188 168" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g ref={scope}>
                <ellipse cx="93.8731" cy="83.9638" rx="78" ry="53" transform="rotate(28.7234 93.8731 83.9638)" fill="#F3F3F3"/>
                <motion.g initial={sunVariants.initial} data-animate="sun">
                    <circle cx="74.8306" cy="66.0918" r="8" fill="#F5C43E" stroke="#F5C43E"/>
                    <line x1="84.8311" y1="66.0918" x2="87.8311" y2="66.0918" stroke="#F5C43E" strokeLinecap="round"/>
                    <line x1="74.8311" y1="76.0918" x2="74.8311" y2="79.0918" stroke="#F5C43E" strokeLinecap="round"/>
                    <line x1="61.8311" y1="66.0918" x2="64.8311" y2="66.0918" stroke="#F5C43E" strokeLinecap="round"/>
                    <line x1="74.8311" y1="53.0918" x2="74.8311" y2="56.0918" stroke="#F5C43E" strokeLinecap="round"/>
                    <line x1="81.9019" y1="73.1628" x2="84.0233" y2="75.2842" stroke="#F5C43E" strokeLinecap="round"/>
                    <line x1="67.7598" y1="73.1629" x2="65.6384" y2="75.2842" stroke="#F5C43E" strokeLinecap="round"/>
                    <line x1="65.6387" y1="56.8994" x2="67.7601" y2="59.0207" stroke="#F5C43E" strokeLinecap="round"/>
                    <line x1="84.0234" y1="56.8995" x2="81.9021" y2="59.0208" stroke="#F5C43E" strokeLinecap="round"/>
                </motion.g>
                <path fillRule="evenodd" clipRule="evenodd" d="M96.5677 60C101.696 60 106.646 62.0366 110.329 65.6621C114.005 69.271 116.117 74.1791 116.21 79.3298L116.24 81.1784C119.228 81.9553 121.831 83.7946 123.56 86.352C125.29 88.9094 126.028 92.0096 125.636 95.072C125.245 98.1344 123.751 100.949 121.433 102.989C119.116 105.029 116.135 106.155 113.047 106.155H81.8926C77.9359 106.155 74.1167 104.703 71.1597 102.074C68.2026 99.4448 66.3132 95.822 65.8499 91.8925C65.3866 87.9629 66.3816 84 68.6462 80.7554C70.9107 77.5107 74.2873 75.21 78.1356 74.2897C78.9595 71.034 80.6349 68.0563 82.9899 65.6621C84.7645 63.8649 86.8788 62.4388 89.2098 61.4667C91.5409 60.4946 94.042 59.9961 96.5677 60Z" fill="#D2D2D2"/>
                <path d="M96.569 60C94.0432 59.9959 91.5418 60.4944 89.2106 61.4665C86.8793 62.4386 84.7648 63.8648 82.9901 65.6621C81.2217 67.4656 79.8299 69.603 78.8956 71.9497C77.9614 74.2964 77.5034 76.8055 77.5484 79.331C77.6409 84.4825 79.753 89.3916 83.4298 93.001C87.0972 96.6193 92.039 98.6527 97.1909 98.6631C98.5791 98.6631 99.9487 98.5131 101.281 98.2246C100.347 95.914 100.113 93.3792 100.609 90.9365C101.105 88.4938 102.31 86.2513 104.073 84.4888C105.626 82.9356 107.556 81.8121 109.673 81.2282C111.791 80.6443 114.024 80.62 116.154 81.1576C116.202 80.5522 116.221 79.9437 116.212 79.3321C116.118 74.1809 114.006 69.2722 110.329 65.6633C106.662 62.0448 101.721 60.0111 96.569 60Z" fill="#989898"/>
                <line x1="112.08" y1="109.447" x2="114.187" y2="113.66" stroke="#CFCFCF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="119.08" y1="110.447" x2="121.187" y2="114.66" stroke="#CFCFCF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="108.08" y1="111.447" x2="110.187" y2="115.66" stroke="#CFCFCF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="103.08" y1="108.447" x2="105.187" y2="112.66" stroke="#CFCFCF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="103.08" y1="116.447" x2="105.187" y2="120.66" stroke="#CFCFCF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="113.08" y1="116.447" x2="115.187" y2="120.66" stroke="#CFCFCF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="96.0804" y1="112.447" x2="98.1868" y2="116.66" stroke="#CFCFCF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="88.0804" y1="116.447" x2="90.1868" y2="120.66" stroke="#CFCFCF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="98.0804" y1="108.447" x2="100.187" y2="112.66" stroke="#CFCFCF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="86.0804" y1="108.447" x2="88.1868" y2="112.66" stroke="#CFCFCF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="76.0804" y1="107.447" x2="78.1868" y2="111.66" stroke="#CFCFCF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="91.0804" y1="108.447" x2="93.1868" y2="112.66" stroke="#CFCFCF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="92.0804" y1="115.447" x2="94.1868" y2="119.66" stroke="#CFCFCF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="82.0804" y1="110.447" x2="84.186" y2="114.658" stroke="#CFCFCF" strokeWidth="2" strokeLinecap="round"/>
            </g>
        </svg>

        

    )
}