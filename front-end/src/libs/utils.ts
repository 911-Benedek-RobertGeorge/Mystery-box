import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { PublicKey, Transaction } from '@solana/web3.js'
import { VITE_ENV_BACKEND_PUBLIC_KEY } from './config'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function hasBackendSignedTransaction(
    partialTransaction: Transaction
): boolean {
    const backendPublicKey = new PublicKey(VITE_ENV_BACKEND_PUBLIC_KEY)

    return partialTransaction.signatures.some((signature, index) => {
        if (signature.signature) {
            const signerPublicKey =
                partialTransaction.instructions[0].keys[index].pubkey
            return signerPublicKey.equals(backendPublicKey)
        }
        return false
    })
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
    hours: number
    minutes: number
} {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    return { hours: diffHours, minutes: diffMinutes }
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
