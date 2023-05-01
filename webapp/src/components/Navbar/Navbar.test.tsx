import {fireEvent, getByRole, getByTestId, getByText, render, screen, waitFor} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";

import SearchBar from '../Searchbar/Searchbar';
import Navbar from './Navbar';


test('check Navbar renders when clic in button', async () => {
    //Declaramos variables y funciones a usar para simular la apertura del drawer
    let navbarOpen = false;
    const toggleNavbar = () => {
        navbarOpen=(!navbarOpen);
    }
    //Renderizamos la searchbar, que es desde donde se abre el componente a probar
    const { getByLabelText } = await render(<SearchBar toggleNavbar={toggleNavbar} markers={{}} nombreMapa={() => ''} />);
    //Buscamos y accionamos el botón
    const menuButton = getByLabelText('open drawer');
    fireEvent.click(menuButton);
  
    //Creamos una función de mockeo básica para probar sólo las funcionalidades que nos interesan
    const functionMock = jest.fn();
    //Renderizamos la navbar con el estado tras pulsar el botón
    const { getByTestId } = await render(<Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={functionMock} openMapList={functionMock} openMyFriendsList={functionMock} />);
    //Comprobamos que el drawer está
    const navbarDrawer = getByTestId("navbar-drawer");
    expect(navbarDrawer).toBeInTheDocument();
});
  
test('check About Us button works where clicking on Navbar', async () => {
    //Declaramos variables y funciones a usar para simular la apertura del drawer
    let navbarOpen = true;
    const toggleNavbar = () => {
        navbarOpen=(!navbarOpen);
    }
   //Función de mockeo básica para centrarnos en las funcionalidades que nos interesan
    const functionMock = jest.fn();
    const { getByTestId } = await render(<Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={functionMock} openMapList={functionMock} openMyFriendsList={functionMock} />);
    //Búsqueda del botón AboutUs y clic
    const button = await getByTestId('About us');
    fireEvent.click(button);
    //Correcta apertura del dialogo
    const dialog=await getByTestId("dialog");
    expect(dialog).toBeInTheDocument();
    expect(await screen.findByText("Este es un proyecto de la asignatura ASW (2022-2023).Realizado por los alumnos:")).toBeInTheDocument();
});

test('check About Us dialog close button', async () => {
    //Declaramos variables y funciones a usar para simular la apertura del drawer
    let navbarOpen = true;
    const toggleNavbar = () => {
        navbarOpen=(!navbarOpen);
    }
   //Función de mockeo básica para centrarnos en las funcionalidades que nos interesan
    const functionMock = jest.fn();
    const { getByTestId } = await render(<Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={functionMock} openMapList={functionMock} openMyFriendsList={functionMock} />);
    //Búsqueda del botón AboutUs y clic
    const button = await getByTestId('About us');
    fireEvent.click(button);
    //Correcta apertura del dialogo
    const dialog=await getByTestId("dialog");
    expect(dialog).toBeInTheDocument();
    expect(await screen.findByText("Este es un proyecto de la asignatura ASW (2022-2023).Realizado por los alumnos:")).toBeInTheDocument();
    const closedialog=await getByTestId("closedialog");
    fireEvent.click(closedialog);
});

test('check Points button works where clicking on Navbar', async () => {
    //Declaramos variables y funciones a usar para simular la apertura del drawer
    let navbarOpen = true;
    const toggleNavbar = () => {
        navbarOpen=(!navbarOpen);
    }
   //Función de mockeo básica para centrarnos en las funcionalidades que nos interesan
    const functionMock = jest.fn();
    const openPointMock = jest.fn();
    const { getByTestId } = await render(<Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={openPointMock} openMapList={functionMock} openMyFriendsList={functionMock} />);
    //Búsqueda del botón Points y clic
    const button = await getByTestId('Points');
    fireEvent.click(button);
    //LLamada a la funcion de apertura
    expect(openPointMock).toBeCalled();
});

test('check MapList button works where clicking on Navbar', async () => {
    //Declaramos variables y funciones a usar para simular la apertura del drawer
    let navbarOpen = true;
    const toggleNavbar = () => {
        navbarOpen=(!navbarOpen);
    }
   //Función de mockeo básica para centrarnos en las funcionalidades que nos interesan
    const functionMock = jest.fn();
    const mapListMock = jest.fn();
    const { getByTestId } = await render(<Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={functionMock} openMapList={mapListMock} openMyFriendsList={functionMock} />);
    //Búsqueda del botón MapList y clic
    const button = await getByTestId('MapList');
    fireEvent.click(button);
    //LLamada a la funcion de apertura
    expect(mapListMock).toBeCalled();
});

test('check MyFriends button works where clicking on Navbar', async () => {
    //Declaramos variables y funciones a usar para simular la apertura del drawer
    let navbarOpen = true;
    const toggleNavbar = () => {
        navbarOpen=(!navbarOpen);
    }
   //Función de mockeo básica para centrarnos en las funcionalidades que nos interesan
    const functionMock = jest.fn();
    const myFriendsMock = jest.fn();
    const { getByTestId } = await render(<Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={functionMock} openMapList={functionMock} openMyFriendsList={myFriendsMock} />);
    //Búsqueda del botón myFriends y clic
    const button = await getByTestId('MyFriends');
    fireEvent.click(button);
    //LLamada a la funcion de apertura
    expect(myFriendsMock).toBeCalled();
});


test('check Logout button works where clicking on Navbar', async () => {
    //Declaramos variables y funciones a usar para simular la apertura del drawer
    let navbarOpen = true;
    const toggleNavbar = () => {
        navbarOpen=(!navbarOpen);
    }
   //Función de mockeo básica para centrarnos en las funcionalidades que nos interesan
    const functionMock = jest.fn();
    const myFriendsMock = jest.fn();
    const { getByTestId } = await render(<Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={functionMock} openMapList={functionMock} openMyFriendsList={myFriendsMock} />);
    //Búsqueda del botón Logout y clic
    const button = await getByTestId('Logout');
    fireEvent.click(button); 
});


