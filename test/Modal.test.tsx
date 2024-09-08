import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ModalComponent from '@/components/Modal';
import '@testing-library/jest-dom';
import { getBook } from '@/lib/actions';

// Mock de l'API `getBook`
jest.mock('@/lib/actions', () => ({
  getBook: jest.fn(),
}));

describe('ModalComponent', () => {
  const mockBookData = {
    image: '/book-image.jpg',
    title: 'Test Book',
    authors: [{ id: 1, name: 'Author 1' }, { id: 2, name: 'Author 2' }],
    description: 'This is a description of the test book.',
    form: 'paperback',
    language: 'english',
    extents: { gl_pages: 300 },
    isbn: '123456789',
    publisher: 'Test Publisher',
    adult: false,
    is_free: true,
  };

  const setup = (isOpen = true) => {
    const onCloseMock = jest.fn();
    render(<ModalComponent bookId="1" isOpen={isOpen} onClose={onCloseMock} />);
    return { onCloseMock };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait afficher les détails du livre lorsque le modal est ouvert', async () => {
    (getBook as jest.Mock).mockResolvedValueOnce(mockBookData);

    setup();

    // Vérifie que la fonction getBook est appelée
    expect(getBook).toHaveBeenCalledWith('1');

    // Attendre que les détails du livre soient chargés
    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument();
      expect(screen.getByText('Author 1')).toBeInTheDocument();
      expect(screen.getByText('Author 2')).toBeInTheDocument();
      expect(screen.getByText('This is a description of the test book.')).toBeInTheDocument();
    });
  });

  it('devrait afficher "Free" lorsque le livre est gratuit', async () => {
    (getBook as jest.Mock).mockResolvedValueOnce(mockBookData);

    setup();

    await waitFor(() => {
      expect(screen.getByText('Free')).toBeInTheDocument();
    });
  });

  it('devrait fermer le modal lorsque le bouton de fermeture est cliqué', async () => {
    (getBook as jest.Mock).mockResolvedValueOnce(mockBookData);

    const { onCloseMock } = setup();

    // Attendre que les détails du livre soient chargés
    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument();
    });

    // Simuler le clic sur le bouton de fermeture
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    // Vérifier que la fonction onClose est appelée
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('ne devrait pas afficher le modal lorsque `isOpen` est `false`', () => {
    setup(false);

    // Vérifie que le contenu du modal n'est pas affiché
    expect(screen.queryByText('Book Details')).not.toBeInTheDocument();
  });
});
