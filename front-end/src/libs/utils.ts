import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ANALYTICS_WALLETS } from './config'
import cyanBox from '../assets/boxes/cyan_box-noBG.png'
import  introBox   from '../assets/boxes/introBox.png'
import testBox  from '../assets/boxes/testbox.png'
import questionMark from '../assets/elements/question_mark.png'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// export function hasBackendSignedTransaction(
//     partialTransaction: Transaction
// ): boolean {
//     const backendPublicKey = new PublicKey(VITE_ENV_BACKEND_PUBLIC_KEY)

//     return partialTransaction.signatures.some((signature, index) => {
//         if (signature.signature) {
//             const signerPublicKey =
//                 partialTransaction.instructions[0].keys[index].pubkey
//             return signerPublicKey.equals(backendPublicKey)
//         }
//         return false
//     })
// }
export const getBoxImage = ( boxTypeId: string ) => {
    const boxImageMap: { [key: string]: string } = {
        '6793785f1e6acd3043be74ae': introBox,
        '676135d9687f17a1771ba2f6': cyanBox,
        '678eb04437c646670f5a3109': testBox,
    }
    return boxImageMap[ boxTypeId] || questionMark
}

export function shortenAddress(address: string, visibleChars: number): string {
    if (address.length <= visibleChars) {
        return address
    }
    const start = address.slice(0, visibleChars)
    const end = address.slice(-visibleChars)
    return `${start}...${end}`
}

export function lamportsToSol(lamports: string): number {
    const LAMPORTS_PER_SOL = 1e9
    const lamportsNumber = parseInt(lamports, 10)
    if (isNaN(lamportsNumber)) {
        return 0
    }
    return lamportsNumber / LAMPORTS_PER_SOL
}

export function timeDifferenceFromNow(date: Date): {
    days: number
    hours: number
    minutes: number
} {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()

    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    return { days: diffDays, hours: diffHours, minutes: diffMinutes }
}

export const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)

    if (section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth',
        })
    }
}

export const getTimestampFromJwt = (token: string) => {
    try {
        // Split the token into parts
        const [, payloadBase64] = token.split('.') // Ignore the header and signature

        // Decode the Base64 payload
        const decodedPayload = JSON.parse(atob(payloadBase64))

        const issuedAt = decodedPayload.iat // Issued at timestamp
        const expiration = decodedPayload.exp // Expiration timestamp

        return { issuedAt, expiration }

       } catch (error) {
        console.error('Error decoding JWT:', error)
        return null
    }
}

export const getDataFromJwt = (token: string | null) => {
    if (!token) return null

    try {
        const [, payloadBase64] = token.split('.') // Ignore the header and signature
        const decodedPayload = JSON.parse(atob(payloadBase64))

        const walletAddress = decodedPayload.walletAddress

        return { walletAddress }

    } catch (error) {
        console.error('Error decoding JWT:', error)
        return null
    }
}

 export const isLoggedInWalletAnalytics = () => {
    const jwt = sessionStorage.getItem('jwtToken')
    const walletAddress = getDataFromJwt(jwt)?.walletAddress
     return ANALYTICS_WALLETS.includes(walletAddress)
}
