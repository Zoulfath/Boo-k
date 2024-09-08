import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';
import { getBookshelves, getBookFromBookshelf } from '@/lib/actions';

// Mock des appels API
jest.mock('@/lib/actions', () => ({
  getBookshelves: jest.fn(),
  getBookFromBookshelf: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: jest.fn(() => '1'), // Simule un `shelfId`
  }),
}));

describe('Home Component', () => {
  const mockBookshelves = [
    { id: '1', title: 'Fantasy' },
    { id: '2', title: 'Science Fiction' },
  ];

  const mockBooks = [
    { id: '101', title: 'Book 1', authors: [{ id: 1, name: 'Author 1' }] },
    { id: '102', title: 'Book 2', authors: [{ id: 2, name: 'Author 2' }] },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait afficher les étagères et les livres correctement après récupération des données', async () => {
    (getBookshelves as jest.Mock).mockResolvedValueOnce(mockBookshelves);
    (getBookFromBookshelf as jest.Mock).mockResolvedValueOnce(mockBooks);

    render(<Home />);

    // Attendre que les étagères soient récupérées
    await waitFor(() => {
      expect(getBookshelves).toHaveBeenCalled();
      expect(screen.getByText('Fantasy')).toBeInTheDocument();
    });

    // Attendre que les livres soient récupérés et affichés
    await waitFor(() => {
      expect(getBookFromBookshelf).toHaveBeenCalledWith('1', 0, 9); // La première page
      expect(screen.getByText('Book 1')).toBeInTheDocument();
      expect(screen.getByText('Book 2')).toBeInTheDocument();
    });
  });

  it('devrait afficher un message lorsque aucune étagère n\'est disponible', async () => {
    (getBookshelves as jest.Mock).mockResolvedValueOnce([]);
    (getBookFromBookshelf as jest.Mock).mockResolvedValueOnce([]);

    render(<Home />);

    // Attendre que les étagères soient récupérées
    await waitFor(() => {
      expect(getBookshelves).toHaveBeenCalled();
      expect(screen.getByText('Nothing to display')).toBeInTheDocument();
    });
  });

  it('devrait permettre la pagination des livres', async () => {
    (getBookshelves as jest.Mock).mockResolvedValueOnce(mockBookshelves);
    (getBookFromBookshelf as jest.Mock).mockResolvedValue(mockBooks);

    render(<Home />);

    // Attendre que les livres de la première page soient affichés
    await waitFor(() => {
      expect(getBookFromBookshelf).toHaveBeenCalledWith('1', 0, 9);
    });

    // Simuler un clic sur le bouton "Next" pour aller à la page suivante
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Attendre que les livres de la page suivante soient récupérés
    await waitFor(() => {
      expect(getBookFromBookshelf).toHaveBeenCalledWith('1', 9, 18);
    });
  });

  it('devrait désactiver le bouton "Previous" lorsque la page est la première', async () => {
    (getBookshelves as jest.Mock).mockResolvedValueOnce(mockBookshelves);
    (getBookFromBookshelf as jest.Mock).mockResolvedValue(mockBooks);

    render(<Home />);

    // Attendre que les livres de la première page soient affichés
    await waitFor(() => {
      expect(getBookFromBookshelf).toHaveBeenCalledWith('1', 0, 9);
    });

    // Le bouton "Previous" devrait être désactivé sur la première page
    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('devrait désactiver le bouton "Next" lorsque moins de livres sont retournés que ITEMS_PER_PAGE', async () => {
    (getBookshelves as jest.Mock).mockResolvedValueOnce(mockBookshelves);
    (getBookFromBookshelf as jest.Mock).mockResolvedValueOnce(mockBooks.slice(0, 2)); // Simuler seulement 2 livres

    render(<Home />);

    // Attendre que les livres de la première page soient affichés
    await waitFor(() => {
      expect(getBookFromBookshelf).toHaveBeenCalledWith('1', 0, 9);
    });

    // Le bouton "Next" devrait être désactivé si le nombre de livres est inférieur à ITEMS_PER_PAGE
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });
});
