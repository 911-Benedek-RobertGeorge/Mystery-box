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
}

export interface BoxType1 {
    name: string
    risk: RiskType
    maxBoxAmount: number // max number of boxes that can be bought
    // toadd available boxes
    amountLamports: string // price
    mints: MintWithTicker[] // all the mints , not needed
}

export interface BoxContent {
    /// memecoin type
    mint: string
    ticker: string
    amountLamports: string
    amount: string
    percentage: string
    buyPrice?: string
    signatures: string[]
    createdAt: Date
}

export interface Box {
    boxContents: BoxContent[]
    boxType: BoxType
    buyer?: string
    createdAt: Date
}

export type BoxType = {
    id: string
    name: string
    amountLamports: string
    maxBoxAmount: number
    availableBoxes: number
}
