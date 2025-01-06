import React, { useEffect, useRef, useState } from 'react'
import { BackgroundGradientAnimation } from '../../components/ui/BackgroundGradientAnimation'
import SectionContainer from './components/SectionContainer'
import { motion } from 'framer-motion'
import prism from '../../assets/shapes/prism.png'
import simpleBox from '../../assets/elements/simple_box.png'
import stand from '../../assets/shapes/stand.png'
import questionMark from '../../assets/elements/question_mark.png'
import boom from '../../assets/coins/boom.png'
import mow from '../../assets/coins/mow.png'
import pnut from '../../assets/coins/pnut.png'
import popcat from '../../assets/coins/popcat.png'
import wif from '../../assets/coins/wif.png'

import key from '../../assets/boxes/key.png'
import chillGuy from '../../assets/coins/chill-guy.png'
import bonk from '../../assets/coins/bonk.png'

import fluidTape from '../../assets/elements/fluid_tape.png'
import waveTape from '../../assets/shapes/wave_tape.png'

import MemeImagesFloating from './components/MemeImagesFloating'
import { MemeImage, Token } from '../../libs/interfaces'

import ribbons from '../../assets/shapes/ribbons.png'

import BoxesSection from './components/BoxesSection'
import MyBoxesSection from './components/MyBoxesSection'
import { VITE_ENV_BACKEND_URL } from '../../libs/config'
import { scrollToSection } from '../../libs/utils'
import vectorShape from '../../assets/elements/vector-shape.png'
import WhatAreWeSection from './components/WhatAreWeSection'

const memeCoinImages = [chillGuy, bonk, boom, mow, pnut, popcat, wif]

const Home: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [memesImage, setMemesImage] = useState<MemeImage[]>()
    const [hasPendingTransaction, setHasPendingTransaction] = useState(false)

    useEffect(() => {
        let memeImages = memeCoinImages.map((meme) => {
            return {
                src: meme,
                top: `${Math.random() * 50 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
            }
        })
        const fetchMemeImages = async () => {
            try {
                const response = await fetch(`${VITE_ENV_BACKEND_URL}/tokens`)
                const data = await response.json()

                memeImages = [
                    ...memeImages,
                    ...data.map((meme: Token) => ({
                        src: meme?.image ?? '',
                        top: `${Math.random() * 50 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                        name: meme.name,
                    })),
                ]

                setMemesImage(memeImages)
            } catch (error) {
                console.error('Error fetching tokens:', error)
            }
        }

        fetchMemeImages()

        setMemesImage(memeImages)
    }, [])

    // make the memecoins float while moving the mouse
    useEffect(() => {
        const container = containerRef.current

        if (!container) return

        const handleMouseMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 20
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * 20

            const objects =
                container.querySelectorAll<HTMLImageElement>('.floating-object')

            objects.forEach((obj, index) => {
                const intensity = (index + 1) * 0.5 // Adjust movement for each object
                obj.style.transform = `rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translate(${x * intensity}px, ${-y * intensity}px)`
                obj.style.transitionDuration = '2s'
            })
        }

        const handleMouseLeave = () => {
            const objects =
                container.querySelectorAll<HTMLImageElement>('.floating-object')
            objects.forEach((obj) => {
                obj.style.transform =
                    'rotateY(0deg) rotateX(0deg) translate(0, 0)'
            })
        }

        container.addEventListener('mousemove', handleMouseMove)
        container.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            container.removeEventListener('mousemove', handleMouseMove)
            container.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className="flex flex-col relative w-screen max-w-screen select-none bg-background-dark overflow-hidden">
            <BackgroundGradientAnimation
                className="justify-center allign-center h-full!"
                gradientBackgroundStart="rgb(0, 0, 0)"
                gradientBackgroundEnd="rgb(19, 39, 40)"
                size="100%"
            >
                <SectionContainer key={1}>
                    <div
                        ref={containerRef}
                        className="z-10  flex flex-col justify-center items-center w-full h-full "
                    >
                        <div className="opacity-0 md:opacity-100 w-full left-0 text-center">
                            <div className=" text-2xl md:text-6xl w-full flex flex-col">
                                <div className="z-[41] left-[10%] blur-lg w-1/5 h-20 bg-neutral-900    absolute"></div>
                                <h1 className="z-[103] md:-ml-[60%] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-emerald-500 animate-glossy ">
                                    Fancy some
                                </h1>{' '}
                                <div className="z-[41] left-[18%] blur-xl w-1/4 h-20 top-40 bg-neutral-900    absolute"></div>
                                <h1 className="z-[103] md:-ml-[40%] leading-tight text-transparent bg-clip-text bg-gradient-to-r  from-accent via-accent-dark to-emerald-500 animate-glossy ">
                                    memes fortunes
                                </h1>{' '}
                            </div>
                            `
                        </div>
                        ` <MemeImagesFloating memesImage={memesImage ?? []} />
                        <div className=" scale-75 md:scale-90 md:-top-24 relative z-[102] flex flex-col justify-center items-center">
                            <img
                                src={questionMark}
                                className="w-[250px] z-[50] absolute -top-48 floating-object transition-transform duration-200 ease-out "
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>{' '}
                            <div className=" bg-transparent absolute top-24 left-1/2 transform -translate-x-1/2 w-32 h-32 md:w-60 md:h-64 rounded-3xl shadow-cone"></div>
                            <img
                                src={simpleBox}
                                className="w-[450px]  z-[40] hover:scale-110 transition-transform duration-[3000ms] ease-out"
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>{' '}
                            <img
                                src={stand}
                                className="scale-[1] absolute top-24 z-[30]"
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>
                            <img
                                src={wif}
                                className=" scale-[0.5] absolute top-[22rem] left-12 z-[30]  rotate-45  "
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>{' '}
                            <img
                                src={boom}
                                className="scale-[0.5] absolute top-[19rem] left-64 z-[30] -rotate-12  "
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>{' '}
                            <img
                                src={mow}
                                className=" w-24 absolute top-96 -left-16 z-[30] rotate-12"
                            ></img>{' '}
                            <img
                                src={stand}
                                className="scale-[1.2] absolute top-40 z-[20]"
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>
                            <img
                                src={stand}
                                className="scale-[1.5] absolute top-60 z-[10]"
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>{' '}
                            <img
                                src={prism}
                                className="scale-[0.3] absolute top-72 left-64 z-[10] rotate-12 "
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>
                        </div>{' '}
                    </div>
                </SectionContainer>
            </BackgroundGradientAnimation>
            {/* WHAT ARE MEMEBOXES SECTION */}
            <WhatAreWeSection hasPendingTransaction={hasPendingTransaction} />
            <img
                src={vectorShape}
                className="w-screen top-[23.5rem] rotate-12 md:rotate-6 h-[900px] absolute  animate-pulse"
                style={{ transformStyle: 'preserve-3d' }}
            ></img>{' '}
            <div
                id="boxes-section"
                className="relative flex flex-col justify-center items-center w-full"
            >
                <div
                    className="absolute -rotate-12 w-96 z-[2]"
                    style={{
                        transform: `translateX(${Math.min(-700 + scrollPosition, 300)}px) translateY(${Math.min(-700 + scrollPosition / 2.5, -290)}px)`,
                        filter: `hue-rotate(${Math.max(-80, 10 - scrollPosition / 10)}deg)`,
                        transition:
                            'transform 0.2s ease-out, filter 0.2s ease-out',
                    }}
                >
                    <img src={fluidTape} alt="Fluid Tape" />
                </div>

                <motion.div
                    className="absolute w-80"
                    initial={{
                        x: 1300,
                        y: -1200,
                        rotate: 120,
                        filter: 'hue-rotate(200deg)',
                    }}
                    animate={{
                        x: Math.max(1300 - scrollPosition, scrollPosition / 3),
                        y: Math.min(-1200 + scrollPosition),
                        rotate: Math.min(0, 100 - scrollPosition / 10),
                        filter: `hue-rotate(${Math.min(0, 200 - scrollPosition / 3.3)}deg)`,
                    }}
                    transition={{ ease: 'easeOut', duration: 0.2 }}
                >
                    <img src={waveTape} alt="Fluid Tape" />
                </motion.div>
                <BoxesSection
                    setHasPendingTransaction={setHasPendingTransaction}
                />
            </div>{' '}
            {/* <div className="relative w-32 ">
                <img src={smile} />{' '}
            </div> */}
            <MyBoxesSection
                hasPendingTransaction={hasPendingTransaction}
                setHasPendingTransaction={setHasPendingTransaction}
            />
            <div className="flex flex-col w-screen h-full">
                <div className="flex flex-col -mt-96 relative justify-center items-center w-full md:w-1/2 h-96  ml-auto text-white p-8">
                    <div className="absolute inset-0 w-full h-screen z-0   ">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark to-accent-dark opacity-30 blur-3xl"></div>
                        <div className="absolute inset-0 opacity-40  top-96">
                            <img
                                className="z-[51] -hue-rotate-90 transition-all duration-1000  ease-out"
                                src={ribbons}
                                style={{
                                    transform: `translateY(${-1300 + scrollPosition * 0.42}px)`,
                                    rotate: `${200 - scrollPosition * 0.2}deg`,
                                }}
                            />
                        </div>{' '}
                        <img
                            className=" z-[50] absolut transition-all duration-1000 ease-out "
                            src={key}
                            style={{
                                transform: `translateX(${Math.max(0, -2650 + scrollPosition)}px) translateY(${-2050 + scrollPosition}px) `, //translateX(${((-1 * (scrollPosition  / 5) % 2) * scrollPosition) % 1200}px)
                            }}
                        />
                    </div>
                </div>
                <SectionContainer key={2}>
                    <div className="relative flex flex-col justify-center items-center w-full min-h-[80vh] text-white z-[51]">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark to-accent-dark opacity-30 blur-3xl"></div>

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
                                            . Instead of touching grass 🌱, we
                                            decided to build something
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
                                    className="space-y-4 md:space-y-8 mb-4"
                                >
                                    <div className="bg-background-light bg-opacity-75 p-6 rounded-lg shadow-lg border border-accent/20">
                                        <h3 className="text-2xl font-bold text-purple-500 mb-4">
                                            Why Trust Us? 🤝
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            We made sure to have every purchase
                                            and claim
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
                                            Stop scrolling X and telegram groups
                                            for signals. Let the gems 💎 come to
                                            you! Each
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
                                            className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-accent via-accent-dark to-emerald-500 text-white font-bold transition-all hover:shadow-lg hover:shadow-accent/50"
                                        >
                                            Buy a memebox 🚀
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </SectionContainer>{' '}
            </div>
        </div>
    )
}

export default Home
