import React, { FC, useEffect, useState } from 'react'
import DashboardTableRow from '../DashboardTableRow/DashboardTableRow'
import { api } from '../../api'
import { Test } from '../../types'
import './DashboardSeparatePage.scss'
interface DashboardSeparatePageProps {
    id: string
}

const DashboardSeparatePage: FC<DashboardSeparatePageProps> = ({ id }) => {
    const [test, setTest] = useState<Test>()

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await api.getTest(id)
                setTest(response)
            } catch (error) {
                throw Error('Error')
            }
        }

        fetchTest()
    }, [])

    return (
        <div className='separatePage'>
            <DashboardTableRow test={test} />
        </div>
    )
}

export default DashboardSeparatePage
