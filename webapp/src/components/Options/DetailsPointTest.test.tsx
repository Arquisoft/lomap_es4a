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
import Mapa from '../Map/Map';
import DetailsPoint from './DetailsPoint';



test('close DetailsPoint clicking the close button', async () => {

   let open = true;
    const close = () => {
        open = false;
    };
  const functionMocked = jest.fn();
  const { getByTestId } = await render(<DetailsPoint open={true} onClose={close} point={functionMocked}  markerList={functionMocked} addImage={functionMocked} addReview={functionMocked}/>);
  const button = getByTestId("detailsCloseButton");
  fireEvent.click(button);
  expect(open).toBeFalsy();
  
});

test('opening certain point\' s details', async () => {

    const testPoint=new Point("1", "miPunto", "Bar", 1, 2, "noDesc");
    const functionMocked = jest.fn();
    const { getByTestId } = await render(<DetailsPoint open={true} onClose={functionMocked} point={testPoint}  markerList={functionMocked} addImage={functionMocked} addReview={functionMocked}/>);
    const nameField = getByTestId("nameField");
    const descField = getByTestId("descField");
    const catField = getByTestId("catField");
    expect(nameField.textContent).toBe("miPunto");
    expect(descField.textContent).toBe("noDesc");
    expect(catField.textContent).toBe("Bar");
 
});







 


  
  
  