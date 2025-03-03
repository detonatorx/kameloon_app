

import { useTests } from '../hooks/useTests';
import { api } from '../api';
import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

// Мокаем API
jest.mock('../api', () => ({
  api: {
    getSites: jest.fn(),
    getTests: jest.fn(),
  },
}));

describe('useTests Hook', () => {
  const mockSetSearchQuery = jest.fn();
  const mockTests = [
    { id: '1', name: 'Test 1', type: 'A/B', status: 'ONLINE', siteId: '1' },
    { id: '2', name: 'Test 2', type: 'Split', status: 'PAUSED', siteId: '2' },
  ];
  
  const mockSites = [
    { id: '1', name: 'Site 1', url: 'https://example.com' },
    { id: '2', name: 'Site 2', url: 'https://test.com' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (api.getSites as jest.Mock).mockResolvedValue(mockSites);
    (api.getTests as jest.Mock).mockResolvedValue(mockTests);
  });

  test('fetches tests and sites on initial render', async () => {
    const { result, waitForNextUpdate } = renderHook(() => 
      useTests({ 
        searchQuery: '', 
        searchStarted: false, 
        setSearchQuery: mockSetSearchQuery 
      })
    );
    
    expect(result.current.loading).toBe(true);
    
    await waitForNextUpdate();
    
    expect(api.getTests).toHaveBeenCalledWith({});
    expect(api.getSites).toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.tests.length).toBe(2);
    expect(result.current.tests[0].siteUrl).toBe('example.com');
  });
  test('handles search query changes', async () => {
    const { result, waitForNextUpdate } = renderHook(() => 
      useTests({ 
        searchQuery: 'Test 1', 
        searchStarted: true, 
        setSearchQuery: mockSetSearchQuery 
      })
    );
    
    await waitForNextUpdate();
    
    expect(api.getTests).toHaveBeenCalledWith({ name_like: 'Test 1' });
    
    act(() => {
      result.current.handleSearchChange('Test 2');
    });
    
    expect(mockSetSearchQuery).toHaveBeenCalledWith('Test 2');
  });

  test('handles sorting', async () => {
    const { result, waitForNextUpdate } = renderHook(() => 
      useTests({ 
        searchQuery: '', 
        searchStarted: false, 
        setSearchQuery: mockSetSearchQuery 
      })
    );
    
    await waitForNextUpdate();
    
    act(() => {
      result.current.handleSort('name');
    });
    
    expect(result.current.sortKey).toBe('name');
    expect(result.current.sortOrder).toBe('asc');
    
    await waitForNextUpdate();
    
    expect(api.getTests).toHaveBeenCalledWith({ _sort: 'name', _order: 'asc' });
    
    act(() => {
      result.current.handleSort('name');
    });
    
    expect(result.current.sortOrder).toBe('desc');
  });
}); 
