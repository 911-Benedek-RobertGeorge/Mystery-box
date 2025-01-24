import React from 'react'
import { BoxType } from '../../../../libs/interfaces'
import cyanBox from '../../../../assets/boxes/logo.png'
import { PriceDisplay } from './PriceDisplay'
import { BuyModal } from '../modal/BuyModal'

interface BoxContentProps {
    box: BoxType
    image?: string
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

                    <div className="flex flex-row space-x-4 justify-center items-baseline">
                        {box?.availableBoxes && (
                            <span className="inline-block bg-background-light text-accent font-semibold px-4 py-1 rounded-full">
                                {box?.availableBoxes > 0
                                    ? ` ${box?.availableBoxes} ${
                                          box?.availableBoxes === 1
                                              ? 'box available'
                                              : 'boxes available'
                                      } 🔥`
                                    : 'Sold out 😭'}
                            </span>
                        )}
                    </div>

                    <img
                        src={image || cyanBox}
                        className="w-72 mx-auto mt-4"
                        style={{ transformStyle: 'preserve-3d' }}
                    />

                    {showPrice && (
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
            <BuyModal
                box={box}
                setHasPendingTransaction={setHasPendingTransaction}
                setIsChevronHidden={setIsChevronHidden}
            />
        </>
    )
}
