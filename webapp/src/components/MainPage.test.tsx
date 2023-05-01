import {render, screen, act} from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import {Session} from "@inrupt/solid-client-authn-browser";
import MainPage from "./MainPage";
import * as permissions from "../solidapi/permissions";

test('check MainPage component renders', async () => {
    jest.spyOn(permissions,'givePermissions').mockImplementation((session: Session, friendsWebIds:string[]): Promise<void> => Promise.resolve());

    await act(async () => {
        await render(<MainPage session={new Session()}/>);
        let addPointText = screen.getByText("LoMap_es4a");

        expect(addPointText).toBeInTheDocument();
    });

});