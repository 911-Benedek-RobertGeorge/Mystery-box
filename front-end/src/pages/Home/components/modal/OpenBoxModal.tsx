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
import { cn } from '../../../../libs/utils'
import key from '../../../../assets/boxes/key.png'
import box from '../../../../assets/boxes/cyan_box-Photoroom.png'
import chillguy from '../../../../assets/coins/chill-guy.png'

import { confetti } from '@tsparticles/confetti'
import { MysteryBox } from '../../../../libs/interfaces'

export function OpenBoxModal({
    boxId,
    hiddenTrigger,
}: {
    boxId?: string
    hiddenTrigger?: boolean
}) {
    const images = [cyanBox]
    const [readAndAgreeWithTerms, setReadAndAgreeWithTerms] = useState(false)

    const { publicKey, sendTransaction } = useWallet()
    const [openBuyBoxModal, setOpenBuyBoxModal] = useState(false)
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

            setMysteryBox(data.box)

            //    await sleep(1000)

            await confetti({
                zIndex: 1100,
                spread: 360,
                ticks: 120,
                gravity: 0.8,
                decay: 0.8,
                startVelocity: 30,
                particleCount: 100,
                scalar: 3,
                shapes: ['image'],
                shapeOptions: {
                    image: [
                        {
                            src: chillguy,
                            width: 32,
                            height: 32,
                        },
                        {
                            src: chillguy,
                            width: 32,
                            height: 32,
                        },
                        {
                            src: chillguy,
                            width: 32,
                            height: 32,
                        },
                        {
                            src: chillguy,
                            width: 32,
                            height: 32,
                        },
                    ],
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
                    <span
                        id="open-box-modal-button"
                        className="group-hover/modal-btn:translate-x-40 text-center transition duration-500"
                        onClick={() => openBoughtBox(boxId ?? '')}
                    >
                        Open memebox
                    </span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        <img className="w-8" src={questionMark} />
                    </div>
                </ModalTrigger>
                <ModalBody className="z-[200] bg-background-dark w-full shadow-inner rounded-t-xl  shadow-cyan-600">
                    <ModalContent className="">
                        <div className="w-full h-full flex items-center justify-center m-auto">
                            {!mysteryBox ? (
                                <img
                                    src={questionMark}
                                    className="animate-ping w-32"
                                />
                            ) : (
                                <>
                                    <a href={mysteryBox?.claimSignature}>
                                        {' '}
                                        {mysteryBox?.claimSignature}{' '}
                                    </a>
                                    <img
                                        src={
                                            mysteryBox.boxContents[0].token
                                                .image
                                        }
                                        className="w-32"
                                    />
                                    {mysteryBox.boxContents[0].token.name}
                                    {mysteryBox.boxContents[0].token.symbol}
                                    {mysteryBox.boxContents[0].token.mint}
                                </>
                            )}
                        </div>
                    </ModalContent>
                    {/* <ModalFooter className="gap-4 bg-neutral-950 flex items-center justify-center">
                        {boxId && (
                            <button
                                onClick={() => openBoughtBox(boxId)}
                                className="text-accent text-sm px-2 py-1 rounded-md shadow-inner shadow-accent-dark border border-accent-dark   disabled:bg-muted disabled:border-0 disabled:cursor-not-allowed disabled:shadow-none "
                                disabled={!readAndAgreeWithTerms}
                            >
                                Open Box Now ! 🎉
                            </button>
                        )}
                    </ModalFooter> */}
                </ModalBody>
            </Modal>
        </div>
    )
}
