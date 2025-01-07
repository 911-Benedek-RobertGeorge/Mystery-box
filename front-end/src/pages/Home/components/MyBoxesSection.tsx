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
                <div className="text-2xl font-bold text-center text-secondary items-center justify-center"></div>
            ) : (
                <div
                    id="my-boxes"
                    className="flex flex-col justify-start items-center p-10 xl:px-64 pb-64 min-h-[50vh]"
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

                    <div className="flex flex-col w-full items-start justify-start">
                        {displayedBoxes && displayedBoxes.length > 0 ? (
                            <>
                                {displayedBoxes.map((box, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className=" z-[55] mb-3  flex w-full max-w-screen transform   flex-col justify-between items-start md:items-center rounded-md bg-background-light bg-opacity-75 p-6 text-accent transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-dark md:flex-row md:p-4"
                                        >
                                            <div className="flex flex-col md:flex-row space-x-4">
                                                {' '}
                                                <div className="flex flex-row items-center justify-start md:justify-center ">
                                                    <img
                                                        src={cyanBox}
                                                        alt="Box"
                                                        className=" mr-4  h-12 w-12 rounded-full object-cover "
                                                    />
                                                    <div className="flex flex-col items-start justify-center space-y-2">
                                                        <div className="w-full truncate text-xl font-extrabold leading-5 tracking-tight ">
                                                            {box.boxType.name}
                                                        </div>

                                                        <div className="flex flex-col items-start justify-center space-y-1">
                                                            <div
                                                                className="flex flex-row items-center space-x-2 cursor-pointer hover:text-accent transition-colors duration-200 group"
                                                                onClick={() =>
                                                                    window.open(
                                                                        `https://explorer.solana.com/tx/${box.buySignature}`
                                                                    )
                                                                }
                                                            >
                                                                <span className="text-sm text-slate-400 group-hover:text-accent">
                                                                    Purchase
                                                                    Transaction
                                                                </span>
                                                                <FaExternalLinkAlt className="w-3 h-3 text-slate-400 group-hover:text-accent" />
                                                            </div>
                                                            {box.claimSignature && (
                                                                <div
                                                                    className="flex flex-row items-center space-x-2 cursor-pointer hover:text-accent transition-colors duration-200 group"
                                                                    onClick={() =>
                                                                        window.open(
                                                                            `https://explorer.solana.com/tx/${box.claimSignature}`
                                                                        )
                                                                    }
                                                                >
                                                                    <span className="text-sm text-slate-400 group-hover:text-accent">
                                                                        Opening
                                                                        Transaction
                                                                    </span>
                                                                    <FaExternalLinkAlt className="w-3 h-3 text-slate-400 group-hover:text-accent" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-72 mt-4 md:mt-0 flex  items-center justify-start md:justify-center  ">
                                                    {box.status ==
                                                    BoxStatus.CLAIMED ? (
                                                        <AnimatedTooltip
                                                            items={box.boxContents.map(
                                                                (object) => ({
                                                                    name: object
                                                                        .token
                                                                        .name,
                                                                    mintAddress:
                                                                        object
                                                                            .token
                                                                            .mint,
                                                                    image: object
                                                                        .token
                                                                        .image,
                                                                })
                                                            )}
                                                        />
                                                    ) : (
                                                        <img
                                                            className=" h-16"
                                                            src={questionMark}
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="w-full self-center pt-4 lg:w-1/6 lg:pt-0">
                                                <div className="ml-1">
                                                    <div className="text-xl font-extrabold leading-5 tracking-tight">
                                                        {new Date(
                                                            box.updatedAt
                                                        ).toLocaleDateString()}
                                                    </div>
                                                    <div className="text-sm text-slate-500">
                                                        {timeDifferenceFromNow(
                                                            new Date(
                                                                box.updatedAt
                                                            )
                                                        ).days > 0
                                                            ? timeDifferenceFromNow(
                                                                  new Date(
                                                                      box.updatedAt
                                                                  )
                                                              ).days +
                                                              ' days ago'
                                                            : timeDifferenceFromNow(
                                                                    new Date(
                                                                        box.updatedAt
                                                                    )
                                                                ).hours > 0
                                                              ? timeDifferenceFromNow(
                                                                    new Date(
                                                                        box.updatedAt
                                                                    )
                                                                ).hours +
                                                                ' hours ago'
                                                              : timeDifferenceFromNow(
                                                                    new Date(
                                                                        box.updatedAt
                                                                    )
                                                                ).minutes +
                                                                ' minutes ago'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full self-center pt-4 lg:w-1/6 lg:pt-0 flex">
                                                <div className="text-xl font-extrabold leading-5 tracking-tight flex-col flex">
                                                    <span className="align-middle">
                                                        {parseFloat(
                                                            lamportsToSol(
                                                                box.boxType
                                                                    .amountLamports
                                                            ).toFixed(4)
                                                        )}{' '}
                                                        SOL
                                                    </span>
                                                    <span className="text-sm font-normal text-slate-500">
                                                        ~{' '}
                                                        {box.initialUsdValue.toFixed(
                                                            2
                                                        )}{' '}
                                                        $
                                                    </span>{' '}
                                                </div>{' '}
                                                {box.claimUsdValue && (
                                                    <div className="ml-1 flex flex-col items-center justify-center        ">
                                                        {' '}
                                                        {box.initialUsdValue <=
                                                        box.claimUsdValue ? (
                                                            <span className="text-[8px] ml-2 rounded bg-green-600 px-2 py-1 align-middle font-bold uppercase text-white">
                                                                Profit
                                                            </span>
                                                        ) : (
                                                            <span className="text-[8px] ml-2 rounded bg-red-600 px-2 py-1 align-middle font-bold uppercase text-white">
                                                                Loss
                                                            </span>
                                                        )}
                                                        <span className="text-sm font-normal text-slate-500">
                                                            {' '}
                                                            {(
                                                                box.claimUsdValue -
                                                                box.initialUsdValue
                                                            ).toFixed(2)}{' '}
                                                            $
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="w-24 items-center justify-center flex">
                                                {box.status ==
                                                BoxStatus.BOUGHT ? (
                                                    <button
                                                        id=""
                                                        onClick={() => {
                                                            setSelectedBoxId(
                                                                box._id
                                                            )
                                                            handleOpenBoxModal()
                                                        }}
                                                        className="bg-muted shadow-inner shadow-accent-dark text-accent
                scale-75 md:scale-100 items-center relative rounded-full flex justify-center group/modal-btn overflow-hidden p-2"
                                                    >
                                                        {' '}
                                                        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 ">
                                                            Open box
                                                        </span>{' '}
                                                        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                                                            <img
                                                                className="w-12"
                                                                src={key}
                                                            />
                                                        </div>
                                                    </button>
                                                ) : (
                                                    // <OpenBoxModal boxId={box._id} />
                                                    <img
                                                        src={key}
                                                        className="h-12 hidden md:block hover:animate-fifth transition-all  ease-in-out cursor-pointer"
                                                    />
                                                )}
                                            </div>
                                        </div>
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
                                className="w-full flex flex-col items-center justify-center space-y-8 py-16"
                            >
                                <img
                                    src={questionMark}
                                    className="w-24 h-24 animate-bounce opacity-50"
                                />
                                <div className="text-center space-y-4">
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
                                        className="px-8 py-3 mt-4 rounded-full bg-gradient-to-r from-accent via-accent-dark to-emerald-500 text-white font-bold transition-all hover:shadow-lg hover:shadow-accent/50"
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
