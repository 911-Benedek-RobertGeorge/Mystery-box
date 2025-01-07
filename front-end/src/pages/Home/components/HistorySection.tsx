import React, { useEffect } from 'react'
import logo from '../../../assets/elements/logo.png'
import {
    lamportsToSol,
    shortenAddress,
    timeDifferenceFromNow,
} from '../../../libs/utils'
import { VITE_ENV_BACKEND_URL } from '../../../libs/config'
import { memeCoinType, MysteryBox } from '../../../libs/interfaces'
import { AnimatedTooltip } from '../../../components/ui/AnimatedTooltip'
import { motion } from 'framer-motion'
import BoxCard from './BoxCard'

interface HistoryItem {
    price: number
    initialUsdValue: number
    roi: number
    date: Date
    claimUsdValue: number

    boxType: string
    boxContent: memeCoinType[]
    image: string
    buyer: string
}

const HistorySection: React.FC<{
    hasPendingTransaction: boolean
}> = ({ hasPendingTransaction }) => {
    const [historyData, setHistoryData] = React.useState<MysteryBox[]>([])
    const [offset, setOffset] = React.useState(0)
    const [limit] = React.useState(5)
    const [itemsCount, setItemsCount] = React.useState(0)

    useEffect(() => {
        const fetchMyBoxes = async () => {
            try {
                const response = await fetch(
                    `${VITE_ENV_BACKEND_URL}/boxes/results?offset=${offset}&limit=${limit}`
                )
                const data: MysteryBox[] = await response.json()

                setHistoryData(data)
                setItemsCount(data.length)
            } catch (error) {
                console.error('fetchMyBoxes: ', error)
            }
        }

        fetchMyBoxes()
    }, [offset, limit, hasPendingTransaction])

    return (
        <div className="relative flex flex-col justify-start items-center w-full max-w-screen-xl mx-auto  md:p-10  py-12  h-full lg:h-screen">
            <div className="flex justify-center md:justify-start items-start w-full py-8">
                <span className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent mb-4 italic">
                    Professional degens bought
                </span>
            </div>

            <div className="flex flex-col w-full space-y-4">
                {historyData.map((box, index) => (
                    <BoxCard key={index} box={box} />
                ))}
                <div className="flex justify-center md:justify-end items-center space-x-4 mt-8 pr-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setOffset(Math.max(0, offset - limit))}
                        disabled={offset === 0}
                        className="relative px-6 py-2 rounded-full border border-accent/30 
                            text-accent font-medium transition-all group overflow-hidden
                            hover:border-accent/50 hover:text-accent-light
                            disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <div className="relative flex items-center space-x-2">
                            <span>←</span>
                            <span>Previous</span>
                        </div>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setOffset(offset + limit)}
                        disabled={itemsCount !== limit}
                        className="relative px-6 py-2 rounded-full border border-accent/30 
                            text-accent font-medium transition-all group overflow-hidden
                            hover:border-accent/50 hover:text-accent-light
                            disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <div className="relative flex items-center space-x-2">
                            <span>Next</span>
                            <span>→</span>
                        </div>
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

export default HistorySection
