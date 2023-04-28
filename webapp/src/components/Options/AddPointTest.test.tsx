import {fireEvent, getByText, render, screen, waitFor} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import AddPoint from './AddPoint';
import Map from '../Map/Map';
import MainPage from "../MainPage";
import {Session} from "@inrupt/solid-client-authn-browser";
import {wait} from "@testing-library/user-event/dist/utils";
import {act} from "react-dom/test-utils";
import * as addPoint from "../../components/Options/AddPoint";
import {User} from "../../shared/shareddtypes";

test('check click in map renders AddPoint', async () => {
    const { container } = await render(<MainPage session={new Session()} />);
    const { width, height } = container.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    wait(4000);

    fireEvent.click(container, { clientX: centerX, clientY: centerY });

    let addPointText = screen.getByText("Add Place");

    expect(addPointText).toBeInTheDocument();
});

test('check AddPoint component renders', async () => {
    await render(<AddPoint open={true} onClose={() => {}} clickedPoint={null} createPoint={() => {}}/>);
    let addPointText = screen.getByText("Add Place");

    expect(addPointText).toBeInTheDocument();
});

test('check cancel AddPoint', async () => {
    jest.spyOn(addPoint,'onClose')
    const {container, getByText} = render(<AddPoint open={true}/>);
    const button = getByText("Cancel");
    fireEvent.click(button);
    let addPointText = screen.getByText("Add Place");

    expect(addPointText).toBeNull();


    // const inputName = container.querySelector('#pointNameField');
    // console.log(inputName)


    // await act(async () => {
    //     const {container} = render(<AddPoint open={true} onClose={() => {}} clickedPoint={null} createPoint={() => {}}/>)
    //     console.log(container.innerHTML)
    //     const inputName = container.querySelector('input[id="pointNameField"]');
    //
    //     if (inputName != null) {
    //         fireEvent.change(inputName, { target: { value: "Punto1" } });
    //     }




        // const inputDescription = container.querySelector('input[id="pointDescriptionField"]')!;
        // const inputCategory = container.querySelector('input[name="pointCategoryField"]')!;
        // fireEvent.change(inputName, { target: { value: "Punto1" } });
        // fireEvent.change(inputDescription, { target: { value: "Descripción 1" } });
        // fireEvent.change(inputCategory, { target: { value: "Bar" } });
        // const button = getByText("SAVE PLACE");
        // fireEvent.click(button);
        // expect(jest.spyOn(api,'addUser')).toHaveBeenCalled()
        // expect(await findByText(container,"There's been an error in the register proccess.")).toBeInTheDocument();
});