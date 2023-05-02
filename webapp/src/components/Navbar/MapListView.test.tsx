import { render, screen, act, fireEvent, within } from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import MapListView from './MapListView';
import * as solidApi from '../../solidapi/solidapi';
import { Session } from '@inrupt/solid-client-authn-browser';


beforeEach( () => {
    // mockeo de cargar nombres de mapas
    jest.spyOn(solidApi, 'retrieveMapNames').mockImplementation(
        (session: Session): Promise<string[]> => Promise.resolve(["Mapa1", "Mapa2"])
    );

    // mockeo de cargar nombres de mapas de amigos
    jest.spyOn(solidApi, 'retrieveFriendsMapNames').mockImplementation(
        (session: Session): Promise<{urls: string[]; names: string[];}> => 
            Promise.resolve({urls:["https://dgg.inrupt.net/public/lomap"], names:["MapaAmigo1"]})
    );

    // mockeo de borrar mapa
    jest.spyOn(solidApi, 'deleteMap').mockImplementation(
        (session: Session, mapName: string): Promise<boolean> => Promise.resolve(true)
    );
    
    // Renderizamos el componente
    render(<MapListView open={true} onClose={() => {}} 
            currentMapName={"Map"} setCurrentMapName={() => "NuevoMap"} 
            session={{}} />);
});


test('check map list view renders correctly', async() => { 

    await act(async () => {  

        const linkElement = await screen.findByText("Map List");
        expect(linkElement).toBeInTheDocument();
    });
});


test('check create map with valid name', async() => {
 
    await act(async () => {        
        
        // Escribimos el nombre del nuevo mapa
        const mapsNameTextField = await screen.findByTestId("mapNameField");
        const input = within(mapsNameTextField).getByRole("textbox");
        fireEvent.change(input, { target: { value: "NuevoMapa" } });
        
        // Hacemos click sobre crear mapa
        const createMap = await screen.findByText("Create new Map");
        fireEvent.click(createMap);
        
        // Se muestra mensaje de mapa creado correctamente
        expect(await screen.findByText("Map created correctly!")).toBeInTheDocument();
    });
});


test('check create map with invalid name', async() => {
 
    await act(async () => {         
        
        // Escribimos el nombre del nuevo mapa de manera incorrecta
        const mapsNameTextField = await screen.findByTestId("mapNameField");
        const input = within(mapsNameTextField).getByRole("textbox");
        fireEvent.change(input, { target: { value: "Nombre inválido" } });

        // Se muestra mensaje de error
        expect(await screen.findByText("Only letters, numbers and _ are allowed.")).toBeInTheDocument();
        
        // Hacemos click sobre crear mapa
        const createMap = await screen.findByText("Create new Map");
        fireEvent.click(createMap);

        // Se muestra mensaje de error
        expect(await screen.findByText("Empty map name")).toBeInTheDocument();
    });
});


test('check load map', async() => {    
 
    await act(async () => {         
        
        // Hacemos click en el select de cargar mapa
        const loadMapSelect = await screen.findByTestId("selectMap");
        const button = within(loadMapSelect).getByRole("button");
        fireEvent.mouseDown(button);
        
        // Esperamos que aparezcan los nombres de los mapas
        expect(await screen.findByText("Mapa1")).toBeInTheDocument();
        expect(await screen.findByText("Mapa2")).toBeInTheDocument();

        // Seleccionamos el primer mapa
        fireEvent.keyDown(await screen.findByText("Mapa1"), { key: 'Enter' });

        // Hacemos click sobre cargar mapa
        const loadMap = await screen.findByText("Load Map");
        fireEvent.click(loadMap);

        // Se muestra mensaje de mapa cargado correctamente
        expect(await screen.findByText("Map loaded!")).toBeInTheDocument();
    });
});


test('check delete map', async() => {
 
    await act(async () => { 
      
        // Hacemos click en el select de borrar mapa
        const deleteMapSelect = await screen.findByTestId("selectDeleteMap");
        const button = within(deleteMapSelect).getByRole("button");
        fireEvent.mouseDown(button);
        
        // Esperamos que aparezcan los nombres de los mapas
        expect(await screen.findByText("Mapa1")).toBeInTheDocument();
        expect(await screen.findByText("Mapa2")).toBeInTheDocument();
        
        // Seleccionamos el primer mapa
        fireEvent.keyDown(await screen.findByText("Mapa1"), { key: 'Enter' });

        // Hacemos click sobre borrar mapa
        const deleteMap = await screen.findByText("Delete Map");
        fireEvent.click(deleteMap);
        
        // Se muestra mensaje de mapa borrado correctamente
        expect(await screen.findByText("Map deleted correctly!")).toBeInTheDocument();
    });
});