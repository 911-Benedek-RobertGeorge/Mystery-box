import React from 'react'
import { BoxType } from '../../../../libs/interfaces'
import { BoxContent } from './BoxContent'

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
        <BoxContent
            box={box}
            solanaPrice={solanaPrice}
            setHasPendingTransaction={setHasPendingTransaction}
            setIsChevronHidden={setIsChevronHidden}
            variant="coming-soon"
            title="degen mode loading..."
            description={[
                "Wen next box? Soon™️! We're cooking up something extra spicy 🌶️",
                'Get ready for the most degen-approved collection of meme treasures yet!',
            ]}
            features={[]}
        />
    )
}
