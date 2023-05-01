import { render, screen, fireEvent, within } from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import LoginPage from './LoginPage';

test('check log in renders correctly', async() => {
    render(<LoginPage />);
    const linkElement = await screen.findByText("Log In");
    expect(linkElement).toBeInTheDocument();
});


test('check pod provider select works correctly', async() => {
    const {container} = render(<LoginPage />);

    // Proveedor inicial seleccionado en el select
    const initialProvider = await screen.findByText("Inrupt.net");
    expect(initialProvider).toBeInTheDocument(); 

    // Cambiamos el valor del select
    const input = container.querySelector("input")!;
    fireEvent.change(input, { target: { value: "https://login.inrupt.com" } });

    // Comprobamos que el proveedor del select ha cambiado
    const finalProvider = await screen.findByText("pod.Inrupt.com");
    expect(finalProvider).toBeInTheDocument();
});