import React from 'react'
import { BoxType } from '../../../../libs/interfaces'
import { BoxContent } from './BoxContent'

interface MainBoxProps {
    box: BoxType
    solanaPrice: number | null
    setHasPendingTransaction: (value: boolean) => void
    setIsChevronHidden: (value: boolean) => void
}

export const MainBox: React.FC<MainBoxProps> = ({
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
                variant="box"
                setIsChevronHidden={setIsChevronHidden}
                title={
                    <p className="bg-gradient-to-r from-accent via-accent-dark to-emerald-500 text-transparent bg-clip-text">
                        {`${box.name} Box`}
                    </p>
                }
                description={[
                    <p className="text-gray-300">
                        This box is packed with the{' '}
                        <span className="text-accent font-bold">
                            most promising
                        </span>{' '}
                        memecoins on{' '}
                        <span className="bg-gradient-to-r from-accent-secondary via-purple-500 to-emerald-500 text-transparent bg-clip-text font-bold">
                            Solana
                        </span>{' '}
                        🐶. Find out the memes that made{' '}
                        <span className="text-emerald-500 font-bold">
                            millions
                        </span>{' '}
                        and are still going{' '}
                        <span className="text-accent-secondary font-bold">
                            strong
                        </span>
                        ! Ready to{' '}
                        <span className="bg-gradient-to-r from-accent via-accent-dark to-emerald-500 text-transparent bg-clip-text font-bold">
                            dive in
                        </span>
                        ?
                    </p>,
                ]}
                features={[
                    {
                        text: 'Long-lived meme tokens',
                        color: 'bg-indigo-600/80',
                    },
                    { text: 'OG memes', color: 'bg-fuchsia-600/80' },
                    { text: 'Moderate risk', color: 'bg-teal-600/80' },
                    {
                        text: 'Extra rewards',
                        color: 'bg-rose-600/80',
                    },
                    {
                        text: 'Eligible to early adopter perks',
                        color: 'bg-sky-600/80',
                    },
                ]}
            />
        </div>
    )
}
