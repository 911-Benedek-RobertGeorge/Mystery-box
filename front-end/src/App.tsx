import Home from './pages/Home/Home'
import { SolContextProvider } from './context/Solana/SolContextProvider'
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
    AppKitConnectButton,
    createAppKit,
    useAppKitAccount,
    useAppKitProvider,
    useAppKitTheme,
} from '@reown/appkit/react'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks'
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { getTimestampFromJwt } from './libs/utils'
import { SolanaSignInInput } from '@solana/wallet-standard-features'
import logo from '../src/assets/boxes/logo.png'

import type { Provider } from '@reown/appkit-adapter-solana/react'
function App() {
    const dispatch = useDispatch()
    const { walletProvider } = useAppKitProvider<Provider>('solana')
    const { isConnected, address, status, embeddedWalletInfo } =
        useAppKitAccount()

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
        if (isConnected) signIn()
        console.log('isConnected', walletProvider)
    }, [isConnected])

    const signIn = async () => {
        try {
            const token = sessionStorage.getItem('jwtToken')

            if (token) {
                const timestamp = getTimestampFromJwt(token)
                /// if the jwt token is not expired no need to sign in again
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
            console.log('createResponse', createResponse)
            const input: SolanaSignInInput = await createResponse.json()
            const encoder = new TextEncoder()
            const encodedMessage = encoder.encode(createResponse.toString())

            const signed = await walletProvider.signMessage(encodedMessage)
            console.log('signed', signed)
            // const output = await adapter.signIn(input)
            // const payload = {
            //     input,
            //     output: {
            //         account: {
            //             publicKey: Array.from(output.account.publicKey),
            //             address: output.account.address,
            //         },
            //         signature: Array.from(output.signature),
            //         signedMessage: Array.from(output.signedMessage),
            //     },
            // }
            const verifyResponse = await fetch(
                `${VITE_ENV_BACKEND_URL}/auth/verify-sign-in`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(signed),
                }
            )
            const response = await verifyResponse.json()

            sessionStorage.setItem('jwtToken', response.jwt)
            if (!response) throw new Error('Sign In verification failed!')

            return false
        } catch (error) {
            console.error('Error signing in:', error)
        }
    }

    // 0. Set up Solana Adapter
    const solanaWeb3JsAdapter = new SolanaAdapter({
        wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    })

    const projectId = VITE_ENV_REOWN_ID || 'b56e18d47c72ab683b10814fe9495694' // this is a public projectId only to use on localhost

    // 2. Create a metadata object - optional
    const metadata = {
        name: 'memebox',
        description: 'AppKit Example',
        url: 'https://www.memebox-sol.com/', // origin must match your domain & subdomain
        icons: [logo],
    }

    // 3. Create modal
    createAppKit({
        adapters: [solanaWeb3JsAdapter],
        networks: [solana],
        metadata: metadata,
        projectId,
        features: {
            analytics: true, // Optional - defaults to your Cloud configuration
        },
    })
    const { themeMode, themeVariables, setThemeMode, setThemeVariables } =
        useAppKitTheme()

    setThemeMode('dark')
    setThemeVariables({
        '--w3m-color-mix': '#011717',
        '--w3m-color-mix-strength': 40,
        '--w3m-accent': '#0CC4D3', // '#0E7490',
    })

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
