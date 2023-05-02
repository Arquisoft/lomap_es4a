import "@inrupt/jest-jsdom-polyfills";
import {act, fireEvent, render, screen} from '@testing-library/react';
import {Session} from "@inrupt/solid-client-authn-browser";
import Mapa from "./Map";
import * as solidApi from "../../solidapi/solidapi";
import Point from "../../solidapi/Point";

test('check initial map fails to render', async() => {
    await act(async () => {
        render(<Mapa/>);
        expect(await screen.findByText("Map loading...")).toBeInTheDocument();
    });
});
