import { useState, useEffect, useMemo } from 'react';
import { Site, Test } from '../types';
import { api } from '../api';

interface UseTestsParams {
  searchQuery: string;
  searchStarted: boolean;
  setSearchQuery: (query: string) => void;
}

const statusOrder = {
  ASC: ["ONLINE", "PAUSED", "STOPPED", "DRAFT"],
  DESC: ["DRAFT", "STOPPED", "PAUSED", "ONLINE"],
};

const  sortByStatus = (data: Test[], order = "ASC") => {
  if (!statusOrder[order]) {
    throw new Error("Invalid order parameter. Use 'ASC' or 'DESC'.");
  }
  
  return [...data].sort((a, b) => {
    return statusOrder[order].indexOf(a.status) - statusOrder[order].indexOf(b.status);
  });
}

export const useTests = ({ searchQuery, searchStarted, setSearchQuery }: UseTestsParams) => {
  const [sites, setSites] = useState<Site[]>([])
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<keyof Test | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      setError(null);

      try {
        const params: Record<string, string> = {};
          if (searchQuery) {
            params.name_like = searchQuery;
  
            if (searchStarted) {
              setSortKey(null);
              setSortOrder('asc'); 
            }
          }
  
          if (sortKey && sortKey !== 'siteUrl' && sortKey !== 'status') {
            params._sort = sortKey;
            params._order = sortOrder || 'asc';
        }

        const response = await api.getTests(params);
        setTests(response);
      } catch (err) {
        setError('Failed to fetch tests');
      } finally {
        if (sortKey === 'status' && sortOrder) {
          setTests(sortByStatus(tests, sortOrder.toUpperCase() as 'ASC' | 'DESC'));
        }
        setLoading(false);
      }
    };    
    const fetchSites = async () => {
        const sitesData = await api.getSites()
        const transformedSites = sitesData.map((site: Site) => ({
            ...site,
            url: site.url.replace(/^(https?:\/\/)?(www\.)?/, '')
        }))
        setSites(transformedSites)
    }
    
    fetchTests();
    fetchSites()
  }, [searchQuery, sortKey, sortOrder, searchStarted]);

  const newTestsWithSiteUrl = useMemo(() => {
    if (sites.length && tests.length) {
      const testsWithSiteUrl = tests.map((test) => ({
        ...test,
        siteUrl: sites.find((site) => site.id === test.siteId)?.url || '',
      }));

      if (sortKey === 'siteUrl') {
        testsWithSiteUrl.sort((a, b) => {
          if (a.siteUrl < b.siteUrl) return sortOrder === 'asc' ? -1 : 1;
          if (a.siteUrl > b.siteUrl) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      }

      return testsWithSiteUrl;
    }

    return [];
  }, [sites, tests, sortKey, sortOrder]);

  const handleSort = (key: keyof Test | 'siteUrl') => {
    setSortKey((currentKey) => {
      const newDirection = currentKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newDirection);
      return key;
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value) {
      setSortKey(null);
      setSortOrder('asc');
    }
  }

  return { tests: newTestsWithSiteUrl, loading, error, handleSort, handleSearchChange, sortKey, sortOrder };
};
