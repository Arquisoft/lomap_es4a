import { render, screen, act, fireEvent, within } from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import MyFriendsListView from "./MyFriendsListView";

test('check friend list view renders correctly', async() => {

    let friendListOpen = true;
    const closeFriendList = () => friendListOpen = false;

    await act(async () => {
        render(<MyFriendsListView open={friendListOpen} onClose={closeFriendList}/>);

        const linkElement = await screen.findByText("Your friends list");
        expect(linkElement).toBeInTheDocument();
    });
});

test('check add friend but dont enter a name', async() => {

    let friendListOpen = true;
    const closeFriendList = () => friendListOpen = false;

    await act(async () => {
       render(<MyFriendsListView open={friendListOpen} onClose={closeFriendList} />);

        // Buscamos el boton añadir y le damos
        const addFriendButton = await screen.findByText('Añadir amigo');
        fireEvent.click(addFriendButton);

        // Buscamos el boton de confirmación
        const cancelButton = await screen.findByText('Cancelar');
        fireEvent.click(cancelButton);

        const linkElement = await screen.findByText("Your friends list");
        expect(linkElement).toBeInTheDocument();
    });
});

test('check add friend entering a valid name', async() => {

    let friendListOpen = true;
    const closeFriendList = () => friendListOpen = false;

    await act(async () => {
        const { container } = render(<MyFriendsListView open={friendListOpen} onClose={closeFriendList} />);

        // Buscamos el boton añadir y le damos
        const addFriendButton = await screen.findByText('Añadir amigo');
        fireEvent.click(addFriendButton);

        // Cambiamos el texto por un webID válido
        const friendInput  = await screen.findByLabelText("Friend webID");
        fireEvent.change(friendInput, { target: { value: "https://uo271477.inrupt.net/profile/card#me" } });

        // Buscamos el boton añadir final y le damos
        const finalAddFriendButton = await screen.findByText('Añadir');
        fireEvent.click(finalAddFriendButton);

        // Se ha añadido el amigo exitosamente
        expect(await screen.findByText("Friend added!")).toBeInTheDocument();
    });
});
