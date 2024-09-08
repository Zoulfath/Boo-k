import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookCard from '@/components/BookCard';
import { getBook } from '@/lib/actions';
import '@testing-library/jest-dom';

// Mock des modules externes
jest.mock('@/lib/actions', () => ({
  getBook: jest.fn(),
}));

jest.mock('../components/Modal', () => ({
  __esModule: true,
  default: ({ isOpen }: { isOpen: boolean }) => {
    return isOpen ? <div>Modal Content</div> : null;
  },
}));

const mockBook = {
  image: '/book-image.jpg',
  title: 'Test Book',
  rating: 4.5,
  rating_count: 100,
  price: {
    amount: 19.99,
    currency: 'USD',
  },
  is_free: false,
  adult: false,
  authors: [
    { name: 'Author 1' },
    { name: 'Author 2' },
  ],
  language: 'English',
  form: 'Paperback',
};

// Mock de l'appel à getBook
const mockGetBook = (response: any) => {
  (getBook as jest.Mock).mockResolvedValueOnce(response);
};

describe('BookCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialiser les mocks avant chaque test
  });

  it('devrait afficher les détails du livre correctement', async () => {
    mockGetBook(mockBook);

    render(<BookCard bookId="1" searchItem="" />);

    // Attendre que l'appel à getBook soit terminé
    await waitFor(() => expect(getBook).toHaveBeenCalledWith('1'));

    // Vérifier que les informations du livre sont bien rendues
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(100)')).toBeInTheDocument();
    expect(screen.getByText('19.99 USD')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('Author 2')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Paperback')).toBeInTheDocument();
  });

  it('devrait afficher l’étiquette "Free" si le livre est gratuit', async () => {
    const freeBook = { ...mockBook, is_free: true };
    mockGetBook(freeBook);

    render(<BookCard bookId="1" searchItem="" />);

    await waitFor(() => expect(getBook).toHaveBeenCalledWith('1'));

    // Vérifier que l'étiquette "Free" est bien rendue
    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('devrait afficher l’étiquette "Adult only" si le livre est réservé aux adultes', async () => {
    const adultBook = { ...mockBook, adult: true };
    mockGetBook(adultBook);

    render(<BookCard bookId="1" searchItem="" />);

    await waitFor(() => expect(getBook).toHaveBeenCalledWith('1'));

    // Vérifier que l'étiquette "Adult only" est bien rendue
    expect(screen.getByText('Adult only')).toBeInTheDocument();
  });
});
