import React, { useEffect } from 'react'
import { MysteryBox } from '../../../libs/interfaces'
import { VITE_ENV_BACKEND_URL } from '../../../libs/config'
import { OpenBoxModal } from './modal/OpenBoxModal'

import { scrollToSection } from '../../../libs/utils'
import questionMark from '../../../assets/elements/question_mark.png'
import { motion } from 'framer-motion'
import BoxCard from './BoxCard'
import { useAppKitAccount } from '@reown/appkit/react'
import { PublicKey } from '@solana/web3.js'

interface MyBoxesSectionProps {
    hasPendingTransaction: boolean
    setHasPendingTransaction: (hasPendingTransaction: boolean) => void
}

const MyBoxesSection: React.FC<MyBoxesSectionProps> = ({
    hasPendingTransaction,
    setHasPendingTransaction,
}) => {
    const [offset, setOffset] = React.useState(0)
    const [limit] = React.useState(5)
    const [itemsCount, setItemsCount] = React.useState(0)
    const [totalItemsCount, setTotalItemsCount] = React.useState(0)

    const [myBoxes, setMyBoxes] = React.useState<MysteryBox[]>()
    const { address } = useAppKitAccount()
    const [selectedBoxId, setSelectedBoxId] = React.useState<string>('')
    const jwtToken = sessionStorage.getItem('jwtToken')
    const [isLoadingMore, setIsLoadingMore] = React.useState(false)

    const fetchMyBoxesCount = async () => {
        const response = await fetch(`${VITE_ENV_BACKEND_URL}/boxes/me/count`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        })
        const data = await response.json()
        setTotalItemsCount(data)
    }

    const fetchMyBoxes = async (newOffset: number) => {
        setIsLoadingMore(true)
        try {
            const response = await fetch(
                `${VITE_ENV_BACKEND_URL}/boxes/me?offset=${newOffset}&limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            )
            const data = await response.json()
            if (response.status !== 200) {
                throw new Error(data.message)
            }
            if (data.length != 0) {
                setItemsCount(data.length)
                setMyBoxes(data)
                setOffset(newOffset)
            }
        } catch (error) {
            console.error('fetchMyBoxes: ', error)
        } finally {
            setIsLoadingMore(false)
        }
    }

    useEffect(() => {
        if (!address || !jwtToken) return

        fetchMyBoxesCount()
        fetchMyBoxes(offset)
    }, [address, jwtToken, hasPendingTransaction])

    const handleOpenBoxModal = () => {
        const button = document.getElementById('open-box-modal-button')
        if (button) {
            button.click()
        }
    }

    useEffect(() => {
        if (selectedBoxId) {
            handleOpenBoxModal()
        }
    }, [selectedBoxId])

    return (
        <>
            {!address ? (
                <div className=""></div>
            ) : (
                <div
                    id="my-boxes"
                    className="relative flex flex-col justify-start items-center md:p-10 xl:px-64 pt-10 pb-32"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center md:justify-start items-start w-full "
                    >
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r py-8 from-accent via-accent-dark to-emerald-500 p-2 mb-4">
                            My boxes ({totalItemsCount})
                        </span>
                    </motion.div>
                    {/* 
                        
                    <div className="absolute inset-0 w-full h-full z-0">
                        <div className="absolute inset-0 h-1/2 bg-gradient-to-r from-black via-accent to-black opacity-5  "></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-backgorund-dark to-background-dark opacity-10"></div>{' '}
                    </div> */}
                    <div className="flex flex-col items-start justify-start w-[80%]">
                        {myBoxes ? (
                            <>
                                {myBoxes.map((box, index) => {
                                    return (
                                        <BoxCard
                                            key={index}
                                            box={box}
                                            setSelectedBoxId={setSelectedBoxId}
                                            handleOpenBoxModal={
                                                handleOpenBoxModal
                                            }
                                        />
                                    )
                                })}
                                <div className="flex justify-center md:justify-end items-center space-x-4 mt-8 pr-4 w-full">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() =>
                                            fetchMyBoxes(
                                                Math.max(0, offset - limit)
                                            )
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
                                        onClick={() =>
                                            fetchMyBoxes(offset + limit)
                                        }
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
                                            {isLoadingMore &&
                                            itemsCount === limit ? (
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
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="z-[110] w-full flex flex-col items-center justify-center space-y-8 py-16"
                            >
                                <img
                                    src={questionMark}
                                    className="w-24 h-24 animate-bounce opacity-50"
                                />
                                <div className="text-center space-y-8">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-accent via-accent-dark to-emerald-500 text-transparent bg-clip-text">
                                        No boxes bought yet? Time to change
                                        that!
                                    </h3>
                                    <p className="text-gray-400 text-lg max-w-md">
                                        You don't own any boxes yet. Why not
                                        grab your first one and discover some
                                        epic memecoins?
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() =>
                                            scrollToSection('boxes-section')
                                        }
                                        className="z-[52] px-8 py-3 mt-4 rounded-full bg-gradient-to-r from-accent via-accent-dark to-emerald-500 text-white font-bold transition-all hover:shadow-lg hover:shadow-accent/50"
                                    >
                                        Buy my first box 🚀
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                    <OpenBoxModal
                        setHasPendingTransaction={setHasPendingTransaction}
                        hiddenTrigger={true}
                        boxId={selectedBoxId}
                    />
                </div>
            )}
        </>
    )
}

export default MyBoxesSection
