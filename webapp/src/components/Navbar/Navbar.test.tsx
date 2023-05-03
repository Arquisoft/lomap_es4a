import {fireEvent, getByRole, getByTestId, getByText, render, screen, waitFor} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";

import SearchBar from '../Searchbar/Searchbar';
import Navbar from './Navbar';

let navbarOpen = false;
const toggleNavbar = () => {
  navbarOpen=(!navbarOpen);
}

const functionMock = jest.fn();
const openPointMock = jest.fn();
const mapListMock = jest.fn();

beforeEach( () => {
  navbarOpen = false;
  functionMock.mockClear();
  openPointMock.mockClear();
  mapListMock.mockClear();
});

test('check Navbar renders when clic in button', async () => {
  const { getByLabelText } = await render(<SearchBar toggleNavbar={toggleNavbar} markers={{}} nombreMapa={() => ''} />);
  const menuButton = getByLabelText('open drawer');
  fireEvent.click(menuButton);

  const { getByTestId } = await render(<Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={functionMock} openMapList={functionMock} openMyFriendsList={functionMock} />);
  const navbarDrawer = getByTestId("navbar-drawer");
  expect(navbarDrawer).toBeInTheDocument();
});

test('check About Us button works where clicking on Navbar', async () => {
  navbarOpen = true;

  const { getByTestId } = await render(<Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={functionMock} openMapList={functionMock} openMyFriendsList={functionMock} />);
  const button = await getByTestId('About us');
  fireEvent.click(button);

  const dialog = await getByTestId("dialog");
  expect(dialog).toBeInTheDocument();
  expect(await screen.findByText("Este es un proyecto de la asignatura ASW (2022-2023).Realizado por los alumnos:")).toBeInTheDocument();
});

test('check About Us dialog close button', async () => {
  navbarOpen = true;

  const { getByTestId } = await render(<Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={functionMock} openMapList={functionMock} openMyFriendsList={functionMock} />);
  const button = await getByTestId('About us');
  fireEvent.click(button);

  const dialog = await getByTestId("dialog");
  expect(dialog).toBeInTheDocument();
  expect(await screen.findByText("Este es un proyecto de la asignatura ASW (2022-2023).Realizado por los alumnos:")).toBeInTheDocument();

  const closedialog = await getByTestId("closedialog");
  fireEvent.click(closedialog);
});

test('check Points button works where clicking on Navbar', async () => {
  navbarOpen = true;

  const { getByTestId } = await render(<Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={openPointMock} openMapList={functionMock} openMyFriendsList={functionMock} />);
  const button = await getByTestId('Points');
  fireEvent.click(button);

  expect(openPointMock).toBeCalled();
});

test('check MapList button works where clicking on Navbar', async () => {
  navbarOpen = true;

  const { getByTestId } = await render(<Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={functionMock} openMapList={mapListMock} openMyFriendsList={functionMock} />);
  const button = await getByTestId('MapList');
  fireEvent.click(button);

  expect(mapListMock).toBeCalled();
});
