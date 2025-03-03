import React, { FC } from 'react'
import './DashboardTable.scss'
import { useNavigate } from 'react-router'
import { Test } from '../../types'
import { ButtonSort } from '../DashboardContainer/ui/ButtonSort/ButtonSort'
import DashboardTableRow from '../DashboardTableRow/DashboardTableRow'

interface DashboardTableProps {
    data: Test[]
    handleSort: (key: keyof Test) => void
    sortKey: keyof Test | null
    sortOrder: 'asc' | 'desc' | null
}

const DashboardTable: FC<DashboardTableProps> = ({ data, handleSort, sortKey, sortOrder }) => {
    return (
        <div className="tests-grid">
            <div className="grid-header">
                <div>
                    NAME <ButtonSort currentKey="name" sortOrder={sortOrder} sortKey={sortKey} onClick={() => handleSort('name')} />
                </div>
                <div>
                    TYPE <ButtonSort currentKey="type" sortOrder={sortOrder} sortKey={sortKey} onClick={() => handleSort('type')} />
                </div>
                <div>
                    STATUS <ButtonSort currentKey="status" sortOrder={sortOrder} sortKey={sortKey} onClick={() => handleSort('status')} />
                </div>
                <div>
                    SITE <ButtonSort currentKey="siteUrl" sortOrder={sortOrder} sortKey={sortKey} onClick={() => handleSort('siteUrl')} />
                </div>
                <div />
            </div>
            <div className="grid-body">
                {data.map((test) => (
                    <DashboardTableRow key={test.id} test={test} />
                ))}
            </div>
        </div>
    )
}

export default DashboardTable
