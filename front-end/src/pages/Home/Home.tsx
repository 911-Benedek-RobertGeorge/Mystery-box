import React, { useEffect, useRef, useState } from 'react'
import { BackgroundGradientAnimation } from '../../components/ui/BackgroundGradientAnimation'
import SectionContainer from './components/SectionContainer'
import { motion } from 'framer-motion'


import fluidTape from '../../assets/elements/fluid_tape.png'
import waveTape from '../../assets/shapes/wave_tape.png'

import MemeImagesFloating from './components/MemeImagesFloating'
import { MemeImage, Token } from '../../libs/interfaces'

import ribbons from '../../assets/shapes/ribbons.png'

import BoxesSection from './components/BoxesSection'
import MyBoxesSection from './components/MyBoxesSection'
import { VITE_ENV_BACKEND_URL } from '../../libs/config'
import vectorShape from '../../assets/elements/vector-shape.png'
import WhatAreWeSection from './components/WhatAreWeSection'
import AboutUsSection from './components/AboutUsSection'
import FAQ from '../FAQ/FAQ'
import HeroSectionBox from './components/HeroSectionBox'

 
const Home: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [memesImage, setMemesImage] = useState<MemeImage[]>()
    const [hasPendingTransaction, setHasPendingTransaction] = useState(false)


    useEffect(() => {
 
        const fetchMemeImages = async () => {
            try {
                const response = await fetch(`${VITE_ENV_BACKEND_URL}/tokens`)
                const data = await response.json()

                const memeImages = [
                     ...data.map((meme: Token) => ({
                        src: meme?.image ?? '',
                        top: `${Math.random() * 50 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                        name: meme.name,
                    })),
                ]

                setMemesImage(memeImages.reverse().slice(0, 15))
            } catch (error) {
                console.error('Error fetching tokens:', error)
            }
        }

        fetchMemeImages()

       
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
                const intensity = (index + 1) * 0.2 // Adjust movement for each object
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

    // useEffect(() => {
    //     const handleScroll = () => {
    //         setScrollPosition(window.scrollY)
    //     }

    //     window.addEventListener('scroll', handleScroll)

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll)
    //     }
    // }, [])

    return (
        <div className="flex flex-col relative w-screen max-w-screen select-none bg-background-dark overflow-hidden">
            <BackgroundGradientAnimation
                className="justify-center allign-center h-screen"
                gradientBackgroundStart="rgb(0, 0, 0)"
                gradientBackgroundEnd="rgb(19, 39, 40)"
                size="50%"
            >
                <SectionContainer key={1}>
                    <div
                        ref={containerRef}
                        className="z-10  flex flex-col justify-center items-center w-full h-full "
                    >
                        <div className="opacity-0 md:opacity-100 w-full left-0 text-center">
                            <div className=" text-2xl md:text-6xl w-full flex flex-col">
                                <div className="z-[41] left-[10%] blur-lg w-1/5 h-20 bg-neutral-900  absolute"></div>
                                <h1 className="z-[103] md:-ml-[60%] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-emerald-500 animate-glossy ">
                                    Fancy some
                                </h1>{' '}
                                <div className="z-[41] left-[18%] blur-xl w-1/4 h-20 top-40 bg-neutral-900    absolute"></div>
                                <h1 className="z-[103] md:-ml-[40%] leading-tight text-transparent bg-clip-text bg-gradient-to-r  from-accent via-accent-dark to-emerald-500 animate-glossy ">
                                    memes fortunes
                                </h1>{' '}
                            </div>
                        </div>
                        <MemeImagesFloating memesImage={memesImage ?? []} />
                        <HeroSectionBox /> 
                    </div>
                </SectionContainer>
            </BackgroundGradientAnimation>
            <WhatAreWeSection hasPendingTransaction={hasPendingTransaction} />
            <img
                src={vectorShape}
                className="w-screen top-[15.5rem] rotate-12 md:rotate-6 h-[900px] absolute "
                 loading="eager"
            ></img> 
            <div
                id="boxes-section"
                className="relative flex flex-col justify-center items-center w-full"
            >
                {/* <div className="relative ">
                    <div
                        className="absolute -rotate-12 w-96 z-[2]"
                        style={{
                            transform: `translateX(${Math.min(-1500 + scrollPosition / 1.5, 100)}px) translateY(${Math.min(-1200 + scrollPosition / 2, 0)}px)`,
                            filter: `hue-rotate(${Math.max(-80, 10 - scrollPosition / 10)}deg)`,
                            transition:
                                'transform 0.2s ease-out, filter 0.2s ease-out',
                        }}
                    >
                        <img src={fluidTape} alt="Fluid Tape" loading="lazy" />
                    </div>
                    <motion.div
                        className="absolute w-80 z-[50]"
                        initial={{
                            x: 0,
                            y: 0,
                            rotate: 120,
                            filter: 'hue-rotate(200deg)',
                        }}
                        animate={{
                            x: Math.max(
                                2500 - scrollPosition,
                                scrollPosition / 8
                            ),
                            y: Math.min(-1500 + scrollPosition / 1.4),
                            rotate: Math.min(0, 200 - scrollPosition / 10),
                            filter: `hue-rotate(${Math.min(0, 200 - scrollPosition / 3.3)}deg)`,
                        }}
                        transition={{ ease: 'easeOut', duration: 0.2 }}
                    >
                        <img src={waveTape} alt="Fluid Tape" loading="lazy" />
                    </motion.div>
                </div> */}
                <BoxesSection
                    setHasPendingTransaction={setHasPendingTransaction}
                />{' '}
            </div>{' '}
            <MyBoxesSection
                hasPendingTransaction={hasPendingTransaction}
                setHasPendingTransaction={setHasPendingTransaction}
            />
            {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark to-accent-dark opacity-30 blur-3xl"></div> */}
            <div className="relative  ">
                {' '}
                <img
                    className=" absolute z-[1] -left-24 -top-32  rotate-12 -hue-rotate-90 w-96 h-96 hidden md:block"
                    src={ribbons}
                    loading="lazy"
                />
            </div>
         
            {/* <img
                className=" z-[50] absolut transition-all duration-1000 ease-out "
                src={key}
                style={{
                    transform: `translateX(${Math.max(0, -1200 + scrollPosition)}px) translateY(${-2050 + scrollPosition}px) `, //translateX(${((-1 * (scrollPosition  / 5) % 2) * scrollPosition) % 1200}px)
                }}
            /> */}
            <FAQ />
            <AboutUsSection />
            
        </div>
    )
}

export default Home
