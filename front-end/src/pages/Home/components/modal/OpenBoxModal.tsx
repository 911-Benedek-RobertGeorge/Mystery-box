import { useState } from 'react'

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalTrigger,
} from '../../../../components/ui/AnimatedModal'
import questionMark from '../../../../assets/elements/question_mark.png'
import cyanBox from '../../../../assets/boxes/cyan_box.png'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

import toast from 'react-hot-toast'
import { useNetworkConfiguration } from '../../../../context/Solana/SolNetworkConfigurationProvider'
import { VITE_ENV_BACKEND_URL } from '../../../../libs/config'
import { cn, shortenAddress } from '../../../../libs/utils'

import chillguy from '../../../../assets/coins/chill-guy.png'

import { confetti } from '@tsparticles/confetti'
import { BoxContent, MysteryBox, Token } from '../../../../libs/interfaces'

export function OpenBoxModal({
    boxId,
    hiddenTrigger,
}: {
    boxId?: string
    hiddenTrigger?: boolean
}) {
    const { publicKey, sendTransaction } = useWallet()
    const [hasPendingTransaction, setHasPendingTransaction] = useState(false)
    const { connection } = useConnection()
    const { networkConfiguration } = useNetworkConfiguration()
    const [step, setStep] = useState(0)
    const [latestTxSignature, setLatestTxSignature] = useState<string>('')
    const jwtToken = sessionStorage.getItem('jwtToken')
    const [mysteryBox, setMysteryBox] = useState<MysteryBox>()

    async function openBoughtBox(boxId: string) {
        try {
            if (!publicKey || !jwtToken) {
                toast.prototype('Plase reconnect your wallet')
                throw new Error('JWT Token not found')
            }

            const response = await fetch(
                `${VITE_ENV_BACKEND_URL}/boxes/box/${boxId}/claim`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            )

            const data = await response.json()
            console.log('data', data)
            const box = data.box
            setMysteryBox(box)

            await sleep(1000)

            const images = box.boxContents.map((memeCoin: BoxContent) => ({
                src: memeCoin.token.image,
                width: 32,
                height: 32,
            }))

            await confetti({
                zIndex: 1100,
                spread: 360,
                ticks: 150,
                gravity: 0.8,
                decay: 0.8,
                startVelocity: 30,
                particleCount: 100,
                scalar: 3,
                shapes: ['image'],
                shapeOptions: {
                    image: images,
                },
            })
        } catch (error) {
            console.error('Error opening the box transaction:', error)
        }
    }

    return (
        <div className=" h-full  absolute  flex items-center justify-center z-[105]">
            <Modal>
                <ModalTrigger
                    className={cn(
                        'bg-muted shadow-inner shadow-accent-dark text-accent scale-75 md:scale-100 items-center relative rounded-full flex justify-center group/modal-btn',
                        hiddenTrigger ? 'hidden' : ''
                    )}
                >
                    {boxId && (
                        <>
                            <span
                                id="open-box-modal-button"
                                className="group-hover/modal-btn:translate-x-40 text-center transition duration-500"
                                onClick={() => openBoughtBox(boxId)}
                            >
                                Open memebox
                            </span>
                            <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                                <img className="w-8" src={questionMark} />
                            </div>
                        </>
                    )}
                </ModalTrigger>
                <ModalBody className="z-[200] bg-background-dark w-full shadow-inner rounded-t-xl  shadow-cyan-600">
                    <ModalContent className="">
                        <div className="w-full h-full flex flex-col items-center justify-center m-auto">
                            {!mysteryBox ? (
                                <>
                                    {' '}
                                    Do not close this window or refresh page!
                                    <img
                                        src={questionMark}
                                        className="animate-ping w-32"
                                    />
                                </>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                    {mysteryBox?.boxContents.map((content) => (
                                        <div
                                            key={content._id}
                                            className="flex items-center bg-gradient-to-r from-accent-dark  via-background  to-transparent rounded-xl shadow-lg p-4 hover:scale-105 transition-transform duration-200"
                                        >
                                            <img
                                                src={content.token.image}
                                                alt={content.token.name}
                                                className="w-12 h-12 rounded-full border-2 border-cyan-400 mr-4"
                                            />
                                            <div className="flex flex-col">
                                                <div className="text-lg font-semibold text-white mb-1">
                                                    {content.token.name}
                                                </div>
                                                <div className="text-sm text-cyan-200 font-medium">
                                                    {content.token.symbol}
                                                </div>
                                                <div className="text-xs text-gray-300 truncate">
                                                    <span className="font-semibold text-gray-400">
                                                        Mint:
                                                    </span>{' '}
                                                    {shortenAddress(
                                                        content.token.mint,
                                                        6
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-300">
                                                    <span className="font-semibold text-gray-400">
                                                        Percentage:
                                                    </span>{' '}
                                                    {content.percentage}%
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    )
}
