import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { PublicKey, Transaction } from '@solana/web3.js'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function hasBackendSignedTransaction(
    partialTransaction: Transaction
): boolean {
    const backendPublicKey = new PublicKey(
        import.meta.env.VITE_ENV_BACKEND_PUBLIC_KEY
    )
    console.log('Backend public key:', backendPublicKey.toBase58())

    // const partialTransaction = Transaction.from(
    //     Buffer.from(partialTxData, 'base64')
    // ) // Ensure tx data is in Buffer
    console.log('Partial transaction:', partialTransaction)
    return partialTransaction.signatures.some((signature, index) => {
        if (signature.signature) {
            const signerPublicKey =
                partialTransaction.instructions[0].keys[index].pubkey
            return signerPublicKey.equals(backendPublicKey)
        }
        return false
    })
}
