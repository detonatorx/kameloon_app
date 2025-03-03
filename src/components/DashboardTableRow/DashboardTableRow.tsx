import React, { FC } from 'react'
import { Test } from '../../types'
import { useNavigate } from 'react-router'
import './DashboardTableRow.scss'
import { stringToColor } from '../../utils/stringToColor'

interface DashboardTableRowProps {
    test?: Test
}

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const DashboardTableRow: FC<DashboardTableRowProps> = ({ test }) => {
    const navigate = useNavigate()

    return (
        <>
            {test ? (
                <div className="grid-row">
                    <div style={{ borderLeftColor: `${stringToColor(test?.siteUrl)}` }}>{test.name}</div>
                    <div>{test.type}</div>
                    <div className={`status status-${test.status.toLowerCase()}`}>{capitalizeFirstLetter(test.status)}</div>
                    <div>{test.siteUrl}</div>
                    <div>
                        {test.status !== 'DRAFT' ? (
                            <button className="results-button" onClick={() => navigate(`/results/${test.id}`)}>
                                Results
                            </button>
                        ) : (
                            <button className="finalize-button" onClick={() => navigate(`/finalize/${test.id}`)}>
                                Finalize
                            </button>
                        )}
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default DashboardTableRow
