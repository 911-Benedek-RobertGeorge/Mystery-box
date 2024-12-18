import React from 'react'
import logo from '../../../assets/elements/logo.png'
import boom from '../../../assets/coins/boom.png'
import { useSelector } from 'react-redux'
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

const historyData: HistoryItem[] = [
    {
        price: 0.3,
        currentPrice: 1.27,
        roi: 50,
        date: '10/20/2022',
        boxType: 'Risky',
        boxContent: [
            { mintAddress: '0x1234', image: boom, name: 'boom' },
            { mintAddress: '0x5678', image: boom, name: 'boom' },
            { mintAddress: '0x1234', image: boom, name: 'boom' },
            { mintAddress: '0x5678', image: boom, name: 'boom' },
            { mintAddress: '0x1234', image: boom, name: 'boom' },
        ],
        image: logo,
    },
    {
        price: 1,
        currentPrice: 0.57,
        roi: 25,
        date: '11/21/2024',
        boxType: 'Safe',
        boxContent: [
            { mintAddress: '0x1234', image: boom, name: 'boom' },
            { mintAddress: '0x5678', image: boom, name: 'boom' },
        ],

        image: logo,
    },
    {
        price: 1,
        currentPrice: 0.57,
        roi: 25,
        date: '11/21/2024',
        boxType: 'Safe',
        boxContent: [
            { mintAddress: '0x1234', image: boom, name: 'boom' },
            { mintAddress: '0x5678', image: boom, name: 'boom' },
        ],

        image: logo,
    },
    {
        price: 1,
        currentPrice: 0.57,
        roi: 25,
        date: '11/21/2024',
        boxType: 'Safe',
        boxContent: [
            { mintAddress: '0x1234', image: boom, name: 'boom' },
            { mintAddress: '0x5678', image: boom, name: 'boom' },
        ],

        image: logo,
    },
    {
        price: 1,
        currentPrice: 0.57,
        roi: 25,
        date: '11/21/2024',
        boxType: 'Safe',
        boxContent: [
            { mintAddress: '0x1234', image: boom, name: 'boom' },
            { mintAddress: '0x5678', image: boom, name: 'boom' },
        ],

        image: logo,
    },
]

///TOODO make computations in lamports

const HistorySection: React.FC = () => {
    const solanaPrice = useSelector(
        (state: { solana: { price: number } }) => state.solana.price
    )
    return (
        <div className="z-[111] w-screen h-screen flex flex-col justify-center items-center p-10 md:p-64">
            {/* <div className="mb-3 flex w-full max-w-screen-xl transform cursor-pointer flex-col justify-between rounded-md bg-white bg-opacity-75 p-6 text-slate-800 transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg dark:bg-slate-700 dark:bg-opacity-25 dark:text-slate-300 lg:flex-row lg:p-4"> */}
            <div className="flex justify-start items-start w-full ">
                <span className="text-3xl font-bold text-accent p-2 mb-4 ">
                    Latest Boxes sold
                </span>
            </div>
            {historyData.map((box, index) => {
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
                                    {box.owner ? box.owner : 'Owner 0x1234'}
                                </div>
                            </div>
                        </div>
                        <div className="z-50  w-1/6 self-center block">
                            <div className="flex flex-row justify-center">
                                <div
                                    x-data="{ tooltip: false }"
                                    // onMouseOver={() => (tooltip = true)}
                                    // onMouseLeave={() => (tooltip = false)}
                                    className="relative z-0 -mr-4 inline-flex flex-row transition duration-300 ease-in-out hover:-mr-1"
                                    x-cloak
                                >
                                    {box.boxContent.map((content) => {
                                        return (
                                            <img
                                                className="z-10 h-9 w-9 rounded-full border-2 -mr-4   border-white object-cover shadow hover:shadow-xl dark:border-slate-800"
                                                src={content.image}
                                                alt="Marilyn Monroe"
                                            />
                                        )
                                    })}

                                    {/* TOOLTIP HERE */}
                                    <div
                                        className=" hidden relative z-50 overflow-visible pt-2"
                                        x-cloak
                                        x-show="tooltip"
                                        x-transition:enter="transition ease-out duration-150"
                                        x-transition:enter-start="transform opacity-0 translate-y-full"
                                        x-transition:enter-end="transform opacity-100 translate-y-0"
                                        x-transition:leave="transition ease-in duration-150"
                                        x-transition:leave-start="transform opacity-100 translate-y-0"
                                        x-transition:leave-end="transform opacity-0 translate-y-full"
                                    >
                                        <div className="absolute -right-1 z-50 mt-1 w-40 -translate-x-10 -translate-y-5 transform overflow-x-hidden rounded-lg bg-blue-200 p-2 text-center leading-tight text-white shadow-md dark:bg-slate-900">
                                            <div className="text-slate-700 dark:text-slate-200 text-center text-base font-extrabold">
                                                Mint Addresses
                                            </div>
                                            <div className="text-slate-500 text-xs uppercase">
                                                {box.boxContent.map(
                                                    (content) => {
                                                        return (
                                                            <div className="flex flex-row items-center justify-center">
                                                                <img
                                                                    className="z-10 h-9 w-9 rounded-full border-2 border-white object-cover shadow hover:shadow-xl dark:border-slate-800"
                                                                    src={
                                                                        content.image
                                                                    }
                                                                    alt="Marilyn Monroe"
                                                                />
                                                                <p>
                                                                    {
                                                                        content.name
                                                                    }
                                                                    :
                                                                </p>{' '}
                                                                <span className="absolute bottom-0 right-0 z-20 h-3 w-3 rounded-full border-2 border-slate-200 bg-green-400 dark:border-slate-800"></span>
                                                                <p>
                                                                    {
                                                                        content.mintAddress
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    }
                                                )}
                                            </div>
                                        </div>
                                        {/* <svg
                                            className="absolute right-2 z-50 h-6 w-6 -translate-x-4 translate-y-0 transform fill-current stroke-current text-blue-200 dark:text-slate-900"
                                            width="8"
                                            height="8"
                                        >
                                            <rect
                                                x="9"
                                                y="-8"
                                                width="8"
                                                height="8"
                                                transform="rotate(45)"
                                            ></rect>
                                        </svg> */}
                                    </div>
                                </div>
                                {/* <div
                                    x-data="{ tooltip: false }"
                                    className="relative z-0 -mr-4 inline-flex transition duration-300 ease-in-out"
                                    x-cloak
                                >
                                    <img
                                        className="z-10 h-9 w-9 rounded-full border-2 border-white object-cover shadow hover:shadow-xl dark:border-slate-800"
                                        src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=128&h=128&q=60&facepad=1.5"
                                        alt="Salesperson"
                                    />
                                    <span className="absolute bottom-0 right-0 z-20 h-3 w-3 rounded-full border-2 border-slate-200 bg-green-400 dark:border-slate-800"></span>
                                    <div
                                        className="relative z-50 overflow-visible pt-2"
                                        x-cloak
                                        x-show="tooltip"
                                        x-transition:enter="transition ease-out duration-150"
                                        x-transition:enter-start="transform opacity-0 translate-y-full"
                                        x-transition:enter-end="transform opacity-100 translate-y-0"
                                        x-transition:leave="transition ease-in duration-150"
                                        x-transition:leave-start="transform opacity-100 translate-y-0"
                                        x-transition:leave-end="transform opacity-0 translate-y-full"
                                    >
                                        <div className="absolute -right-1 z-50 mt-1 w-40 -translate-x-10 -translate-y-5 transform overflow-x-hidden rounded-lg bg-blue-200 p-2 text-center leading-tight text-white shadow-md dark:bg-slate-900">
                                            <div className="text-slate-700 dark:text-slate-200 text-center text-base font-extrabold">
                                                Jimmy Stewart
                                            </div>
                                            <div className="text-slate-500 text-xs uppercase">
                                                Secondary
                                            </div>
                                        </div>
                                        <svg
                                            className="absolute right-2 z-50 h-6 w-6 -translate-x-4 translate-y-0 transform fill-current stroke-current text-blue-200 dark:text-slate-900"
                                            width="8"
                                            height="8"
                                        >
                                            <rect
                                                x="9"
                                                y="-8"
                                                width="8"
                                                height="8"
                                                transform="rotate(45)"
                                            ></rect>
                                        </svg>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="w-full self-center pt-4 lg:w-1/6 lg:pt-0">
                            <div className="ml-1">
                                <div className="text-xl font-extrabold leading-5 tracking-tight">
                                    {box.date}
                                </div>
                                <div className="text-sm text-slate-500">
                                    2 hours ago
                                </div>
                                {/* ///TODO Add a function to calculate the time difference */}
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
                                    Total Paid{' '}
                                    {(box.price * solanaPrice).toFixed(2)} USD
                                </div>
                            </div>
                        </div>
                        <div className="w-full self-center pt-4 lg:w-1/6 lg:pt-0">
                            <div className="ml-1">
                                <div className="text-xl font-extrabold leading-5 tracking-tight">
                                    <span className="align-middle">
                                        {box.currentPrice} SOL
                                    </span>
                                    {box.currentPrice - box.price > 0 ? (
                                        <span className="text-[8px] ml-2 rounded bg-green-600 px-2 py-1 align-middle font-bold uppercase text-white">
                                            Profit
                                        </span>
                                    ) : (
                                        <span className="text-[8px] ml-2 rounded bg-red-600 px-2 py-1 align-middle font-bold uppercase text-white">
                                            Loss
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm text-slate-500">
                                    Current price{' '}
                                    {(box.currentPrice * solanaPrice).toFixed(
                                        2
                                    )}{' '}
                                    USD
                                </div>
                            </div>
                        </div>
                        {/* <div className="w-full self-center px-1 pt-4 pb-2 lg:w-1/6 lg:px-0 lg:pt-0 lg:pb-0">
                            <div className="text-base font-bold leading-4 tracking-tight">
                                Risk level
                            </div>
                            <div className="status-bars w-full pt-2">
                                <div className="flex flex-row lg:pr-6">
                                    <div className="max-w-6 h-1 w-1/5 rounded bg-green-500"></div>
                                    <div className="max-w-6 ml-1 h-1 w-1/5 rounded bg-amber-500"></div>
                                    <div className="max-w-6 ml-1 h-1 w-1/5 rounded bg-red-500"></div>

                                    <div className="max-w-6 ml-1 h-1 w-1/5 rounded bg-slate-400 bg-opacity-25 dark:bg-slate-600"></div>
                                    <div className="max-w-6 ml-1 h-1 w-1/5 rounded bg-slate-400 bg-opacity-25 dark:bg-slate-600"></div>
                                    <div className="max-w-6 ml-1 h-1 w-1/5 rounded bg-slate-400 bg-opacity-25 dark:bg-slate-600"></div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                )
            })}

            {/* </div> */}
        </div>
    )
}

export default HistorySection
