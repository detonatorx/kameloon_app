// src/components/DashboardContainer/DashboardContainer.tsx
import React, { useState, useEffect } from 'react';
import { Test, Site, SortConfig } from '../../types';
import { api } from '../../api';
import { useTests } from '../../hooks/useTests';
import './DashboardContainer.scss';
import DashboardTable from '../DashboardTable/DashboardTable';

export const Dashboard = () => {
    const [sites, setSites] = useState<Site[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchStarted, setSearchStarted] = useState(false);

    const { tests, loading, error, handleSort, handleSearchChange } = useTests({
        searchQuery,
        initialSortKey: null,
        initialSortOrder: null,
        searchStarted,
        setSearchQuery,
        sites
    });

    useEffect(() => {
      const fetchSites = async () => {
          const sitesData = await api.getSites();
          const transformedSites = sitesData.map((site: Site) => ({
              ...site,
              url: site.url.replace(/^(https?:\/\/)?(www\.)?/, '')
          }));
          setSites(transformedSites);
      };
      fetchSites();
  }, []);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        handleSearchChange(value);
        setSearchStarted(!!value);
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
                    onChange={handleSearchInputChange}
                />
                {searchQuery && (
                    <button className="reset-button" onClick={handleResetSearch}>
                        Reset
                    </button>
                )}
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && tests && (
              <DashboardTable data={tests} handleSort={handleSort} />
            )}

            {searchQuery && tests?.length === 0 && (
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
