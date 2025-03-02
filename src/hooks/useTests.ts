import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Site, Test } from '../types';

interface UseTestsParams {
  searchQuery: string;
  initialSortKey: keyof Test | 'siteUrl' | null;
  initialSortOrder: 'asc' | 'desc' | null;
  searchStarted: boolean;
  setSearchQuery: (query: string) => void;
  sites: Site[];
}

export const useTests = ({ searchQuery, initialSortKey, initialSortOrder, searchStarted, setSearchQuery, sites }: UseTestsParams) => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<typeof initialSortKey>(initialSortKey);
  const [sortOrder, setSortOrder] = useState<typeof initialSortOrder>(initialSortOrder);

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

        if (sortKey && sortKey !== 'siteUrl') {
          params._sort = sortKey;
          params._order = sortOrder || 'asc';
        }

        const response = await axios.get<Test[]>('http://localhost:3100/tests', { params });
        setTests(response.data);
      } catch (err) {
        setError('Failed to fetch tests');
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
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
  };

  return { tests: newTestsWithSiteUrl, loading, error, handleSort, handleSearchChange };
};
