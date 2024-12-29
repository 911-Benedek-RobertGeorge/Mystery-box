import React, { useEffect } from 'react'

import { MysteryBox } from '../../../libs/interfaces'
import { VITE_ENV_BACKEND_URL } from '../../../libs/config'
import { useWallet } from '@solana/wallet-adapter-react'
import { OpenBoxModal } from './modal/OpenBoxModal'
import cyanBox from '../../../assets/boxes/cyan_box-Photoroom.png'
import { AnimatedTooltip } from '../../../components/ui/AnimatedTooltip'

const MyBoxesSection: React.FC = () => {
    const [myBoxes, setMyBoxes] = React.useState<MysteryBox[]>()
    const { publicKey } = useWallet()
    const [selectedBoxId, setSelectedBoxId] = React.useState<string>('')
    const jwtToken = sessionStorage.getItem('jwtToken')

    useEffect(() => {
        const fetchMyBoxes = async () => {
            try {
                if (!publicKey || !jwtToken) return

                const response = await fetch(
                    `${VITE_ENV_BACKEND_URL}/boxes/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                )
                const data = await response.json()
                console.log(response, 'DATA', data)
                if (response.status !== 200) {
                    throw new Error(data.message)
                }
                setMyBoxes(data)
            } catch (error) {
                console.error('fetchMyBoxes: ', error)
            }
        }
        fetchMyBoxes()
    }, [publicKey, jwtToken])

    return (
        <>
            {!publicKey ? (
                <div className="text-2xl font-boldtext-center text-secondary items-center justify-center "></div>
            ) : (
                <div
                    id="my-boxes"
                    className="  flex flex-col justify-center items-center p-10 md:p-64"
                >
                    <div className="flex justify-start items-start w-full ">
                        <span className="text-3xl font-bold text-accent p-2 mb-4 ">
                            My boxes ({myBoxes?.length})
                        </span>
                    </div>
                    <div className="flex flex-col w-full max-h-screen overflow-y-auto px-4">
                        {myBoxes && myBoxes.length > 0 ? (
                            myBoxes?.map((box, index) => {
                                return (
                                    <div
                                        key={index}
                                        className=" z-[55] mb-3  flex w-full max-w-screen transform cursor-pointer flex-col justify-between rounded-md bg-background-light bg-opacity-75 p-6 text-accent transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-dark md:flex-row md:p-4"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <img
                                                src={cyanBox}
                                                alt="Box"
                                                className="w-16 h-16 md:w-24 md:h-24 mr-4"
                                            />
                                            <div className="    ">
                                                <div className="w-full truncate text-xl font-extrabold leading-5 tracking-tight">
                                                    {box.boxType.name}
                                                </div>
                                                <p className="text-sm text-slate-500">
                                                    {box._id}
                                                </p>{' '}
                                                <span className="text-sm text-slate-400">
                                                    {box.status}
                                                </span>
                                            </div>
                                            <div className="mt-4 md:mt-0 flex flex-row items-center justify-start md:justify-center  ">
                                                <AnimatedTooltip
                                                    items={box.boxContents.map(
                                                        (object) => ({
                                                            name: object.token
                                                                .name,
                                                            mintAddress:
                                                                object.token
                                                                    .mint,
                                                            image: object.token
                                                                .image,
                                                        })
                                                    )}
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xl font-bold">
                                                    BOX TYPE ID{' '}
                                                    {box.boxType._id}
                                                </span>
                                                <span className="text-lg">
                                                    {box.boxType.name}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {box.status}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    Current Price:{' '}
                                                    {box.signature}
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
                                            {box._id == selectedBoxId &&
                                                'SELECTED'}
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedBoxId(box._id)
                                            }}
                                            className="z-[100] mt-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark"
                                        >
                                            Select Box
                                        </button>
                                    </div>
                                )
                            })
                        ) : (
                            //    selectedBoxId && (
                            //         <p className="text-accent ">
                            //             {' '}
                            //             Selected Box: {selectedBoxId}
                            //         </p>
                            //     )

                            <div>
                                {' '}
                                <span className="text-accent text-xl">
                                    {' '}
                                    You don't own any box, why dont you buy one
                                    ?{' '}
                                </span>{' '}
                            </div>
                        )}{' '}
                    </div>
                    <OpenBoxModal boxId={selectedBoxId} />
                </div>
            )}
        </>
    )
}

export default MyBoxesSection
