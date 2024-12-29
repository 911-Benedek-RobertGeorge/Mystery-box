import { FC, ReactNode, useCallback, useMemo } from 'react'
import {
    Adapter,
    WalletAdapterNetwork,
    WalletError,
} from '@solana/wallet-adapter-base'
import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import '@solana/wallet-adapter-react-ui/styles.css'
import {
    SolNetworkConfigurationProvider,
    useNetworkConfiguration,
} from './SolNetworkConfigurationProvider'

import { type SolanaSignInInput } from '@solana/wallet-standard-features'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { useDispatch } from 'react-redux'
import {
    VITE_ENV_BACKEND_URL,
    VITE_ENV_SOLANA_NETWORK_RPC,
} from '../../libs/config'

const SolWalletContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const getTimestampFromJwt = (token: string) => {
        try {
            // Split the token into parts
            const [, payloadBase64] = token.split('.') // Ignore the header and signature

            // Decode the Base64 payload
            const decodedPayload = JSON.parse(atob(payloadBase64))

            // Extract timestamps (iat or exp)
            const issuedAt = decodedPayload.iat // Issued at timestamp
            const expiration = decodedPayload.exp // Expiration timestamp

            return { issuedAt, expiration }
        } catch (error) {
            console.error('Error decoding JWT:', error)
            return null
        }
    }

    const autoSignIn = useCallback(async (adapter: Adapter) => {
        // If the signIn feature is not available, return true
        if (!('signIn' in adapter)) return true

        const token = sessionStorage.getItem('jwtToken')

        if (token) {
            const timestamp = getTimestampFromJwt(token)
            /// if the jwt token is not expired
            if (
                timestamp &&
                timestamp.expiration > Math.floor(Date.now() / 1000)
            ) {
                return true
            }
        }
        // Fetch the signInInput from the backend
        const createResponse = await fetch(
            `${VITE_ENV_BACKEND_URL}/auth/sign-in`
        )

        const input: SolanaSignInInput = await createResponse.json()
        const output = await adapter.signIn(input)

        const payload = {
            input,
            output: {
                account: {
                    publicKey: Array.from(output.account.publicKey),
                    address: output.account.address,
                },
                signature: Array.from(output.signature),
                signedMessage: Array.from(output.signedMessage),
            },
        }

        const verifyResponse = await fetch(
            `${VITE_ENV_BACKEND_URL}/auth/verify-sign-in`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }
        )
        const response = await verifyResponse.json()
        sessionStorage.setItem('jwtToken', response.jwt)
        console.log('Sign In verification success:', response)
        if (!response) throw new Error('Sign In verification failed!')

        return false
    }, [])

    const { networkConfiguration } = useNetworkConfiguration()
    const network = networkConfiguration as WalletAdapterNetwork
    const endpoint = useMemo(
        () =>
            VITE_ENV_SOLANA_NETWORK_RPC
                ? VITE_ENV_SOLANA_NETWORK_RPC
                : clusterApiUrl(network),

        [network]
    )

    const wallets = useMemo(() => [new PhantomWalletAdapter()], [network])

    const onError = useCallback((error: WalletError) => {
        console.error(error)
    }, [])

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider
                wallets={wallets}
                onError={onError}
                autoConnect={autoSignIn}
            >
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export const SolContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    return (
        <>
            <SolNetworkConfigurationProvider>
                <SolWalletContextProvider>{children}</SolWalletContextProvider>
            </SolNetworkConfigurationProvider>
        </>
    )
}
