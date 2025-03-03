import React, { FC } from 'react'
import './DashboardTable.scss'
import { useNavigate } from 'react-router'
import { Test } from '../../types'
import { ButtonSort } from '../DashboardContainer/ui/ButtonSort/ButtonSort'

interface DashboardTableProps {
    data: Test[]
    handleSort: (key: keyof Test) => void
    sortKey: keyof Test | null
    sortOrder: 'asc' | 'desc' | null
}

const DashboardTable: FC<DashboardTableProps> = ({ data, handleSort, sortKey, sortOrder }) => {
    const navigate = useNavigate()
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    }

    return (
        <table className="tests-table">
            <thead>
                <tr>
                    <th>
                        NAME <ButtonSort currentKey="name" sortOrder={sortOrder} sortKey={sortKey} onClick={() => handleSort('name')} />
                    </th>
                    <th>
                        TYPE <ButtonSort currentKey="type" sortOrder={sortOrder} sortKey={sortKey} onClick={() => handleSort('type')} />
                    </th>
                    <th>
                        STATUS <ButtonSort currentKey="status" sortOrder={sortOrder} sortKey={sortKey} onClick={() => handleSort('status')} />
                    </th>
                    <th>
                        SITE <ButtonSort currentKey="siteUrl" sortOrder={sortOrder} sortKey={sortKey} onClick={() => handleSort('siteUrl')} />
                    </th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {data.map((test) => (
                    <tr key={test.id}>
                        <td>{test.name}</td>
                        <td>{test.type}</td>
                        <td className={`status status-${test.status.toLowerCase()}`}>{capitalizeFirstLetter(test.status)}</td>
                        <td>{test.siteUrl}</td>
                        <td>
                            {test.status !== 'DRAFT' ? (
                                <button className="results-button" onClick={() => navigate(`/results/${test.id}`)}>
                                    Results
                                </button>
                            ) : (
                                <button className="finalize-button" onClick={() => navigate(`/finalize/${test.id}`)}>
                                    Finalize
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default DashboardTable
