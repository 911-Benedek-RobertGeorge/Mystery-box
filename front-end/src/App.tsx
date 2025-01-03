import Home from './pages/Home/Home'
import { SolContextProvider } from './context/Solana/SolContextProvider'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setSolanaPrice } from './context/store/SolanaSlice'
import { setBoxTypes } from './context/store/BoxSlice'
import axios from 'axios'
import { VITE_ENV_BACKEND_URL } from './libs/config'
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions'

function App() {
    const dispatch = useDispatch()

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

    return (
        <Router>
            <SolContextProvider>
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
            </SolContextProvider>
        </Router>
    )
}

export default App
