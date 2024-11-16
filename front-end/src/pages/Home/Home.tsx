import React from 'react'
import { BackgroundGradientAnimation } from '../../components/ui/BackgroundGradientAnimation'
import SectionContainer from './components/SectionContainer'
import geometricVector from '../../assets/shapes/geometric-vector-shape.webp'

const Home: React.FC = () => {
    ///TODO https://ui.aceternity.com/components/wavy-background
    return (
        <div className="flex bg-black w-screen h-screen">
            <BackgroundGradientAnimation
                className="absolute bg-black w-screen h-screen justify-center  allign-center"
                gradientBackgroundStart="rgb(0, 0, 0)"
                gradientBackgroundEnd="rgb(19, 39, 40)"
            >
                <SectionContainer>
                    <div className="z-10 flex flex-col justify-center items-center w-full h-full">
                        <h1 className="text-white text-4xl">
                            Welcome to Solana NFT Mystery Boxes
                        </h1>
                        <p className="text-white"></p>
                    </div>
                </SectionContainer>{' '}
                <img
                    src={geometricVector}
                    className="z-50 animate-second"
                ></img>
            </BackgroundGradientAnimation>
        </div>
    )
}

export default Home
