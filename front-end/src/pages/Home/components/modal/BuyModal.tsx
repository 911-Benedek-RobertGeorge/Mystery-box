import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from '../../../../components/ui/AnimatedModal'
import questionMark from '../../../../assets/elements/question_mark.png'
import cyanBox from '../../../../assets/boxes/cyan_box.png'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import {
    Commitment,
    Transaction,
    TransactionConfirmationStrategy,
} from '@solana/web3.js'
import toast from 'react-hot-toast'
import { Buffer } from 'buffer'
import { useNetworkConfiguration } from '../../../../context/Solana/SolNetworkConfigurationProvider'
import { VITE_ENV_BACKEND_URL } from '../../../../libs/config'
import { SOLANA_EXPLORER_URL } from '../../../../libs/constants'
import { BoxType } from '../../../../libs/interfaces'
import {
    WalletConnectButton,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'

export function BuyModal({ box }: { box: BoxType | null }) {
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

    const [boughtBoxId, setBoughtBoxId] = useState<string | null>(null)

    const buyMysteryBox = async () => {
        setStep(1)
        setOpenBuyBoxModal(true)

        try {
            if (!box) {
                throw new Error('Box not found')
            }
            if (!publicKey) {
                throw new Error('Wallet not connected')
            }

            const response = await fetch(
                `${VITE_ENV_BACKEND_URL}/boxes/${box?._id}/wallet/${publicKey?.toBase58()}/open`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            )

            if (!response.ok) {
                throw new Error(
                    'Failed to fetch the backend to get the transaction'
                )
            }

            const transactionEncoded = (await response.json())
                .transactionEncoded

            setStep(2)
            const transactionBuffer = Buffer.from(transactionEncoded, 'base64')
            const transactionObject = Transaction.from(transactionBuffer)

            // if (!hasBackendSignedTransaction(transactionObject)) {
            //     throw new Error(
            //         'Backend has not partial signed the transaction'
            //     )
            // }

            setStep(3)
            const txSignature = await sendAndConfirmTransaction({
                transaction: transactionObject,
            })
            if (!txSignature) return

            await indexTransaction(txSignature)

            setOpenBuyBoxModal(false)
        } catch (error) {
            toast.error('Error buying mystery box' + error)
            console.error('Error buying mystery box:', error)
            setOpenBuyBoxModal(false)
        }
    }

    async function indexTransaction(signature: string) {
        try {
            console.log('indexTransaction', signature)
            if (!jwtToken) throw new Error('JWT token not found ')
            const encodedSignature = Buffer.from(signature, 'utf-8').toString(
                'base64'
            )
            console.log('encodedSignature', encodedSignature, {
                signature: encodedSignature,
            })
            const response = await fetch(`${VITE_ENV_BACKEND_URL}/index`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({ signature: signature }),
            })

            if (!response.ok) {
                throw new Error('Failed to index the transaction')
            }
            setStep(6)

            const result = await response.json()
            if (result.message) {
                console.error(result.message)
                return
            }
            console.log('indexTransaction result', result)

            setBoughtBoxId(result.boxId)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Error indexing transaction' + error.message)
            } else {
                toast.error('Error indexing transaction')
            }
            console.error('Error indexing transaction:', error)
        }
    }

    async function sendAndConfirmTransaction({
        transaction,
    }: {
        transaction: Transaction
    }): Promise<string | false> {
        try {
            if (!publicKey) {
                throw new Error('Wallet not connected')
            }

            const latestBlockhash = await connection.getLatestBlockhash()
            transaction.recentBlockhash = latestBlockhash.blockhash
            transaction.feePayer = publicKey
            setHasPendingTransaction(true)

            const txSignature = await sendTransaction(transaction, connection, {
                skipPreflight: true,
            })
            setLatestTxSignature(txSignature)

            setStep(4)
            const strategy: TransactionConfirmationStrategy = {
                signature: txSignature,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            }

            const confirmationPromise = connection.confirmTransaction(
                strategy,
                'finalized' as Commitment
            )

            toast.promise(confirmationPromise, {
                loading: 'Processing Transaction',
                success: () => (
                    <a
                        href={`${SOLANA_EXPLORER_URL}/tx/${txSignature}?cluster=${networkConfiguration}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: 'underline' }}
                    >
                        View on Solana explorer
                    </a>
                ),
                error: (err) => `Transaction failed: ${err.message}`,
            })

            setStep(5)
            const result = await confirmationPromise
            setHasPendingTransaction(false)

            if (result.value.err) {
                return false
            }

            return txSignature
        } catch (error) {
            setHasPendingTransaction(false)
            console.error('Error sending and confirming transaction:', error)
            throw error
        }
    }

    async function openBoughtBox(boxId: string) {
        try {
            const response = await fetch(
                `${VITE_ENV_BACKEND_URL}/boxes/${boxId}/claim`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            )
            console.log((await response) + 'response claim')
            const transactionEncoded = (await response.json())
                .transactionEncoded

            const transactionBuffer = Buffer.from(transactionEncoded, 'base64')
            const transactionObject = Transaction.from(transactionBuffer)

            // if (!hasBackendSignedTransaction(transactionObject)) {
            //     throw new Error(
            //         'Backend has not partial signed the transaction'
            //     )
            // }

            const txSignature = await sendAndConfirmTransaction({
                transaction: transactionObject,
            })
            console.log('OPEN BOX txSignature', txSignature)
        } catch (error) {
            console.error('Error opening the box transaction:', error)
        }
    }

    return (
        <div className=" py-40 flex items-center justify-center">
            {publicKey ? (
                <Modal>
                    <ModalTrigger
                        className="bg-muted shadow-inner shadow-accent-dark text-accent
                scale-75 md:scale-100 items-center relative rounded-full flex justify-center group/modal-btn"
                    >
                        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 ">
                            Buy memebox
                        </span>{' '}
                        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                            <img className="w-8" src={questionMark} />
                        </div>
                    </ModalTrigger>
                    <ModalBody className="z-[200]  bg-background-dark w-full shadow-inner rounded-t-xl  shadow-cyan-600    ">
                        <ModalContent className="   ">
                            <div className="">
                                <div className="">
                                    <h4 className="text-lg md:text-2xl text-accent-dark  font-bold text-center mb-8">
                                        {step < 6 ? 'Buy ' : 'Open '} box{' '}
                                        <span className="px-1 py-0.5 rounded-md bg-accent-dark/50 border border-accent text-accent">
                                            {box?.name}
                                        </span>{' '}
                                        now!
                                    </h4>
                                    <div className="flex justify-center items-center">
                                        {images.map((image, idx) => (
                                            <motion.div
                                                key={'images' + idx}
                                                style={{
                                                    rotate:
                                                        Math.random() * 30 - 10,
                                                }}
                                                whileHover={{
                                                    scale: 1.1,
                                                    rotate: 0,
                                                    zIndex: 100,
                                                }}
                                                whileTap={{
                                                    scale: 1.1,
                                                    rotate: 0,
                                                    zIndex: 100,
                                                }}
                                                className="rounded-xl -mr-4 mt-4  bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-accent flex-shrink-0 overflow-hidden"
                                            >
                                                <img
                                                    src={image}
                                                    alt="box image"
                                                    width="500"
                                                    height="500"
                                                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
                                        <div className="flex items-center justify-center">
                                            <input
                                                onChange={(e) =>
                                                    setReadAndAgreeWithTerms(
                                                        e.target.checked
                                                    )
                                                }
                                                type="checkbox"
                                                id="terms"
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="text-neutral-200 dark:text-neutral-400 text-sm"
                                            >
                                                I have read and agree with the{' '}
                                                <a
                                                    href="/terms-and-conditions"
                                                    target="_blank"
                                                    className="text-accent underline"
                                                >
                                                    terms and conditions
                                                </a>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <span className="text-neutral-200 dark:text-neutral-400 text-sm">
                                                Price: 0.2 SOL
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <span className="text-neutral-200 dark:text-neutral-400 text-sm">
                                                Possible rewards: ///TODO how to
                                                get these?
                                                <ul className="list-disc pl-5">
                                                    <li className="text-neutral-200 dark:text-neutral-400 text-sm">
                                                        DogeCoin
                                                    </li>
                                                    <li className="text-neutral-200 dark:text-neutral-400 text-sm">
                                                        Shiba Inu
                                                    </li>
                                                    <li className="text-neutral-200 dark:text-neutral-400 text-sm">
                                                        PepeCoin
                                                    </li>
                                                    <li className="text-neutral-200 dark:text-neutral-400 text-sm">
                                                        Floki Inu
                                                    </li>
                                                </ul>
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <span className="text-neutral-200 dark:text-neutral-400 text-sm">
                                                Limited Edition Box
                                            </span>
                                        </div>
                                    </div>{' '}
                                </div>
                            </div>
                        </ModalContent>
                        <ModalFooter className="gap-4 bg-neutral-950 flex items-center justify-center">
                            <button
                                onClick={buyMysteryBox}
                                className=" text-sm px-2 py-1 rounded-md shadow-inner shadow-accent-dark border border-accent-dark  w-28 disabled:bg-muted disabled:border-0 disabled:cursor-not-allowed disabled:shadow-none "
                                disabled={!readAndAgreeWithTerms}
                            >
                                Buy box{' '}
                            </button>

                            {boughtBoxId && (
                                <button
                                    onClick={() =>
                                        openBoughtBox(boughtBoxId as string)
                                    }
                                    className=" text-sm px-2 py-1 rounded-md shadow-inner shadow-accent-dark border border-accent-dark  w-28 disabled:bg-muted disabled:border-0 disabled:cursor-not-allowed disabled:shadow-none "
                                    disabled={!readAndAgreeWithTerms}
                                >
                                    Open Box Now ! 🎉
                                </button>
                            )}
                            <button
                                onClick={() =>
                                    indexTransaction(latestTxSignature)
                                }
                            >
                                index transaction{' '}
                            </button>
                        </ModalFooter>
                    </ModalBody>
                </Modal>
            ) : (
                <span className="text-accent-dark">
                    Please Connect wallet to buy{' '}
                </span>
            )}
        </div>
    )
}
