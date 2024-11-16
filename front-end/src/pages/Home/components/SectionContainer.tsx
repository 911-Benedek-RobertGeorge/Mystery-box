import React from 'react'
import geometricVector from '../../../assets/shapes/geometric-vector-shape.webp'
interface SectionContainerProps {
    children: React.ReactNode
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children }) => {
    return (
        <div className="relative top-[20%] mx-auto rounded-3xl flex-row w-[90%] h-[70%] bg-background ">
            <div className="relative z-[100] top-0 left-0 w-full h-full bg-[#091515]/80 rounded-3xl shadow-2xl">
                {children}
            </div>
        </div>
    )
}

export default SectionContainer
