import React from 'react'
import { useParams } from 'react-router'
import DashboardSeparatePage from '../components/DashboardSeparatePage/DashboardSeparatePage';

const TestPage = () => {
    const { id } = useParams<{ id: string }>()

    return <DashboardSeparatePage id={id || ''} />
}

export default TestPage
