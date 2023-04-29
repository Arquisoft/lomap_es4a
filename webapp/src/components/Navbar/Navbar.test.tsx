import {fireEvent, getByRole, getByTestId, getByText, render, screen, waitFor} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";

import SearchBar from '../Searchbar/Searchbar';
import React from 'react';
import Navbar from './Navbar';


test('check Navbar renders when clic in button', async () => {
    let navbarOpen = false;
    const toggleNavbar = () => {
        navbarOpen=(!navbarOpen);
    }
    const { getByLabelText } = await render(<SearchBar toggleNavbar={toggleNavbar} markers={{}} nombreMapa={() => ''} />);
  
    const menuButton = getByLabelText('open drawer');
    fireEvent.click(menuButton);
  

    const functionMock = jest.fn();
    const { getByTestId } = await render(<Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={functionMock} openMapList={functionMock} openMyFriendsList={functionMock} />);
    const navbarDrawer = getByTestId("navbar-drawer");
        expect(navbarDrawer).toBeInTheDocument();
  });
  

