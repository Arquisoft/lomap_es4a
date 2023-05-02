import "@inrupt/jest-jsdom-polyfills";
import {act, fireEvent, render, screen} from '@testing-library/react';
import {Session} from "@inrupt/solid-client-authn-browser";
import Mapa, {MarkerType} from "./Map";
import * as solidApi from "../../solidapi/solidapi";

test('check initial map fails to render', async() => {
    await act(async () => {
        render(<Mapa/>);

        expect(await screen.findByText("Map loading...")).toBeInTheDocument();
    });
});

test('check initial map renders successfully', async() => {

    const functionMock = jest.fn();
    const mockUseJsApiLoader = jest.fn();

    const markers: { [id: string]: google.maps.Marker } = {};
    const markerList = (marker: { [id: string]: google.maps.Marker }) => {
        Object.assign(markers, marker);
    };
    let currentMapName = "Map";

    jest.spyOn(solidApi, 'createMap').mockImplementation(
        (session:Session, mapName:string): Promise<boolean> => Promise.resolve(true)
    );
    mockUseJsApiLoader.mockReturnValueOnce({ isLoaded: true });

    await act(async () => {
        render(<Mapa
            session={{}}
            markers={markers}
            markerList={markerList}
            clickMap={functionMock}
            clickMarker={functionMock}
            setMarkerToAdd={functionMock}
            currentMapName={currentMapName}
        />);
        /*
        const map = await screen.findByTestId('mapToTest');
        fireEvent.click(map);
        */
        expect(await screen.findByText("Map loading...")).toBeInTheDocument();

    });
});
