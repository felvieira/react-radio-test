import { render, screen, fireEvent } from '@testing-library/react';
import MenuHamburguer from './menu-hamburguer';
import '@testing-library/jest-dom';

describe('MenuHamburguer', () => {
  test('deve exibir e ocultar o menu ao clicar nos botões de abertura e fechamento', () => {
    const mockRadioData = [
      { stationuuid: 1, name: 'Rádio 1' },
      { stationuuid: 2, name: 'Rádio 2' },
    ];

    render(
      <MenuHamburguer
        radioData={mockRadioData}
        favoriteRadios={[]}
        setFavoriteRadios={() => {}}
        searchQueryMenu=""
        setSearchQueryMenu={() => {}}
      />
    );

    // Verificar se o menu está oculto inicialmente
    expect(screen.queryByText('Rádio 1')).toBeNull();

    // Clicar no ícone do menu para exibi-lo
    fireEvent.click(screen.getByLabelText('Abrir menu'));

    // Verificar se o menu foi exibido
    expect(screen.getByText('Rádio 1')).toBeTruthy();

    // Clicar no ícone de fechar para ocultar o menu
    fireEvent.click(screen.getByLabelText('Fechar menu'));

    // Verificar se o menu foi ocultado novamente
    expect(screen.queryByText('Rádio 1')).toBeNull();
  });
});
