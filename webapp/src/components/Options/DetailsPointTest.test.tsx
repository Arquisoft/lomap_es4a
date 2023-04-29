import {fireEvent, getByText, getByTitle, render, screen, waitFor} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import AddPoint from './AddPoint';
import MainPage from "../MainPage";
import {Session} from "@inrupt/solid-client-authn-browser";
import {wait} from "@testing-library/user-event/dist/utils";
import {act} from "react-dom/test-utils";
import {User} from "../../shared/shareddtypes";
import * as solidapi from "../../solidapi/solidapi";
import Point from "../../solidapi/Point";



test('open DetailsPoint component when clicking on a point', async () => {
    // Add a point to the map
   
    const mapName = 'testMap';
    const pointName = 'Mi punto';
    const { container } = await render(<MainPage session={new Session()} />);
    const { width, height } = container.getBoundingClientRect();
    const latitude = width / 2;
    const longitude = height / 2;
    const category='Bar';
    //await solidapi.addPoint(session, mapName, point);
  
    // Render the AddPoint component
    const clickedPoint = {
        lat: latitude,
        lng: longitude
      }
      
      const { getByTestId, getByLabelText } = render(
        <AddPoint open={true} onClose={jest.fn()} clickedPoint={clickedPoint} createPoint={jest.fn()} />
      );
      
  
    // Fill in the form fields
    const nameInput = getByLabelText('New point\'s name');
    const categoryInput = getByLabelText('New point\'s category');
    fireEvent.change(nameInput, { target: { value: pointName } });
    fireEvent.change(categoryInput, { target: { value: category } });
    // Click on the save button
    const saveButton = getByTestId('save-button');


    fireEvent.click(saveButton);
  
    // Click on the added point
    fireEvent.click(container, { clientX: latitude, clientY: longitude });
  
    // Check if the DetailsPoint component is open with the correct information
   
    const placeDetailsText = await screen.getByText("Place's Details");
    expect(placeDetailsText).toBeInTheDocument();

  });
  
  
  