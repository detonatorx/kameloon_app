import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './constants/routes-constants'
import './styles/main.sass'
import Dashboard from './pages/Dashboard'
import TestPage from './pages/TestPage'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<Dashboard />} />
                <Route path={ROUTES.RESULTS_ROUTE} element={<TestPage />} />
                <Route path={ROUTES.FINALIZE_ROUTE} element={<TestPage />} />
            </Routes>
        </Router>
    )
}

export default RootComponent
