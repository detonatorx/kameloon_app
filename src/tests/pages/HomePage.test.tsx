import { render, screen } from '@testing-library/react'
import React from 'react'
import DashboardPage from '../../pages/Dashboard'

test('renders hello world message', () => {
    render(<DashboardPage />)
    const greetings = screen.getByText(/Hello world/i)
    expect(greetings).toBeInTheDocument()
})
