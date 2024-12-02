import React, { useEffect, useRef } from 'react'
import { BackgroundGradientAnimation } from '../../components/ui/BackgroundGradientAnimation'
import SectionContainer from './components/SectionContainer'
import geometricVector from '../../assets/shapes/geometric-vector-shape.webp'
import Navbar from '../../components/Layout/Navbar'
import waterDrop from '../../assets/shapes/drop.png'
import prism from '../../assets/shapes/prism.png'
import vectorShape from '../../assets/shapes/vector-shape.png'
import simpleBox from '../../assets/elements/logo1.png'
import stand from '../../assets/shapes/stand.png'
import questionMark from '../../assets/elements/question_mark.png'
import dogeCoin from '../../assets/coins/doge.png'
import key from '../../assets/boxes/key.png'
import chillGuy from '../../assets/coins/chill-guy.png'
import bonk from '../../assets/coins/bonk.png'
import cyanBox from '../../assets/boxes/cyan_box-Photoroom.png'
import heartImage from '../../assets/elements/heart.png'
import fluidTape from '../../assets/elements/fluid-tape.jpg'
const Home: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)

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

    ///TODO https://ui.aceternity.com/components/wavy-background
    ///TODO ADD MEMES AND SET DURATION BIGGER
    return (
        <div className="flex flex-col  w-screen  select-none bg-background-dark ">
            <BackgroundGradientAnimation
                className="justify-center allign-center h-full!"
                gradientBackgroundStart="rgb(0, 0, 0)"
                gradientBackgroundEnd="rgb(19, 39, 40)"
                size="80%"
            >
                <SectionContainer>
                    <div
                        ref={containerRef}
                        className="z-10 scale-75 md:scale-100 flex flex-col justify-center items-center w-full h-[90%] "
                    >
                        <div className="w-full left-0  text-center">
                            <div className=" text-3xl md:text-6xl w-full flex flex-col">
                                <h1 className="md:-ml-[60%] leading-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-accent-secondary animate-glossy ">
                                    Fancy some
                                </h1>{' '}
                                <h1 className="md:-ml-[40%] leading-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-accent-secondary animate-glossy ">
                                    memes fortunes
                                </h1>{' '}
                            </div>
                        </div>
                        <div className="z-[102] ">
                            {' '}
                            <img
                                key={4}
                                src={key}
                                className="floating-object w-32 h-32 z-[40] top-64 absolute transition-transform duration-200 ease-out"
                                style={{
                                    top: `${Math.random() * 80 + 10}%`,
                                    left: `${Math.random() * 80 + 10}%`,
                                }}
                            />{' '}
                            <img
                                key={1}
                                src={dogeCoin}
                                className="floating-object w-32 h-32 z-[40] top-64 absolute transition-transform duration-200 ease-out"
                                style={{
                                    top: `${Math.random() * 80 + 10}%`,
                                    left: `${Math.random() * 80 + 10}%`,
                                }}
                            />
                            <img
                                key={2}
                                src={bonk}
                                className="floating-object w-32 h-32 z-[40] absolute transition-transform duration-200 ease-out"
                                style={{
                                    top: `${Math.random() * 33 + 10}%`,
                                    left: `${Math.random() * 33 + 10}%`,
                                }}
                            />{' '}
                            <img
                                key={2}
                                src={chillGuy}
                                className="floating-object left-128 w-32 h-32 z-[30] absolute transition-transform duration-200 ease-out"
                                style={{
                                    top: `${Math.random() * 40 + 10}%`,
                                    left: `${Math.random() * 22 + 10}%`,
                                }}
                            />
                        </div>
                        <div className="relative z-[102] flex flex-col justify-center items-center">
                            <img
                                src={questionMark}
                                className="w-[250px] z-[50] absolute -top-48 floating-object transition-transform duration-200 ease-out "
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>{' '}
                            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-32 h-32 md:w-60 md:h-64 rounded-3xl shadow-cone"></div>
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
                                src={dogeCoin}
                                className="scale-[0.3] absolute top-64 left-12 z-[30] -rotate-12  "
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>{' '}
                            <img
                                src={dogeCoin}
                                className="scale-[0.3] absolute top-80 -left-32 z-[30] rotate-45"
                                style={{ transformStyle: 'preserve-3d' }}
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
                        <div className="w-full md:-ml-[50%] -mt-52 text-center">
                            <div className=" text-xl md:text-3xl w-full flex flex-col">
                                <h3 className="md:ml-64    leading-tight font-extrabold  text-cyan-400 ">
                                    Buy MeMestery boxes
                                </h3>
                                <h1 className=" mt-6 ml-48 leading-tight font-extrabold text-accent-light ">
                                    Uncover treasures
                                </h1>{' '}
                                <h1 className=" mt-8 ml-32 leading-tight font-extrabold text-[#FB83EB] ">
                                    Track your ROI
                                </h1>{' '}
                            </div>
                        </div>
                    </div>
                </SectionContainer>
            </BackgroundGradientAnimation>
            <img
                src={vectorShape}
                className="w-screen top-[29rem] rotate-6 h-[900px] absolute z-[50]  "
                style={{ transformStyle: 'preserve-3d' }}
            ></img>{' '}
            <div className="flex flex-col justify-center items-center w-full">
                <div>
                    <h1 className="text-4xl font-extrabold text-center  ">
                        Available MeMestery Boxes
                    </h1>
                    <p className="text-center text-gray-300">
                        Select a box to reveal your meme fortune!
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                    <div className="-ml-[50%] z-[100]">
                        <img
                            src={cyanBox}
                            className="w-96"
                            style={{ transformStyle: 'preserve-3d' }}
                        ></img>
                        <div className="flex flex-col justify-center items-start ml-8">
                            <h2 className="text-2xl font-bold text-accent">
                                Adventurer Level
                            </h2>
                            <p className="text-lg text-gray-300">
                                Intermediate
                            </p>
                            <h2 className="text-2xl font-bold text-accent mt-4">
                                Well Known Memecoins
                            </h2>
                            <ul className="list-disc list-inside text-lg text-gray-300">
                                <li>DogeCoin</li>
                                <li>Shiba Inu</li>
                                <li>PepeCoin</li>
                            </ul>
                        </div>
                    </div>
                    <div className="absolute  w-96">
                        <img src={fluidTape} />
                    </div>
                    <div className="-mt-64 ml-[50%] z-[100]">
                        <img
                            src={cyanBox}
                            className="w-96"
                            style={{ transformStyle: 'preserve-3d' }}
                        />
                        <div className="flex flex-col justify-center items-start ml-8">
                            <h2 className="text-2xl font-bold text-accent">
                                Degen Level
                            </h2>
                            <p className="text-lg text-gray-300">
                                Absolute Madlad
                            </p>
                            <h2 className="text-2xl font-bold text-accent mt-4">
                                Pump for fun coins
                            </h2>
                            <ul className="list-disc list-inside text-lg text-gray-300">
                                <li>Mad</li>
                                <li>Shiba Inu</li>
                                <li>PepeCoin</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
