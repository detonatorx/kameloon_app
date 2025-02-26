import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Test, Site, SortConfig } from '../types';
import { api } from '../api';
import { useTests } from '../hooks/useTests';
import './Dashboard.scss';

export const Dashboard = () => {
    const [sites, setSites] = useState<Site[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
    const [searchStarted, setSearchStarted] = useState(false);
    const navigate = useNavigate();

    const { tests, loading, error, setSortKey, setSortOrder } = useTests({
        searchQuery,
        initialSortKey: sortConfig.key,
        initialSortOrder: sortConfig.direction,
    });

    useEffect(() => {
        const fetchSites = async () => {
            const sitesData = await api.getSites();
            setSites(sitesData);
        };
        fetchSites();
    }, []);

    const getSiteUrl = (siteId: number) => {
        const site = sites.find((site) => site.id === siteId);
        return site?.url.replace(/^(https?:\/\/)?(www\.)?/, '') || '';
    };

    const handleSort = (key: keyof Test) => {
        setSortConfig((current) => {
            const newDirection = current.key === key && current.direction === 'asc' ? 'desc' : 'asc';
            setSortKey(key);
            setSortOrder(newDirection);
            return { key, direction: newDirection };
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value) {
            setSearchStarted(true);
            if (searchStarted) {
                setSortConfig({ key: null, direction: 'asc' });
            }
        } else {
            setSearchStarted(false);
        }
    };

    const handleResetSearch = () => {
        setSearchQuery('');
        setSearchStarted(false);
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="What test are you looking for?"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                {searchQuery && (
                    <button className="reset-button" onClick={handleResetSearch}>
                        Reset
                    </button>
                )}
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
                <table className="tests-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('name')}>NAME</th>
                            <th onClick={() => handleSort('type')}>TYPE</th>
                            <th onClick={() => handleSort('status')}>STATUS</th>
                            <th onClick={() => handleSort('siteId')}>SITE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map((test) => (
                            <tr key={test.id}>
                                <td>{test.name}</td>
                                <td>{test.type}</td>
                                <td className={`status status-${test.status.toLowerCase()}`}>{test.status}</td>
                                <td>{getSiteUrl(test.siteId)}</td>
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
            )}

            {searchQuery && tests.length === 0 && (
                <div className="no-results">
                    <p>No tests found</p>
                    <button className="reset-button" onClick={handleResetSearch}>
                        Reset search
                    </button>
                </div>
            )}
        </div>
    );
};
