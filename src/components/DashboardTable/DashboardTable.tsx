import React, { FC } from 'react'
import './DashboardTable.scss';
import { useNavigate } from 'react-router';
import { Test } from '../../types';

interface DashboardTableProps {
    data: Test[];
    handleSort: (key: keyof Test) => void;
}

const DashboardTable: FC<DashboardTableProps> = ({ data, handleSort }) => {
  const navigate = useNavigate();

  return (
    <table className="tests-table">
    <thead>
        <tr>
            <th onClick={() => handleSort('name')}>NAME</th>
            <th onClick={() => handleSort('type')}>TYPE</th>
            <th onClick={() => handleSort('status')}>STATUS</th>
            <th onClick={() => handleSort('siteUrl')}>SITE</th>
            <th/>
        </tr>
    </thead>
    <tbody>
        {data.map((test) => (
            <tr key={test.id}>
                <td>{test.name}</td>
                <td>{test.type}</td>
                <td className={`status status-${test.status.toLowerCase()}`}>{test.status}</td>
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
