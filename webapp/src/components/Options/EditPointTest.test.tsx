import {fireEvent, getByText, getByTitle, render, screen, waitFor, within} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";

import EditPoint from './EditPoint';
import Point from '../../solidapi/Point';



test('check Edit Point renders correctly', async () => {

   let open = true;
    const close = () => {
        open = false;
    };
  const functionMocked = jest.fn();
  const { getByTestId } = await render(<EditPoint open={open} onClose={close} point={functionMocked} editPoint={functionMocked}/>);
  expect(await screen.findByText("Edit Place")).toBeInTheDocument();
  
});

test('check Edit Point closes correctly', async () => {

  let open = true;
   const close = () => {
       open = false;
   };
 const functionMocked = jest.fn();
 const { getByTestId } = await render(<EditPoint open={open} onClose={close} point={functionMocked} editPoint={functionMocked}/>);
 const button = getByTestId("editCloseButton");
  fireEvent.click(button);
  expect(open).toBeFalsy();
 
});


test('check Edit Point fields onload correctly', async () => {

  let open = true;
   const close = () => {
       open = false;
   };
 const functionMocked = jest.fn();
 const { getByTestId } = await render(<EditPoint open={open} onClose={close} point={new Point("1", "PName", "Bar", 0, 0, "NoDesc")} editPoint={functionMocked}/>);
 const editName = getByTestId("editName");
 const editCat = getByTestId("editCat");
 const editDesc = getByTestId("editDesc");
 const inputN = within(editName).getByRole("textbox");

 const inputD = within(editDesc).getByRole("textbox");

 expect(inputN).toHaveValue('PName');

 expect(inputD).toHaveValue('NoDesc');

});


test('check Edit Point fields changes correctly', async () => {

  let open = true;
   const close = () => {
       open = false;
   };
 const functionMocked = jest.fn();
 const { getByTestId } = await render(<EditPoint open={open} onClose={close} point={new Point("1", "PName", "Bar", 0, 0, "NoDesc")} editPoint={functionMocked}/>);
 const editName = getByTestId("editName");
 const editCat = getByTestId("editCat");
 const editDesc = getByTestId("editDesc");
 const inputN = within(editName).getByRole("textbox");
 fireEvent.change(inputN, { target: { value: "NuevoNombre" } });
 const inputD = within(editDesc).getByRole("textbox");
 fireEvent.change(inputD, { target: { value: "NuevaDesc" } });
 expect(inputN).toHaveValue('NuevoNombre');
 expect(inputD).toHaveValue('NuevaDesc');


});

test('check Edit Point saves changes correctly', async () => {

  let open = true;
   const close = () => {
       open = false;
   };
 const functionMocked = jest.fn();
 const { getByTestId } = await render(<EditPoint open={open} onClose={close} point={new Point("1", "PName", "Bar", 0, 0, "NoDesc")} editPoint={functionMocked}/>);
 const editName = getByTestId("editName");
 const editCat = getByTestId("editCat");
 const editDesc = getByTestId("editDesc");
 const inputN = within(editName).getByRole("textbox");
 fireEvent.change(inputN, { target: { value: "NuevoNombre" } });
 const inputD = within(editDesc).getByRole("textbox");
 fireEvent.change(inputD, { target: { value: "NuevaDesc" } });
 expect(inputN).toHaveValue('NuevoNombre');
 expect(inputD).toHaveValue('NuevaDesc');
 const saveButton = getByTestId("saveButton");
 fireEvent.click(saveButton);
 expect(inputN).toHaveValue('NuevoNombre');
 expect(inputD).toHaveValue('NuevaDesc');
 expect(open).toBeFalsy();

});

test('check Edit Point cancels changes correctly', async () => {

  let open = true;
   const close = () => {
       open = false;
   };
 const functionMocked = jest.fn();
 const { getByTestId } = await render(<EditPoint open={open} onClose={close} point={new Point("1", "PName", "Bar", 0, 0, "NoDesc")} editPoint={functionMocked}/>);
 const editName = getByTestId("editName");
 const editCat = getByTestId("editCat");
 const editDesc = getByTestId("editDesc");
 const inputN = within(editName).getByRole("textbox");
 fireEvent.change(inputN, { target: { value: "NuevoNombre" } });
 const inputD = within(editDesc).getByRole("textbox");
 fireEvent.change(inputD, { target: { value: "NuevaDesc" } });
 expect(inputN).toHaveValue('NuevoNombre');
 expect(inputD).toHaveValue('NuevaDesc');
 const cancellButton = getByTestId("cancellButton");
 fireEvent.click(cancellButton);
 expect(open).toBeFalsy();

});

test('check Edit Point edit right category', async () => {

  let open = true;
   const close = () => {
       open = false;
   };
 const functionMocked = jest.fn();
 const { getByTestId } = await render(<EditPoint open={open} onClose={close} point={new Point("1", "PName", "Bar", 0, 0, "NoDesc")} editPoint={functionMocked}/>);
 const autocompleteCat = await screen.findByTestId("editCat");
 const button = within(autocompleteCat).getByRole("button");
 fireEvent.change(button, { target: { value: "Hospital" } });
 const saveButton = getByTestId("saveButton");
 fireEvent.click(saveButton);
 expect(button).toHaveValue('Hospital');
});
/*
test('check Edit Point edit wrong category', async () => {

  let open = true;
   const close = () => {
       open = false;
   };
 const functionMocked = jest.fn();
 const { getByTestId } = await render(<EditPoint open={open} onClose={close} point={new Point("1", "PName", "Bar", 0, 0, "NoDesc")} editPoint={functionMocked}/>);
 const autocompleteCat = await screen.findByTestId("editCat");
 const button = within(autocompleteCat).getByRole("button");
 fireEvent.change(button, { target: { value:null } });
 
 expect(await screen.findByText("The Place must have a name and a category")).toBeInTheDocument();
 
});

test('check Edit Point with wrong Name shows error', async () => {

  let open = true;
   const close = () => {
       open = false;
   };
 const functionMocked = jest.fn();
 const { getByTestId } = await render(<EditPoint open={open} onClose={close} point={new Point("1", "", "", 0, 0, "NoDesc")} editPoint={functionMocked}/>);
 const editName = getByTestId("editName");
 const inputN = within(editName).getByRole("textbox");
 fireEvent.change(inputN, { target: { value: "" } });
 
 expect(inputN).toHaveValue('');
 const saveButton = getByTestId("saveButton");
 fireEvent.click(saveButton);

 const errorDialog = getByTestId("errorDialog");
 expect(errorDialog).toBeInTheDocument();
});
*/
 


  
  
  