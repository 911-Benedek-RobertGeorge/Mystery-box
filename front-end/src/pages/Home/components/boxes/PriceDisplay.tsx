import React from 'react'
import { BoxType } from '../../../../libs/interfaces'
import { lamportsToSol } from '../../../../libs/utils'

interface PriceDisplayProps {
    box: BoxType
    solanaPrice: number | null
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
    box,
    solanaPrice,
}) => {
    return (
        <div className="flex items-center space-x-2 mt-1">
            <div className="flex flex-col items-start">
                <div className="flex flex-row items-center">
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 via-accent to-pink-500 text-transparent bg-clip-text animate-gradient-x">
                        {parseFloat(
                            lamportsToSol(box?.amountLamports ?? '0').toFixed(4)
                        )}{' '}
                        SOL
                    </span>
                    {solanaPrice && (
                        <span className="text-xl text-gray-400 font-medium">
                            ≈ $
                            {(
                                lamportsToSol(box?.amountLamports ?? '0') *
                                solanaPrice
                            ).toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
