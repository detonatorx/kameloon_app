import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './constants/routes-constants'
import './styles/main.sass'
import Dashboard from './pages/Dashboard'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<Dashboard />} />
                <Route path={ROUTES.RESULTS_ROUTE} element={<h2>Results Page</h2>} />
                <Route path={ROUTES.FINALIZE_ROUTE} element={<h2>Finalize Page</h2>} />
            </Routes>
        </Router>
    )
}

export default RootComponent
