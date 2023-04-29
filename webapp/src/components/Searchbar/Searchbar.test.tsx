import {fireEvent, getByRole, getByTestId, getByText, render, screen, waitFor} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";

import SearchBar from './Searchbar';


test('check Navbar opens when clic in button', async () => {
    const toggleNavbarMock = jest.fn();
    const { getByLabelText } = await render(<SearchBar toggleNavbar={toggleNavbarMock} markers={{}} nombreMapa={() => ''} />);
  
    const menuButton = getByLabelText('open drawer');
    fireEvent.click(menuButton);
  
    expect(toggleNavbarMock).toHaveBeenCalled();

    
  });

  test('check mapname updates correctly', async () => {
    const toggleNavbarMock = jest.fn();
    const { getByTestId } = await render(<SearchBar toggleNavbar={toggleNavbarMock} markers={{}} nombreMapa={() => 'cosa'} />);
  
    const mapaActual = getByTestId("mapname");
    expect(mapaActual).toHaveTextContent('cosa');
  
    

    
  });
  

