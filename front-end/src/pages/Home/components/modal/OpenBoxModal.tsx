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
import { useWallet } from '@solana/wallet-adapter-react'

import toast from 'react-hot-toast'
import { useNetworkConfiguration } from '../../../../context/Solana/SolNetworkConfigurationProvider'
import { VITE_ENV_BACKEND_URL } from '../../../../libs/config'
import { cn, shortenAddress } from '../../../../libs/utils'

import { confetti } from '@tsparticles/confetti'
import { BoxContent, MysteryBox } from '../../../../libs/interfaces'
import { SOLANA_EXPLORER_URL } from '../../../../libs/constants'
import { FaExternalLinkAlt } from 'react-icons/fa'

export function OpenBoxModal({
    boxId,
    hiddenTrigger,
    setHasPendingTransaction,
}: {
    boxId?: string
    hiddenTrigger?: boolean
    setHasPendingTransaction?: (value: boolean) => void
}) {
    const { publicKey } = useWallet()
    const { networkConfiguration } = useNetworkConfiguration()

    const jwtToken = sessionStorage.getItem('jwtToken')
    const [mysteryBox, setMysteryBox] = useState<MysteryBox>()
    const [closeModal, setCloseModal] = useState(false)

    async function openBoughtBox(boxId: string) {
        try {
            setCloseModal(false)

            if (!publicKey || !jwtToken) {
                toast.prototype('Plase reconnect your wallet')
                throw new Error('JWT Token not found')
            }
            setHasPendingTransaction && setHasPendingTransaction(true)
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

            if (data.message) {
                toast.error(data.message)
                setCloseModal(true)
                throw new Error(data.message)
            }
            const box = data.box
            setMysteryBox(box)

            const images = box.boxContents.map((memeCoin: BoxContent) => ({
                src: memeCoin.token.image,
                width: 32,
                height: 32,
            }))

            await confetti({
                zIndex: 1100,
                spread: 360,
                ticks: 200,

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
        } finally {
            setHasPendingTransaction && setHasPendingTransaction(false)
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
                <ModalBody
                    closeModal={closeModal}
                    className="z-[200] bg-background-dark w-full shadow-inner rounded-t-xl  shadow-cyan-600 py-4  md:max-w-[60%] xl:max-w-[40%]"
                >
                    <div className="text-center text-accent/80 text-lg mt-2 font-light w-[80%] mx-auto">
                        {mysteryBox && (
                            <div className="text-center mt-4 space ">
                                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent   to-emerald-400 ">
                                    🎉 Congratulations! 🎉
                                </h2>
                                <p className="text-lg text-accent">
                                    You've unlocked these meme treasures!
                                </p>
                                <div className="flex flex-row items-center justify-center text-accent">
                                    Worth{' '}
                                    <p className="  font-semibold text-accent-secondary ml-2">
                                        {mysteryBox.claimUsdValue.toFixed(2)} $
                                    </p>{' '}
                                </div>
                                <a
                                    href={`${SOLANA_EXPLORER_URL}tx/${mysteryBox.claimSignature}?cluster=${networkConfiguration}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent underline hover:text-cyan-600 transition-colors duration-200 flex flex-row space-x-2 items-center justify-center"
                                >
                                    <p> View on chain </p>
                                    <FaExternalLinkAlt className="  w-4 " />{' '}
                                </a>
                            </div>
                        )}{' '}
                    </div>
                    <ModalContent className=" ">
                        <div className="  h-full flex flex-col items-center justify-center m-auto    ">
                            {!mysteryBox ? (
                                <div className="flex flex-col items-center justify-between h-96">
                                    <img
                                        src={questionMark}
                                        className="animate-ping w-32 mt-12"
                                    />{' '}
                                    <span className="text-red-600 bottom-0">
                                        Do not close this window or refresh
                                        page!
                                    </span>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4  max-h-80 md:max-h-96 overflow-y-auto mb-4 p-4">
                                    {mysteryBox?.boxContents.map(
                                        (content, index) => (
                                            <MemeCoinDetailsCard
                                                key={index}
                                                content={content}
                                            />
                                        )
                                    )}{' '}
                                </div>
                            )}
                        </div>
                    </ModalContent>{' '}
                </ModalBody>{' '}
            </Modal>
        </div>
    )
}

function MemeCoinDetailsCard({ content }: { content: BoxContent }) {
    return (
        <div
            onClick={() =>
                window.open(
                    `${SOLANA_EXPLORER_URL + 'address/' + content.token.mint}?cluster=mainnet-beta`,
                    '_blank'
                )
            }
            key={content._id}
            className=" h-32 flex items-center hover:cursor-pointer border  border-accent-secondary/20 shadow-inner hover:shadow-accent/80 shadow-accent/40 rounded-xl p-4 hover:scale-105 transition-transform duration-200"
        >
            <div className="flex flex-col items-center justify-center mr-2 w-14">
                <img
                    src={content.token.image}
                    alt={content.token.name}
                    className="w-12 h-12 rounded-full border-2 border-cyan-400  "
                />
                <div className="text-sm text-cyan-200 font-normal">
                    {content.token.symbol}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="text-lg font-semibold text-white mb-1">
                    {content.token.name}
                </div>
                <div className="text-xs text-gray-300 truncate">
                    <span className="font-semibold text-gray-400">Mint:</span>{' '}
                    {shortenAddress(content.token.mint, 6)}
                </div>
                <div className="text-xs text-gray-300">
                    <span className="font-semibold text-gray-400">Amount:</span>{' '}
                    {(
                        parseInt(content.amount, 10) /
                        10 ** content.token.decimals
                    ).toFixed(2)}
                </div>
                <div className="text-xs text-gray-300">
                    <span className="font-semibold text-gray-400">
                        Percentage:
                    </span>{' '}
                    {content.percentage}%
                </div>
            </div>
        </div>
    )
}
