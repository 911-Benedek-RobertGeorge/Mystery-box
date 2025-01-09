import React from 'react'
import { BoxType } from '../../../libs/interfaces'
import { useSelector } from 'react-redux'
import cyanBox from '../../../assets/boxes/cyan_box-Photoroom.png'
import chillguy from '../../../assets/coins/chill-guy.png'
import { BuyModal } from './modal/BuyModal'
import { lamportsToSol } from '../../../libs/utils'

const BoxesSection: React.FC<{
    setHasPendingTransaction: (value: boolean) => void
}> = ({ setHasPendingTransaction }) => {
    const boxTypes: BoxType[] = useSelector(
        (state: { box: { types: BoxType[] } }) => state.box.types
    )

    const solanaPrice = useSelector(
        (state: { solana: { price: number } }) => state.solana.price
    )

    return (
        <div className=" relative flex flex-col md:flex-row justify-center items-center w-full space-y-32 md:space-y-0  lg:pb-32">
            {' '}
            <div className="absolute inset-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-accent/80 to-black opacity-10 animate-gradient-x"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black to-background-dark opacity-40"></div>

                <div className="absolute top-56 left-52 inset-0 bg-[url('src/assets/shapes/lines.png')] opacity-5"></div>
            </div>
            <div className="md:ml-32">
                {boxTypes && (
                    <BoxDetails
                        box={boxTypes[0]}
                        solanaPrice={solanaPrice}
                        setHasPendingTransaction={setHasPendingTransaction}
                    />
                )}
            </div>
            <div className="md:ml-96   -hue-rotate-60 ">
                {boxTypes && (
                    <BoxDetails
                        comingSoon="Next week "
                        solanaPrice={solanaPrice}
                        setHasPendingTransaction={setHasPendingTransaction}
                        box={boxTypes[5]}
                    />
                )}
            </div>
        </div>
    )
}

const BoxDetails: React.FC<{
    box: BoxType
    comingSoon?: string
    solanaPrice: number | null
    setHasPendingTransaction: (value: boolean) => void
}> = ({ box, comingSoon, solanaPrice, setHasPendingTransaction }) => {
    return (
        <div className="relative max-w-md items-center justify-center p-6 md:p-0 z-[101]">
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
                                ? ` ${box?.availableBoxes} ${
                                      box?.availableBoxes === 1
                                          ? 'box available'
                                          : 'boxes available'
                                  } 🔥`
                                : 'Sold out 😭'}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="flex flex-col items-start">
                            <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 via-accent to-pink-500 text-transparent bg-clip-text animate-gradient-x">
                                {parseFloat(
                                    lamportsToSol(
                                        box?.amountLamports ?? '0'
                                    ).toFixed(4)
                                )}{' '}
                                SOL
                            </span>
                            {solanaPrice && (
                                <span className="text-lg text-gray-400 font-medium">
                                    ≈ $
                                    {(
                                        lamportsToSol(
                                            box?.amountLamports ?? '0'
                                        ) * solanaPrice
                                    ).toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col text-lg space-y-2">
                        <p className="">
                            While normies are doomscrolling{' '}
                            <span className="font-bold">X</span> and
                            <span className="font-bold "> TikTok</span> for
                            signals 📱
                        </p>
                        <div className="relative">
                            <img
                                className="absolute w-14 ml-48 -mt-2 "
                                src={chillguy}
                            />
                            <p>But you're just a vibing</p>
                        </div>
                    </div>
                    <h2 className="text-lg font-bold text-cyan-500 mt-4">
                        What's Inside? 🎁
                    </h2>
                    <p className="">
                        Each box is packed with hand-picked{' '}
                        <span className="text-yellow-400">meme magic</span> by
                        our professional{' '}
                        <span className="bg-gradient-to-r text-accent-secondary">
                            degen researchers 🧪
                        </span>{' '}
                    </p>
                    <div className="mt-6 text-gray-300 max-w-md">
                        <p className="mt-2">
                            <span className="bg-gradient-to-r text-accent-secondary">
                                WAGMI 🚀
                            </span>{' '}
                            Extra chance to win
                            <span className="text-cyan-500 font-bold">
                                {' '}
                                1 SOL{' '}
                            </span>
                            for the lucky buyers! 🍀
                        </p>
                    </div>
                    <div className="flex justify-center w-full mt-8">
                        {box?.availableBoxes > 0 ? (
                            <BuyModal
                                box={box}
                                setHasPendingTransaction={
                                    setHasPendingTransaction
                                }
                            />
                        ) : (
                            <span className="text-accent-secondary font-bold">
                                Too late ser! Come back for next drop 🔥
                            </span>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md">
                    <h4 className="text-3xl font-extrabold text-cyan-400 mb-4">
                        Next Level Memes Loading...
                    </h4>
                    <p className="text-lg text-gray-300 text-center">
                        Wen next box? Soon™️! We're cooking up something extra
                        spicy 🌶️ Get ready for the most degen-approved
                        collection of meme treasures yet! Don't miss out on the
                        exclusive trenches collection! 🏄‍♂️
                    </p>
                    <div className="mt-6">
                        <span className="px-6 py-3 border-r border-l border-accent/30 text-white font-bold rounded-full shadow-xl hover:from-green-600 hover:to-green-800 transition duration-300 transform hover:scale-110">
                            Coming Soon™️ 🚀
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BoxesSection
