import React, { useEffect, useState } from 'react'
import { BoxStatus, MysteryBox } from '../../../libs/interfaces'
import { VITE_ENV_BACKEND_URL } from '../../../libs/config'
import { useWallet } from '@solana/wallet-adapter-react'
import { OpenBoxModal } from './modal/OpenBoxModal'
import cyanBox from '../../../assets/boxes/cyan_box.png'
import { AnimatedTooltip } from '../../../components/ui/AnimatedTooltip'
import {
    lamportsToSol,
    scrollToSection,
    timeDifferenceFromNow,
} from '../../../libs/utils'
import questionMark from '../../../assets/elements/question_mark.png'
import { FaExternalLinkAlt } from 'react-icons/fa'
import key from '../../../assets/boxes/key.png'
import { motion } from 'framer-motion'
import BoxCard from './BoxCard'

interface MyBoxesSectionProps {
    hasPendingTransaction: boolean
    setHasPendingTransaction: (hasPendingTransaction: boolean) => void
}

const MyBoxesSection: React.FC<MyBoxesSectionProps> = ({
    hasPendingTransaction,
    setHasPendingTransaction,
}) => {
    const [myBoxes, setMyBoxes] = React.useState<MysteryBox[]>()
    const { publicKey } = useWallet()
    const [selectedBoxId, setSelectedBoxId] = React.useState<string>('')
    const jwtToken = sessionStorage.getItem('jwtToken')
    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        const fetchMyBoxes = async () => {
            try {
                if (!publicKey || !jwtToken) return

                const response = await fetch(
                    `${VITE_ENV_BACKEND_URL}/boxes/me`,
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
                setMyBoxes(data)
            } catch (error) {
                console.error('fetchMyBoxes: ', error)
            }
        }
        fetchMyBoxes()
    }, [publicKey, jwtToken, hasPendingTransaction])

    const displayedBoxes = showAll ? myBoxes : myBoxes?.slice(0, 3)

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
            {!publicKey ? (
                <div className=""></div>
            ) : (
                <div
                    id="my-boxes"
                    className="relative flex flex-col justify-start items-center p-10 xl:px-64 pb-64"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-start items-start w-full"
                    >
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-emerald-500 p-2 mb-4">
                            My boxes ({myBoxes?.length || 0})
                        </span>
                    </motion.div>
                    {/* 
                        
                    <div className="absolute inset-0 w-full h-full z-0">
                        <div className="absolute inset-0 h-1/2 bg-gradient-to-r from-black via-accent to-black opacity-5  "></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-backgorund-dark to-background-dark opacity-10"></div>{' '}
                    </div> */}
                    <div className="flex flex-col w-full items-start justify-start">
                        {displayedBoxes && displayedBoxes.length > 0 ? (
                            <>
                                {displayedBoxes.map((box, index) => {
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
                                {myBoxes && myBoxes.length > 3 && (
                                    <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="relative z-[60] w-full mt-4 py-2 text-accent border border-accent rounded-md hover:bg-accent hover:text-white transition-colors duration-300"
                                    >
                                        {showAll
                                            ? 'Show Less'
                                            : `Show All (${myBoxes.length})`}
                                    </button>
                                )}
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="z-[52] w-full flex flex-col items-center justify-center space-y-8 py-16"
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
