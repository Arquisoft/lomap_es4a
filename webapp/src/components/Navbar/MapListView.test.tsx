import { render, screen, act, fireEvent, within } from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import MapListView from './MapListView';
import * as solidApi from '../../solidapi/solidapi';
import { Session } from '@inrupt/solid-client-authn-browser';

test('check map list view renders correctly', async() => {

    let mapListOpen = true;
    const closeMapList = () => mapListOpen = false;

    let currentMapName = "Map";
    const setCurrentMapName = () => "NuevoMap";
 
    await act(async () => { 
        render(<MapListView open={mapListOpen} onClose={closeMapList} 
            currentMapName={currentMapName} setCurrentMapName={setCurrentMapName} 
            session={{}} />);

        const linkElement = await screen.findByText("Map List");
        expect(linkElement).toBeInTheDocument();
    });
});


test('check load map', async() => {

    let mapListOpen = true;
    const closeMapList = () => mapListOpen = false;

    let currentMapName = "Map";
    const setCurrentMapName = () => "NuevoMap";

    // mockeo de cargar nombres de mapas
    jest.spyOn(solidApi, 'retrieveMapNames').mockImplementation(
        (session: Session): Promise<string[]> => Promise.resolve(["Mapa1", "Mapa2"])
    );

    // mockeo de cargar nombres de mapas de amigos
    jest.spyOn(solidApi, 'retrieveFriendsMapNames').mockImplementation(
        (session: Session): Promise<{urls: string[]; names: string[];}> => 
            Promise.resolve({urls:["amigo1.com"], names:["MapaAmigo1"]})
    );
 
    await act(async () => { 
        const {container} = render(<MapListView open={mapListOpen} onClose={closeMapList} 
            currentMapName={currentMapName} setCurrentMapName={setCurrentMapName} 
            session={{}} />);
        
        // Hacemos click en el select de cargar mapa
        const loadMapSelect = await screen.findByTestId("selectMap");
        const button = within(loadMapSelect).getByRole("button");
        fireEvent.click(button);
        
        // Esperamos que aparezcan los nombres de los mapas
        expect(await screen.findByText("Mapa1")).toBeInTheDocument();
        expect(await screen.findByText("Mapa2")).toBeInTheDocument();
        expect(await screen.findByText("MapaAmigo1")).toBeInTheDocument();
    });
});