import React from 'react'
import solanaImage from '../../../assets/elements/solana.png'
interface SectionContainerProps {
    children: React.ReactNode
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children }) => {
    return (
        <div className="relative p-4 md:p-12 mx-auto justify-center flex rounded-3xl flex-row h-full md:h-screen w-screen ">
            <img
                className="absolute bottom-32 -right-20 w-[25%] "
                src={solanaImage}
            />{' '}
            <div className="bg-background-dark w-full h-full rounded-3xl shadow-inner shadow-cyan-600">
                <div className=" relative z-[50] top-0 left-0 w-full h-full bg-neutral-900/80 rounded-3xl shadow-2xl">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SectionContainer
