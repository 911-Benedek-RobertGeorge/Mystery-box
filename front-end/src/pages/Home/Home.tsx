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
import leafes from '../../assets/shapes/leafess.png'

import HistorySection from './components/HistorySection'
import BoxesSection from './components/BoxesSection'
import MyBoxesSection from './components/MyBoxesSection'
import { VITE_ENV_BACKEND_URL } from '../../libs/config'
import { scrollToSection } from '../../libs/utils'

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
                                <span className="bg-gradient-to-r from-accent via-accent-dark to-emerald-500 text-transparent bg-clip-text animate-gradient-x">
                                    {' '}
                                    box
                                </span>{' '}
                                so epic, it makes you manually picking memecoins
                                look{' '}
                                <span className="text-accent animate-pulse">
                                    {' '}
                                    boring
                                </span>
                                . Each memebox is packed with
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
                                <span className="text-2xl">🎲</span> Degen mode
                                ON? Each box is like a
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
                                    onClick={() =>
                                        scrollToSection('boxes-section')
                                    }
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
                <HistorySection />
            </div>
            {/* END WHAT ARE MEMEBOX SECTION */}
            {/* <img
                src={vectorShape}
                className="w-screen top-[23.5rem] rotate-12 md:rotate-6 h-[900px] absolute  animate-pulse"
                style={{ transformStyle: 'preserve-3d' }}
            ></img>{' '} */}
            {/* BOXES SECTIONS */}
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
                <BoxesSection />
            </div>{' '}
            {/* <div className="relative w-32 ">
                <img src={smile} />{' '}
            </div> */}
            <MyBoxesSection />
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
                    <div className="flex flex-col justify-center items-center w-full h-full  text-stone-300 ">
                        <div className=" absolute z-[1] flex flex-col  w-full h-full ">
                            {' '}
                            <img
                                src={leafes}
                                className="absolute h-[600px] left-0 -top-[300px]"
                            />{' '}
                            <img
                                src={leafes}
                                className="absolute rotate-90 -ml-8 h-[600px] left-0 -top-64 opacity-40"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center -top-[32] p-4">
                            <h2 className="text-4xl font-bold mb-16">
                                About Us
                            </h2>
                            <p className="text-lg text-center max-w-2xl mb-4">
                                Welcome to{' '}
                                <span className="text-accent font-bold">
                                    MemeBox
                                </span>
                                ! We are two passionate developers who met
                                during a Solana Foundation bootcamp. Inspired by
                                the power of blockchain and our love for memes,
                                we decided to create a platform that combines
                                both.
                            </p>
                            <p className="md:ml-96 text-lg text-center max-w-2xl mb-4">
                                Our{' '}
                                <span className="text-accent font-semibold">
                                    mission
                                </span>{' '}
                                is to bring joy and excitement to the crypto
                                community through our unique mystery boxes
                                filled with meme treasures. Join us on this
                                thrilling journey and discover the hidden gems
                                of the meme world!
                            </p>
                            <p className=" text-lg text-center max-w-2xl mb-4">
                                <span className="md:ml-96 text-accent-secondary font-semibold">
                                    Why MemeBox?
                                </span>{' '}
                                We believe in the power of memes to connect
                                people and create shared experiences. Our
                                mystery boxes are designed to surprise and
                                delight, offering a mix of common, rare, and
                                legendary meme coins.
                            </p>
                            <p className=" md:ml-96 text-lg text-center max-w-2xl mb-4">
                                <span className="text-purple-500  md:ml-80 font-semibold">
                                    Get Started
                                </span>{' '}
                                by purchasing a mystery box today and uncover
                                the treasures that await. Whether you're a
                                seasoned crypto enthusiast or new to the world
                                of blockchain, MemeBox has something for
                                everyone.
                            </p>
                        </div>
                    </div>
                </SectionContainer>
            </div>
        </div>
    )
}

export default Home
