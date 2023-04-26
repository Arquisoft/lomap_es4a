import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import AddPoint from './AddPoint';
import Map from '../Map/Map';

test('check click in map renders AddPoint', async () => {
    const mapElement = await render(<Map/>).baseElement;
    fireEvent.click(mapElement);
    console.log(screen)
    let addPointText = screen.getByText("Add Point");
    expect(addPointText).toBeInTheDocument();
});