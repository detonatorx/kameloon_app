import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardTableRow from '../components/DashboardTableRow/DashboardTableRow';
import { Test } from '../types';

// Мокаем react-router
jest.mock('react-router', () => ({
  useNavigate: () => jest.fn(),
}));

// Мокаем утилиту stringToColor
jest.mock('../utils/stringToColor', () => ({
  stringToColor: jest.fn(() => '#123456'),
}));

describe('DashboardTableRow Component', () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    // Переопределяем мок для useNavigate
    require('react-router').useNavigate = () => mockNavigate;
  });

  test('renders null when test is undefined', () => {
    const { container } = render(<DashboardTableRow />);
    expect(container.firstChild).toBeNull();
  });

  test('renders test data correctly for non-draft status', () => {
    const mockTest: Test = {
      id: '1',
      name: 'Test Name',
      type: 'A/B',
      status: 'ONLINE',
      siteId: '1',
      siteUrl: 'example.com'
    };
    
    render(<DashboardTableRow test={mockTest} />);
    
    expect(screen.getByText('Test Name')).toBeInTheDocument();
    expect(screen.getByText('A/B')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getByText('example.com')).toBeInTheDocument();
    
    const resultsButton = screen.getByText('Results');
    expect(resultsButton).toBeInTheDocument();
    expect(resultsButton).toHaveClass('results-button');
    
    fireEvent.click(resultsButton);
    expect(mockNavigate).toHaveBeenCalledWith('/results/1');
  });

  test('renders finalize button for draft status', () => {
    const mockTest: Test = {
      id: '1',
      name: 'Draft Test',
      type: 'A/B',
      status: 'DRAFT',
      siteId: '1',
      siteUrl: 'example.com'
    };
    
    render(<DashboardTableRow test={mockTest} />);
    
    const finalizeButton = screen.getByText('Finalize');
    expect(finalizeButton).toBeInTheDocument();
    expect(finalizeButton).toHaveClass('finalize-button');
    
    fireEvent.click(finalizeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/finalize/1');
  });

  test('applies correct status class', () => {
    const mockTest: Test = {
      id: '1',
      name: 'Paused Test',
      type: 'A/B',
      status: 'PAUSED',
      siteId: '1',
      siteUrl: 'example.com'
    };
    
    render(<DashboardTableRow test={mockTest} />);
    
    const statusElement = screen.getByText('Paused');
    expect(statusElement).toHaveClass('status-paused');
  });
}); 
