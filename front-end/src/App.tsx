import Home from './pages/Home/Home'
import { SolContextProvider } from './context/SolContextProvider'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'

function App() {
    return (
        <Router>
            <SolContextProvider>
                <div className="relative w-full flex items-center justify-center">
                    <Navbar />
                    <Routes>
                        <Route path={`/`} element={<Home />} />
                    </Routes>
                </div>
            </SolContextProvider>
        </Router>
    )
}

export default App
