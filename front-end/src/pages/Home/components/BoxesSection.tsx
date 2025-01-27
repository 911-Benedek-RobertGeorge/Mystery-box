import React, { useState } from 'react'
import { BoxType } from '../../../libs/interfaces'
import { useSelector } from 'react-redux'
import { MainBox } from './boxes/MainBox'
import { ComingSoonBox } from './boxes/ComingSoonBox'
import { BoxesLayout } from './boxes/BoxesLayout'
import { IntroBox } from './boxes/IntroBox'
import { TestBox } from './boxes/TestBox'

interface BoxesSectionProps {
    setHasPendingTransaction: (value: boolean) => void
}

const BoxesSection: React.FC<BoxesSectionProps> = ({
    setHasPendingTransaction,
}) => {
    const [isChevronHidden, setIsChevronHidden] = useState(false)
    const boxTypes: BoxType[] = useSelector(
        (state: { box: { types: BoxType[] } }) => state.box.types
    )

    const solanaPrice = useSelector(
        (state: { solana: { price: number } }) => state.solana.price
    )

    const testBox = boxTypes?.find(
        (box) => box._id === '678eb04437c646670f5a3109'
    )
     const introBox = boxTypes?.find(
        (box) => box._id === '6793785f1e6acd3043be74ae'
    )

    const mainBox = boxTypes?.find(
        (box) => box._id === '676135d9687f17a1771ba2f6'
    )

    return (
        <>
            {boxTypes?.length > 0 && (
                <BoxesLayout isChevronHidden={isChevronHidden}>
                    {introBox && (
                        <IntroBox
                            setIsChevronHidden={setIsChevronHidden}
                            box={introBox}
                            solanaPrice={solanaPrice}
                            setHasPendingTransaction={setHasPendingTransaction}
                        />
                    )}
                    {mainBox && (
                        <MainBox
                            setIsChevronHidden={setIsChevronHidden}
                            box={mainBox}
                            solanaPrice={solanaPrice}
                            setHasPendingTransaction={setHasPendingTransaction}
                        />
                    )}
                    <ComingSoonBox
                        setIsChevronHidden={setIsChevronHidden}
                        solanaPrice={solanaPrice}
                        setHasPendingTransaction={setHasPendingTransaction}
                    />
                    {testBox && (
                        <TestBox
                            box={testBox}
                            solanaPrice={solanaPrice}
                            setHasPendingTransaction={setHasPendingTransaction}
                            setIsChevronHidden={setIsChevronHidden}
                        />
                    )}
                </BoxesLayout>
            )}
        </>
    )
}

export default BoxesSection
