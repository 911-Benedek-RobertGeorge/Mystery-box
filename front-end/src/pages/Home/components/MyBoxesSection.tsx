import React, { useEffect, useState } from 'react'

import { BoxStatus, MysteryBox } from '../../../libs/interfaces'
import { VITE_ENV_BACKEND_URL } from '../../../libs/config'
import { useWallet } from '@solana/wallet-adapter-react'
import { OpenBoxModal } from './modal/OpenBoxModal'
import cyanBox from '../../../assets/boxes/cyan_box-Photoroom.png'
import { AnimatedTooltip } from '../../../components/ui/AnimatedTooltip'
import { lamportsToSol, timeDifferenceFromNow } from '../../../libs/utils'
import questionMark from '../../../assets/elements/question_mark.png'
import { FaExternalLinkAlt } from 'react-icons/fa'

const ITEMS_PER_PAGE = 3 // Number of items to show initially

const MyBoxesSection: React.FC = () => {
    const [myBoxes, setMyBoxes] = React.useState<MysteryBox[]>()
    const { publicKey } = useWallet()
    const [selectedBoxId, setSelectedBoxId] = React.useState<string>('')
    const jwtToken = sessionStorage.getItem('jwtToken')
    const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE)

    // Function to handle showing more items
    const showMore = () => {
        setVisibleItems((prev) => prev + ITEMS_PER_PAGE)
    }

    // Function to handle showing less items
    const showLess = () => {
        setVisibleItems(ITEMS_PER_PAGE)
    }

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
    }, [publicKey, jwtToken])

    const handleOpenBoxModal = () => {
        const button = document.getElementById('open-box-modal-button')
        if (button) {
            button.click()
        }
    }
    return (
        <>
            {!publicKey ? (
                <div className="text-2xl font-bold text-center text-secondary items-center justify-center"></div>
            ) : (
                <div
                    id="my-boxes"
                    className="flex flex-col justify-start items-center p-10 md:px-64"
                >
                    <div className="flex justify-start items-start w-full">
                        <span className="text-3xl font-bold text-accent p-2 mb-4">
                            My boxes ({myBoxes?.length})
                        </span>
                    </div>
                    <div className="flex flex-col w-full items-start justify-start max-h-[40rem] overflow-y-auto pr-4 md:pr-12 md:pt-8">
                        {myBoxes && myBoxes.length > 0 ? (
                            myBoxes?.map((box, index) => {
                                return (
                                    <div
                                        key={index}
                                        className=" z-[55] mb-3  flex w-full max-w-screen transform cursor-pointer flex-col justify-between items-start md:items-center rounded-md bg-background-light bg-opacity-75 p-6 text-accent transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-dark md:flex-row md:p-4"
                                    >
                                        <img
                                            src={cyanBox}
                                            alt="Box"
                                            className="w-16 h-16 md:w-24 md:h-24 mr-4"
                                        />
                                        <div className="flex flex-col items-start justify-center">
                                            <div className="w-full truncate text-xl font-extrabold leading-5 tracking-tight">
                                                {box.boxType.name}
                                            </div>
                                            <p className="text-sm text-slate-500">
                                                {box._id}
                                            </p>{' '}
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

                                        {box.status == BoxStatus.CLAIMED ? (
                                            <div className="mt-4 md:mt-0 flex flex-row items-center justify-start md:justify-center  ">
                                                <AnimatedTooltip
                                                    items={box.boxContents.map(
                                                        (object) => ({
                                                            name: object.token
                                                                .name,
                                                            mintAddress:
                                                                object.token
                                                                    .mint,
                                                            image: object.token
                                                                .image,
                                                        })
                                                    )}
                                                />
                                            </div>
                                        ) : (
                                            <img
                                                className=" h-16"
                                                src={questionMark}
                                            />
                                        )}
                                        {/* {box._id}
                                        <div>
                                            {box._id == selectedBoxId &&
                                                'SELECTED'}
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedBoxId(box._id)
                                            }}
                                            className="z-[100] mt-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark"
                                        >
                                            Select Box
                                        </button> */}
                                        <div className="w-full self-center pt-4 lg:w-1/6 lg:pt-0">
                                            <div className="ml-1">
                                                <div className="text-xl font-extrabold leading-5 tracking-tight">
                                                    {new Date(
                                                        box.updatedAt
                                                    ).toLocaleDateString()}
                                                </div>
                                                <div className="text-sm text-slate-500">
                                                    {timeDifferenceFromNow(
                                                        new Date(box.updatedAt)
                                                    ).hours > 0
                                                        ? timeDifferenceFromNow(
                                                              new Date(
                                                                  box.updatedAt
                                                              )
                                                          ).hours + ' hours ago'
                                                        : timeDifferenceFromNow(
                                                              new Date(
                                                                  box.updatedAt
                                                              )
                                                          ).minutes +
                                                          ' minutes ago'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full self-center pt-4 lg:w-1/6 lg:pt-0">
                                            <div className="ml-1">
                                                <div className="text-xl font-extrabold leading-5 tracking-tight">
                                                    <span className="align-middle">
                                                        {parseFloat(
                                                            lamportsToSol(
                                                                box.boxType
                                                                    .amountLamports
                                                            ).toFixed(4)
                                                        )}{' '}
                                                        SOL
                                                    </span>
                                                    <span className="text-[8px] ml-2 rounded bg-green-600 px-2 py-1 align-middle font-bold uppercase text-white">
                                                        Paid
                                                    </span>
                                                </div>
                                                <div className="text-sm text-slate-500">
                                                    Total Paid{' '}
                                                    {(
                                                        box.solPrice *
                                                        lamportsToSol(
                                                            box.boxType
                                                                .amountLamports
                                                        )
                                                    ).toFixed(2)}
                                                    USD
                                                </div>
                                            </div>
                                        </div>
                                        {box.status == BoxStatus.BOUGHT && (
                                            <button
                                                id=""
                                                onClick={() => {
                                                    console.log('button')
                                                    setSelectedBoxId(box._id)
                                                    handleOpenBoxModal()
                                                }}
                                                className="bg-muted shadow-inner shadow-accent-dark text-accent
                scale-75 md:scale-100 items-center relative rounded-full flex justify-center group/modal-btn overflow-hidden p-2"
                                            >
                                                Open box
                                                {/* <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                                                    <img
                                                        className="w-8"
                                                        src={questionMark}
                                                    />
                                                </div> */}
                                            </button>
                                            // <OpenBoxModal boxId={box._id} />
                                        )}
                                    </div>
                                )
                            })
                        ) : (
                            <div>
                                <span className="text-accent text-xl">
                                    You don't own any box, why dont you buy one?
                                </span>
                            </div>
                        )}
                    </div>
                    <OpenBoxModal hiddenTrigger={true} boxId={selectedBoxId} />
                </div>
            )}
        </>
    )
}

export default MyBoxesSection
