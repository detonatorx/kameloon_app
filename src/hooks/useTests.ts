import { useState, useEffect } from 'react';
import axios from 'axios';
import { Test } from '../types';

interface UseTestsParams {
  searchQuery: string;
  initialSortKey: keyof Test | null;
  initialSortOrder: 'asc' | 'desc';
  searchStarted?: boolean;
}

export const useTests = ({ searchQuery, initialSortKey, initialSortOrder, searchStarted }: UseTestsParams) => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<keyof Test | null>(initialSortKey);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);

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

        if (sortKey) {
          params._sort = sortKey;
          params._order = sortOrder;
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

  return { tests, loading, error, setSortKey, setSortOrder };
};
