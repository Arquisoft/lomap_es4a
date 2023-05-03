import {fireEvent, getByText, getByTitle, render, screen, waitFor, within} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import EditPoint from './EditPoint';
import Point from '../../solidapi/Point';
let open:boolean;
beforeEach( () => { 
  open = true;
  const close = () => open = false;
  const functionMocked = jest.fn();
  const { } = render(<EditPoint open={open} onClose={close} point={new Point("1", "PName", "Bar", 0, 0, "NoDesc")} editPoint={functionMocked}/>);
});
test('check Edit Point renders correctly', async () => {
   
  const functionMocked = jest.fn();
  
  expect(await screen.findByText("Edit Place")).toBeInTheDocument();
  
});
test('check Edit Point closes correctly', async () => {
  
 const functionMocked = jest.fn();
 
 const button = screen.getByTestId("editCloseButton");
  fireEvent.click(button);
  expect(open).toBeFalsy();
 
});
test('check Edit Point fields onload correctly', async () => {
  
 const functionMocked = jest.fn();
 const editName = screen.getByTestId("editName");
 const editDesc = screen.getByTestId("editDesc");
 const inputN = within(editName).getByRole("textbox");
 const inputD = within(editDesc).getByRole("textbox");
 expect(inputN).toHaveValue('PName');
 expect(inputD).toHaveValue('NoDesc');
});
test('check Edit Point fields changes correctly', async () => {
  
 const functionMocked = jest.fn();
 const editName = screen.getByTestId("editName");
 const editDesc = screen.getByTestId("editDesc");
 const inputN = within(editName).getByRole("textbox");
 fireEvent.change(inputN, { target: { value: "NuevoNombre" } });
 const inputD = within(editDesc).getByRole("textbox");
 fireEvent.change(inputD, { target: { value: "NuevaDesc" } });
 expect(inputN).toHaveValue('NuevoNombre');
 expect(inputD).toHaveValue('NuevaDesc');
});
test('check Edit Point saves changes correctly', async () => {
  
 const functionMocked = jest.fn();
 const editName = screen.getByTestId("editName");
 const editDesc = screen.getByTestId("editDesc");
 const inputN = within(editName).getByRole("textbox");
 fireEvent.change(inputN, { target: { value: "NuevoNombre" } });
 const inputD = within(editDesc).getByRole("textbox");
 fireEvent.change(inputD, { target: { value: "NuevaDesc" } });
 expect(inputN).toHaveValue('NuevoNombre');
 expect(inputD).toHaveValue('NuevaDesc');
 const saveButton = screen.getByTestId("saveButton");
 fireEvent.click(saveButton);
 expect(inputN).toHaveValue('NuevoNombre');
 expect(inputD).toHaveValue('NuevaDesc');
 expect(open).toBeFalsy();
});
test('check Edit Point cancels changes correctly', async () => {
  
 const functionMocked = jest.fn();
 const editName = screen.getByTestId("editName");
 const editDesc = screen.getByTestId("editDesc");
 const inputN = within(editName).getByRole("textbox");
 fireEvent.change(inputN, { target: { value: "NuevoNombre" } });
 const inputD = within(editDesc).getByRole("textbox");
 fireEvent.change(inputD, { target: { value: "NuevaDesc" } });
 expect(inputN).toHaveValue('NuevoNombre');
 expect(inputD).toHaveValue('NuevaDesc');
 const cancellButton = screen.getByTestId("cancellButton");
 fireEvent.click(cancellButton);
 expect(open).toBeFalsy();
});
test('check Edit Point edit right category', async () => {
  
 const functionMocked = jest.fn();
 
 const autocompleteCat = await screen.findByTestId("editCat");
 const button = within(autocompleteCat).getByRole("button");
 fireEvent.change(button, { target: { value: "Hospital" } });
 const saveButton = screen.getByTestId("saveButton");
 fireEvent.click(saveButton);
 expect(button).toHaveValue('Hospital');
});

 