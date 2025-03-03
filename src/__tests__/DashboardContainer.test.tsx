import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dashboard } from '../components/DashboardContainer/DashboardContainer';

// Мокаем хук useTests
jest.mock('../hooks/useTests', () => ({
  useTests: ({ searchQuery, searchStarted, setSearchQuery }) => ({
    tests: searchQuery 
      ? [] 
      : [
          { id: '1', name: 'Test 1', type: 'A/B', status: 'ONLINE', siteId: '1', siteUrl: 'example.com' },
          { id: '2', name: 'Test 2', type: 'Split', status: 'PAUSED', siteId: '2', siteUrl: 'test.com' },
        ],
    loading: false,
    error: null,
    handleSort: jest.fn(),
    handleSearchChange: jest.fn(),
    sortKey: 'name',
    sortOrder: 'asc',
  }),
}));

// Мокаем DashboardTable компонент
jest.mock('../components/DashboardTable/DashboardTable', () => ({
  __esModule: true,
  default: ({ data }) => <div data-testid="dashboard-table">Table with {data.length} items</div>,
}));

// Мокаем FontAwesome
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, className }) => <div data-testid={`icon-${className}`}>Icon</div>,
}));

describe('Dashboard Container Component', () => {
  test('renders dashboard with title and search', () => {
    render(<Dashboard />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What test are you looking for?')).toBeInTheDocument();
    expect(screen.getByTestId('icon-search-icon')).toBeInTheDocument();
    expect(screen.getByText('2 tests')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-table')).toBeInTheDocument();
  });

  test('handles search input changes', () => {
    render(<Dashboard />);
    
    const searchInput = screen.getByPlaceholderText('What test are you looking for?');
    fireEvent.change(searchInput, { target: { value: 'Test 1' } });
    
    expect(searchInput).toHaveValue('Test 1');
    expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
    expect(screen.queryByText('2 tests')).not.toBeInTheDocument();
  });

  test('shows no results message when search has no matches', () => {
    render(<Dashboard />);
    
    const searchInput = screen.getByPlaceholderText('What test are you looking for?');
    fireEvent.change(searchInput, { target: { value: 'No Match' } });
    
    expect(screen.getByText('No tests found')).toBeInTheDocument();
    expect(screen.getByText('Reset search')).toBeInTheDocument();
  });

  test('resets search when reset button is clicked', () => {
    render(<Dashboard />);
    
    const searchInput = screen.getByPlaceholderText('What test are you looking for?');
    fireEvent.change(searchInput, { target: { value: 'Test 1' } });
    
    const resetButton = screen.getByRole('button', { name: '×' });
    fireEvent.click(resetButton);
    
    expect(searchInput).toHaveValue('');
    expect(screen.getByText('2 tests')).toBeInTheDocument();
  });
}); 
