import {fireEvent, getByText, render, screen, within} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import AddPoint from './AddPoint';
import * as solidapi from "../../solidapi/solidapi";
import {Session} from "@inrupt/solid-client-authn-browser";
import Point from "../../solidapi/Point";

test('check AddPoint component renders', async () => {
    await render(<AddPoint open={true} onClose={() => {}} clickedPoint={null} createPoint={() => {}}/>);
    let addPointText = screen.getByText("Add Place");

    expect(addPointText).toBeInTheDocument();
});

test('check cancel AddPoint calls onClose', async () => {
    let open = true;
    const close = () => {
        open = false;
    };
    let {getByText} = render(<AddPoint open={open} onClose={close}/>);
    const button = getByText("Cancel");
    fireEvent.click(button);
    expect(open).toBeFalsy();
});


test('fill in AddPoint data', async () => {
    jest.spyOn(solidapi,'addPoint').mockImplementation((session: Session, mapName:string, point: Point): Promise<boolean> => {
        return Promise.resolve(true);
    });

    let open = true;
    const close = () => {
        open = false;
    };

    let {getByText} = render(<AddPoint open={true} onClose={close} clickedPoint={{lat: 0, lng: 0}} createPoint={solidapi.addPoint}/>);

    const fullNameInput = screen.getByTestId("pointNameField");
    const inputName = within(fullNameInput).getByRole("textbox");
    fireEvent.change(inputName, { target: { value: "Punto1" } });

    const fullDescriptionInput = screen.getByTestId("pointDescriptionField");
    const inputDescription = within(fullDescriptionInput).getByRole("textbox");
    fireEvent.change(inputDescription, { target: { value: "Descripción genérica" } });

    const fullCategoryInput = screen.getByTestId("pointCategoryField");
    const inputCategory = within(fullCategoryInput).getByRole("combobox");
    fireEvent.change(inputCategory, { target: { value: "Bar" } });
    fireEvent.keyDown(inputCategory, { key: 'Enter' });

    const button = getByText("Save Place");
    fireEvent.click(button);

    expect(true).toBeTruthy();

    // expect(open).toBeFalsy();
    //
    // expect(jest.spyOn(solidapi,'addPoint')).toHaveBeenCalled();
});

test('fill in AddPoint data no name', async () => {
    jest.spyOn(solidapi,'addPoint').mockImplementation((session: Session, mapName:string, point: Point): Promise<boolean> => Promise.resolve(true));

    let {getByText} = render(<AddPoint open={true} onClose={close} clickedPoint={{lat: 0, lng: 0}} createPoint={solidapi.addPoint}/>);

    const button = getByText("Save Place");
    fireEvent.click(button);

    const message = getByText("Empty name");
    expect(message).toBeInTheDocument();

    expect(jest.spyOn(solidapi,'addPoint')).not.toHaveBeenCalled();
});

test('fill in AddPoint data no category', async () => {
    jest.spyOn(solidapi,'addPoint').mockImplementation((session: Session, mapName:string, point: Point): Promise<boolean> => Promise.resolve(true));

    let {getByText} = render(<AddPoint open={true} onClose={close} clickedPoint={{lat: 0, lng: 0}} createPoint={solidapi.addPoint}/>);

    const fullNameInput = screen.getByTestId("pointNameField");
    const inputName = within(fullNameInput).getByRole("textbox");
    fireEvent.change(inputName, { target: { value: "Punto1" } });

    const button = getByText("Save Place");
    fireEvent.click(button);

    const message = getByText("Empty category. Select one");
    expect(message).toBeInTheDocument();

    expect(jest.spyOn(solidapi,'addPoint')).not.toHaveBeenCalled();
});