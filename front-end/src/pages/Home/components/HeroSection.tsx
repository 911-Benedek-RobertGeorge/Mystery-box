import React from 'react'

const HeroSection: React.FC = () => {
    return (
        <section className="bg-gray-900 text-white relative">
            <div className="container mx-auto px-6 py-12 flex flex-col items-center text-center">
                {/* Headline */}
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                    Unlock the Meme Coin Fortune!
                </h1>
                {/* Subheading */}
                <p className="text-lg md:text-xl text-gray-300 mb-6">
                    Buy mystery boxes, uncover meme treasures, and track your
                    ROI instantly.
                </p>
                {/* Call-to-action Buttons */}
                <div className="flex space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
                        Buy a Box
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
                        How It Works
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
                        View My Boxes
                    </button>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="animate-pulse w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 rounded-full absolute -top-12 -left-16"></div>
                    <div className="animate-pulse w-48 h-48 bg-gradient-to-r from-yellow-400 to-red-400 opacity-20 rounded-full absolute bottom-10 right-10"></div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
