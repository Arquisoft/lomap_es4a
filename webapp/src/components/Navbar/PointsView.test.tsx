import {fireEvent, render, screen} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";

import PointsView from './PointsView';


test('check pointsView renders correctly', async () => {
    const functionMock = jest.fn();
    
    const { getByLabelText } = await render(<PointsView open={true} onClose={functionMock} markerList={{}} openEditPoint={functionMock} deletePoint={functionMock}  getPointsCategory={functionMock}></PointsView>);
    
    expect(await screen.findByText("Points List")).toBeInTheDocument();
});

test('check pointsView closes correctly', async () => {

    let open = true;
    const close = () => {
        open = false;
    };
    const functionMock = jest.fn();
    
    const { getByTestId } = await render(<PointsView open={open} onClose={close} markerList={{}} openEditPoint={functionMock} deletePoint={functionMock}  getPointsCategory={functionMock}></PointsView>);
    const button = await getByTestId("closePointsView");
    fireEvent.click(button);
    expect(open).toBeFalsy();
    
});

test('check pointsView filters subbmenu opens correctly', async () => {

    let open = true;
    const close = () => {
        open = false;
    };
    const functionMock = jest.fn();
    
    const { getByTestId } = await render(<PointsView open={open} onClose={close} markerList={{}} openEditPoint={functionMock} deletePoint={functionMock}  getPointsCategory={functionMock}></PointsView>);
    const button = await getByTestId("filters");
    fireEvent.click(button);
    const filtersCategories = await getByTestId("filtersCategories");
    expect(filtersCategories).toBeInTheDocument();

});

test('check pointsView category filter subbmenu opens correctly', async () => {

    let open = true;
    const close = () => {
        open = false;
    };
    const functionMock = jest.fn();
    
    const { getByTestId } = await render(<PointsView open={open} onClose={close} markerList={{}} openEditPoint={functionMock} deletePoint={functionMock}  getPointsCategory={functionMock}></PointsView>);
    const button = await getByTestId("filters");
    fireEvent.click(button);
    
    const filtersCategories = await getByTestId("filtersCategories");
    expect(filtersCategories).toBeInTheDocument();
    fireEvent.click(filtersCategories);
    
    const filterButton = await getByTestId("filterButton");
    expect(filterButton).toBeInTheDocument();

});

test('check pointsView category unmark markall and filter subbmenu opens correctly', async () => {

    let open = true;
    const close = () => {
        open = false;
    };
    const functionMock = jest.fn();
    
    const { getByTestId } =  render(<PointsView open={open} onClose={close} markerList={{}} openEditPoint={functionMock} deletePoint={functionMock}  getPointsCategory={functionMock}></PointsView>);
    const button =  getByTestId("filters");
    fireEvent.click(button);
    
    const filtersCategories =  getByTestId("filtersCategories");
    expect(filtersCategories).toBeInTheDocument();
    fireEvent.click(filtersCategories);

     const unmarkall =  getByTestId("unmarkall");
    expect(unmarkall).toBeInTheDocument();
    fireEvent.click(unmarkall);

    const markall =  getByTestId("markall");
    expect(markall).toBeInTheDocument();
    fireEvent.click(markall);
    
    const filterButton =  getByTestId("filterButton");
    expect(filterButton).toBeInTheDocument();

});


test('check pointsView category marc academic and filter subbmenu opens correctly', async () => {
    const handleFilterChange = jest.fn();
    let open = true;
    const close = () => {
        open = false;
    };
    const functionMock = jest.fn();
    
    const { getByTestId } =  render(<PointsView open={open} onClose={close} markerList={{}} openEditPoint={functionMock} deletePoint={functionMock}  getPointsCategory={functionMock}></PointsView>);
    const button =  getByTestId("filters");
    fireEvent.click(button);
    
    const filtersCategories =  getByTestId("filtersCategories");
    expect(filtersCategories).toBeInTheDocument();
    fireEvent.click(filtersCategories);

    const academiccheckbox =  getByTestId("academiccheckbox");
    expect(academiccheckbox).toBeInTheDocument();
    fireEvent.change(academiccheckbox);//deberia cambiar el filtro

    const filterButton =  getByTestId("filterButton");
    expect(filterButton).toBeInTheDocument();

});


test('check pointsView visibility subbmenu opens correctly', async () => {

    let open = true;
    const close = () => {
        open = false;
    };
    const functionMock = jest.fn();
    
    const { getByTestId } =  render(<PointsView open={open} onClose={close} markerList={{}} openEditPoint={functionMock} deletePoint={functionMock}  getPointsCategory={functionMock}></PointsView>);
    const button =  getByTestId("visibility");
    fireEvent.click(button);

     expect(await screen.findByText("Show / Hide all")).toBeInTheDocument();

});

/*
test('check pointsView visibility all button switches correctly', async () => {
   
    let open = true;
    const close = () => {
        open = false;
    };
    const functionMock = jest.fn();
  const { getByTestId } = await render(<PointsView 
  open={open} 
  onClose={close} 
  markerList={{
    'marker1': new google.maps.Marker({ position: { lat: 40.7128, lng: -74.0060 } }),
    'marker2': new google.maps.Marker({ position: { lat: 37.7749, lng: -122.4194 } })
  }} 
  openEditPoint={functionMock} 
  deletePoint={functionMock}  
  getPointsCategory={functionMock} 
/>);
    const button = await getByTestId("visibility");
    fireEvent.click(button);
    const visibilityall = await getByTestId("visibilityall");
    fireEvent.change(visibilityall);//deberia cambiar el switch
});
*/