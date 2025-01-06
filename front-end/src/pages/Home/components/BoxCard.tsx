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
        <div className="z-[55] mb-3 flex w-full max-w-screen transform flex-col justify-between items-start md:items-center rounded-md bg-background-light bg-opacity-75 p-6 text-accent transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-dark md:flex-row md:p-4">
            <div className="flex flex-col md:flex-row space-x-4">
                <div className="flex flex-row items-center justify-start md:justify-center">
                    <img
                        src={cyanBox}
                        alt="Box"
                        className="mr-4 h-12 w-12 rounded-full object-cover"
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
                                <>
                                    {' '}
                                    <span className="text-sm text-slate-400">
                                        {box.status}{' '}
                                    </span>
                                    <FaExternalLinkAlt />{' '}
                                </>
                            ) : (
                                <div className="text-sm text-slate-500">
                                    Buyer:{' '}
                                    {box.buyer && shortenAddress(box.buyer, 6)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-72 mt-4 md:mt-0 flex items-center justify-start md:justify-center">
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
            <div className="w-full self-center pt-4 lg:w-1/6 lg:pt-0">
                <div className="ml-1">
                    <div className="text-xl font-extrabold leading-5 tracking-tight">
                        {new Date(box.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-slate-500">
                        {timeDifferenceFromNow(new Date(box.updatedAt)).hours >
                        0
                            ? timeDifferenceFromNow(new Date(box.updatedAt))
                                  .hours + ' hours ago'
                            : timeDifferenceFromNow(new Date(box.updatedAt))
                                  .minutes + ' minutes ago'}
                    </div>
                </div>
            </div>
            <div className="w-full self-center pt-4 lg:w-1/6 lg:pt-0 flex">
                <div className="text-xl font-extrabold leading-5 tracking-tight flex-col flex">
                    <span className="align-middle">
                        {parseFloat(
                            lamportsToSol(box.boxType.amountLamports).toFixed(4)
                        )}{' '}
                        SOL
                    </span>
                    <span className="text-sm font-normal text-slate-500">
                        ~ {box.initialUsdValue.toFixed(2)} $
                    </span>
                </div>
                {box.claimUsdValue && (
                    <div className="ml-1 flex flex-col items-center justify-center">
                        {box.initialUsdValue <= box.claimUsdValue ? (
                            <span className="text-[8px] ml-2 rounded bg-green-600 px-2 py-1 align-middle font-bold uppercase text-white">
                                Profit
                            </span>
                        ) : (
                            <span className="text-[8px] ml-2 rounded bg-red-600 px-2 py-1 align-middle font-bold uppercase text-white">
                                Loss
                            </span>
                        )}
                        <span className="text-sm font-normal text-slate-500">
                            {(box.claimUsdValue - box.initialUsdValue).toFixed(
                                2
                            )}{' '}
                            $
                        </span>
                    </div>
                )}
            </div>
            {setSelectedBoxId && handleOpenBoxModal && (
                <div className="w-24 items-center justify-center flex">
                    {box.status === BoxStatus.BOUGHT ? (
                        <button
                            onClick={() => {
                                setSelectedBoxId(box._id)
                                handleOpenBoxModal()
                            }}
                            className="bg-muted shadow-inner shadow-accent-dark text-accent scale-75 md:scale-100 items-center relative rounded-full flex justify-center group/modal-btn overflow-hidden p-2"
                        >
                            <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                                Open box
                            </span>
                            <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
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
