import { easeInOut, easeOut, motion } from 'framer-motion'
import React from 'react'

type transition = {
    duration?: number,
    delay?: number
}

const SquigglyConfetti = ({ color, transition }: { color: string, transition: transition }) => {
    return (
        <svg width="378" height="342" viewBox="0 0 378 342" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 0.3, pathOffset: [0, 1], opacity: [0, 1, 0] }} transition={{ ease: easeOut, duration: 0.4, ...transition }} d="M6 340C24.5 266.167 116.247 86.054 262 107.5C445.5 134.5 365.5 302 271.5 295.5C162 287.928 109 131 337 5" stroke={color} strokeWidth={11} strokeLinecap={"round"} />
        </svg>
    )
}

export default SquigglyConfetti