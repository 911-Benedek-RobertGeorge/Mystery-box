import React from 'react'
import waterDrop from '../../../assets/shapes/drop.png'
import vectorShape from '../../../assets/shapes/vector-shape.png'
interface SectionContainerProps {
    children: React.ReactNode
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children }) => {
    return (
        <div className="relative top-10 mx-auto justify-center flex rounded-3xl flex-row w-[96%]  h-[92%] bg-background  ">
            {/* <img
                className="absolute rotate-45  left-0 -top-64 w-[40%]"
                src={waterDrop}
            /> */}
            <img
                src={vectorShape}
                className="top-[52%] w-screen rotate-6 h-[850px] scale-125 absolute z-[]  "
                style={{ transformStyle: 'preserve-3d' }}
            ></img>
            <div className="relative z-[100] top-0 left-0 w-full h-full bg-neutral-950/80 rounded-3xl shadow-2xl">
                {children}
            </div>
        </div>
    )
}

export default SectionContainer
