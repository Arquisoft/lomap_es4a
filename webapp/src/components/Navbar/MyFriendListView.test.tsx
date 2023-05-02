import { render, screen, act, fireEvent, within } from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import MyFriendsListView from "./MyFriendsListView";
import * as permissions from '../../solidapi/permissions';
import {Session} from "@inrupt/solid-client-authn-browser";
import * as solidApi from "../../solidapi/solidapi";

test('check friend list view renders correctly', async() => {
    jest.spyOn(permissions, 'givePermissions').mockImplementation((session:Session, friendsWebIds:string[]): Promise<void> => Promise.resolve());
    let friendListOpen = true;
    const closeFriendList = () => friendListOpen = false;

    await act(async () => {
        render(<MyFriendsListView open={friendListOpen} onClose={closeFriendList}/>);

        const linkElement = await screen.findByText("Your friends list");
        expect(linkElement).toBeInTheDocument();
    });
});

test('check add friend but dont enter a name', async() => {
    jest.spyOn(permissions, 'givePermissions').mockImplementation((session:Session, friendsWebIds:string[]): Promise<void> => Promise.resolve());

    let friendListOpen = true;
    const closeFriendList = () => friendListOpen = false;

    await act(async () => {
       render(<MyFriendsListView open={friendListOpen} onClose={closeFriendList} />);

        // Buscamos el boton añadir y le damos
        const addFriendButton = await screen.findByText('Add friend');
        fireEvent.click(addFriendButton);

        // Buscamos el boton de confirmación
        const cancelButton = await screen.findByText('Cancel');
        fireEvent.click(cancelButton);

        const linkElement = await screen.findByText("Your friends list");
        expect(linkElement).toBeInTheDocument();
    });
});

test('check add friend entering a valid name', async() => {

    jest.spyOn(permissions, 'givePermissions').mockImplementation(
        (session:Session, friendsWebIds:string[]): Promise<void> => Promise.resolve()
    );

    jest.spyOn(solidApi, 'addNewFriend').mockImplementation(
        (webID:string, session: Session, friendWebID:string): Promise<void> => Promise.resolve()
    );

    let friendListOpen = true;
    const closeFriendList = () => friendListOpen = false;

    await act(async () => {
        render(<MyFriendsListView open={friendListOpen} onClose={closeFriendList} />);

        // Buscamos el boton añadir y le damos
        const addFriendButton = await screen.findByText('Add friend');
        fireEvent.click(addFriendButton);

        // Cambiamos el texto por un webID válido
        const friendInput  = await screen.findByLabelText("Friend webID");
        fireEvent.change(friendInput, { target: { value: "https://uo271477.inrupt.net/profile/card#me" } });

        // Buscamos el boton añadir final y le damos
        const finalAddFriendButton = await screen.findByText('Add');
        fireEvent.click(finalAddFriendButton);

        // Se ha añadido el amigo exitosamente
        expect(await screen.findByText("Friend added!")).toBeInTheDocument();
    });
});

test('check cancel delete friend', async() => {

    jest.spyOn(permissions, 'givePermissions').mockImplementation(
        (session:Session, friendsWebIds:string[]): Promise<void> => Promise.resolve()
    );

    jest.spyOn(solidApi, 'myFriends').mockImplementation(
        (session: Session): Promise<string[]> => Promise.resolve(["https://uo271477.inrupt.net/profile/card#me", "amigo2"])
    );

    let friendListOpen = true;
    const closeFriendList = () => friendListOpen = false;

    await act(async () => {
        render(<MyFriendsListView open={friendListOpen} onClose={closeFriendList} />);

        // Buscamos el boton eliminar y le damos
        const deleteFriendButton = await screen.findByTestId("del-amigo2");
        fireEvent.click(deleteFriendButton);

        // Cancelamos la acción
        const cancelDelete  = await screen.findByText("Cancel");

        fireEvent.click(cancelDelete);

        // Se ha cancelado el borrado
        expect(await screen.findByText("Your friends list")).toBeInTheDocument();
    });
});

test('check delete friend', async() => {

    jest.spyOn(permissions, 'givePermissions').mockImplementation(
        (session:Session, friendsWebIds:string[]): Promise<void> => Promise.resolve()
    );

    jest.spyOn(solidApi, 'myFriends').mockImplementation(
        (session: Session): Promise<string[]> => Promise.resolve(["https://uo271477.inrupt.net/profile/card#me", "amigo2"])
    );

    jest.spyOn(solidApi, 'removeFriend').mockImplementation(
        (webID:string, session: Session, friendWebID:string): Promise<void> => Promise.resolve()
    );

    let friendListOpen = true;
    const closeFriendList = () => friendListOpen = false;

    await act(async () => {
        render(<MyFriendsListView open={friendListOpen} onClose={closeFriendList} />);

        // Buscamos el boton eliminar y le damos
        const deleteFriendButton = await screen.findByTestId("del-amigo2");
        fireEvent.click(deleteFriendButton);

        // Eliminamos el amigo 2
        const finalDelete  = await screen.findByText("Delete");

        fireEvent.click(finalDelete);

        // Se ha eliminado el amigo exitosamente
        expect(await screen.findByText("Friend deleted!")).toBeInTheDocument();
    });
});
