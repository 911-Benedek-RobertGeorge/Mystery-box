import React from 'react'
import Navbar from '../../components/Layout/Navbar'

const About: React.FC = () => {
    return (
        <div className="flex flex-col w-screen max-w-screen select-none bg-background-dark overflow-hidden">
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold text-white">About Us</h1>
                <p className="mt-4 text-lg text-gray-300 text-center max-w-2xl">
                    Welcome to our platform! We are dedicated to bringing you
                    the best meme-based experiences. Our team works tirelessly
                    to ensure you have access to the latest and greatest in meme
                    culture. Join us on this exciting journey and uncover the
                    treasures hidden within our mystery boxes.
                </p>
            </div>
        </div>
    )
}

export default About
