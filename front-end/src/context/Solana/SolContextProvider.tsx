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
import { SolAutoConnectProvider } from './SolAutoConnectProvider'
import {
    SolNetworkConfigurationProvider,
    useNetworkConfiguration,
} from './SolNetworkConfigurationProvider'

import { type SolanaSignInInput } from '@solana/wallet-standard-features'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { useDispatch } from 'react-redux'
import { setToken } from '../store/AuthSlice'

const SolWalletContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const dispatch = useDispatch()

    const autoSignIn = useCallback(async (adapter: Adapter) => {
        // If the signIn feature is not available, return true
        if (!('signIn' in adapter)) return true

        // Fetch the signInInput from the backend
        const createResponse = await fetch(
            `${import.meta.env.VITE_ENV_BACKEND_URL}/auth/sign-in`
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
            `${import.meta.env.VITE_ENV_BACKEND_URL}/auth/verify-sign-in`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }
        )
        const success = await verifyResponse.json()
        dispatch(setToken(success.jwt))
        console.log('Sign In verification success:', success)
        if (!success) throw new Error('Sign In verification failed!')

        return false
    }, [])

    const { networkConfiguration } = useNetworkConfiguration()
    const network = networkConfiguration as WalletAdapterNetwork
    const endpoint = useMemo(
        () =>
            import.meta.env.VITE_ENV_SOLANA_NETWORK_RPC
                ? import.meta.env.VITE_ENV_SOLANA_NETWORK_RPC
                : clusterApiUrl(network),

        [network]
    )

    const wallets = useMemo(() => [new PhantomWalletAdapter()], [network])
    console.log('wallets', wallets)
    console.log(
        networkConfiguration,
        network,
        clusterApiUrl(network),
        endpoint,
        import.meta.env.VITE_ENV_SOLANA_NETWORK_RPC
    )

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
                <SolAutoConnectProvider>
                    <SolWalletContextProvider>
                        {children}
                    </SolWalletContextProvider>
                </SolAutoConnectProvider>
            </SolNetworkConfigurationProvider>
        </>
    )
}
