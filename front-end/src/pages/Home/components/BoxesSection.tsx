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

    return (
        <>
            {/* {testBox && (
                <div className="flex justify-center items-start [z-index:102]">
                    <BuyModal
                        box={testBox}
                        setHasPendingTransaction={setHasPendingTransaction}
                        setIsChevronHidden={setIsChevronHidden}
                    />
                </div>
            )}
            {!boxTypes ||
                (boxTypes.length === 0 && (
                    <div className="flex justify-center items-center h-screen">
                        <h1 className="text-2xl font-bold text-accent">
                            Loading...
                        </h1>
                    </div>
                ))} */}

            {boxTypes?.length > 0 && (
                <BoxesLayout isChevronHidden={isChevronHidden}>
                    <IntroBox
                        setIsChevronHidden={setIsChevronHidden}
                        box={boxTypes[0]}
                        solanaPrice={solanaPrice}
                        setHasPendingTransaction={setHasPendingTransaction}
                    />
                    <MainBox
                        setIsChevronHidden={setIsChevronHidden}
                        box={boxTypes[0]}
                        solanaPrice={solanaPrice}
                        setHasPendingTransaction={setHasPendingTransaction}
                    />
                    <ComingSoonBox
                        setIsChevronHidden={setIsChevronHidden}
                        box={boxTypes[5]}
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
