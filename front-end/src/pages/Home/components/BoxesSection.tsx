import React, { useState } from 'react'
import { BoxType } from '../../../libs/interfaces'
import { useSelector } from 'react-redux'
import cyanBox from '../../../assets/boxes/cyan_box-Photoroom.png'
import chillguy from '../../../assets/coins/chill-guy.png'
import { BuyModal } from './modal/BuyModal'

const BoxesSection: React.FC = () => {
    const boxTypes: BoxType[] = useSelector(
        (state: { box: { types: BoxType[] } }) => state.box.types
    )

    return (
        <div className=" relative  flex flex-col justify-center items-center w-full space-y-32 md:space-y-0">
            {boxTypes?.map((box) => <BoxDetails box={box} />)}
            <div className="relative md:-top-[400px] md:ml-[50%] ">
                <img
                    src={cyanBox}
                    className="w-96 -hue-rotate-60 "
                    style={{
                        transformStyle: 'preserve-3d',
                        // filter: `hue-rotate(${Math.min(-80, Math.max(200 - scrollPosition / 3.3, -250))}deg)`,
                    }}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-[#3ae9af] to-[#26b321] opacity-20 blur-2xl"></div>

                <div className="z-[110] flex flex-col justify-center items-start ml-8 mt-4 text-gray-300">
                    <h2 className="text-2xl font-bold text-green-500">
                        Legendary Level
                    </h2>
                    <p className="text-lg  ">The Ultimate Meme Connoisseur</p>
                    <h2 className="text-2xl font-bold text-green-500 mt-4">
                        Epic Meme Treasures
                    </h2>
                    <ul className="list-disc list-inside text-lg ">
                        <li>Rare Pepe</li>
                        <li>Mooning Doge</li>
                        <li>Elon Musk Tweets</li>
                    </ul>
                    <div className="flex justify-center w-full mt-6">
                        <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-full shadow-lg hover:from-green-500 hover:to-green-700 transition duration-300 transform hover:scale-105">
                            Coming soon...
                        </button>
                    </div>
                </div>
            </div>

            {/* <div className="flex justify-center items-center h-screen bg-[#0d1117]">
                        <div className="relative group">
                             <img
                                src={riskyBox}
                                alt="Mystery Box"
                                className="rounded-lg shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                            />
                             <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-[#f39c12] to-[#e74c3c] opacity-20 blur-lg"></div>
                             <div className="absolute bottom-4 left-4">
                                <h3 className="text-teal-400 text-xl font-bold">
                                    Degen Level
                                </h3>
                                <p className="text-white">Absolute Madlad</p>
                            </div>
                        </div>
                    </div> */}
            {/* <div className="relative md:-ml-[20%] z-[10] md:-top-[500px]">
                        <img
                            src={riskyBox}
                            alt="Mystery Box"
                            className="w-96 rounded-lg shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-[#f39c12] to-[#e74c3c] opacity-20 blur-xl"></div>

                        <div className="flex flex-col justify-center items-start ml-8 mt-4 text-gray-300">
                            <h2 className="text-2xl font-bold text-red-500">
                                Degen Level
                            </h2>
                            <p className="text-lg">Absolute Madlad</p>
                            <h2 className="text-2xl font-bold text-red-500 mt-4">
                                Pump for Fun Coins
                            </h2>
                            <ul className="list-disc list-inside text-lg">
                                <li>Mad</li>
                                <li>Shiba Inu</li>
                                <li>PepeCoin</li>
                            </ul>
                            <div className="flex justify-center w-full mt-6">
                                <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-stone-900 text-white font-bold rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition duration-300 transform hover:scale-105">
                                    Coming soon...
                                </button>
                            </div>
                        </div>
                    </div> */}
        </div>
    )
}

const BoxDetails: React.FC<{ box: BoxType }> = ({ box }) => {
    return (
        <div className="relative md:-ml-[50%] max-w-md items-center justify-center">
            <img
                src={cyanBox}
                className="w-96"
                style={{ transformStyle: 'preserve-3d' }}
            ></img>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-accent to-accent-dark/50 opacity-20 blur-3xl"></div>

            <div className="flex flex-col justify-center items-start ml-8 mt-4 text-gray-300">
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-3xl font-bold text-cyan-500 mb-2">
                        {box?.name}
                    </h2>
                    <span className="inline-block bg-background-light text-accent text-xs font-semibold px-2 py-1 rounded-full">
                        Remaining boxes: {box?.availableBoxes}
                    </span>
                </div>
                <div className=" flex flex-col text-lg space-y-2">
                    <p className="">
                        When everybody scroll endlessly through Twitter and
                        TikTok to get meme gems{' '}
                    </p>
                    <div className="relative">
                        {' '}
                        <img
                            className="absolute w-16  ml-36 -mt-2  "
                            src={chillguy}
                        />{' '}
                        <p> But you are just a </p>
                    </div>
                    <p>
                        Who buys <span className="text-accent"> memeBox</span>{' '}
                        and let the best memes come to you.
                    </p>
                </div>
                <p className="text-lg mt-2"></p>
                <h2 className="text-2xl font-bold text-cyan-500 mt-4">
                    Meme Artifacts
                </h2>
                <p className="ml-"> Under 500M market cap </p>
                {/* <ul className="list-disc list-inside text-lg">
                    <li>Comedian</li>
                    <li>Just a chill guy</li>
                    <li>Project89</li>
                    <li>Degen Spartan AI</li>
                    <li>Department of Gov Efficiency</li>
                </ul> */}

                <div className="mt-6 text-gray-300 max-w-md">
                    <h2 className="text-xl font-bold text-cyan-500">
                        Why Buy a Memebox?
                    </h2>
                    <p className="mt-2">
                        Unlock trending meme coins and exclusive surprises! Each
                        box offers excitement, rewards, and potential gains.
                    </p>
                    <p className="mt-2">
                        Diversify your portfolio and get a chance to win
                        <span className="text-cyan-500 font-bold"> 1 SOL</span>!
                    </p>
                </div>

                <div className="flex justify-center w-full mt-8 ">
                    <BuyModal box={box} />{' '}
                </div>
            </div>
        </div>
    )
}

export default BoxesSection
