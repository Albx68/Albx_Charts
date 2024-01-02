import { motion } from 'framer-motion'
import React from 'react'

const PopConfetti = () => {
    return (
        <motion.svg animate={{ y: [-300, 0] }} width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.rect animate={{ rotateX: 360, rotateZ: -30 }} height={20} width={20} x={20} y={20} fill="#55FFA3" transition={{ duration: 0.6 }} />
        </motion.svg>

    )
}

export default PopConfetti