import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderDisplay from '@/components/HeaderDisplay';
import '@testing-library/jest-dom';
import { RectangleStackIcon } from '@heroicons/react/24/outline';

// Mocking les icônes pour éviter des problèmes lors des rendus SVG
jest.mock('@heroicons/react/24/outline', () => ({
  RectangleStackIcon: jest.fn(() => <svg data-testid="rectangle-stack-icon" />),
}));

describe('HeaderDisplay Component', () => {
  it('devrait afficher correctement le titre de l\'étagère (shelfData)', () => {
    const shelfData = { title: 'Science Fiction' };
    const bookNumber = 42;

    render(<HeaderDisplay shelfData={shelfData} bookNumber={bookNumber} />);

    // Vérifie si le titre de l'étagère est affiché
    expect(screen.getByText('Science Fiction')).toBeInTheDocument();
  });

  it('devrait afficher l\'icône de pile (RectangleStackIcon)', () => {
    const shelfData = { title: 'Fantasy' };
    const bookNumber = 10;

    render(<HeaderDisplay shelfData={shelfData} bookNumber={bookNumber} />);

    // Vérifie si l'icône RectangleStackIcon est présente
    expect(screen.getByTestId('rectangle-stack-icon')).toBeInTheDocument();
  });

  it('devrait rendre correctement même sans données (shelfData est undefined)', () => {
    render(<HeaderDisplay shelfData={undefined} bookNumber={0} />);

    // Le titre ne devrait pas être affiché
    expect(screen.queryByText('Science Fiction')).not.toBeInTheDocument();

    // Vérifie que le composant est toujours rendu
    expect(screen.getByTestId('rectangle-stack-icon')).toBeInTheDocument();
  });
});
