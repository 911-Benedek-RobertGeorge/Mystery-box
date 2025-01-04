import React, { useEffect } from 'react'
import cyanBox from '../../../assets/boxes/cyan_box.png'
import {
    lamportsToSol,
    shortenAddress,
    timeDifferenceFromNow,
} from '../../../libs/utils'
import { VITE_ENV_BACKEND_URL } from '../../../libs/config'
import { memeCoinType, MysteryBox } from '../../../libs/interfaces'
import { AnimatedTooltip } from '../../../components/ui/AnimatedTooltip'
interface HistoryItem {
    price: number
    totalPaidUSD: number
    roi: number
    date: Date

    boxType: string
    boxContent: memeCoinType[]
    image: string
    buyer: string
}

const HistorySection: React.FC = () => {
    const [historyData, setHistoryData] = React.useState<HistoryItem[]>([])

    useEffect(() => {
        const fetchMyBoxes = async () => {
            try {
                const response = await fetch(
                    `${VITE_ENV_BACKEND_URL}/boxes/results`
                )
                const data: MysteryBox[] = await response.json()

                const historyItems = transformToHistoryItems(data)
                setHistoryData(historyItems)
            } catch (error) {
                console.error('fetchMyBoxes: ', error)
            }
        }

        fetchMyBoxes()
    }, [])

    const transformToHistoryItems = (
        mysteryBoxes: MysteryBox[]
    ): HistoryItem[] => {
        return mysteryBoxes.map((box) => ({
            price: parseFloat(
                lamportsToSol(box.boxType.amountLamports).toFixed(4)
            ),

            totalPaidUSD: parseFloat(
                (
                    box?.solPrice * lamportsToSol(box.boxType.amountLamports)
                ).toFixed(2)
            ),

            // parseFloat(
            //     (
            //         (box.boxContents.reduce(
            //             (acc, content) =>
            //                 acc + parseInt(content.amountLamports),
            //             0
            //         ) /
            //             1e9) *
            //         box.boxContents[0].solPrice
            //     ).toFixed(4)
            // ),
            roi: parseFloat(
                (
                    (box.boxContents.reduce(
                        (acc, content) =>
                            acc + parseInt(content.amountLamports),
                        0
                    ) /
                        parseInt(box.boxType.amountLamports) -
                        1) *
                    100
                ).toFixed(2)
            ),
            date: new Date(box.updatedAt),

            boxType: box.boxType.name,
            boxContent: box.boxContents?.map((content) => ({
                mintAddress: content.token.mint,
                image: content.token.image,
                name: content.token.name,
            })),
            image: cyanBox,
            buyer: box.buyer,
        }))
    }

    return (
        <div className="z-[100] flex flex-col justify-center items-center p-10 md:p-64 ">
            <div className="flex justify-start items-start w-full ">
                <span className="text-3xl font-bold text-accent p-2 mb-4 ">
                    Latest Boxes sold
                </span>
            </div>

            {historyData.slice(0, 5).map((box, index) => {
                return (
                    <div
                        key={index}
                        className="mb-3 flex w-full max-w-screen transform cursor-pointer flex-col justify-between rounded-md bg-background-light bg-opacity-75 p-6 text-accent transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-dark md:flex-row md:p-4"
                    >
                        <div className="flex w-full flex-row md:w-3/12">
                            <div className="relative flex flex-col">
                                <div className="flex h-12 w-12 flex-shrink-0 flex-col justify-center rounded-full bg-slate-200 bg-opacity-50 dark:bg-slate-600">
                                    <img
                                        src={box.image}
                                        className="z-10 h-12 w-12 rounded-full object-cover shadow hover:shadow-xl"
                                        alt="mistery box"
                                    />
                                    <span className="absolute right-0 top-0 z-20 flex h-3 w-3">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                                        <span className="relative inline-flex h-3 w-3 rounded-full bg-accent-light"></span>
                                    </span>
                                </div>
                            </div>

                            <div className="ml-4 self-center overflow-x-hidden">
                                <div className="w-full truncate text-xl font-extrabold leading-5 tracking-tight">
                                    {box.boxType}
                                </div>
                                <div className="text-sm text-slate-500">
                                    Buyer:{' '}
                                    {box.buyer && shortenAddress(box.buyer, 6)}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-row items-center justify-start md:justify-center  ">
                            <AnimatedTooltip items={box.boxContent} />
                        </div>

                        <div className="w-full self-center pt-4 lg:w-1/6 lg:pt-0">
                            <div className="ml-1">
                                <div className="text-xl font-extrabold leading-5 tracking-tight">
                                    {box.date.toLocaleDateString()}
                                </div>
                                <div className="text-sm text-slate-500">
                                    {timeDifferenceFromNow(box.date).hours > 0
                                        ? timeDifferenceFromNow(box.date)
                                              .hours + ' hours ago'
                                        : timeDifferenceFromNow(box.date)
                                              .minutes + ' minutes ago'}
                                </div>
                            </div>
                        </div>
                        <div className="w-full self-center pt-4 lg:w-1/6 lg:pt-0">
                            <div className="ml-1">
                                <div className="text-xl font-extrabold leading-5 tracking-tight">
                                    <span className="align-middle">
                                        {box.price} SOL
                                    </span>
                                    <span className="text-[8px] ml-2 rounded bg-green-600 px-2 py-1 align-middle font-bold uppercase text-white">
                                        Paid
                                    </span>
                                </div>
                                <div className="text-sm text-slate-500">
                                    Total Paid {box.totalPaidUSD} USD
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default HistorySection
