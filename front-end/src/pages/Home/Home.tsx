import React, { useEffect, useRef } from 'react'
import { BackgroundGradientAnimation } from '../../components/ui/BackgroundGradientAnimation'
import SectionContainer from './components/SectionContainer'
import geometricVector from '../../assets/shapes/geometric-vector-shape.webp'
import Navbar from '../../components/Layout/Navbar'
import waterDrop from '../../assets/shapes/drop.png'
import prism from '../../assets/shapes/prism.png'
import vectorShape from '../../assets/shapes/vector-shape.png'
import logo from '../../assets/elements/logo.png'
import stand from '../../assets/shapes/stand.png'
import questionMark from '../../assets/elements/question_mark.png'
import dogeCoin from '../../assets/coins/doge.png'
import key from '../../assets/boxes/key.png'

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
                const intensity = (index + 1) * 0.3 // Adjust movement for each object
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
    return (
        <div className="flex bg-stone-800 w-screen h-screen select-none">
            <BackgroundGradientAnimation
                className="absolute bg-black w-screen h-screen justify-center  allign-center"
                gradientBackgroundEnd="rgb(0, 0, 0)"
                gradientBackgroundStart="rgb(19, 39, 40)"
                size="80%"
            >
                <SectionContainer>
                    {' '}
                    <div
                        ref={containerRef}
                        className="z-10 flex flex-col justify-center   items-center w-full h-full "
                    >
                        <p className="text-white"></p>

                        <div className="relative z-[102] flex flex-col justify-center items-center ">
                            <img
                                src={questionMark}
                                className="w-[250px] z-[50] absolute -top-48 floating-object transition-transform duration-200 ease-out "
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>
                            <img
                                src={logo}
                                className="w-[450px]  z-[40] glowing-shadow"
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>
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
                                key={1}
                                src={dogeCoin}
                                className="floating-object w-64 h-64 z-[30] absolute transition-transform duration-200 ease-out"
                                style={{
                                    top: `${Math.random() * 80 + 10}%`,
                                    left: `${Math.random() * 80 + 10}%`,
                                }}
                            />
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
                        </div>
                    </div>
                </SectionContainer>
            </BackgroundGradientAnimation>
        </div>
    )
}

export default Home
