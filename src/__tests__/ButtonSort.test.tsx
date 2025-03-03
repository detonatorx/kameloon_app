import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonSort } from '../components/DashboardContainer/ui/ButtonSort/ButtonSort';

// Мокаем FontAwesome
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: { icon: any }) => <div data-testid={`icon-${icon.iconName}`}>Icon</div>,
}));

describe('ButtonSort Component', () => {
  const mockOnClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders with ascending sort order', () => {
    render(
      <ButtonSort 
        currentKey="name" 
        sortKey="name" 
        sortOrder="asc" 
        onClick={mockOnClick} 
      />
    );
    
    expect(screen.getByRole('button')).toHaveClass('btn current');
    expect(screen.getByTestId('icon-chevron-up')).toBeInTheDocument();
  });

  test('renders with descending sort order', () => {
    render(
      <ButtonSort 
        currentKey="name" 
        sortKey="name" 
        sortOrder="desc" 
        onClick={mockOnClick} 
      />
    );
    
    expect(screen.getByRole('button')).toHaveClass('btn current');
    expect(screen.getByTestId('icon-chevron-down')).toBeInTheDocument();
  });

  test('renders without current sort', () => {
    render(
      <ButtonSort 
        currentKey="name" 
        sortKey="type" 
        sortOrder="asc" 
        onClick={mockOnClick} 
      />
    );
    
    expect(screen.getByRole('button')).toHaveClass('btn');
    expect(screen.getByRole('button')).not.toHaveClass('current');
    expect(screen.getByTestId('icon-chevron-down')).toBeInTheDocument();
  });

  test('calls onClick when button is clicked', () => {
    render(
      <ButtonSort 
        currentKey="name" 
        sortKey="name" 
        sortOrder="asc" 
        onClick={mockOnClick} 
      />
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
}); 
