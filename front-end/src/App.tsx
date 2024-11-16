import { useState } from 'react'
import './App.css'
import Home from './pages/Home/Home'
import { SolContextProvider } from './context/SolContextProvider'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'

function App() {
    return (
        <Router>
            <SolContextProvider>
                <Navbar />
                <Routes>
                    <Route path={`/`} element={<Home />} />
                </Routes>
            </SolContextProvider>
        </Router>
    )
}

export default App
