import React from 'react'
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

import {
    type SolanaSignInInput,
    SolanaSignInMethod,
    SolanaSignInOutput,
} from '@solana/wallet-standard-features'
// import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'

// export class PhantomWallet implements Wallet {
//     #signIn: SolanaSignInMethod = async (...inputs) => {
//         const outputs: SolanaSignInOutput[] = []
//         if (inputs.length > 1) {
//             for (const input of inputs) {
//                 outputs.push(await this.#phantom.signIn(input))
//             }
//         } else {
//             return [await this.#phantom.signIn(inputs[0])]
//         }
//         return outputs
//     }
// }
const SolWalletContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const autoSignIn = useCallback(async (adapter: Adapter) => {
        // If the signIn feature is not available, return true
        if (!('signIn' in adapter)) return true

        // Fetch the signInInput from the backend
        const createResponse = await fetch(
            `${import.meta.env.VITE_ENV_BACKEND_URL}/createSignInData`
        )

        const input: SolanaSignInInput = await createResponse.json()

        // Send the signInInput to the wallet and trigger a sign-in request
        const output = await adapter.signIn(input)

        // Verify the sign-in output against the generated input server-side
        let strPayload = JSON.stringify({ input, output })
        const verifyResponse = await fetch(
            `${import.meta.env.VITE_ENV_BACKEND_URL}/verifySIWS`,
            {
                method: 'POST',
                body: strPayload,
            }
        )
        const success = await verifyResponse.json()

        // If verification fails, throw an error
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
    const wallets = useMemo(() => [], [network])
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
