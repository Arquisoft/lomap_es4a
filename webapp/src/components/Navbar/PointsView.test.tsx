import {fireEvent, render, screen, within} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";

import PointsView from './PointsView';
import { Marker } from "@googlemaps/jest-mocks";

let open:boolean;

beforeEach( () => { 
    const functionMock = jest.fn();
    open = true;
    const close = () => open = false;
    
    let markerList = {
        'marker1': new Marker({ position: { lat: 40.7128, lng: -74.0060 } }),
        'marker2': new Marker({ position: { lat: 37.7749, lng: -122.4194 } })
    };
    
    render(<PointsView open={open} onClose={close} markerList={markerList} 
        openEditPoint={functionMock} deletePoint={functionMock}  
        getPointsCategory={functionMock}></PointsView>);
});


// Clicka el elemento con id pasado
function clickButton(id: string): void {
    const button = screen.getByTestId(id);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
}


test('check pointsView renders correctly', async () => {
    expect(await screen.findByText("Points List")).toBeInTheDocument();
});

test('check pointsView closes correctly', async () => {

    clickButton("closePointsView");
    expect(open).toBeFalsy();
    
});

test('check pointsView filters subbmenu opens correctly', async () => {

    clickButton("filters");
    const filtersCategories = screen.getByTestId("filtersCategories");
    expect(filtersCategories).toBeInTheDocument();

});

test('check pointsView category filter subbmenu opens correctly', async () => {

    clickButton("filters");    
    clickButton("filtersCategories");

    const filterButton = screen.getByTestId("filterButton");
    expect(filterButton).toBeInTheDocument();

});

test('check pointsView category markall and filter subbmenu opens correctly', async () => {

    clickButton("filters");    
    clickButton("filtersCategories");
    clickButton("markall");
    
    const filterButton = screen.getByTestId("filterButton");
    expect(filterButton).toBeInTheDocument();

});

test('check pointsView category unmarkall and filter subbmenu opens correctly', async () => {

    clickButton("filters");    
    clickButton("filtersCategories");
    clickButton("unmarkall");
    
    const filterButton = screen.getByTestId("filterButton");
    expect(filterButton).toBeInTheDocument();

});

test('check pointsView category marc academic and filter subbmenu opens correctly', async () => {
    
    clickButton("filters");    
    clickButton("filtersCategories");

    const academiccheckbox = screen.getByTestId("academiccheckbox");
    expect(academiccheckbox).toBeInTheDocument();
    const checkBox = within(academiccheckbox).getByRole("checkbox");
    fireEvent.click(checkBox);

    clickButton("filterButton");
});


test('check pointsView visibility subbmenu opens correctly', async () => {

    clickButton("visibility");
    expect(await screen.findByText("Show / Hide all")).toBeInTheDocument();

});


test('check pointsView visibility all button switches correctly', async () => {
   
    clickButton("visibility");

    const visibilityall = screen.getByTestId("visibilityall");
    const suich = within(visibilityall).getByRole("checkbox");
    fireEvent.click(suich);

    const suich2 = screen.getByTestId("marker1");
    const suich22 = within(suich2).getByRole("checkbox");
    fireEvent.click(suich22);

    clickButton("editarmarker1");

    clickButton("borrarmarker1");
});
