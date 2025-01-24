import React from 'react'
import { BoxType } from '../../../../libs/interfaces'
import introBox from '../../../../assets/boxes/introBox.png'
import { BoxContent } from './BoxContent'

interface IntroBoxProps {
    box: BoxType
    solanaPrice: number | null
    setHasPendingTransaction: (value: boolean) => void
    setIsChevronHidden: (value: boolean) => void
}

export const IntroBox: React.FC<IntroBoxProps> = ({
    box,
    solanaPrice,
    setHasPendingTransaction,
    setIsChevronHidden,
}) => {
    return (
        <div className="relative max-w-md items-center justify-center p-6 md:p-0 z-[101]">
            <BoxContent
                box={box}
                solanaPrice={solanaPrice}
                setHasPendingTransaction={setHasPendingTransaction}
                variant="intro"
                image={
                    <img
                        src={introBox}
                        alt="Intro Box"
                        className="my-6 ml-2 scale-125"
                    />
                }
                setIsChevronHidden={setIsChevronHidden}
                title={
                    <p className="bg-gradient-to-r from-accent via-blue-500 to-emerald-500 text-transparent bg-clip-text">
                        {`${box.name} Box`}
                    </p>
                }
                description={[
                    <p className="text-gray-300">
                        This box is perfect for{' '}
                        <span className="text-accent-secondary">starters</span>,
                        that are looking to get their{' '}
                        <span className="bg-gradient-to-r from-accent via-accent-dark to-emerald-500 text-transparent bg-clip-text font-bold">
                            feet wet
                        </span>{' '}
                        in the meme coin space. The{' '}
                        <span className="text-purple-500">cheapest box</span>{' '}
                        available, do not{' '}
                        <span className="text-red-400 ">underestimate</span> the
                        magic of{' '}
                        <span className="bg-gradient-to-r from-accent-secondary via-purple-500 to-emerald-500 text-transparent bg-clip-text font-bold">
                            memecoins
                        </span>{' '}
                        <span>🪄</span>
                    </p>,
                ]}
                features={[
                    {
                        text: 'Cheapest box',
                        color: 'bg-green-600/80',
                    },
                    {
                        text: 'Your intro to memecoins',
                        color: 'bg-indigo-600/80',
                    },
                    {
                        text: 'Starters pack',
                        color: 'bg-purple-500/80',
                    },
                    {
                        text: 'Lower risk',
                        color: 'bg-red-500/80',
                    },
                    {
                        text: 'Medium gains/losses',
                        color: 'bg-blue-500/80',
                    },
                ]}
            />
        </div>
    )
}
