import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavigationBar from '@/components/NavigationBar';
import '@testing-library/jest-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Mock les icônes pour éviter les erreurs liées au rendu SVG
jest.mock('@heroicons/react/24/outline', () => ({
  MagnifyingGlassIcon: () => <svg data-testid="magnifying-glass-icon" />,
}));

describe('NavigationBar Component', () => {
  const setSearchItemMock = jest.fn();

  it('devrait afficher le champ de recherche avec l\'icône de loupe', () => {
    render(<NavigationBar setSearchItem={setSearchItemMock} />);

    // Vérifie la présence du champ de recherche
    const inputElement = screen.getByPlaceholderText('Search');
    expect(inputElement).toBeInTheDocument();

    // Vérifie que l'icône de loupe est présente
    expect(screen.getByTestId('magnifying-glass-icon')).toBeInTheDocument();
  });

  it('devrait mettre à jour le champ de recherche lors de la saisie', () => {
    render(<NavigationBar setSearchItem={setSearchItemMock} />);

    const inputElement = screen.getByPlaceholderText('Search');

    // Simuler la saisie de texte dans le champ de recherche
    fireEvent.change(inputElement, { target: { value: 'Next.js' } });

    // Vérifie que la valeur du champ est mise à jour
    expect(inputElement).toHaveValue('Next.js');
  });

  it('devrait appeler setSearchItem lorsque la valeur du champ de recherche change', () => {
    render(<NavigationBar setSearchItem={setSearchItemMock} />);

    const inputElement = screen.getByPlaceholderText('Search');

    // Simuler la saisie dans le champ de recherche
    fireEvent.change(inputElement, { target: { value: 'React' } });

    // Vérifie que setSearchItem est appelé avec la valeur correcte
    expect(setSearchItemMock).toHaveBeenCalledWith('React');
  });

});
