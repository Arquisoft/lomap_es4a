import {fireEvent, getByRole, getByTestId, getByText, render, screen, waitFor} from '@testing-library/react';
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
