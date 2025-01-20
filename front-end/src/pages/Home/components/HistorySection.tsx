import React, { useEffect, useState } from 'react'

import { VITE_ENV_BACKEND_URL } from '../../../libs/config'
import { MysteryBox } from '../../../libs/interfaces'
import { motion } from 'framer-motion'
import BoxCard from './BoxCard'
import { isLoggedInWalletAnalytics } from '../../../libs/utils'

const HistorySection: React.FC<{
    hasPendingTransaction: boolean
}> = ({ hasPendingTransaction }) => {
    const [historyData, setHistoryData] = React.useState<MysteryBox[]>([])

    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [offset, setOffset] = React.useState(0)
    const [limit] = React.useState(5)
    const [itemsCount, setItemsCount] = React.useState(0)
    const [totalItemsCount, setTotalItemsCount] = React.useState(0)

    const fetchHistoryDataCount = async () => {
        const isAnalytics = isLoggedInWalletAnalytics()

        const response = await fetch(
            `${VITE_ENV_BACKEND_URL}/boxes/results/count${
                isAnalytics ? '?debug=true' : ''
            }`
        )
        const data = await response.json()
        setTotalItemsCount(data)
    }

    const fetchHistoryData = async (newOffset: number) => {
        setIsLoadingMore(true)
        const isAnalytics = isLoggedInWalletAnalytics()

        try {
            const response = await fetch(
                `${VITE_ENV_BACKEND_URL}/boxes/results?offset=${newOffset}&limit=${limit}${
                    isAnalytics ? '&debug=true' : ''
                }`
            )
            const data: MysteryBox[] = await response.json()
            setHistoryData(data)
            setItemsCount(data.length)
            setOffset(newOffset)
        } catch (error) {
            console.error('fetchHistoryData: ', error)
        } finally {
            setIsLoadingMore(false)
        }
    }

    useEffect(() => {
        fetchHistoryData(offset)
        fetchHistoryDataCount()
    }, [hasPendingTransaction])

    return (
        <div className="relative flex flex-col justify-start items-center w-full max-w-screen-xl mx-auto  md:p-10  py-12  h-full lg:h-screen">
            <div className="flex justify-center md:justify-start items-start w-full py-8">
                <span className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent mb-4 italic">
                    Professional degens bought ({totalItemsCount})
                </span>
            </div>

            <div className="flex flex-col  space-y-4 w-[80%]">
                {historyData.map((box, index) => (
                    <BoxCard key={index} box={box} />
                ))}
                <div className="flex justify-center md:justify-end items-center space-x-4 mt-8 pr-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                            fetchHistoryData(Math.max(0, offset - limit))
                        }
                        disabled={offset === 0 || isLoadingMore}
                        className="relative px-6 py-2 rounded-full border border-accent/30 
                            text-accent font-medium transition-all group overflow-hidden
                            hover:border-accent/50 hover:text-accent-light
                            disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <div className="relative flex items-center space-x-2">
                            {isLoadingMore && offset !== 0 ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-accent rounded-full border-t-transparent animate-spin"></div>
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                <>
                                    <span>←</span>
                                    <span>Previous</span>
                                </>
                            )}
                        </div>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => fetchHistoryData(offset + limit)}
                        disabled={
                            itemsCount !== limit ||
                            offset + limit >= totalItemsCount ||
                            isLoadingMore
                        }
                        className="relative px-6 py-2 rounded-full border border-accent/30 
                            text-accent font-medium transition-all group overflow-hidden
                            hover:border-accent/50 hover:text-accent-light
                            disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <div className="relative flex items-center space-x-2">
                            {isLoadingMore && itemsCount === limit ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-accent rounded-full border-t-transparent animate-spin"></div>
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                <>
                                    <span>Next</span>
                                    <span>→</span>
                                </>
                            )}
                        </div>
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

export default HistorySection
