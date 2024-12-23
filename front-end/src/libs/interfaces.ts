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
}

export interface BoxContent {
    _id: string
    token: Token
    solPrice: number
    amountLamports: string
    amount: string
    percentage: string
    signatures: string[]
    ata: string
    status: string
    createdAt: string
    __v: number
}

export enum BoxStatus {
    BOUGHT = 'BOUGHT',
    OPEN = 'OPEN',
}
export interface MysteryBox {
    _id: string
    boxContents: BoxContent[]
    boxType: BoxType
    buyer: string
    createdAt: string
    updatedAt: string
    signature?: string
    status?: BoxStatus
}
