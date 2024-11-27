import Home from './pages/Home/Home'
import { SolContextProvider } from './context/SolContextProvider'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import MysteryBoxes from './pages/MisteryBoxes/MysteryBoxes'

function App() {
    return (
        <Router>
            <SolContextProvider>
                <div className="relative w-full flex items-center justify-center cursor-custom ">
                    {/* <Navbar /> */}

                    <Routes>
                        <Route path={`/`} element={<Home />} />
                        <Route path={`/boxes`} element={<MysteryBoxes />} />
                    </Routes>
                </div>
            </SolContextProvider>
        </Router>
    )
}

export default App
