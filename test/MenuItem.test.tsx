import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuItem from '@/components/MenuItem';
import '@testing-library/jest-dom';
import { createElement } from 'react';

describe('MenuItem Component', () => {
  const mockIcon = <svg data-testid="mock-icon" />;

  const renderComponent = (props: any) =>
    render(
        <MenuItem {...props} />
    );

  it('devrait afficher le texte et l\'icône', () => {
    const text = 'Home';
    const href = '/home';
    renderComponent({ icon: mockIcon, text, href });

    // Vérifie que le texte est affiché
    expect(screen.getByText('Home')).toBeInTheDocument();

    // Vérifie que l'icône est affichée
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('devrait appliquer la classe "active" lorsque active est true', () => {
    const text = 'Dashboard';
    const href = '/dashboard';

    renderComponent({ icon: mockIcon, text, href, active: true });

    const menuItem = screen.getByText('Dashboard').closest('div');
    // Vérifie que la classe "active" est appliquée
    expect(menuItem).toHaveClass('bg-red-100 font-extralight text-red-700');
  });

  it('devrait afficher le lien avec le href correct', () => {
    const text = 'Settings';
    const href = '/settings';

    renderComponent({ icon: mockIcon, text, href });

    // Vérifie que le lien redirige correctement vers l'URL
    const linkElement = screen.getByRole('link', { name: /Settings/i });
    expect(linkElement).toHaveAttribute('href', '/settings');
  });

  it('devrait ne pas appliquer la classe "active" lorsque active est false', () => {
    const text = 'Notifications';
    const href = '/notifications';

    renderComponent({ icon: mockIcon, text, href, active: false });

    const menuItem = screen.getByText('Notifications').closest('div');
    // Vérifie que la classe "active" n'est pas appliquée
    expect(menuItem).not.toHaveClass('bg-red-100 font-extralight text-red-700');
  });

});
