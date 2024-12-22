import React, { useState } from 'react'
import { BoxType } from '../../../libs/interfaces'
import { useSelector } from 'react-redux'
import cyanBox from '../../../assets/boxes/cyan_box-Photoroom.png'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import {
    Commitment,
    Transaction,
    TransactionConfirmationStrategy,
} from '@solana/web3.js'
import { hasBackendSignedTransaction } from '../../../libs/utils'
import { SOLANA_EXPLORER_URL } from '../../../libs/constants'
import { useNetworkConfiguration } from '../../../context/Solana/SolNetworkConfigurationProvider'
import toast from 'react-hot-toast'
import { Buffer } from 'buffer'
import axios from 'axios'
import { BuyModal } from './modal/BuyModal'

const BoxesSection: React.FC = () => {
    const boxTypes: BoxType[] = useSelector(
        (state: { box: { types: BoxType[] } }) => state.box.types
    )

    const { publicKey, sendTransaction } = useWallet()
    const [openBuyBoxModal, setOpenBuyBoxModal] = useState(false)
    const [hasPendingTransaction, setHasPendingTransaction] = useState(false)
    const { connection } = useConnection()
    const { networkConfiguration } = useNetworkConfiguration()
    const [step, setStep] = useState(0)

    const jwtToken = useSelector(
        (state: { auth: { token: string } }) => state.auth.token
    )

    const buyMysteryBox = async (boxTypeId: string) => {
        setStep(1)
        setOpenBuyBoxModal(true)

        try {
            if (!publicKey) {
                throw new Error('Wallet not connected')
            }
            const response = await fetch(
                `${import.meta.env.VITE_ENV_BACKEND_URL}/boxes/${boxTypeId}/wallet/${publicKey?.toBase58()}/open`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`, ///TODO THINK HOW TO KEEP THE JWT TOKEN safe
                    },
                }
            )

            if (!response.ok) {
                throw new Error(
                    'Failed to fetch the backend to get the transaction'
                )
            }
            console.log('Response:', response)

            const transactionEncoded = (await response.json())
                .transactionEncoded

            console.log('Transaction:', transactionEncoded)
            setStep(2)
            const transactionBuffer = Buffer.from(transactionEncoded, 'base64')
            // const variable = transactionEncoded.deserialize()
            const transactionObject = Transaction.from(transactionBuffer)
            transactionObject.feePayer = publicKey
            // if (!hasBackendSignedTransaction(transactionObject)) {
            //     throw new Error(
            //         'Backend has not partial signed the transaction'
            //     )
            // }
            setStep(3)
            await sendAndConfirmTransaction({
                transaction: transactionObject,
            })

            setOpenBuyBoxModal(false)
        } catch (error) {
            toast.error('Error buying mystery box' + error)
            console.error('Error buying mystery box:', error)
            setOpenBuyBoxModal(false)
        }
    }

    async function indexTransaction(signature: string) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_ENV_BACKEND_URL}/index`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ signature }),
                }
            )

            if (!response.ok) {
                throw new Error('Failed to index the transaction')
            }

            const result = await response.json()
            console.log('Transaction indexed successfully:', result)
        } catch (error) {
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
            console.log(
                'Transaction:',
                transaction,
                'Getting latest blockhash',
                connection.rpcEndpoint
            )
            // const latestBlockhash = await connection.getLatestBlockhash()
            // transaction.recentBlockhash = latestBlockhash.blockhash
            // transaction.feePayer = publicKey
            setHasPendingTransaction(true)
            console.log('Transaction:', transaction, 'Signing transaction')
            // if (signTransaction === undefined) {
            //     throw new Error('signTransaction is undefined')
            // }

            const txSignature = await sendTransaction(transaction, connection, {
                skipPreflight: true,
            })
            // const rawTransaction = transaction.serialize()
            // const txSignature = await connection.sendRawTransaction(
            //     rawTransaction,
            //     {
            //         skipPreflight: true,
            //     }
            // )
            // const signedTransaction = await sendTransaction(transaction)
            // const signers = transaction.signatures
            // console.log('SIGNERS:', { signers })
            // transaction.addSignature(publicKey, Buffer.from(signers[0].signature, 'base64'))
            // const signedTransaction = await signTransaction(transaction);
            // transaction.addSignature(publicKey, signedTransaction.signatures[0].signature);
            // console.log({ transactionSignatures: signedTransaction.signatures })

            // const txSignature = await connection.sendRawTransaction(
            //     transaction.serialize()
            // )

            // const confirmation = await connection.confirmTransaction(
            //     signature,
            //     'confirmed'
            // )

            // console.log({ signature, confirmation })

            // console.log('Transaction:', txSignature, 'Signed')
            setStep(4)
            const strategy: TransactionConfirmationStrategy = {
                signature: txSignature,
                blockhash: transaction.recentBlockhash!,
                lastValidBlockHeight: transaction.lastValidBlockHeight!,
            }
            console.log('Transaction:', txSignature, 'Confirming transaction')

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

            await indexTransaction(txSignature)
            setStep(6)

            return txSignature
        } catch (error) {
            setHasPendingTransaction(false)
            toast.error('User rejected the request')
            throw error
        }
    }

    return (
        <div className=" relative flex flex-col justify-center items-center w-full space-y-32 md:space-y-0">
            <div className="relative md:-ml-[50%]  ">
                <img
                    src={cyanBox}
                    className="w-96"
                    style={{ transformStyle: 'preserve-3d' }}
                ></img>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-accent to-transparent opacity-20 blur-2xl"></div>

                <div className="flex flex-col justify-center items-start ml-8 mt-4 text-gray-300">
                    <h2 className="text-2xl font-bold text-cyan-500">
                        Meme Master Level
                    </h2>
                    <p className="text-lg">The Pinnacle of Meme Greatness</p>
                    <h2 className="text-2xl font-bold text-cyan-500 mt-4">
                        Legendary Meme Artifacts
                    </h2>
                    <ul className="list-disc list-inside text-lg">
                        <li>Ultra Rare Doge</li>
                        <li>Epic Shiba</li>
                        <li>Legendary Pepe</li>
                    </ul>
                    <div className="flex justify-center w-full mt-6 ">
                        <BuyModal
                            onTrigger={() => buyMysteryBox(boxTypes[0]._id)}
                            buttonComponent={
                                <button
                                    onClick={() =>
                                        buyMysteryBox(boxTypes[0]._id)
                                    }
                                    disabled={
                                        hasPendingTransaction || !publicKey
                                    }
                                >
                                    {publicKey
                                        ? 'Buy Mistery Meme Box'
                                        : 'Connect Wallet'}
                                </button>
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="relative md:-top-[400px] md:ml-[50%] ">
                <img
                    src={cyanBox}
                    className="w-96 -hue-rotate-60 "
                    style={{
                        transformStyle: 'preserve-3d',
                        // filter: `hue-rotate(${Math.min(-80, Math.max(200 - scrollPosition / 3.3, -250))}deg)`,
                    }}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-[#3ae9af] to-[#26b321] opacity-20 blur-2xl"></div>

                <div className="z-[110] flex flex-col justify-center items-start ml-8 mt-4 text-gray-300">
                    <h2 className="text-2xl font-bold text-green-500">
                        Legendary Level
                    </h2>
                    <p className="text-lg  ">The Ultimate Meme Connoisseur</p>
                    <h2 className="text-2xl font-bold text-green-500 mt-4">
                        Epic Meme Treasures
                    </h2>
                    <ul className="list-disc list-inside text-lg ">
                        <li>Rare Pepe</li>
                        <li>Mooning Doge</li>
                        <li>Elon Musk Tweets</li>
                    </ul>
                    <div className="flex justify-center w-full mt-6">
                        <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-full shadow-lg hover:from-green-500 hover:to-green-700 transition duration-300 transform hover:scale-105">
                            Coming soon...
                        </button>
                    </div>
                </div>
            </div>

            {/* <div className="flex justify-center items-center h-screen bg-[#0d1117]">
                        <div className="relative group">
                             <img
                                src={riskyBox}
                                alt="Mystery Box"
                                className="rounded-lg shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                            />
                             <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-[#f39c12] to-[#e74c3c] opacity-20 blur-lg"></div>
                             <div className="absolute bottom-4 left-4">
                                <h3 className="text-teal-400 text-xl font-bold">
                                    Degen Level
                                </h3>
                                <p className="text-white">Absolute Madlad</p>
                            </div>
                        </div>
                    </div> */}
            {/* <div className="relative md:-ml-[20%] z-[10] md:-top-[500px]">
                        <img
                            src={riskyBox}
                            alt="Mystery Box"
                            className="w-96 rounded-lg shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-[#f39c12] to-[#e74c3c] opacity-20 blur-xl"></div>

                        <div className="flex flex-col justify-center items-start ml-8 mt-4 text-gray-300">
                            <h2 className="text-2xl font-bold text-red-500">
                                Degen Level
                            </h2>
                            <p className="text-lg">Absolute Madlad</p>
                            <h2 className="text-2xl font-bold text-red-500 mt-4">
                                Pump for Fun Coins
                            </h2>
                            <ul className="list-disc list-inside text-lg">
                                <li>Mad</li>
                                <li>Shiba Inu</li>
                                <li>PepeCoin</li>
                            </ul>
                            <div className="flex justify-center w-full mt-6">
                                <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-stone-900 text-white font-bold rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition duration-300 transform hover:scale-105">
                                    Coming soon...
                                </button>
                            </div>
                        </div>
                    </div> */}
        </div>
    )
}

export default BoxesSection
