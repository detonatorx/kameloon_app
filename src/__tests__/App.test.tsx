import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Мокаем зависимости
jest.mock('react-redux', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-provider">{children}</div>,
}));

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-persist-gate">{children}</div>,
}));

jest.mock('../RootComponent', () => () => <div data-testid="mock-root-component">Root Component</div>);

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    
    expect(screen.getByTestId('mock-provider')).toBeInTheDocument();
    expect(screen.getByTestId('mock-persist-gate')).toBeInTheDocument();
    expect(screen.getByTestId('mock-root-component')).toBeInTheDocument();
  });
}); 
