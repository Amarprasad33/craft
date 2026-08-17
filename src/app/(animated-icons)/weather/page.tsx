"use client"
import {motion} from 'motion/react'

export default function WeatherPage() {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div>Title</div>
            <WeatherIcon />
        </div>
    )
}


const WeatherIcon = () => {
    return (
        <svg width="189" height="169" viewBox="0 0 189 169" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="94.2855" cy="84.3566" rx="78.3214" ry="53.2718" transform="rotate(28.7234 94.2855 84.3566)" fill="#F3F3F3"/>
            <circle cx="75.0918" cy="66.0918" r="8" fill="#F5C43E" stroke="#F5C43E"/>
            <line x1="85.0923" y1="66.0918" x2="88.0923" y2="66.0918" stroke="#F5C43E" strokeLinecap="round"/>
            <line x1="75.0923" y1="76.0918" x2="75.0923" y2="79.0918" stroke="#F5C43E" strokeLinecap="round"/>
            <line x1="62.0923" y1="66.0918" x2="65.0923" y2="66.0918" stroke="#F5C43E" strokeLinecap="round"/>
            <line x1="75.0923" y1="53.0918" x2="75.0923" y2="56.0918" stroke="#F5C43E" strokeLinecap="round"/>
            <line x1="82.1632" y1="73.1628" x2="84.2845" y2="75.2842" stroke="#F5C43E" strokeLinecap="round"/>
            <line x1="68.021" y1="73.1629" x2="65.8997" y2="75.2842" stroke="#F5C43E" strokeLinecap="round"/>
            <line x1="65.9" y1="56.8994" x2="68.0213" y2="59.0207" stroke="#F5C43E" strokeLinecap="round"/>
            <line x1="84.2847" y1="56.8995" x2="82.1633" y2="59.0208" stroke="#F5C43E" strokeLinecap="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M96.8289 60C101.957 60 106.907 62.0366 110.59 65.6621C114.266 69.271 116.378 74.1791 116.471 79.3298L116.501 81.1784C119.489 81.9553 122.092 83.7946 123.821 86.352C125.551 88.9094 126.289 92.0096 125.898 95.072C125.506 98.1344 124.012 100.949 121.695 102.989C119.377 105.029 116.396 106.155 113.309 106.155H82.1538C78.1971 106.155 74.378 104.703 71.4209 102.074C68.4638 99.4448 66.5745 95.822 66.1112 91.8925C65.6479 87.9629 66.6428 84 68.9074 80.7554C71.172 77.5107 74.5486 75.21 78.3968 74.2897C79.2207 71.034 80.8962 68.0563 83.2512 65.6621C85.0257 63.8649 87.14 62.4388 89.4711 61.4667C91.8021 60.4946 94.3033 59.9961 96.8289 60Z" fill="#D2D2D2"/>
            <path d="M96.8302 60C94.3044 59.9959 91.8031 60.4944 89.4718 61.4665C87.1405 62.4386 85.026 63.8648 83.2514 65.6621C81.483 67.4656 80.0911 69.603 79.1569 71.9497C78.2226 74.2964 77.7647 76.8056 77.8097 79.331C77.9022 84.4825 80.0142 89.3916 83.691 93.001C87.3585 96.6193 92.3002 98.6527 97.4522 98.6631C98.8403 98.6631 100.21 98.5131 101.543 98.2246C100.608 95.914 100.374 93.3792 100.87 90.9365C101.367 88.4938 102.571 86.2513 104.334 84.4888C105.887 82.9356 107.817 81.8121 109.935 81.2282C112.052 80.6443 114.285 80.62 116.415 81.1576C116.463 80.5522 116.482 79.9437 116.473 79.3321C116.38 74.1809 114.267 69.2722 110.59 65.6633C106.923 62.0448 101.982 60.0111 96.8302 60Z" fill="#989898"/>
            <line x1="111.671" y1="109.224" x2="113.224" y2="112.329" stroke="#CFCFCF" strokeLinecap="round"/>
            <line x1="118.671" y1="110.224" x2="120.224" y2="113.329" stroke="#CFCFCF" strokeLinecap="round"/>
            <line x1="106.671" y1="112.224" x2="108.224" y2="115.329" stroke="#CFCFCF" strokeLinecap="round"/>
            <line x1="102.671" y1="108.224" x2="104.224" y2="111.329" stroke="#CFCFCF" strokeLinecap="round"/>
            <line x1="102.671" y1="116.224" x2="104.224" y2="119.329" stroke="#CFCFCF" strokeLinecap="round"/>
            <line x1="109.671" y1="113.224" x2="111.224" y2="116.329" stroke="#CFCFCF" strokeLinecap="round"/>
            <line x1="95.6708" y1="112.224" x2="97.2236" y2="115.329" stroke="#CFCFCF" strokeLinecap="round"/>
            <line x1="86.6708" y1="115.224" x2="88.2236" y2="118.329" stroke="#CFCFCF" strokeLinecap="round"/>
            <line x1="97.6708" y1="108.224" x2="99.2236" y2="111.329" stroke="#CFCFCF" strokeLinecap="round"/>
            <line x1="85.6708" y1="108.224" x2="87.2236" y2="111.329" stroke="#CFCFCF" strokeLinecap="round"/>
            <line x1="75.6708" y1="107.224" x2="77.2236" y2="110.329" stroke="#CFCFCF" strokeLinecap="round"/>
            <line x1="90.6708" y1="109.224" x2="92.2236" y2="112.329" stroke="#CFCFCF" strokeLinecap="round"/>
            <line x1="90.6708" y1="115.224" x2="92.2236" y2="118.329" stroke="#CFCFCF" strokeLinecap="round"/>
            <line x1="81.6708" y1="110.224" x2="83.2236" y2="113.329" stroke="#CFCFCF" strokeLinecap="round"/>
        </svg>
        

    )
}