export interface MemeImage {
    src: string
    top: string
    left: string
}

export enum RiskType {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export interface MintWithTicker {
    mint: string
    ticker: string
    boxContents: BoxContent[]
}
export interface Token {
    _id: string
    name: string
    symbol: string
    image: string
    mint: string
    decimals: number
    description: string
    __v: number
}

export interface BoxType {
    _id: string
    name: string
    __v: number
    amountLamports: string
    lockedBoxes: number
    maxBoxAmount: number
    availableBoxes: number
}

export interface BoxContent {
    _id: string
    token: Token
    amountLamports: string
    amount: string
    percentage: string
    signatures: string[]
    ata: string
    status: string
    createdAt: string
    __v: number
    tokenValue?: string
}

export enum BoxStatus {
    BOUGHT = 'BOUGHT',
    OPEN = 'OPEN',
    AVAILABLE = 'AVAILABLE',
    LOCKED = 'LOCKED',
    CLAIMING = 'CLAIMING',
    CLAIMED = 'CLAIMED',
}
export interface MysteryBox {
    _id: string
    boxContents: BoxContent[]
    boxType: BoxType
    buyer: string
    createdAt: string
    updatedAt: string
    status?: BoxStatus
    claimSignature?: string
    buySignature?: string
    solPrice: number
    initialUsdValue: number
    claimUsdValue: number
    liveBoxValue?: number
}

export type memeCoinType = {
    mintAddress: string
    image: string
    name: string
}
