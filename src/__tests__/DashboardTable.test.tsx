import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardTable from '../components/DashboardTable/DashboardTable';
import { Test } from '../types';

// Мокаем ButtonSort компонент
jest.mock('../components/DashboardContainer/ui/ButtonSort/ButtonSort', () => ({
  ButtonSort: ({ currentKey, onClick }) => (
    <button data-testid={`sort-button-${currentKey}`} onClick={onClick}>
      Sort {currentKey}
    </button>
  ),
}));

// Мокаем DashboardTableRow компонент
jest.mock('../components/DashboardTableRow/DashboardTableRow', () => ({
  __esModule: true,
  default: ({ test }) => <div data-testid={`table-row-${test.id}`}>{test.name}</div>,
}));

describe('DashboardTable Component', () => {
  const mockTests: Test[] = [
    { id: '1', name: 'Test 1', type: 'A/B', status: 'ONLINE', siteId: '1', siteUrl: 'example.com' },
    { id: '2', name: 'Test 2', type: 'Split', status: 'PAUSED', siteId: '2', siteUrl: 'test.com' },
  ];
  
  const mockHandleSort = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders table headers correctly', () => {
    render(
      <DashboardTable 
        data={mockTests} 
        handleSort={mockHandleSort} 
        sortKey="name" 
        sortOrder="asc" 
      />
    );
    
    expect(screen.getByText('NAME')).toBeInTheDocument();
    expect(screen.getByText('TYPE')).toBeInTheDocument();
    expect(screen.getByText('STATUS')).toBeInTheDocument();
    expect(screen.getByText('SITE')).toBeInTheDocument();
    
    expect(screen.getByTestId('sort-button-name')).toBeInTheDocument();
    expect(screen.getByTestId('sort-button-type')).toBeInTheDocument();
    expect(screen.getByTestId('sort-button-status')).toBeInTheDocument();
    expect(screen.getByTestId('sort-button-siteUrl')).toBeInTheDocument();
  });

  test('renders table rows for each test', () => {
    render(
      <DashboardTable 
        data={mockTests} 
        handleSort={mockHandleSort} 
        sortKey="name" 
        sortOrder="asc" 
      />
    );
    
    expect(screen.getByTestId('table-row-1')).toBeInTheDocument();
    expect(screen.getByTestId('table-row-2')).toBeInTheDocument();
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
  });

  test('calls handleSort with correct key when sort button is clicked', () => {
    render(
      <DashboardTable 
        data={mockTests} 
        handleSort={mockHandleSort} 
        sortKey="name" 
        sortOrder="asc" 
      />
    );
    
    screen.getByTestId('sort-button-type').click();
    expect(mockHandleSort).toHaveBeenCalledWith('type');
    
    screen.getByTestId('sort-button-status').click();
    expect(mockHandleSort).toHaveBeenCalledWith('status');
  });
}); 
