import "@inrupt/jest-jsdom-polyfills";
import {act, render, screen} from '@testing-library/react';
import Mapa from "./Map";


test('check initial map fails to render', async() => {
    await act(async () => {
        render(<Mapa/>);
        expect(await screen.findByText("Map loading...")).toBeInTheDocument();
    });
});
