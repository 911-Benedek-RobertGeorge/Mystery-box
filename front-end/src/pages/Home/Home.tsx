import React, { useEffect, useRef, useState } from 'react'
import { BackgroundGradientAnimation } from '../../components/ui/BackgroundGradientAnimation'
import SectionContainer from './components/SectionContainer'
import geometricVector from '../../assets/shapes/geometric-vector-shape.webp'
import Navbar from '../../components/Layout/Navbar'
import waterDrop from '../../assets/shapes/drop.png'
import prism from '../../assets/shapes/prism.png'
import vectorShape from '../../assets/elements/vector-shape.png'
import simpleBox from '../../assets/elements/logo1.png'
import stand from '../../assets/shapes/stand.png'
import questionMark from '../../assets/elements/question_mark.png'
import dogeCoin from '../../assets/coins/doge.png'
import key from '../../assets/boxes/key.png'
import chillGuy from '../../assets/coins/chill-guy.png'
import bonk from '../../assets/coins/bonk.png'
import cyanBox from '../../assets/boxes/cyan_box-Photoroom.png'
import riskyBox from '../../assets/boxes/risky-box.png'
import heartImage from '../../assets/elements/heart.png'
import fluidTape from '../../assets/elements/fluid_tape.png'
import waveTape from '../../assets/shapes/wave_tape.png'
import { use } from 'framer-motion/client'
import { MEMES, SOLANA_EXPLORER_URL } from '../../libs/constants'
import MemeImagesFloating from './components/MemeImagesFloating'
import { MemeImage } from '../../libs/interfaces'
import solanaImage from '../../assets/elements/solana.png'
import lines from '../../assets/shapes/lines.png'
import ribbons from '../../assets/shapes/ribbons.png'
import leafes from '../../assets/shapes/leafess.png'
import smile from '../../assets/shapes/smile.png'
import {
    Commitment,
    Transaction,
    TransactionConfirmationStrategy,
} from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import HistorySection from './components/HistorySection'
import { useNetworkConfiguration } from '../../context/Solana/SolNetworkConfigurationProvider'
import { toast } from 'react-hot-toast'

const Home: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [memesImage, setMemesImage] = useState<MemeImage[]>()
    const { connection } = useConnection()
    const { sendTransaction, publicKey } = useWallet()
    const [hasPendingTransaction, setHasPendingTransaction] = useState(false)
    const { networkConfiguration } = useNetworkConfiguration()

    // get the trending memeCoins from the API
    useEffect(() => {
        // fetch('https://paste.ofcode.org/GXPu3JHPGeX4v6BptHgLcP')
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setMemesImage(data)
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error)
        //     })
        const memeImages = MEMES.map((meme) => {
            return {
                src: meme.token.image,
                top: `${Math.random() * 50 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
            }
        })
        setMemesImage(memeImages)
    }, [])

    // make the memecoins float while moving the mouse
    useEffect(() => {
        const container = containerRef.current

        if (!container) return

        const handleMouseMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 20
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * 20

            const objects =
                container.querySelectorAll<HTMLImageElement>('.floating-object')

            objects.forEach((obj, index) => {
                const intensity = (index + 1) * 0.5 // Adjust movement for each object
                obj.style.transform = `rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translate(${x * intensity}px, ${-y * intensity}px)`
                obj.style.transitionDuration = '2s'
            })
        }

        const handleMouseLeave = () => {
            const objects =
                container.querySelectorAll<HTMLImageElement>('.floating-object')
            objects.forEach((obj) => {
                obj.style.transform =
                    'rotateY(0deg) rotateX(0deg) translate(0, 0)'
            })
        }

        container.addEventListener('mousemove', handleMouseMove)
        container.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            container.removeEventListener('mousemove', handleMouseMove)
            container.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // TODO Implement buyMysteryBox function to actual buy something
    const buyMysteryBox = async (boxTypeId: string) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_ENV_BACKEND_URL}/api/boxes/${boxTypeId}/wallet/${publicKey?.toBase58()}/open`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify({
                    //     boxId: 'your-user-id', // Replace with actual user ID
                    // }),
                }
            )

            if (!response.ok) {
                throw new Error('Failed to buy mystery box')
            }

            const transaction = await response.json()
            // Send the transaction object further
            console.log('Transaction:', transaction)

            // You can add further logic here to handle the transaction

            const transactionObject = Transaction.from(
                Buffer.from(transaction, 'base64')
            )

            await sendAndConfirmTransaction({
                transaction: transactionObject,
                customErrorMessage: 'Failed to buy mystery box',
            })
        } catch (error) {
            console.error('Error buying mystery box:', error)
        }
    }
    ///TODO https://ui.aceternity.com/components/wavy-background
    ///TODO ADD MEMES AND SET DURATION BIGGER
    /// TODO ADD https://sketchfab.com/3d-models/quantum-cube-02971982b92347d4b6ddbe1c0d6487c5 AS LOADING AND OR OPENING A CHEST ANIMATION

    async function sendAndConfirmTransaction({
        transaction,
        customErrorMessage = 'Transaction failed',
        explorerLinkMessage = 'View transaction on Solana Explorer',
    }: {
        transaction: Transaction
        customErrorMessage?: string
        explorerLinkMessage?: string
    }) {
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
                preflightCommitment: 'finalized',
            })

            const strategy: TransactionConfirmationStrategy = {
                signature: txSignature,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            }
            const confirmationPromise = connection.confirmTransaction(
                strategy,
                'finalized' as Commitment
            )

            toast.promise(
                confirmationPromise.then((response) => {
                    if (response.value.err) {
                        console.error('Transaction failed:', response.value)
                        throw new Error(customErrorMessage)
                    }
                }),
                {
                    success: {
                        title: 'Transaction Confirmed',
                        description: (
                            <a
                                href={`${SOLANA_EXPLORER_URL}/tx/${txSignature}?cluster=${networkConfiguration}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{ textDecoration: 'underline' }}
                            >
                                View on Solana explorer{' '}
                            </a>
                        ),
                        duration: 12000,
                        isClosable: true,
                    },
                    error: {
                        title: customErrorMessage,
                        description: (
                            <a
                                href={`${SOLANA_EXPLORER_URL}/tx/${txSignature}?cluster=${networkConfiguration}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{ textDecoration: 'underline' }}
                            >
                                View on Solana explorer{' '}
                            </a>
                        ),
                        duration: 12000,
                        isClosable: true,
                    },
                    loading: 'Processing Transaction',
                }
            )
            const result = await confirmationPromise
            setHasPendingTransaction(false)

            if (result.value.err) {
                return false
            }

            return txSignature
        } catch (error) {
            // Show error toast
            setHasPendingTransaction(false)
            toast.info('User rejected the request')

            throw error
        }
    }

    return (
        <div className="flex flex-col  w-screen max-w-screen select-none bg-background-dark overflow-hidden">
            <BackgroundGradientAnimation
                className="justify-center allign-center h-full!"
                gradientBackgroundStart="rgb(0, 0, 0)"
                gradientBackgroundEnd="rgb(19, 39, 40)"
                size="100%"
            >
                <SectionContainer key={1}>
                    <div
                        ref={containerRef}
                        className="z-10  flex flex-col justify-center items-center w-full h-full "
                    >
                        <div className="opacity-0 md:opacity-100 w-full left-0 text-center">
                            <div className=" text-2xl md:text-6xl w-full flex flex-col">
                                <h1 className="z-[103] md:-ml-[60%] leading-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-accent-secondary animate-glossy ">
                                    Fancy some
                                </h1>{' '}
                                <h1 className="z-[103] md:-ml-[40%] leading-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-accent-secondary animate-glossy ">
                                    memes fortunes
                                </h1>{' '}
                            </div>
                            `
                        </div>
                        `{' '}
                        {/* <img
                            className="floating-object absolute bottom-20 right-0 w-[15%]"
                            src={solanaImage}
                        />{' '}
                        <img
                            className="floating-object absolute bottom-0 right-0 w-[45%]"
                            src={solanaImage}
                        /> */}
                        <MemeImagesFloating memesImage={memesImage ?? []} />
                        <div className=" scale-75 md:scale-90 -top-32 relative z-[102] flex flex-col justify-center items-center">
                            <img
                                src={questionMark}
                                className="w-[250px] z-[50] absolute -top-48 floating-object transition-transform duration-200 ease-out "
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>{' '}
                            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-32 h-32 md:w-60 md:h-64 rounded-3xl shadow-cone"></div>
                            <img
                                src={simpleBox}
                                className="w-[450px]  z-[40] hover:scale-110 transition-transform duration-[3000ms] ease-out"
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>{' '}
                            <img
                                src={stand}
                                className="scale-[1] absolute top-24 z-[30]"
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>
                            <img
                                src={dogeCoin}
                                className="scale-[0.3] absolute top-64 left-12 z-[30] -rotate-12  "
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>{' '}
                            <img
                                src={dogeCoin}
                                className="scale-[0.3] absolute top-80 -left-32 z-[30] rotate-45"
                            ></img>{' '}
                            <img
                                src={stand}
                                className="scale-[1.2] absolute top-40 z-[20]"
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>
                            <img
                                src={stand}
                                className="scale-[1.5] absolute top-60 z-[10]"
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>{' '}
                            <img
                                src={prism}
                                className="scale-[0.3] absolute top-72 left-64 z-[10] rotate-12 "
                                style={{ transformStyle: 'preserve-3d' }}
                            ></img>
                        </div>{' '}
                        <div className=" opacity-0 md:opacity-100 w-full md:-ml-[60%] -mt-64 text-center">
                            <div className=" text-xl md:text-3xl w-full flex flex-col">
                                <h3 className="md:ml-64    leading-tight font-extrabold  text-cyan-400 ">
                                    Buy MeMestery boxes
                                </h3>
                                <h1 className=" mt-6 ml-48 leading-tight font-extrabold text-accent-light ">
                                    Uncover treasures
                                </h1>{' '}
                                <h1 className=" mt-8 ml-32 leading-tight font-extrabold text-[#FB83EB] ">
                                    Track your ROI
                                </h1>{' '}
                            </div>
                        </div>
                    </div>
                </SectionContainer>
            </BackgroundGradientAnimation>
            <img
                src={vectorShape}
                className="w-screen top-[23.5rem] rotate-12 md:rotate-6 h-[900px] absolute z-[50]  "
                style={{ transformStyle: 'preserve-3d' }}
            ></img>{' '}
            <div className="flex flex-col justify-center items-center w-full">
                {/* <div className="absolute -mt-[30%] -hue-rotate-30 -rotate-12 w-96 animate-fourth">
                    <img src={fluidTape} />
                </div> */}
                <div
                    className="absolute -rotate-12 w-96 z-[102]"
                    style={{
                        transform: `translateX(${Math.min(-700 + scrollPosition, 250)}px) translateY(${Math.min(-700 + scrollPosition / 2.5, -330)}px)`,
                        filter: `hue-rotate(${Math.max(-80, 10 - scrollPosition / 10)}deg)`,
                        transition:
                            'transform 0.2s ease-out, filter 0.2s ease-out',
                    }}
                >
                    <img src={fluidTape} alt="Fluid Tape" />
                </div>

                {/* BOXES SECTIONS */}
                <div className="flex flex-col justify-center items-center w-full space-y-32 md:space-y-0">
                    <div className="relative md:-ml-[50%] z-[100]">
                        <img
                            src={cyanBox}
                            className="w-96"
                            style={{ transformStyle: 'preserve-3d' }}
                        ></img>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-accent to-[#06aefc] opacity-20 blur-xl"></div>

                        <div className="flex flex-col justify-center items-start ml-8 mt-4 text-gray-300">
                            <h2 className="text-2xl font-bold text-cyan-500">
                                Meme Master Level
                            </h2>
                            <p className="text-lg">
                                The Pinnacle of Meme Greatness
                            </p>
                            <h2 className="text-2xl font-bold text-cyan-500 mt-4">
                                Legendary Meme Artifacts
                            </h2>
                            <ul className="list-disc list-inside text-lg">
                                <li>Ultra Rare Doge</li>
                                <li>Epic Shiba</li>
                                <li>Legendary Pepe</li>
                            </ul>
                            <div className="flex justify-center w-full mt-6">
                                <button
                                    onClick={() => {
                                        buyMysteryBox('1234')
                                    }} /// TODO change here with the actual box id
                                    className="px-6 py-3 bg-gradient-to-b from-cyan-500 to-cyan-900/30 text-white font-bold rounded-full shadow-lg hover:from-cyan-500 hover:to-cyan-700 transition duration-300 transform hover:scale-105 hover:animate-none animate-pulse"
                                >
                                    Buy Mistery Meme Box
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute w-80 "
                        style={{
                            transform: `translateX(${Math.max(1300 - scrollPosition)}px) translateY(${Math.min(-1200 + scrollPosition)}px)`,
                            filter: `hue-rotate(${Math.min(-80, Math.max(200 - scrollPosition / 3.3, -250))}deg)`,
                            transition:
                                'transform 0.2s ease-out, filter 0.2s ease-out',
                        }}
                    >
                        <img src={waveTape} alt="Fluid Tape" />
                    </div>
                    <div className="relative md:-top-[400px] md:ml-[50%] z-[100]">
                        <img
                            src={cyanBox}
                            className="w-96 -hue-rotate-60 "
                            style={{
                                transformStyle: 'preserve-3d',
                                // filter: `hue-rotate(${Math.min(-80, Math.max(200 - scrollPosition / 3.3, -250))}deg)`,
                            }}
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-[#3ae9af] to-[#26b321] opacity-20 blur-xl"></div>

                        <div className="z-[110] flex flex-col justify-center items-start ml-8 mt-4 text-gray-300">
                            <h2 className="text-2xl font-bold text-green-500">
                                Legendary Level
                            </h2>
                            <p className="text-lg  ">
                                The Ultimate Meme Connoisseur
                            </p>
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
            </div>{' '}
            <HistorySection />
            <div className="flex flex-col w-screen h-full">
                <div className="flex flex-col -mt-96 relative justify-center items-center w-full md:w-1/2 h-96  ml-auto text-white p-8">
                    <div className="absolute inset-0 w-full h-screen z-0   ">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark to-accent-dark opacity-30 blur-3xl"></div>
                        <div className="absolute inset-0 opacity-40  top-96">
                            <img
                                className="  z-[111] -hue-rotate-90 transition-all duration-1000  ease-out"
                                src={ribbons}
                                style={{
                                    transform: `translateY(${-1000 + scrollPosition * 0.4}px)`,
                                    rotate: `${180 - scrollPosition * 0.2}deg`,
                                }}
                            />
                        </div>{' '}
                        <img
                            className="z-[110] absolut transition-all duration-1000 ease-out"
                            src={key}
                            style={{
                                transform: `translateX(${Math.max(0, -2650 + scrollPosition)}px) translateY(${-2050 + scrollPosition}px) `, //translateX(${((-1 * (scrollPosition  / 5) % 2) * scrollPosition) % 1200}px)
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col mt-64 relative justify-center items-center w-full h-full text-white p-8">
                    <div className="z-[110] flex flex-col justify-center items-center w-full h-full  text-white p-8">
                        {' '}
                        <h2 className="text-4xl font-bold mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-center max-w-2xl mb-4">
                            Each mystery box contains a random selection of meme
                            coins and artifacts. The contents of the box are
                            determined by chance, offering a mix of common,
                            rare, and legendary items. Here's how you can get
                            started:
                        </p>
                        <ul className="list-disc list-inside text-lg text-center max-w-2xl">
                            <li>Purchase a mystery box from our store.</li>
                            <li>Open the box to reveal its contents.</li>
                            <li>
                                Discover and collect unique meme coins and
                                artifacts.
                            </li>
                            <li>
                                Track your collection and see your ROI (Return
                                on Investment).
                            </li>
                        </ul>
                        <p className="text-lg text-center max-w-2xl mt-4">
                            The thrill of opening a mystery box lies in the
                            surprise and excitement of what you might find. Will
                            you uncover a legendary meme artifact or a rare meme
                            coin? There's only one way to find out!
                        </p>{' '}
                    </div>
                    <div className="absolute inset-0 w-full h-screen z-0 blur-3xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-background-light opacity-50 animate-gradient-x"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                        <div className="absolute inset-0 bg-stars-pattern opacity-20"></div>
                    </div>
                </div>

                <SectionContainer key={2}>
                    <div className="flex flex-col justify-center items-center w-full h-full  text-stone-300 ">
                        <div className="relative z-[110] flex flex-col  w-full h-full    ">
                            {' '}
                            <img
                                src={leafes}
                                className="absolute h-[600px] left-0 -top-[300px]"
                            />{' '}
                            <img
                                src={leafes}
                                className="absolute rotate-90 -ml-8 h-[600px] left-0 -top-64 opacity-40"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center  ">
                            <h2 className="text-4xl font-bold mb-4">
                                About Us
                            </h2>
                            <p className="text-lg text-center max-w-2xl mb-4">
                                Welcome to{' '}
                                <span className="text-accent font-bold">
                                    MemeBox
                                </span>
                                ! We are two passionate developers who met
                                during a Solana Foundation bootcamp. Inspired by
                                the power of blockchain and our love for memes,
                                we decided to create a platform that combines
                                both.
                            </p>
                            <p className="md:ml-96 text-lg text-center max-w-2xl mb-4">
                                Our{' '}
                                <span className="text-accent font-bold">
                                    mission
                                </span>{' '}
                                is to bring joy and excitement to the crypto
                                community through our unique mystery boxes
                                filled with meme treasures. Join us on this
                                thrilling journey and discover the hidden gems
                                of the meme world!
                            </p>
                            <p className="md:-ml-64 text-lg text-center max-w-2xl mb-4">
                                <span className="text-accent-secondary font-bold">
                                    Why MemeBox?
                                </span>{' '}
                                We believe in the power of memes to connect
                                people and create shared experiences. Our
                                mystery boxes are designed to surprise and
                                delight, offering a mix of common, rare, and
                                legendary meme coins.
                            </p>
                            <p className="text-lg text-center max-w-2xl mb-4">
                                <span className="text-purple-500 font-bold">
                                    Get Started
                                </span>{' '}
                                by purchasing a mystery box today and uncover
                                the treasures that await. Whether you're a
                                seasoned crypto enthusiast or new to the world
                                of blockchain, MemeBox has something for
                                everyone.
                            </p>
                        </div>
                    </div>
                </SectionContainer>
            </div>
        </div>
    )
}

export default Home
