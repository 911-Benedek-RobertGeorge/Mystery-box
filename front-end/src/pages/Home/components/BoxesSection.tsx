import React from 'react'
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
        <div className=" relative flex flex-col md:flex-row justify-center items-center w-full space-y-32 md:space-y-0 pt-32">
            {/* {boxTypes?.map((box) => <BoxDetails box={box} />)} */}
            <div className="md:ml-32">
                {boxTypes && <BoxDetails box={boxTypes[0]} />}
            </div>

            <div className="md:ml-96   -hue-rotate-60 ">
                {boxTypes && (
                    <BoxDetails comingSoon="Next week " box={boxTypes[1]} />
                )}
            </div>
            {/* <div className="relative  ">
                <img
                    src={cyanBox}
                    className="w-96  "
                    style={{
                        transformStyle: 'preserve-3d',
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
            </div> */}
        </div>
    )
}

const BoxDetails: React.FC<{ box: BoxType; comingSoon?: string }> = ({
    box,
    comingSoon,
}) => {
    return (
        <div className="relative max-w-md items-center justify-center p-6 md:p-0">
            <img
                src={cyanBox}
                className="w-96 mx-auto"
                style={{ transformStyle: 'preserve-3d' }}
            ></img>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-accent to-accent-dark/50 opacity-20 blur-3xl"></div>

            {!comingSoon ? (
                <div className="flex flex-col justify-center items-start ml-8 mt-4 text-gray-300">
                    <div className="flex justify-between items-center w-full">
                        <h2 className="text-3xl font-bold text-cyan-500 mb-2">
                            {box?.name}
                        </h2>
                        <span className="inline-block bg-background-light text-accent text-xs font-semibold px-2 py-1 rounded-full">
                            {box?.availableBoxes > 0
                                ? `Remaining boxes: ${box?.availableBoxes}`
                                : 'No Boxes'}
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
                            Who buys{' '}
                            <span className="text-accent"> memeBox</span> and
                            let the best memes come to you.
                        </p>
                    </div>
                    <p className="text-lg mt-2"></p>
                    <h2 className="text-2xl font-bold text-cyan-500 mt-4">
                        Meme Artifacts
                    </h2>
                    <p className="">
                        {' '}
                        With the highest volume and trending score
                    </p>
                    <div className="mt-6 text-gray-300 max-w-md">
                        <h2 className="text-xl font-bold text-cyan-500">
                            Why Buy a Memebox?
                        </h2>
                        {/* <p className="mt-2">
                            Unlock trending meme coins and exclusive surprises!
                            Each box offers excitement, rewards, and potential
                            gains.
                        </p> */}
                        <p className="mt-2">
                            Diversify your portfolio and get a chance to win
                            <span className="text-cyan-500 font-bold">
                                {' '}
                                1 SOL
                            </span>
                            !
                        </p>
                    </div>
                    <div className="flex justify-center w-full mt-8 ">
                        <BuyModal box={box} />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-6  rounded-lg shadow-md">
                    <h4 className="text-3xl font-extrabold text-cyan-400 mb-4  ">
                        Next Trend Memes
                    </h4>
                    <p className="text-lg text-gray-300 text-center">
                        Get ready to dive into the next big trend of meme coins!
                        This box is packed with surprises, rare treasures, and
                        the thrill of the unknown. Stay tuned for the ultimate
                        crypto adventure!
                    </p>
                    <div className="mt-6">
                        <span className="px-6 py-3 bg-gradient-to-t from-transparent via-accent/10 to-accent text-white font-bold rounded-full shadow-xl hover:from-green-600 hover:to-green-800 transition duration-300 transform hover:scale-110">
                            Coming Soon 🚀
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BoxesSection
