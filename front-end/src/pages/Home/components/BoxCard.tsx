import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import cyanBox from '../../../assets/boxes/cyan_box.png'
import questionMark from '../../../assets/elements/question_mark.png'
import key from '../../../assets/boxes/key.png'
import { AnimatedTooltip } from '../../../components/ui/AnimatedTooltip'
import { BoxContent, BoxStatus } from '../../../libs/interfaces'
import {
    lamportsToSol,
    shortenAddress,
    timeDifferenceFromNow,
} from '../../../libs/utils'

interface BoxCardProps {
    box: any
    setSelectedBoxId?: (id: string) => void
    handleOpenBoxModal?: () => void
}

const BoxCard: React.FC<BoxCardProps> = ({
    box,
    setSelectedBoxId,
    handleOpenBoxModal,
}) => {
    return (
        <div className="mb-3 flex w-[80%] self-center md:w-full max-w-screen transform flex-col justify-between items-center md:items-start rounded-md bg-background-dark border border-accent/50 hover:border-accent bg-opacity-75 p-2 text-accent transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-dark/50 md:flex-row md:p-4">
            <div className="flex flex-col md:flex-row  justify-center md:justify-start">
                <div className="flex flex-row items-center justify-center">
                    <img
                        src={cyanBox}
                        alt="Box"
                        className="mr-4 h-14 w-14 rounded-full object-cover"
                    />
                    <div className="flex flex-col items-start justify-center space-y-2">
                        <div className="w-full truncate text-xl font-extrabold leading-5 tracking-tight">
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
                            {setSelectedBoxId && handleOpenBoxModal ? (
                                <div className="flex flex-col items-start justify-center space-y-1 md:w-40 ">
                                    <div
                                        className="flex flex-row items-center space-x-2 cursor-pointer hover:text-accent transition-colors duration-200 group"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            window.open(
                                                `https://explorer.solana.com/tx/${box.buySignature}`
                                            )
                                        }}
                                    >
                                        <span className="text-sm text-slate-400 group-hover:text-accent">
                                            Purchase Transaction
                                        </span>
                                        <FaExternalLinkAlt className="w-3 h-3 text-slate-400 group-hover:text-accent" />
                                    </div>
                                    {box.claimSignature && (
                                        <div
                                            className="flex flex-row items-center space-x-2 cursor-pointer hover:text-accent transition-colors duration-200 group"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                window.open(
                                                    `https://explorer.solana.com/tx/${box.claimSignature}`
                                                )
                                            }}
                                        >
                                            <span className="text-sm text-slate-400 group-hover:text-accent">
                                                Opening Transaction
                                            </span>
                                            <FaExternalLinkAlt className="w-3 h-3 text-slate-400 group-hover:text-accent" />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-sm text-slate-500 md:w-40">
                                    Buyer:{' '}
                                    {box.buyer && shortenAddress(box.buyer, 6)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-72 mt-4 md:mt-0 flex items-center justify-center ">
                    {box.status === BoxStatus.CLAIMED || !box.status ? (
                        <AnimatedTooltip
                            items={box.boxContents.map(
                                (object: BoxContent) => ({
                                    name: object.token.name,
                                    mintAddress: object.token.mint,
                                    image: object.token.image,
                                })
                            )}
                        />
                    ) : (
                        <img className="h-16" src={questionMark} />
                    )}
                </div>
            </div>
            <div className="w-full self-center flex justify-center items-center pt-4 lg:w-1/6 lg:pt-0">
                <div className="ml-1">
                    <div className="text-xl  font-extrabold leading-5 tracking-tight">
                        {new Date(box.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="  text-sm text-slate-500 ">
                        {timeDifferenceFromNow(new Date(box.updatedAt)).days ==
                        1
                            ? ' one day ago'
                            : timeDifferenceFromNow(new Date(box.updatedAt))
                                    .days > 0
                              ? timeDifferenceFromNow(new Date(box.updatedAt))
                                    .days + ' days ago'
                              : timeDifferenceFromNow(new Date(box.updatedAt))
                                      .hours > 0
                                ? timeDifferenceFromNow(new Date(box.updatedAt))
                                      .hours + ' hours ago'
                                : timeDifferenceFromNow(new Date(box.updatedAt))
                                      .minutes + ' minutes ago'}
                    </div>
                </div>
            </div>
            <div className="w-full self-center  justify-center items-center  pt-4 lg:w-1/6 lg:pt-0 flex">
                <div className="text-xl font-extrabold leading-5 tracking-tight flex-col flex">
                    <span className="align-middle">
                        {parseFloat(
                            lamportsToSol(box.boxType.amountLamports).toFixed(2)
                        )}{' '}
                        SOL
                    </span>
                    <span className="text-sm font-normal text-slate-500">
                        ~ {box.initialUsdValue.toFixed(2)} $
                    </span>
                </div>
                {box.claimUsdValue && (
                    <div className="ml-1 flex flex-col items-center justify-center text-center">
                        {box.initialUsdValue <= box.claimUsdValue ? (
                            <span className="text-[8px] ml-2 rounded bg-green-600 px-2 py-1 align-middle font-bold uppercase text-white">
                                Profit
                            </span>
                        ) : (
                            <span className="text-[8px] ml-2 rounded bg-red-600 px-2 py-1 align-middle font-bold uppercase text-white">
                                Loss
                            </span>
                        )}
                        <span className="text-sm font-normal text-slate-500 text-center ">
                            {(box.claimUsdValue - box.initialUsdValue).toFixed(
                                2
                            )}{' '}
                            $
                        </span>
                    </div>
                )}
            </div>
            {setSelectedBoxId && handleOpenBoxModal && (
                <div className="w-24 items-center justify-center flex self-center">
                    {box.status === BoxStatus.BOUGHT ? (
                        <button
                            onClick={() => {
                                setSelectedBoxId(box._id)
                                handleOpenBoxModal()
                            }}
                            className="bg-muted w-24 mt-4 shadow-inner px-4 shadow-accent  text-accent items-center relative rounded-full flex justify-center group/modal-btn overflow-hidden p-2"
                        >
                            <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                                Open
                            </span>
                            <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white ">
                                <img className="w-12" src={key} />
                            </div>
                        </button>
                    ) : (
                        <img
                            src={key}
                            className="h-12 hidden md:block hover:animate-fifth transition-all ease-in-out cursor-pointer"
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default BoxCard
