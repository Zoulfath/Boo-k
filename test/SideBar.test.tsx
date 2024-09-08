import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SideBar from '@/components/SideBar';
import '@testing-library/jest-dom';

// Mock de la navigation avec Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/'),
}));

// Mock de l'icône RectangleStackIcon et d'autres icônes pour éviter les erreurs de rendu SVG
jest.mock('@heroicons/react/24/outline', () => ({
  RectangleStackIcon: () => <svg data-testid="rectangle-stack-icon" />,
  RectangleGroupIcon: () => <svg data-testid="rectangle-group-icon" />,
  BookOpenIcon: () => <svg data-testid="book-open-icon" />,
  BookmarkIcon: () => <svg data-testid="bookmark-icon" />,
  ClipboardIcon: () => <svg data-testid="clipboard-icon" />,
  ChartBarIcon: () => <svg data-testid="chart-bar-icon" />,
  CreditCardIcon: () => <svg data-testid="credit-card-icon" />,
  ShieldCheckIcon: () => <svg data-testid="shield-check-icon" />,
  GlobeAltIcon: () => <svg data-testid="globe-alt-icon" />,
}));

describe('SideBar Component', () => {
  const mockBookshelves = [
    { id: 1, title: 'Fantasy' },
    { id: 2, title: 'Science Fiction' },
    { id: 3, title: 'History' },
  ];

  it('devrait afficher les étagères (bookshelves) lorsque des données sont disponibles', () => {
    render(<SideBar setSelectedShelf={jest.fn()} bookshelves={mockBookshelves} />);

    // Vérifie que chaque titre d'étagère est affiché
    expect(screen.getByText('Fantasy')).toBeInTheDocument();
    expect(screen.getByText('Science Fiction')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  it('devrait afficher le logo et la date correctement', () => {
    render(<SideBar setSelectedShelf={jest.fn()} bookshelves={mockBookshelves} />);

    // Vérifie que le logo est affiché
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();

    // Vérifie que la date du jour est correctement affichée
    const todayDate = new Date().toDateString();
    expect(screen.getByText(todayDate)).toBeInTheDocument();
  });

});
