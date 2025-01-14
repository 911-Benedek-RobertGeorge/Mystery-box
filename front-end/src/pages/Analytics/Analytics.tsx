import React, { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { ADMIN_WALLETS } from '../../libs/constants'
import { motion } from 'framer-motion'
import { BoxContent, MysteryBox } from '../../libs/interfaces'
import { VITE_ENV_BACKEND_URL } from '../../libs/config'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { shortenAddress } from '../../libs/utils'

const Analytics: React.FC = () => {
    const [boxes, setBoxes] = useState<MysteryBox[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { publicKey } = useWallet()
    const isAdmin = publicKey && ADMIN_WALLETS.includes(publicKey.toString())

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(
                    `${VITE_ENV_BACKEND_URL}/boxes/analytics`,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                'jwtToken'
                            )}`,
                        },
                    }
                )
                const data = await response.json()
                setBoxes(data)
            } catch (error) {
                console.error('Error fetching analytics:', error)
            } finally {
                setIsLoading(false)
            }
        }

        if (isAdmin) {
            fetchAnalytics()
        }
    }, [isAdmin])

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-dark">
                <h1 className="text-2xl text-accent">Access Denied</h1>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center bg-background-dark">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-accent rounded-full border-t-transparent animate-spin"></div>
                    <span className="text-accent">Loading analytics...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen max-w-full pt-32 mx-auto bg-background-dark text-gray-200 overflow-auto">
            <div className="mt-16 mx-10 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-emerald-500">
                        Box Analytics
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatsCard
                            title="Total Boxes"
                            value={boxes.length}
                            className="bg-accent/5 hover:bg-accent/10"
                        />
                        <StatsCard
                            title="Available Boxes"
                            value={
                                boxes.filter(
                                    (box) => box.status === 'AVAILABLE'
                                ).length
                            }
                            className="bg-emerald-500/5 hover:bg-emerald-500/10"
                        />
                        <StatsCard
                            title="Average Box Value"
                            value={`$${calculateAverageBoxValue(boxes).toFixed(2)}`}
                            className="bg-pink-500/5 hover:bg-pink-500/10"
                        />
                    </div>

                    <div className="bg-background-dark border border-accent/20 rounded-xl overflow-hidden">
                        {/* Desktop View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-accent/10">
                                        <th className="p-4 text-left text-accent w-[80px]">
                                            Box ID
                                        </th>
                                        <th className="p-4 text-left text-accent w-[100px]">
                                            Status
                                        </th>
                                        <th className="p-4 text-left text-accent w-[120px]">
                                            Buyer
                                        </th>
                                        <th className="p-4 text-left text-accent w-[120px]">
                                            Transactions
                                        </th>
                                        <th className="p-4 text-left text-accent w-[100px]">
                                            Initial
                                        </th>
                                        <th className="p-4 text-left text-accent w-[100px]">
                                            Current/Claimed
                                        </th>
                                        <th className="p-4 text-left text-accent w-[100px]">
                                            Change
                                        </th>
                                        <th className="p-4 text-left text-accent min-w-[600px]">
                                            Contents
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-accent/10">
                                    {boxes.map((box) => (
                                        <tr
                                            key={box._id}
                                            className="hover:bg-accent/5 transition-colors"
                                        >
                                            <td className="p-4 font-mono w-[80px]">
                                                {box._id.slice(-6)}
                                            </td>
                                            <td className="p-4 w-[100px]">
                                                <StatusBadge
                                                    status={box.status}
                                                />
                                            </td>
                                            <td className="p-4 w-[120px]">
                                                {box.buyer ? (
                                                    <AddressLink
                                                        address={box.buyer}
                                                    />
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                            <td className="p-4 w-[120px]">
                                                <div className="flex flex-col space-y-2">
                                                    {box.buySignature && (
                                                        <TransactionLink
                                                            signature={
                                                                box.buySignature
                                                            }
                                                            label="Buy"
                                                        />
                                                    )}
                                                    {box.claimSignature && (
                                                        <TransactionLink
                                                            signature={
                                                                box.claimSignature
                                                            }
                                                            label="Claim"
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 w-[100px]">
                                                $
                                                {box.initialUsdValue?.toFixed(
                                                    2
                                                ) || '0'}
                                            </td>
                                            <td className="p-4 w-[100px]">
                                                $
                                                {Number(
                                                    box.liveBoxValue || 0
                                                ).toFixed(2)}
                                            </td>
                                            <td className="p-4 w-[100px]">
                                                <ValueChange
                                                    initial={
                                                        box.initialUsdValue
                                                    }
                                                    current={
                                                        box.status === 'CLAIMED'
                                                            ? box.claimUsdValue ||
                                                              0
                                                            : box.liveBoxValue ||
                                                              0
                                                    }
                                                />
                                            </td>
                                            <td className="p-4 min-w-[600px]">
                                                <TokensList
                                                    tokens={box.boxContents}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile View */}
                        <div className="md:hidden">
                            {boxes.map((box) => (
                                <div
                                    key={box._id}
                                    className="p-4 border-b border-accent/10 hover:bg-accent/5 transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="font-mono text-sm text-accent">
                                                #{box._id.slice(-6)}
                                            </div>
                                            <StatusBadge status={box.status} />
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-400">
                                                Initial: $
                                                {box.initialUsdValue?.toFixed(
                                                    2
                                                ) || '0'}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                Current: $
                                                {box.status === 'CLAIMED'
                                                    ? Number(
                                                          box.claimUsdValue || 0
                                                      ).toFixed(2)
                                                    : Number(
                                                          box.liveBoxValue || 0
                                                      ).toFixed(2)}
                                            </div>
                                            <ValueChange
                                                initial={box.initialUsdValue}
                                                current={
                                                    box.status === 'CLAIMED'
                                                        ? Number(
                                                              box.claimUsdValue ||
                                                                  0
                                                          )
                                                        : Number(
                                                              box.liveBoxValue ||
                                                                  0
                                                          )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="text-sm text-gray-400 mb-1">
                                            Buyer
                                        </div>
                                        {box.buyer ? (
                                            <AddressLink address={box.buyer} />
                                        ) : (
                                            '-'
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <div className="text-sm text-gray-400 mb-1">
                                            Transactions
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            {box.buySignature && (
                                                <TransactionLink
                                                    signature={box.buySignature}
                                                    label="Buy"
                                                />
                                            )}
                                            {box.claimSignature && (
                                                <TransactionLink
                                                    signature={
                                                        box.claimSignature
                                                    }
                                                    label="Claim"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-gray-400 mb-2">
                                            Contents
                                        </div>
                                        <TokensList tokens={box.boxContents} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

const StatsCard: React.FC<{
    title: string
    value: string | number
    className?: string
}> = ({ title, value, className }) => (
    <div className={`p-6 rounded-xl border border-accent/20 ${className}`}>
        <h3 className="text-gray-400 mb-2">{title}</h3>
        <p className="text-2xl font-bold text-accent">{value}</p>
    </div>
)

const StatusBadge: React.FC<{ status: string | undefined }> = ({ status }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'AVAILABLE':
                return 'bg-emerald-500/20 text-emerald-500'
            case 'CLAIMED':
                return 'bg-accent/20 text-accent'
            default:
                return 'bg-gray-500/20 text-gray-500'
        }
    }

    return (
        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor()}`}>
            {status}
        </span>
    )
}

const ValueChange: React.FC<{ initial: number | null; current: number }> = ({
    initial,
    current,
}) => {
    if (!initial) return null
    const change = current - initial
    const percentage = (change / initial) * 100

    return (
        <span
            className={`${change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}
        >
            {change >= 0 ? '+' : ''}
            {percentage.toFixed(2)}%
        </span>
    )
}

const TokensList: React.FC<{ tokens: BoxContent[] }> = ({ tokens }) => (
    <div className="flex flex-wrap gap-2">
        {tokens.map((content) => (
            <div
                key={content._id}
                className="flex items-center space-x-2 p-2 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors"
            >
                <img
                    src={content.token.image}
                    alt={content.token.name}
                    className="w-6 h-6 rounded-full border border-accent/20"
                />
                <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-gray-200">
                            {content.token.symbol}
                        </span>
                        <span className="text-xs text-accent">
                            {content.percentage}%
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-200">
                            {(
                                parseInt(content.amount, 10) /
                                10 ** content.token.decimals
                            ).toFixed(2)}
                        </span>
                        <span className="text-xs text-emerald-400">
                            ${Number(content.tokenValue || '0.00').toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        ))}
    </div>
)

const calculateAverageBoxValue = (boxes: MysteryBox[]) => {
    if (boxes.length === 0) return 0
    const totalValue = boxes.reduce(
        (sum, box) => sum + (box.liveBoxValue || 0),
        0
    )
    return totalValue / boxes.length
}

const TransactionLink: React.FC<{ signature: string; label: string }> = ({
    signature,
    label,
}) => (
    <a
        href={`https://explorer.solana.com/tx/${signature}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-accent hover:text-accent-light transition-colors text-sm"
    >
        <span>{label}</span>
        <FaExternalLinkAlt className="w-3 h-3" />
    </a>
)

const AddressLink: React.FC<{ address: string }> = ({ address }) => (
    <a
        href={`https://explorer.solana.com/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-accent hover:text-accent-light transition-colors text-sm"
    >
        <span>{shortenAddress(address, 6)}</span>
        <FaExternalLinkAlt className="w-3 h-3" />
    </a>
)

const calculateTotalValueLocked = (boxes: MysteryBox[]) => {
    return boxes.reduce((sum, box) => sum + (box.liveBoxValue || 0), 0)
}

const calculateAverageROI = (boxes: MysteryBox[]) => {
    const claimedBoxes = boxes.filter(
        (box) =>
            box.status === 'CLAIMED' && box.initialUsdValue && box.liveBoxValue
    )
    if (claimedBoxes.length === 0) return 0

    const totalROI = claimedBoxes.reduce((sum, box) => {
        const roi =
            ((box.liveBoxValue! - box.initialUsdValue!) /
                box.initialUsdValue!) *
            100
        return sum + roi
    }, 0)

    return totalROI / claimedBoxes.length
}

export default Analytics
