import React, { useEffect } from 'react'

import { BoxStatus, MysteryBox } from '../../../libs/interfaces'
import { VITE_ENV_BACKEND_URL } from '../../../libs/config'
import { useWallet } from '@solana/wallet-adapter-react'
import { OpenBoxModal } from './modal/OpenBoxModal'
import cyanBox from '../../../assets/boxes/cyan_box.png'
import { AnimatedTooltip } from '../../../components/ui/AnimatedTooltip'
import { lamportsToSol, timeDifferenceFromNow } from '../../../libs/utils'
import questionMark from '../../../assets/elements/question_mark.png'
import { FaExternalLinkAlt } from 'react-icons/fa'

const MyBoxesSection: React.FC = () => {
    const [myBoxes, setMyBoxes] = React.useState<MysteryBox[]>()
    const { publicKey } = useWallet()
    const [selectedBoxId, setSelectedBoxId] = React.useState<string>('')
    const jwtToken = sessionStorage.getItem('jwtToken')

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
        console.log('open box modal', selectedBoxId)
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
                                        <div className="flex flex-row justify-center space-x-4   ">
                                            <img
                                                src={cyanBox}
                                                className="z-10 h-12 w-12 rounded-full object-cover shadow hover:shadow-xl"
                                                alt="mistery box"
                                            />
                                            {box.status == BoxStatus.BOUGHT && (
                                                <span className="absolute right-0 top-0 z-20 flex h-3 w-3">
                                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                                                    <span className="relative inline-flex h-3 w-3 rounded-full bg-accent-light"></span>
                                                </span>
                                            )}{' '}
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
                                            <div className="w-72 mt-4 md:mt-0 flex flex-row items-center justify-start md:justify-center">
                                                <img
                                                    className=" h-16"
                                                    src={questionMark}
                                                />
                                            </div>
                                        )}

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
                                                id="open-box-button"
                                                onClick={() => {
                                                    setSelectedBoxId(box._id)
                                                }}
                                                className="bg-muted shadow-inner shadow-accent-dark text-accent
                scale-75 md:scale-100 items-center relative rounded-full flex justify-center group/modal-btn overflow-hidden p-2"
                                            >
                                                Open box
                                            </button>
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
