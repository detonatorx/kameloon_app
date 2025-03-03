import React from 'react';
import { render, screen } from '@testing-library/react';
import TestPage from '../pages/TestPage';

// Мокаем react-router
jest.mock('react-router', () => ({
  useParams: () => ({ id: '123' }),
}));

// Мокаем DashboardSeparatePage компонент
jest.mock('../components/DashboardSeparatePage/DashboardSeparatePage', () => ({
  __esModule: true,
  default: ({ id }) => <div data-testid="separate-page">Test page for ID: {id}</div>,
}));

describe('TestPage Component', () => {
  test('renders DashboardSeparatePage with correct id', () => {
    render(<TestPage />);
    
    expect(screen.getByTestId('separate-page')).toBeInTheDocument();
    expect(screen.getByText('Test page for ID: 123')).toBeInTheDocument();
  });
}); 
