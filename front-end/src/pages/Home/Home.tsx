import React from 'react'
import { BackgroundGradientAnimation } from '../../components/ui/BackgroundGradientAnimation'

const Home: React.FC = () => {
    ///TODO https://ui.aceternity.com/components/wavy-background
    return (
        <div className="flex bg-black w-screen h-screen">
            <BackgroundGradientAnimation />
        </div>
    )
}

export default Home
