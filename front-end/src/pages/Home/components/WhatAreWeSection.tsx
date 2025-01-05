import React from 'react'
import { motion } from 'framer-motion'
import HistorySection from './HistorySection'
import { scrollToSection } from '../../../libs/utils'

interface WhatAreWeSectionProps {
    hasPendingTransaction: boolean
}

const WhatAreWeSection: React.FC<WhatAreWeSectionProps> = ({
    hasPendingTransaction,
}) => {
    return (
        <div className="flex flex-col relative justify-center items-center w-full min-h-[80vh] text-white">
            <div className="flex flex-col justify-center items-center w-full max-w-6xl px-4 md:px-8 pt-16 z-[51]">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-emerald-500"
                >
                    What the heck is a Memebox?
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-16 mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <p className="text-xl text-center md:text-left text-gray-300 leading-relaxed font-semibold">
                            Imagine a{' '}
                            <span className="text-pink-500"> mystery box</span>{' '}
                            so epic, it makes you manually picking memecoins
                            look{' '}
                            <span className="text-accent animate-pulse">
                                {' '}
                                boring
                            </span>
                            . Each memebox is stuffed with
                            <span className="text-accent-secondary">
                                {' '}
                                hand-picked Solana memecoins
                            </span>{' '}
                            by our {''}
                            <span className="text-red-400 line-through">
                                professional
                            </span>
                            <span className="bg-gradient-to-r from-accent via-accent-dark to-emerald-500 text-transparent bg-clip-text animate-gradient-x">
                                {' '}
                                intern researchers
                            </span>{' '}
                            🧪
                        </p>

                        <ul className="list-none space-y-6 text-left">
                            {[
                                '📦 Ape into a mystery box (trust me bro)',
                                '🎁 IYKYK - Open it to reveal pure meme gold',
                                '🚀 HODL rare memecoins to the moon',
                                '📈 Watch your portfolio go through the roof',
                            ].map((step, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.1 * index,
                                    }}
                                    className="flex items-center space-x-4 group"
                                >
                                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-background-dark font-bold transform group-hover:scale-110 group-hover:rotate-12 transition-all">
                                        {index + 1}
                                    </span>
                                    <span className="text-gray-200 text-lg group-hover:text-accent transition-all hover:scale-105 font-semibold">
                                        {step}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col justify-center space-y-8 text-gray-300"
                    >
                        <p className="text-xl leading-relaxed">
                            <span className="text-2xl">🎲</span> Degen mode ON?
                            Each box is like a
                            <span className="text-accent font-bold">
                                {' '}
                                meme roulette
                            </span>{' '}
                            - you might find the next{' '}
                            <span className="text-red-400 line-through">
                                rug
                            </span>
                            <span className="text-accent-secondary font-bold animate-pulse">
                                {' '}
                                100x gem
                            </span>
                        </p>

                        <div className="flex flex-col items-center space-y-6">
                            <p className="text-2xl font-bold bg-gradient-to-r from-accent via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient-x">
                                gm! Ready to become a meme whale? 🐋
                            </p>
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow:
                                        '0 0 20px rgba(0, 255, 255, 0.5)',
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scrollToSection('boxes-section')}
                                className="relative px-10 py-4 rounded-full bg-gradient-to-r from-accent via-accent-dark to-emerald-500 text-background-dark font-bold transition-all group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-accent-dark via-emerald-500 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative flex items-center space-x-2">
                                    <span className="text-lg">
                                        Buy a memebox
                                    </span>
                                    <span className="text-xl">🚀</span>
                                </div>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="absolute inset-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-background-light opacity-20 animate-gradient-x"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                <div className="absolute inset-0 bg-[url('/meme-pattern.png')] opacity-5"></div>
            </div>
            <HistorySection hasPendingTransaction={hasPendingTransaction} />
        </div>
    )
}

export default WhatAreWeSection
