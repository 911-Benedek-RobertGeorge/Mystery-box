import React from 'react'
import { BoxType } from '../../../../libs/interfaces'
import { BoxContent } from './BoxContent'
import pumpFun from '../../../../assets/boxes/pumpfun.png'

interface ComingSoonBoxProps {
    box?: BoxType
    solanaPrice: number | null
    setHasPendingTransaction: (value: boolean) => void
    setIsChevronHidden: (value: boolean) => void
}

export const ComingSoonBox: React.FC<ComingSoonBoxProps> = ({
    box,
    solanaPrice,
    setHasPendingTransaction,
    setIsChevronHidden,
}) => {
    return (
        <div className="relative max-w-md items-center justify-center p-6 md:p-0 z-[101]">
            <BoxContent
                box={box}
                image={
                    <img
                        src={pumpFun}
                        alt="Pump Fun"
                        className="my-6 mt-12 ml-2 scale-125"
                    />
                }
                solanaPrice={solanaPrice}
                setHasPendingTransaction={setHasPendingTransaction}
                setIsChevronHidden={setIsChevronHidden}
                variant="coming-soon"
                title={
                    <p className="bg-gradient-to-r from-accent via-blue-500 to-fuchsia-500 text-transparent bg-clip-text">
                        Full degen mode loading...
                    </p>
                }
                description={[
                    <p className="text-gray-300">
                        Wen next box?{' '}
                        <span className="text-accent font-bold">Soon™️!</span>{' '}
                        We're cooking up something{' '}
                        <span className="bg-gradient-to-r from-accent via-accent-dark to-emerald-500 text-transparent bg-clip-text font-bold">
                            extra spicy
                        </span>{' '}
                        🌶️. Get ready for the{' '}
                        <span className="text-accent-secondary font-bold">
                            most degen-approved
                        </span>{' '}
                        collection of{' '}
                        <span className="bg-gradient-to-r from-accent-secondary via-purple-500 to-emerald-500 text-transparent bg-clip-text font-bold">
                            meme treasures
                        </span>{' '}
                        yet! Ready to bet on the{' '}
                        <span className="text-emerald-500 font-bold">
                            next pump
                        </span>
                        ?
                    </p>,
                ]}
                features={[
                    {
                        text: 'High-risk',
                        color: 'bg-red-600/80',
                    },
                    {
                        text: 'High-reward',
                        color: 'bg-emerald-600/80',
                    },
                    {
                        text: 'Early pumpfun memes',
                        color: 'bg-purple-600/80',
                    },
                    {
                        text: 'Moonshot potential',
                        color: 'bg-yellow-600/80',
                    },
                    {
                        text: 'Pro-level mystery',
                        color: 'bg-blue-600/80',
                    },
                ]}
            />
        </div>
    )
}
