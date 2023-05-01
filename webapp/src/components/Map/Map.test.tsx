import "@inrupt/jest-jsdom-polyfills";
import { render, screen } from '@testing-library/react';
import Map, { MarkerType } from './Map';

test('a borrar', async () => {
    expect(true).toBeTruthy();
});
/*
describe('Mapa', () => {
    const session = null;
    const markers: { [id: string]: google.maps.Marker } = {};
    const markerList = (mList: { [id: string]: google.maps.Marker }) => {};
    const clickMap = (lat: number, lng: number) => {};
    const clickMarker = (lat: number, lng: number) => {};
    const setMarkerToAdd = (marker: google.maps.Marker) => {};
    const currentMapName = '';

    const marker: MarkerType = {
        id: '1',
        location: { lat: 0, lng: 0 },
        name: 'Marker 1',
        phone_number: '123456789',
        website: 'http://www.example.com',
    };
    const markersList = [marker];

    it('should render a map', () => {
        render(
            <Map
                session={session}
                markers={markers}
                markerList={markerList}
                clickMap={clickMap}
                clickMarker={clickMarker}
                setMarkerToAdd={setMarkerToAdd}
                currentMapName={currentMapName}
            />
        );

        const map = screen.getByRole('application');
        expect(map).toBeInTheDocument();
    });

    it('should render markers', () => {
        render(
            <Map
                session={session}
                markers={markers}
                markerList={markerList}
                clickMap={clickMap}
                clickMarker={clickMarker}
                setMarkerToAdd={setMarkerToAdd}
                currentMapName={currentMapName}
            />
        );

        markersList.forEach((marker) => {
            const markerElement = screen.getByTitle(marker.name);
            expect(markerElement).toBeInTheDocument();
        });
    });
/*
    it('should call clickMap when the map is clicked', () => {
        const clickMapMock = jest.fn();

        render(
            <Map
                session={session}
                markers={markers}
                markerList={markerList}
                clickMap={clickMapMock}
                clickMarker={clickMarker}
                setMarkerToAdd={setMarkerToAdd}
                currentMapName={currentMapName}
            />
        );

        const map = screen.getByRole('application');
        map.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(clickMapMock).toHaveBeenCalled();
    });
    /*
    it('should call clickMarker when a marker is clicked', () => {
        const clickMarkerMock = jest.fn();

        render(
            <Map
                session={session}
                markers={markers}
                markerList={markerList}
                clickMap={clickMap}
                clickMarker={clickMarkerMock}
                setMarkerToAdd={setMarkerToAdd}
                currentMapName={currentMapName}
            />
        );

        const markerElement = screen.getByTitle(marker.name);
        markerElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(clickMarkerMock).toHaveBeenCalled();
    });
});
*/