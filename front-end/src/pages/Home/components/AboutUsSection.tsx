import React from 'react'
import { motion } from 'framer-motion'
import SectionContainer from './SectionContainer'

const AboutUsSection: React.FC = () => {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <SectionContainer key={2}>
            <div className="relative flex flex-col justify-center items-center w-full min-h-[80vh] text-white z-[51]">
                {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark to-accent-dark opacity-30 blur-3xl"></div> */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col justify-center items-center max-w-6xl px-4 md:px-8 z-10"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 mt-4 text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-emerald-500 pb-4">
                        About Us
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                            }}
                            viewport={{ once: true }}
                            className="space-y-4 md:space-y-8"
                        >
                            <div className="bg-background-light bg-opacity-75 p-6 rounded-lg shadow-lg border border-accent/20">
                                <h3 className="text-2xl font-bold text-accent mb-4">
                                    The Origin Story 🚀
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Just two{' '}
                                    <span className="text-accent">
                                        degen devs
                                    </span>{' '}
                                    who met at a
                                    <span className="text-accent-secondary">
                                        {' '}
                                        Solana bootcamp
                                    </span>
                                    . Instead of touching grass 🌱, we decided
                                    to build something
                                    <span className="text-purple-500">
                                        {' '}
                                        absolutely memeable 🦦
                                    </span>
                                    .
                                </p>
                                <div className="flex flex-wrap gap-4 mt-4">
                                    <a
                                        href="https://x.com/memebox_solana"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-accent hover:text-accent-light transition-colors"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="w-5 h-5 mr-2"
                                            fill="currentColor"
                                        >
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                        Follow us on X
                                    </a>
                                    <a
                                        href="https://t.me/giurgiur99"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-accent hover:text-accent-light transition-colors"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="w-5 h-5 mr-2"
                                            fill="currentColor"
                                        >
                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.054-.308-.346-.11l-6.4 4.03-2.753-.916c-.597-.187-.608-.597.126-.885l10.733-4.14c.505-.187.96.118.32 1.355z" />
                                        </svg>
                                        Dm us for collaborations
                                    </a>

                                    <a
                                        href="mailto:sol.meme.box@gmail.com"
                                        className="inline-flex items-center text-accent hover:text-accent-light transition-colors"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="w-5 h-5 mr-2"
                                            fill="currentColor"
                                        >
                                            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                                        </svg>
                                        Email us
                                    </a>
                                </div>
                            </div>

                            <div className="bg-background-light bg-opacity-75 p-6 rounded-lg shadow-lg border border-accent/20">
                                <h3 className="text-2xl font-bold text-accent-secondary mb-4">
                                    The Mission 🎯
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Take you back in time and add some{' '}
                                    <span className="text-pink-400">
                                        glitter
                                    </span>{' '}
                                    to your missed memes! No more{' '}
                                    <span className="text-red-400 line-through">
                                        {' '}
                                        FOMO
                                    </span>{' '}
                                    or{' '}
                                    <span className="text-red-400 line-through">
                                        FUD
                                    </span>
                                    . Just pure
                                    <span className="text-accent-secondary">
                                        {' '}
                                        meme magic
                                    </span>{' '}
                                    in every box and instant gains! 🔑
                                </p>
                                <h1 className="text-2xl font-bold text-pink-500 text-center pt-4">
                                    Belive in something!
                                </h1>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="space-y-4 md:space-y-8 mb-4"
                        >
                            <div className="bg-background-light bg-opacity-75 p-6 rounded-lg shadow-lg border border-accent/20">
                                <h3 className="text-2xl font-bold text-purple-500 mb-4">
                                    Why Trust Us? 🤝
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    We made sure to have every purchase and
                                    claim
                                    <span className="text-accent">
                                        {' '}
                                        transparent and trackable.
                                    </span>{' '}
                                    If you don't purchase the boxes,
                                    <span className="text-accent">
                                        {' '}
                                        Our intern will buy some 👁️👄👁️.
                                    </span>
                                </p>
                            </div>

                            <div className="bg-background-light bg-opacity-75 p-6 rounded-lg shadow-lg border border-accent/20">
                                <h3 className="text-2xl font-bold text-emerald-500 mb-4">
                                    Ready to Join? 🦍
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Stop scrolling X and telegram groups for
                                    signals. Let the gems 💎 come to you! Each
                                    <span className="text-accent">
                                        {' '}
                                        MemeBox
                                    </span>{' '}
                                    is packed with pure
                                    <span className="text-emerald-500">
                                        {' '}
                                        meme gold
                                    </span>
                                    .
                                </p>
                                <div className="mx-auto md:mx-0 w-full flex justify-center md:justify-start">
                                    <motion.button
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow:
                                                '0 0 20px rgba(0, 255, 255, 0.5)',
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() =>
                                            scrollToSection('boxes-section')
                                        }
                                        className=" mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-accent via-accent-dark to-emerald-500 text-white font-bold transition-all hover:shadow-lg hover:shadow-accent/50"
                                    >
                                        Buy a memebox 🚀
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </SectionContainer>
    )
}

export default AboutUsSection
