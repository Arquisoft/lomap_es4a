import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import AddPoint from './AddPoint';


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
