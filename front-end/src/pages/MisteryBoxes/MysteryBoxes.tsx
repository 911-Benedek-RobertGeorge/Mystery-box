import React from 'react'
import HeroSection from '../Home/components/HeroSection'

const MysteryBoxes: React.FC = () => {
    const boxes = [
        {
            id: 1,
            title: 'Risky Box',
            description: 'High risk, high reward! For the bold.',
            color: 'bg-red-500',
            img: 'path/to/risky_box_image.png',
        },
        {
            id: 2,
            title: 'Medium Box',
            description: 'Balanced risk and reward. Play it safe.',
            color: 'bg-blue-500',
            img: 'path/to/medium_box_image.png',
        },
        {
            id: 3,
            title: 'Starter Box',
            description: 'Perfect for beginners! Safe and simple.',
            color: 'bg-green-500',
            img: 'path/to/starter_box_image.png',
        },
    ]

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <HeroSection />
            <h1 className="text-center text-4xl font-bold py-8">
                Choose Your Mystery Box
            </h1>
            <div className="flex justify-center items-center gap-8 px-4 flex-wrap">
                {boxes.map((box) => (
                    <div
                        key={box.id}
                        className={`relative flex flex-col items-center w-72 h-96 p-4 ${box.color} rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105`}
                    >
                        {/* Box Image */}
                        <div className="w-full h-48 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                            <img
                                src={box.img}
                                alt={box.title}
                                className="w-3/4 h-auto"
                            />
                        </div>
                        {/* Box Title */}
                        <h2 className="text-2xl font-semibold mt-4">
                            {box.title}
                        </h2>
                        {/* Box Description */}
                        <p className="text-center text-gray-300 mt-2">
                            {box.description}
                        </p>
                        {/* Button */}
                        <button className="mt-auto bg-white text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-gray-100">
                            Open {box.title}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MysteryBoxes
