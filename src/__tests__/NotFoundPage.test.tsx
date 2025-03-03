import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotFoundPage from '../pages/NotFoundPage';

// Мокаем react-router
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('NotFoundPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders 404 message', () => {
    render(<NotFoundPage />);
    
    expect(screen.getByText('Oops 404!')).toBeInTheDocument();
    expect(screen.getByText('Homepage')).toBeInTheDocument();
  });

  test('navigates to homepage when link is clicked', () => {
    render(<NotFoundPage />);
    
    const homepageLink = screen.getByText('Homepage');
    fireEvent.click(homepageLink);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
}); 
