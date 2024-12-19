import Home from './pages/Home/Home'
import { SolContextProvider } from './context/Solana/SolContextProvider'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import MysteryBoxes from './pages/MisteryBoxes/MysteryBoxes'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setSolanaPrice } from './context/store/SolanaSlice'
import { setBoxTypes } from './context/store/BoxSlice'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchSolanaPrice = async () => {
            try {
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
                )
                const data = await response.json()
                dispatch(setSolanaPrice(data.solana.usd))
                console.log('Solana price fetched: ', data.solana.usd)
            } catch (error) {
                console.error('Error fetching Solana price', error)
            }
        }

        const fetchBoxTypes = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_ENV_BACKEND_URL}/boxes/types`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                        },
                    }
                )

                const data = await response.json()
                dispatch(setBoxTypes(data))
                console.log('Box types fetched: ', data)
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
                        <Route path={`/boxes`} element={<MysteryBoxes />} />
                        <Route path={`/my-boxes`} element={<MysteryBoxes />} />
                    </Routes>
                </div>
            </SolContextProvider>
        </Router>
    )
}

export default App
