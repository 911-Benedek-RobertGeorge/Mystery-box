import React from 'react'
import { BoxType } from '../../../../libs/interfaces'
import { BoxContent } from './BoxContent'

interface TestBoxProps {
    box: BoxType
    solanaPrice: number | null
    setHasPendingTransaction: (value: boolean) => void
    setIsChevronHidden: (value: boolean) => void
}

export const TestBox: React.FC<TestBoxProps> = ({
    box,
    solanaPrice,
    setHasPendingTransaction,
    setIsChevronHidden,
}) => {
    return (
        <div className="relative max-w-md items-center justify-center md:p-0 z-[101]">
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
                description={[<p className="text-gray-300">test</p>]}
                features={[
                    {
                        text: 'Lorem ipsum',
                        color: 'bg-indigo-600/80',
                    },
                    { text: 'Dolor sit amet', color: 'bg-fuchsia-600/80' },
                    {
                        text: 'Consectetur adipiscing elit',
                        color: 'bg-teal-600/80',
                    },
                    {
                        text: 'Sed do eiusmod tempor incididunt',
                        color: 'bg-rose-600/80',
                    },
                ]}
            />
        </div>
    )
}
