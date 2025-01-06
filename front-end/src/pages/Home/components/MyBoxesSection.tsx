import React, { useEffect, useState } from 'react'

import { BoxStatus, MysteryBox } from '../../../libs/interfaces'
import { VITE_ENV_BACKEND_URL } from '../../../libs/config'
import { useWallet } from '@solana/wallet-adapter-react'
import { OpenBoxModal } from './modal/OpenBoxModal'
import cyanBox from '../../../assets/boxes/cyan_box.png'
import { AnimatedTooltip } from '../../../components/ui/AnimatedTooltip'
import { lamportsToSol, timeDifferenceFromNow } from '../../../libs/utils'
import questionMark from '../../../assets/elements/question_mark.png'
import { FaExternalLinkAlt } from 'react-icons/fa'
import key from '../../../assets/boxes/key.png'
import smile from '../../../assets/shapes/smile.png'
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
                    className="  relative flex flex-col justify-start items-center p-10 xl:px-64 pb-64 pt-0"
                >
                    <div className="flex justify-start items-start w-full">
                        <span className="text-3xl font-bold text-accent p-2 mb-4">
                            My boxes ({myBoxes?.length})
                        </span>
                    </div>
                    <div className="absolute inset-0 w-full h-full z-0">
                        {' '}
                        <div className="absolute inset-0 h-1/2 bg-gradient-to-r from-black via-accent to-black opacity-5  "></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-backgorund-dark to-background-dark opacity-10"></div>{' '}
                    </div>
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

                                                        <div
                                                            className="flex flex-row space-x-2 cursor-pointer"
                                                            onClick={() =>
                                                                window.open(
                                                                    `https://explorer.solana.com/tx/${box.claimSignature ? box.claimSignature : box.buySignature}`
                                                                )
                                                            }
                                                        >
                                                            <span className="text-sm text-slate-400">
                                                                {box.status}{' '}
                                                            </span>
                                                            <FaExternalLinkAlt />
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
                            <div>
                                <span className="text-accent text-xl">
                                    You don't own any box, why dont you buy one?
                                </span>
                            </div>
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
