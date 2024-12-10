import Home from './pages/Home/Home'
import { SolContextProvider } from './context/SolContextProvider'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import MysteryBoxes from './pages/MisteryBoxes/MysteryBoxes'

function App() {
    return (
        ///TODO ADD A NEW PAGE FOR My Mysteries - analythics of ROI
        <Router>
            <SolContextProvider>
                <Navbar />
                <Routes>
                    <Route path={`/`} element={<Home />} />
                    <Route path={`/boxes`} element={<MysteryBoxes />} />
                    <Route path={`/my-boxes`} element={<MysteryBoxes />} />
                </Routes>
            </SolContextProvider>
        </Router>
    )
}

export default App
