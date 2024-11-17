import React from 'react'
import { BackgroundGradientAnimation } from '../../components/ui/BackgroundGradientAnimation'
import SectionContainer from './components/SectionContainer'
import geometricVector from '../../assets/shapes/geometric-vector-shape.webp'
import Navbar from '../../components/Layout/Navbar'
import waterDrop from '../../assets/shapes/drop.png'
import prism from '../../assets/shapes/prism.png'
import vectorShape from '../../assets/shapes/vector-shape.png'

const Home: React.FC = () => {
    ///TODO https://ui.aceternity.com/components/wavy-background
    return (
        <div className="flex bg-black w-screen h-screen">
            <BackgroundGradientAnimation
                className="absolute bg-black w-screen h-screen justify-center  allign-center"
                gradientBackgroundEnd="rgb(0, 0, 0)"
                gradientBackgroundStart="rgb(19, 39, 40)"
                size="100%"
            >
                <SectionContainer>
                    {' '}
                    <div className="z-10 flex flex-col justify-center items-center w-full h-full">
                        <h1 className="text-white text-4xl">
                            Welcome to Solana NFT Mystery Boxes
                        </h1>
                        <p className="text-white"></p>
                        <img
                            src={prism}
                            className="w-32 h-32 -left-10"
                            style={{ transformStyle: 'preserve-3d' }}
                        ></img>
                    </div>
                </SectionContainer>{' '}
            </BackgroundGradientAnimation>
        </div>
    )
}

export default Home
