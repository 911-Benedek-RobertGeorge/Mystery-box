import React, { useEffect } from 'react'
import logo from '../../../assets/elements/logo.png'
import boom from '../../../assets/coins/boom.png'
import { useSelector } from 'react-redux'
import { shortenAddress } from '../../../libs/utils'
import { MysteryBox } from '../../../libs/interfaces'
import { VITE_ENV_BACKEND_URL } from '../../../libs/config'
import { useWallet } from '@solana/wallet-adapter-react'
import { SOLANA_EXPLORER_URL } from '../../../libs/constants'
import toast from 'react-hot-toast'
import { OpenBoxModal } from './modal/OpenBoxModal'

interface HistoryItem {
    price: number
    currentPrice: number
    roi: number
    date: string
    boxType: string
    boxContent: memeCoinType[]
    image: string
}

type memeCoinType = {
    mintAddress: string
    image: string
    name: string
}

///TOODO make computations in lamports

const MyBoxesSection: React.FC = () => {
    const solanaPrice = useSelector(
        (state: { solana: { price: number } }) => state.solana.price
    )
    const [myBoxes, setMyBoxes] = React.useState<MysteryBox[]>()
    const { publicKey } = useWallet()
    const [selectedBoxId, setSelectedBoxId] = React.useState<string>('')

    useEffect(() => {
        if (!publicKey) return
        const fetchMyBoxes = async () => {
            try {
                const response = await fetch(
                    `${VITE_ENV_BACKEND_URL}/boxes/wallet/${publicKey?.toBase58()} `
                )
                const data = await response.json()
                console.log(data)
                setMyBoxes(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMyBoxes()
    }, [publicKey])

    return (
        <>
            {!publicKey ? (
                <div className="text-2xl font-boldtext-center text-secondary">
                    Please connect your wallet to view your boxes.
                </div>
            ) : (
                <div className=" w-screen h-screen flex flex-col justify-center items-center p-10 md:p-64">
                    <div className="flex justify-start items-start w-full ">
                        <span className="text-3xl font-bold text-accent p-2 mb-4 ">
                            My boxes ({myBoxes?.length})
                        </span>
                    </div>
                    {myBoxes &&
                        myBoxes.map((box, index) => {
                            return (
                                <div
                                    key={index}
                                    className=" z-[55] mb-3 flex w-full max-w-screen transform cursor-pointer flex-col justify-between rounded-md bg-background-light bg-opacity-75 p-6 text-accent transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-dark md:flex-row md:p-4"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center">
                                        <img
                                            src={box._id}
                                            alt="Box"
                                            className="w-16 h-16 md:w-24 md:h-24 mr-4"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-xl font-bold">
                                                BOX TYPE ID {box.boxType._id}
                                            </span>
                                            <span className="text-lg">
                                                {box.boxType.name}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {box.status}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                Current Price: {box.signature}
                                            </span>

                                            <span className="text-sm text-gray-500">
                                                Date: {box.createdAt}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                Date: {box.updatedAt}
                                            </span>
                                        </div>
                                    </div>
                                    {box._id}
                                    <div>
                                        {box._id == selectedBoxId && 'SELECTED'}
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedBoxId(box._id)
                                            console.log('selectedBOX ', box)
                                        }}
                                        className="z-[100] mt-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark"
                                    >
                                        Select Box
                                    </button>
                                </div>
                            )
                        })}
                    {selectedBoxId && (
                        <p className="text-accent ">
                            {' '}
                            Selected Box: {selectedBoxId}
                        </p>
                    )}
                    <OpenBoxModal boxId={selectedBoxId} />
                </div>
            )}
        </>
    )
}

export default MyBoxesSection
