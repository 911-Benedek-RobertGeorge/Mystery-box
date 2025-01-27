import React from 'react'
import { BoxType } from '../../../../libs/interfaces'
import { PriceDisplay } from './PriceDisplay'
import { BuyModal } from '../modal/BuyModal'

interface BoxContentProps {
    box?: BoxType
    image?: React.ReactNode
    solanaPrice: number | null
    availableBoxes?: number
    setHasPendingTransaction: (value: boolean) => void
    variant: 'intro' | 'box' | 'coming-soon'
    title: React.ReactNode
    description: React.ReactNode[]
    features?: { text: string; color: string }[]
    showPrice?: boolean
    setIsChevronHidden: (value: boolean) => void
}

const FeatureBlock = ({
    feature,
}: {
    feature: { text: string; color: string }
}) => {
    return (
        <span
            className={`${feature.color} inline-block text-sm font-medium px-3 py-1 rounded-full text-slate-200 mr-2 `}
        >
            {feature.text}
        </span>
    )
}

export const BoxContent: React.FC<BoxContentProps> = ({
    box,
    image,
    solanaPrice,
    setHasPendingTransaction,
    setIsChevronHidden,
    title,
    description,
    features,
    showPrice = true,
}) => {
   
    const areBoxesAvailable =
        box?.availableBoxes && box?.availableBoxes > 0 ? true : false
    const boxesAvailableStyle = areBoxesAvailable
        ? 'inline-block bg-background-light text-accent font-semibold px-4 py-1 rounded-full'
        : 'inline-block bg-slate-600 text-white font-semibold px-4 py-1 rounded-full'
    return (
        <>
            <div className="relative max-w-md mx-auto p-6 md:p-0">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-accent to-accent-dark/50 opacity-20 blur-3xl"></div>
                <div className="flex flex-col items-center text-center mt-4 text-gray-300">
                    <div>
                        <div className="text-3xl md:text-4xl font-bold mb-2">
                            {title}
                        </div>
                    </div>

                    {box && (
                        <div className="flex flex-row space-x-4 justify-center items-baseline">
                            <span className={boxesAvailableStyle}>
                                {areBoxesAvailable
                                    ? `${box?.availableBoxes} boxes available 🔥`
                                    : 'Sold out 😭'}
                            </span>
                        </div>
                    )}

                    {image && image}

                    {showPrice && box && (
                        <PriceDisplay box={box} solanaPrice={solanaPrice} />
                    )}

                    <div className="space-y-4 max-w-sm mt-4">
                        {description.map((text, index) => (
                            <div key={index} className="text-base md:text-lg">
                                {text}
                            </div>
                        ))}
                    </div>

                    {features && features.length > 0 && (
                        <div className="mt-2 space-y-2">
                            <div className="flex flex-row items-center justify-center">
                                <ul className="space-y-2 text-gray-300">
                                    {features.map((feature, index) => (
                                        <FeatureBlock
                                            feature={feature}
                                            key={index}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {box && areBoxesAvailable && (
                <BuyModal
                    box={box}
                    setHasPendingTransaction={setHasPendingTransaction}
                    setIsChevronHidden={setIsChevronHidden}
                />
            )}

            {!box && (
                <div className="flex items-center justify-center mt-8">
                    <div
                        className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 
                        scale-90 md:scale-100 items-center relative rounded-xl flex justify-center 
                        opacity-70 cursor-not-allowed"
                    >
                        <span className="text-center font-bold text-gray-300 px-8 py-4 flex items-center space-x-2">
                            <span>Coming soon</span>
                            <span>✨</span>
                        </span>
                        <div className="flex items-center justify-center absolute inset-0 text-white z-20"></div>
                    </div>
                </div>
            )}

            {box && !areBoxesAvailable && (
                <div className="flex items-center justify-center mt-8">
                    <div
                        className="bg-gradient-to-r from-accent via-accent-dark to-emerald-500 
                        scale-90 md:scale-100 items-center relative rounded-xl flex justify-center 
                        group/modal-btn opacity-50 cursor-not-allowed"
                    >
                        <span className="text-center transition duration-500 font-bold text-white px-6 py-3">
                            No more boxes available
                        </span>
                        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20"></div>
                    </div>
                </div>
            )}
        </>
    )
}
