import { useState } from 'react'
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
import { Transaction } from '@solana/web3.js'
import toast, { LoaderIcon } from 'react-hot-toast'
import { Buffer } from 'buffer'
import { useNetworkConfiguration } from '../../../../context/Solana/SolNetworkConfigurationProvider'
import { VITE_ENV_BACKEND_URL } from '../../../../libs/config'
import {
    SERVICE_TAX_PERCENTAGE,
    SOLANA_EXPLORER_URL,
} from '../../../../libs/constants'
import { BoxType } from '../../../../libs/interfaces'
import { lamportsToSol, scrollToSection } from '../../../../libs/utils'
import { FaCheckCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export function BuyModal({
    box,
    setHasPendingTransaction,
}: {
    box: BoxType | null
    setHasPendingTransaction: (value: boolean) => void
}) {
    const images = [cyanBox]

    const solanaPrice = useSelector(
        (state: { solana: { price: number } }) => state.solana.price
    )
    const { publicKey, sendTransaction } = useWallet()
    const { connection } = useConnection()
    const { networkConfiguration } = useNetworkConfiguration()
    const [step, setStep] = useState(0)
    const [latestTxSignature, setLatestTxSignature] = useState<string>('')
    const jwtToken = sessionStorage.getItem('jwtToken')
    const [boughtBoxId, setBoughtBoxId] = useState<string | null>(null)

    const buyMysteryBox = async () => {
        setStep(1)
        let attempts = 0
        const maxAttempts = 3

        while (attempts < maxAttempts) {
            try {
                if (!box || !box._id) throw new Error('Box not found')
                if (!publicKey) throw new Error('Wallet not connected')
                if (!jwtToken) throw new Error('JWT token not found, re-login')

                const response = await fetch(
                    `${VITE_ENV_BACKEND_URL}/boxes/box-type/${box._id}/buy`,
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
                const transactionBuffer = Buffer.from(
                    transactionEncoded,
                    'base64'
                )
                const transactionObject = Transaction.from(transactionBuffer)

                const txSignature = await sendAndConfirmTransaction({
                    transaction: transactionObject,
                })
                if (!txSignature) return

                await indexTransaction(txSignature)
                setStep(6)
                return
            } catch (error) {
                attempts++
                if (error instanceof Error) {
                    toast.error(`Attempt ${attempts} failed: ${error.message}`)
                    console.error(`Attempt ${attempts} failed:`, error)
                } else {
                    toast.error(`Attempt ${attempts} failed: ${String(error)}`)
                    console.error(`Attempt ${attempts} failed:`, String(error))
                }
                if (attempts >= maxAttempts) {
                    setStep(-1)
                    toast.error(
                        'Error buying mystery box after multiple attempts'
                    )
                }
            }
        }
    }

    async function indexTransaction(signature: string) {
        try {
            if (!jwtToken) throw new Error('JWT token not found ')

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
            setStep(5)

            const result = await response.json()
            if (result.message) {
                console.error(result.message)
                return
            }
            setBoughtBoxId(result.box._id)
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

            const txSignature = await sendTransaction(transaction, connection)
            setLatestTxSignature(txSignature)

            setStep(3)

            const confirmationPromise = confirmTransaction(txSignature)

            toast.promise(
                confirmationPromise,
                {
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
                },
                {
                    duration: 10000,
                }
            )

            setStep(4)
            const result = await confirmationPromise
            setHasPendingTransaction(false)

            if (!result) {
                throw new Error('Transaction not confirmed' + result)
            }

            return txSignature
        } catch (error) {
            setHasPendingTransaction(false)
            console.error('Error sending and confirming transaction:', error)

            throw error
        }
    }

    async function confirmTransaction(signature: string) {
        const maxRetries = 20
        let retryCount = 0

        while (retryCount < maxRetries) {
            const tx = await connection.getTransaction(signature, {
                commitment: 'confirmed',
                maxSupportedTransactionVersion: 0,
            })
            if (tx) {
                return tx
            }
            retryCount++
            await new Promise((resolve) => setTimeout(resolve, 2000))
        }
        throw new Error('Transaction not confirmed')
    }

    return (
        <div className="  flex items-center justify-center">
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
                    <ModalBody className="  bg-background-dark w-full shadow-inner rounded-t-xl  shadow-cyan-600    ">
                        <ModalContent className=" ">
                            <div className="">
                                <div className="">
                                    <h4 className="text-lg md:text-2xl text-accent-dark  font-bold text-center -mt-4 mb-4">
                                        {!boughtBoxId ? 'Buy ' : 'Open '}{' '}
                                        <span className="px-1 py-0.5 rounded-md bg-accent-dark/50 border border-accent text-accent">
                                            {box?.name}
                                        </span>{' '}
                                        now!
                                    </h4>
                                    <div className="flex justify-center items-center ">
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
                                    <div className=" py-8 flex flex-col  gap-y-6 items-start max-w-sm justify-start  mx-auto max-h-[20rem] md:max-h-[15rem]">
                                        {!boughtBoxId && step <= 0 ? (
                                            <div className="flex flex-col  ">
                                                <p className="text-sm text-gray-400 mb-2">
                                                    Unlock a curated bundle of
                                                    hand picked meme coins and
                                                    join the excitement of the
                                                    bull run!
                                                </p>
                                                <div className="flex flex-col   items-start justify-start text-sm">
                                                    <div>
                                                        <span className="text-neutral-200 dark:text-neutral-400 mr-3">
                                                            Price:{' '}
                                                            {lamportsToSol(
                                                                box?.amountLamports ??
                                                                    '0'
                                                            ).toFixed(4)}{' '}
                                                            SOL
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            ~{' '}
                                                            {(
                                                                lamportsToSol(
                                                                    box?.amountLamports ??
                                                                        '0'
                                                                ) * solanaPrice
                                                            ).toFixed(2)}
                                                            USD
                                                        </span>
                                                    </div>
                                                    <span className="text-neutral-200 dark:text-neutral-400">
                                                        Commission :{' '}
                                                        {(
                                                            SERVICE_TAX_PERCENTAGE *
                                                            lamportsToSol(
                                                                box?.amountLamports ??
                                                                    '0'
                                                            )
                                                        ).toFixed(4)}{' '}
                                                        SOL
                                                    </span>
                                                    <span className="text-neutral-200 dark:text-neutral-400">
                                                        There might be needed a
                                                        small priority fee
                                                    </span>
                                                    <span className="text-neutral-200 dark:text-neutral-400">
                                                        Create token accounts
                                                        <a
                                                            href="https://solana.com/docs/core/fees#rent"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-accent underline ml-1"
                                                        >
                                                            rent
                                                        </a>{' '}
                                                        if not existing. <br />
                                                    </span>{' '}
                                                    <span className="text-xs text-gray-500">
                                                        (Reimbursed if tokens
                                                        are sold)
                                                    </span>
                                                </div>
                                                {/* <p className="text-sm text-gray-400 mb-4">
                                                    Max Purchase Limit:{' '}
                                                    <span className="text-white">
                                                        {box?.maxBoxAmount}
                                                    </span>
                                                </p> */}
                                                <div className="text-xs text-left text-gray-400 my-4 ">
                                                    <p className="text-accent">
                                                        By signing the
                                                        transaction and
                                                        purchasing, you agree to
                                                        the following:
                                                    </p>
                                                    <ul className="list-disc list-inside ml-4">
                                                        <li>
                                                            This is not
                                                            financial advice.
                                                        </li>

                                                        <li>
                                                            Contents are random,
                                                            and their value may
                                                            vary.
                                                        </li>
                                                        <li>
                                                            All sales are final,
                                                            and no refunds are
                                                            available.
                                                        </li>
                                                        <li>
                                                            You can read more
                                                            here{' '}
                                                            <a
                                                                href="/terms-and-conditions"
                                                                target="_blank"
                                                                className="text-accent underline"
                                                            >
                                                                terms and
                                                                conditions
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center w-full ">
                                                <ol className="w-full">
                                                    {[
                                                        'Initiate Purchase',
                                                        'Sign Transaction',
                                                        'Send Transaction',
                                                        'Confirm Transaction',
                                                        'Complete Purchase',
                                                    ].map((text, index) => (
                                                        <li
                                                            key={index}
                                                            className={`text-neutral-200 dark:text-neutral-400 text-sm ${
                                                                step >=
                                                                index + 1
                                                                    ? 'font-bold shadow-md shadow-cyan-500/50'
                                                                    : ''
                                                            } flex items-center justify-between p-2 rounded-md `}
                                                        >
                                                            <div className="flex items-center">
                                                                {step ===
                                                                    index +
                                                                        1 && (
                                                                    <LoaderIcon className="animate-spin mr-4" />
                                                                )}
                                                                {text}
                                                            </div>
                                                            {step >
                                                                index + 1 && (
                                                                <FaCheckCircle className="text-accent" />
                                                            )}
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                        )}
                                    </div>{' '}
                                </div>
                            </div>
                        </ModalContent>
                        <ModalFooter
                            shouldClose={boughtBoxId ? true : false}
                            className="gap-4 bg-neutral-950 flex items-center justify-center h-16"
                        >
                            {boughtBoxId ? (
                                <button
                                    onClick={() => scrollToSection('my-boxes')}
                                    className="text-sm px-2 py-1 rounded-md shadow-inner shadow-accent-dark border border-accent-dark   disabled:bg-muted disabled:border-0 disabled:cursor-not-allowed disabled:shadow-none "
                                >
                                    Go to my boxes
                                </button>
                            ) : (
                                // <OpenBoxModal boxId={boughtBoxId} />
                                <button
                                    onClick={buyMysteryBox}
                                    className=" text-sm px-2 py-1 rounded-md shadow-inner shadow-accent-dark border border-accent-dark  w-28 disabled:bg-muted disabled:border-0 disabled:cursor-not-allowed disabled:shadow-none "
                                    disabled={step > 0}
                                >
                                    Buy box{' '}
                                </button>
                            )}
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
