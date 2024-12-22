import React, { createContext, FC, ReactNode, useContext } from 'react'
import { useLocalStorage } from '@solana/wallet-adapter-react'
import { VITE_ENV_NETWORK } from '../../libs/config'

export interface NetworkConfigurationState {
    networkConfiguration: string
    setNetworkConfiguration(networkConfiguration: string): void
}

export const NetworkConfigurationContext =
    createContext<NetworkConfigurationState>({} as NetworkConfigurationState)

export function useNetworkConfiguration(): NetworkConfigurationState {
    return useContext(NetworkConfigurationContext)
}

export const SolNetworkConfigurationProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [networkConfiguration, setNetworkConfiguration] = useLocalStorage(
        'network',
        VITE_ENV_NETWORK
    )
    return (
        <NetworkConfigurationContext.Provider
            value={{
                networkConfiguration: networkConfiguration ?? VITE_ENV_NETWORK,
                setNetworkConfiguration,
            }}
        >
            {children}
        </NetworkConfigurationContext.Provider>
    )
}
