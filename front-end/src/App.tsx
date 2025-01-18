import Home from './pages/Home/Home'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setSolanaPrice } from './context/store/SolanaSlice'
import { setBoxTypes } from './context/store/BoxSlice'
import axios from 'axios'
import { VITE_ENV_BACKEND_URL, VITE_ENV_REOWN_ID } from './libs/config'
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions'
import {
    createAppKit,
    Provider,
    useAppKitAccount,
    useAppKitProvider,
    useAppKitTheme,
} from '@reown/appkit/react'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { solana } from '@reown/appkit/networks'
import logo from '../src/assets/boxes/logo.png'

import { toast } from 'react-hot-toast'
import { getSignInMessage, verifySignature } from './libs/services/authService'
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import bs58 from 'bs58'
import { getDataFromJwt, getTimestampFromJwt } from './libs/utils'

const solanaWeb3JsAdapter = new SolanaAdapter({
    wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
})

const projectId = VITE_ENV_REOWN_ID || 'b56e18d47c72ab683b10814fe9495694'

const metadata = {
    name: 'memebox',
    description: 'memebox',
    url: window.location.origin,
    icons: [logo],
}

// Initialize AppKit once
createAppKit({
    adapters: [solanaWeb3JsAdapter],
    networks: [solana],
    metadata: metadata,
    projectId,
    features: {
        analytics: true,
        socials: ['google', 'apple', 'x', 'discord'],
    },
})

function App() {
    const dispatch = useDispatch()
    const { walletProvider } = useAppKitProvider<Provider>('solana')
    const { isConnected, address } = useAppKitAccount()
    console.log({ walletProvider })

    useEffect(() => {
        const fetchSolanaPrice = async () => {
            try {
                const response = await axios(
                    'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
                )
                const data = await response.data
                dispatch(setSolanaPrice(data.solana.usd))
            } catch (error) {
                console.error('Error fetching Solana price', error)
            }
        }
        const fetchBoxTypes = async () => {
            try {
                const response = await axios(
                    `${VITE_ENV_BACKEND_URL || 'https://ejacdvrot9.execute-api.eu-central-1.amazonaws.com/api'}/boxes/types`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                        },
                    }
                )

                const data = await response.data
                dispatch(setBoxTypes(data))
            } catch (error) {
                console.error('Error fetching box types', error)
            }
        }

        fetchBoxTypes()
        fetchSolanaPrice()
    }, [dispatch])

    useEffect(() => {
        if (isConnected && address) {
            signIn()
        }
    }, [isConnected, address])

    const signIn = async () => {
        let signedMessage: any
        let jwt: string
        const encoder = new TextEncoder()
        try {
            if (!isConnected || !address || !walletProvider) {
                toast.error('Please connect your wallet first')
                sessionStorage.removeItem('jwtToken')
                return false
            }

            const token = sessionStorage.getItem('jwtToken')

            if (token) {
                const timestamp = getTimestampFromJwt(token)
                const data = getDataFromJwt(token)
                if (
                    timestamp &&
                    timestamp.expiration > Math.floor(Date.now() / 1000) &&
                    data.walletAddress === address
                ) {
                    return true
                }
            }

            // Get the message to sign
            const message = await getSignInMessage(address)
            const messageBytes = encoder.encode(message)

            if (walletProvider && 'signMessage' in walletProvider) {
                // @ts-ignore
                signedMessage = await walletProvider.signMessage(messageBytes)
                const base58SignedMessage = bs58.encode(signedMessage)
                jwt = await verifySignature(message, base58SignedMessage)
            } else {
                const bs58Message = bs58.encode(messageBytes)
                signedMessage = (await walletProvider.request({
                    method: 'solana_signMessage',
                    params: {
                        message: bs58Message,
                        pubkey: address,
                        encoding: 'utf8',
                    },
                })) as any
                jwt = await verifySignature(message, signedMessage.signature)
            }

            if (!jwt) {
                throw new Error('Signature verification failed')
            }

            sessionStorage.setItem('jwtToken', jwt)
            return true
        } catch (error) {
            console.error('Error signing in:', error)
            toast.error('Failed to sign in: ' + (error as Error).message)
            sessionStorage.removeItem('jwtToken')
            if (walletProvider && 'disconnect' in walletProvider) {
                try {
                    await walletProvider.disconnect()
                } catch (disconnectError) {
                    console.error(
                        'Error disconnecting wallet:',
                        disconnectError
                    )
                }
            }
            return false
        }
    }

    const { setThemeMode, setThemeVariables } = useAppKitTheme()

    // Set theme once on mount
    useEffect(() => {
        setThemeMode('dark')
        setThemeVariables({
            '--w3m-color-mix': '#011717',
            '--w3m-color-mix-strength': 40,
            '--w3m-accent': '#0CC4D3',
        })
    }, [])

    return (
        <Router>
            {' '}
            <div className="max-w-screen overflow-hidden">
                <Navbar />
                <Toaster />
                <Routes>
                    <Route path={`/`} element={<Home />} />

                    <Route
                        path={`/terms-and-conditions`}
                        element={<TermsAndConditions />}
                    />
                </Routes>
            </div>
        </Router>
    )
}

export default App
