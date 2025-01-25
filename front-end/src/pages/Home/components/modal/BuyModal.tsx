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

import { useAppKitConnection } from '@reown/appkit-adapter-solana/react'
import { PublicKey, Transaction  } from '@solana/web3.js'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import type { Provider } from '@reown/appkit-adapter-solana/react'

export function BuyModal({
    box,
    setHasPendingTransaction,
    setIsChevronHidden,
}: {
    box: BoxType | null
    setHasPendingTransaction: (value: boolean) => void
    setIsChevronHidden: (value: boolean) => void
}) {
    const images = [cyanBox]

    const solanaPrice = useSelector(
        (state: { solana: { price: number } }) => state.solana.price
    )
     // const { connection } = useConnection()
    const { networkConfiguration } = useNetworkConfiguration()
    const [step, setStep] = useState(0)
     const jwtToken = sessionStorage.getItem('jwtToken')
    const [boughtBoxId, setBoughtBoxId] = useState<string | null>(null)

    // reown appkit
    const { address : publicKey } = useAppKitAccount()
    const { connection } = useAppKitConnection()
    const { walletProvider } = useAppKitProvider<Provider>('solana')

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

                const txSignature =
                    await sendTransactionReownAppKit(transactionObject)
                console.log("TX SIGNATURE", txSignature , !!txSignature)
                if (!txSignature) return

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
                await new Promise((resolve) => setTimeout(resolve, 2000))

                setStep(4)
                await indexTransaction(txSignature)
                setStep(6)
                return
            } catch (error) {
                attempts++
                if (error instanceof Error) {
                    if (error.message === 'User rejected the request.') {
                        toast.error('User rejected the request.')
                        setStep(-1)
                        return
                    }
                    toast.error(`Attempt ${attempts} failed: ${error.message}`)
                    console.error(`Attempt ${attempts} failed:`, error)
                } else {
                    toast.error(`Attempt ${attempts} failed: ${String(error)}`)
                 }
                if (attempts >= maxAttempts) {
                    setStep(-1)
                    toast.error(
                        'Error buying mystery box after multiple attempts'
                    )
                    return 
                }
                console.error(`Attempt ${attempts} failed:`, error)

            }
        }
    }

    async function indexTransaction(signature: string) {
        try {
            console.log('Indexing ', "sg",signature, "JWT", jwtToken)
            if (!jwtToken) throw new Error('JWT token not found ')

            const response = await fetch(`${VITE_ENV_BACKEND_URL}/index`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({ signature: signature }),
            })

            console.log('Indexing response', response)
            if (!response.ok) {
                throw new Error('Failed to index the transaction')
            }
            setStep(5)

            const result = await response.json()
            console.log('Indexing res', result)

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

    // reown appkit
    async function sendTransactionReownAppKit(transaction: Transaction) {
        if (!connection || !publicKey) return
        const latestBlockhash = await connection.getLatestBlockhash()
        transaction.recentBlockhash = latestBlockhash.blockhash
        transaction.feePayer = new PublicKey(publicKey)
        setHasPendingTransaction(true)

        const signature = await walletProvider.sendTransaction(
            transaction,
            connection
        )
        console.log("send TX SIGNATURE :", signature)

        confirmTransaction(signature)
        return signature
    }

    // async function sendAndConfirmTransaction(
    //     transaction: Transaction
    // ): Promise<string | false> {
    //     try {
    //         if (!publicKey) {
    //             throw new Error('Wallet not connected')
    //         }

    //         const latestBlockhash = await connection.getLatestBlockhash()
    //         transaction.recentBlockhash = latestBlockhash.blockhash
    //         transaction.feePayer = publicKey
    //         setHasPendingTransaction(true)

    //         const txSignature = await sendTransaction(transaction, connection)
    //         setLatestTxSignature(txSignature)

    //         setStep(3)

    //         const confirmationPromise = confirmTransaction(txSignature)

    //         toast.promise(
    //             confirmationPromise,
    //             {
    //                 loading: 'Processing Transaction',
    //                 success: () => (
    //                     <a
    //                         href={`${SOLANA_EXPLORER_URL}/tx/${txSignature}?cluster=${networkConfiguration}`}
    //                         target="_blank"
    //                         rel="noreferrer"
    //                         style={{ textDecoration: 'underline' }}
    //                     >
    //                         View on Solana explorer
    //                     </a>
    //                 ),
    //                 error: (err) => `Transaction failed: ${err.message}`,
    //             },
    //             {
    //                 duration: 10000,
    //             }
    //         )

    //         setStep(4)
    //         const result = await confirmationPromise
    //         setHasPendingTransaction(false)

    //         if (!result) {
    //             throw new Error('Transaction not confirmed' + result)
    //         }

    //         return txSignature
    //     } catch (error) {
    //         setHasPendingTransaction(false)
    //         console.error('Error sending and confirming transaction:', error)

    //         throw error
    //     }
    // }

    async function confirmTransaction(signature: string) {
        const maxRetries = 20
        let retryCount = 0

        while (retryCount < maxRetries) {
            const tx = await connection!.getTransaction(signature, {
                commitment: 'confirmed',
                maxSupportedTransactionVersion: 0,
            })
            console.log('TX HAS BEEN FOUND AND CONFIRMED', tx)
            if (tx) {
                return tx
            }
            retryCount++
            await new Promise((resolve) => setTimeout(resolve, 2000))
        }
        throw new Error('Transaction not confirmed')
    }

    return (
        <div className="flex items-center justify-center mt-8">
            {publicKey ? (
                <Modal>
                    <ModalTrigger
                        setIsChevronHidden={setIsChevronHidden}
                        className="bg-gradient-to-r from-accent via-accent-dark to-emerald-500 
                        scale-90 md:scale-100 items-center relative rounded-xl flex justify-center 
                        group/modal-btn hover:shadow-lg hover:shadow-accent/50 transition-all duration-300"
                    >
                        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 font-bold text-white px-4 py-1">
                            Click here to buy a box!
                        </span>
                        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                            <img
                                className="w-8 animate-bounce mt-2"
                                src={questionMark}
                            />
                        </div>
                    </ModalTrigger>
                    <ModalBody
                        className="bg-background-dark w-full rounded-t-xl border-t border-accent/20"
                        setIsChevronHidden={setIsChevronHidden}
                    >
                        <ModalContent>
                            <div>
                                <div className="text-center mb-8">
                                    <h4 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent via-purple-500 to-emerald-500 text-transparent bg-clip-text">
                                        {!boughtBoxId
                                            ? 'Memebox Time!'
                                            : '🎉 Box Secured!'}
                                    </h4>
                                    <p className="text-gray-400 mt-2">
                                        Get ready to secure some juicy memes!
                                    </p>
                                </div>

                                <div className="flex justify-center items-center mb-8">
                                    {images.map((image, idx) => (
                                        <motion.div
                                            key={idx}
                                            style={{
                                                rotate: Math.random() * 30 - 10,
                                            }}
                                            whileHover={{
                                                scale: 1.1,
                                                rotate: 0,
                                                zIndex: 50,
                                            }}
                                            className="relative -mr-4 group"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-accent to-emerald-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                            <motion.div
                                                className="rounded-lg"
                                                animate={{
                                                    scale: [1, 1.05, 1],
                                                    boxShadow: [
                                                        '0 0 0 rgba(0, 255, 255, 0)',
                                                        '0 0 20px rgba(0, 255, 255, 0.3)',
                                                        '0 0 0 rgba(0, 255, 255, 0)',
                                                    ],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                }}
                                            >
                                                <img
                                                    src={image}
                                                    alt="mystery box"
                                                    className="relative rounded-lg h-32 w-32 md:h-40 md:w-40 object-cover border-2 border-accent/20"
                                                />
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </div>

                                {!boughtBoxId && step <= 0 ? (
                                    <div className="space-y-6">
                                        <div className="bg-background-light/10 rounded-xl p-4 border border-accent/20">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-gray-400">
                                                    Box Price:
                                                </span>
                                                <motion.div
                                                    className="text-right"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{
                                                        type: 'spring',
                                                        stiffness: 400,
                                                        damping: 10,
                                                    }}
                                                >
                                                    <motion.div
                                                        className="text-white font-bold"
                                                        initial={{
                                                            opacity: 0,
                                                            y: 20,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.5,
                                                        }}
                                                    >
                                                        {lamportsToSol(
                                                            box?.amountLamports ??
                                                                '0'
                                                        ).toFixed(4)}{' '}
                                                        SOL
                                                        <span className="text-sm text-gray-500 ml-2">
                                                            (≈ $
                                                            {(
                                                                lamportsToSol(
                                                                    box?.amountLamports ??
                                                                        '0'
                                                                ) * solanaPrice
                                                            ).toFixed(2)}
                                                            )
                                                        </span>
                                                    </motion.div>
                                                </motion.div>
                                            </div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-gray-400">
                                                    Service Fee:
                                                </span>
                                                <div className="text-right">
                                                    <span className="text-white">
                                                        {(
                                                            SERVICE_TAX_PERCENTAGE *
                                                            lamportsToSol(
                                                                box?.amountLamports ??
                                                                    '0'
                                                            )
                                                        ).toFixed(4)}{' '}
                                                        SOL
                                                        <span className="text-sm text-gray-500 ml-2">
                                                            (≈ $
                                                            {(
                                                                SERVICE_TAX_PERCENTAGE *
                                                                lamportsToSol(
                                                                    box?.amountLamports ??
                                                                        '0'
                                                                ) *
                                                                solanaPrice
                                                            ).toFixed(2)}
                                                            )
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center text-sm text-gray-400">
                                                <span>Solana fees:</span>
                                                <div className="text-right">
                                                    <span>
                                                        Gas and token rent fees
                                                        may apply
                                                    </span>

                                                    <motion.span
                                                        className="block text-xs text-accent/60 cursor-help"
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        transition={{
                                                            type: 'spring',
                                                            stiffness: 400,
                                                        }}
                                                    ></motion.span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-background-light/5 rounded-xl p-4 border border-accent/20">
                                            <p className="text-accent font-bold mb-2">
                                                🦍 Degen Notes:
                                            </p>
                                            <ul className="space-y-2 text-sm text-gray-400">
                                                <li className="flex items-center">
                                                    <span className="mr-2">
                                                        🎲
                                                    </span>
                                                    Contents are random (like
                                                    your trading strategy)
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="mr-2">
                                                        💎
                                                    </span>
                                                    HODL or SODL - your choice
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="mr-2">
                                                        🚫
                                                    </span>
                                                    No refunds (diamond hands
                                                    only)
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-background-light/5 rounded-xl p-4 border border-accent/20">
                                        <ol className="md:space-y-2">
                                            {[
                                                'Formatting transaction',
                                                'Waiting for signature',
                                                'Transaction sent',
                                                'Transaction confirmed',
                                                'Box successfully bought! 🎉',
                                            ].map((text, index) => (
                                                <li
                                                    key={index}
                                                    className={`flex items-center justify-between p-2 rounded ${
                                                        step >= index + 1
                                                            ? 'text-accent font-bold'
                                                            : 'text-gray-400'
                                                    }`}
                                                >
                                                    <div className="flex items-center">
                                                        {step === index + 1 && (
                                                            <LoaderIcon className="animate-spin mr-2" />
                                                        )}
                                                        {text}
                                                    </div>
                                                    {step > index + 1 && (
                                                        <FaCheckCircle className="text-emerald-500" />
                                                    )}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                )}
                            </div>
                        </ModalContent>

                        <ModalFooter
                            shouldClose={boughtBoxId ? true : false}
                            className="border-t border-accent/20 bg-background-dark/80 backdrop-blur-sm p-4 flex justify-center items-center "
                        >
                            {boughtBoxId ? (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => scrollToSection('my-boxes')}
                                    className="w-full lg:w-1/2  px-6 py-3 rounded-full bg-gradient-to-r from-accent via-accent-dark to-emerald-500 
                                    text-white font-bold hover:shadow-lg hover:shadow-accent/30 transition-all "
                                >
                                    View my boxes 📦
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={buyMysteryBox}
                                    disabled={step > 0}
                                    className="w-full lg:w-1/2 px-6 py-3 rounded-full bg-gradient-to-r from-accent via-accent-dark to-emerald-500 
                                    text-white font-bold hover:shadow-lg hover:shadow-accent/30 transition-all 
                                    disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {step > 0 ? 'Processing...' : 'Buy now! 🎁'}
                                </motion.button>
                            )}
                        </ModalFooter>
                    </ModalBody>
                </Modal>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-6 py-3 rounded-full 
                        text-accent-secondary font-bold transition-all
                        "
                >
                    Please connect wallet to buy a box
                </motion.div>
            )}
        </div>
    )
}
