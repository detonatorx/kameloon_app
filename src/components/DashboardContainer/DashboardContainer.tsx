import React, { useState, useEffect } from 'react'
import { useTests } from '../../hooks/useTests'
import './DashboardContainer.scss'
import DashboardTable from '../DashboardTable/DashboardTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
export const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchStarted, setSearchStarted] = useState(false)

    const { tests, loading, error, handleSort, handleSearchChange, sortKey, sortOrder } = useTests({
        searchQuery,
        searchStarted,
        setSearchQuery,
    })

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)
        handleSearchChange(value)
        setSearchStarted(!!value)
    }

    const handleResetSearch = () => {
        setSearchQuery('')
        setSearchStarted(false)
    }

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>

            <div className="search-container">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input type="text" placeholder="What test are you looking for?" value={searchQuery} onChange={handleSearchInputChange} />
                {searchQuery ? (
                    <button className="reset-button" onClick={handleResetSearch}>
                        &times;
                    </button>
                ) : <div className="tests-text">{tests?.length ? tests.length + ' tests' : null} </div>}
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && tests && <DashboardTable data={tests} handleSort={handleSort} sortKey={sortKey} sortOrder={sortOrder} />}

            {searchQuery && tests?.length === 0 && (
                <div className="no-results">
                    <p>No tests found</p>
                    <button className="reset-button" onClick={handleResetSearch}>
                        Reset search
                    </button>
                </div>
            )}
        </div>
    )
}
