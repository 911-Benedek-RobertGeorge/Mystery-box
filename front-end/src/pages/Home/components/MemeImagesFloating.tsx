import React from 'react'
import { MemeImage } from '../../../libs/interfaces'

interface MemeImagesFloatingProps {
    memesImage: MemeImage[]
}

const MemeImagesFloating: React.FC<MemeImagesFloatingProps> = ({
    memesImage,
}) => {
    return (
        <div className=" ">
            {memesImage?.map(({ src, top, left }, index) => {
                return (
                    <img
                        key={index}
                        src={src}
                        className="floating-object rounded-full w-12 h-12 md:w-16 md:h-16 z-[40] top-64 absolute transition-transform duration-600 ease-out"
                        style={{
                            top: top,
                            left: left,
                        }}
                    />
                )
            })}
        </div>
    )
}

export default MemeImagesFloating
