import React from 'react'
import Navbar from '../../components/Layout/Navbar'
import { motion } from 'framer-motion'
import { BackgroundGradientAnimation } from '../../components/ui/BackgroundGradientAnimation'
import bonk from '../../assets/coins/bonk.png'
import wif from '../../assets/coins/wif.png'
import chillGuy from '../../assets/coins/chill-guy.png'
import { FaTwitter, FaTelegram, FaDiscord } from 'react-icons/fa'

const About: React.FC = () => {
    return (
        <div className="flex flex-col w-screen max-w-screen select-none bg-background-dark overflow-hidden">
            <Navbar />
            <BackgroundGradientAnimation
                gradientBackgroundStart="rgb(0, 0, 0)"
                gradientBackgroundEnd="rgb(19, 39, 40)"
                firstColor="18, 113, 255"
                secondColor="221, 74, 255"
                thirdColor="100, 220, 255"
                fourthColor="200, 50, 50"
                className="w-full"
            >
                <div className="flex flex-col items-center justify-center min-h-screen p-8 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-accent via-accent-dark to-emerald-500 text-transparent bg-clip-text mb-8"
                    >
                        gm frens! 👋
                    </motion.h1>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-background-light/30 p-8 rounded-2xl border border-accent/20 backdrop-blur-sm"
                        >
                            <h2 className="text-3xl font-bold text-accent mb-4">
                                Who Are We? 🤔
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Just two{' '}
                                <span className="text-accent">degen devs</span>{' '}
                                who met at a
                                <span className="text-accent-secondary">
                                    {' '}
                                    Solana bootcamp
                                </span>
                                . Instead of touching grass 🌱, we decided to
                                build something
                                <span className="text-purple-500">
                                    {' '}
                                    absolutely memeable
                                </span>
                                !
                            </p>

                            <div className="mt-6 flex gap-4">
                                {[bonk, wif, chillGuy].map((img, idx) => (
                                    <motion.img
                                        key={idx}
                                        src={img}
                                        alt="meme coin"
                                        className="w-12 h-12 rounded-full"
                                        whileHover={{
                                            scale: 1.2,
                                            rotate: 360,
                                            transition: { duration: 0.5 },
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-background-light/30 p-8 rounded-2xl border border-accent/20 backdrop-blur-sm"
                        >
                            <h2 className="text-3xl font-bold text-accent-secondary mb-4">
                                Our Mission 🚀
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Take you back in time and add some{' '}
                                <span className="text-pink-400">glitter</span>{' '}
                                to your missed memes! No more{' '}
                                <span className="text-red-400 line-through">
                                    FOMO
                                </span>{' '}
                                or
                                <span className="text-red-400 line-through">
                                    {' '}
                                    FUD
                                </span>
                                . Just pure
                                <span className="text-accent-secondary">
                                    {' '}
                                    meme magic
                                </span>{' '}
                                in every box!
                            </p>

                            <div className="mt-8 flex gap-6 justify-center">
                                <motion.a
                                    href="https://twitter.com/memebox_solana"
                                    target="_blank"
                                    whileHover={{ scale: 1.1 }}
                                    className="text-accent hover:text-accent-light"
                                >
                                    <FaTwitter size={24} />
                                </motion.a>
                                <motion.a
                                    href="https://t.me/giurgiur99"
                                    target="_blank"
                                    whileHover={{ scale: 1.1 }}
                                    className="text-accent hover:text-accent-light"
                                >
                                    <FaTelegram size={24} />
                                </motion.a>
                                <motion.a
                                    href="mailto:sol.meme.box@gmail.com"
                                    whileHover={{ scale: 1.1 }}
                                    className="text-accent hover:text-accent-light"
                                >
                                    <FaDiscord size={24} />
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-12 text-center"
                    >
                        <h2 className="text-2xl font-bold text-pink-500 mb-4">
                            Believe in something! 🦍
                        </h2>
                        <p className="text-gray-400">
                            Especially in memes, they never lie
                        </p>
                    </motion.div>
                </div>
            </BackgroundGradientAnimation>
        </div>
    )
}

export default About
