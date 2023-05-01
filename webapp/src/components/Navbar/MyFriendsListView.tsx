import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IosShareIcon from '@mui/icons-material/IosShare';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import {myFriends, addNewFriend, removeFriend} from "../../solidapi/solidapi";

import {
    createTheme,
    ThemeProvider,
    IconButton,
    Divider,
    Typography,
    ListItemButton,
    Dialog,
    DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import {CombinedDataProvider, Image, Text, useSession} from "@inrupt/solid-ui-react";

import * as React from "react";
import {FOAF, VCARD} from "@inrupt/vocab-common-rdf";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import { givePermissions } from '../../solidapi/permissions';


interface MyFriendsListViewProps {
    open: boolean;
    onClose: () => void;
}

function MyFriendsListView (props: MyFriendsListViewProps): JSX.Element {
    const {session} = useSession();
    const [myFriendList, setMyFriendList] = React.useState([] as string[]);
    const [selectedFriend, setSelectedFriend] = React.useState("");
    const [addedFriend, setAddedFriend] = useState("");
    const [openDialogAdd, setOpenDialogAdd] = React.useState(false);
    const [openDialogRemove, setOpenDialogRemove] = React.useState(false);


    useEffect(() => {
        // Si salimos del drawer hay que cancelar el fetch
        // Así no hay Memory Leak
        const controller = new AbortController();
        
        loadFriends();

        return () => {
            // cancel the request before component unmounts
            controller.abort();
        };
        // eslint-disable-next-line
    }, []);

    const loadFriends = () => {
        myFriends(session).then((friends) => {
            // Se dan permisos a los amigos
            givePermissions(session, friends).then(() => {
                setMyFriendList(friends);
            });
        });
    };

    const addFriend = (friendWebID: string) => {
        // Se da permiso al nuevo amigo
        givePermissions(session, [friendWebID]).then(() => {
            addNewFriend(session.info.webId!, session, friendWebID);
            console.log("Amigo: "+ friendWebID +" añadido.")
            setOpenDialogAdd(false);
            myFriendList.push(friendWebID);
        });
    }

    function removeAFriend() {
        removeFriend(session.info.webId!, session, selectedFriend);
        console.log("Amigo: "+ selectedFriend +" eliminado.")
        setOpenDialogRemove(false);
        let filteredFriends = myFriendList.filter((friend) => friend !== selectedFriend);
        setMyFriendList(filteredFriends);
    }

    const goToProfile = (friend: string) => {
        window.open(friend);
        //redirect(friend);
    };

    const theme = createTheme({
        components: {
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: "#101F33",
                        color: "white"
                    }
                }
            }
        }
    });

    const handleClickOpenDialogAdd = () => {
        setOpenDialogAdd(true);
    };
    const handleCloseDialogAdd = () => {
        setOpenDialogAdd(false);
    };

    const handleClickOpenDialogRemove = (friend:string) => {
        setSelectedFriend(friend);
        setOpenDialogRemove(true);
    };
    const handleCloseDialogRemove = () => {
        setOpenDialogRemove(false);
    };

    return (
        <><ThemeProvider theme={theme}>
            <Drawer anchor="left" open={props.open} onClose={props.onClose}>
                <List sx={{width: '25em'}} disablePadding>
                    <ListItem>
                        <IconButton onClick={props.onClose}>
                            <ChevronLeftIcon sx={{color: "white"}}/>
                        </IconButton>
                        <ListItemText primary="Your friends list"/>
                    </ListItem>
                    <Divider sx={{backgroundColor: "#808b96"}}/>

                    {myFriendList.map(friend => (
                        friend ? (
                            <ListItem key={friend}>
                                <Box sx={{display: {xs: 'none', md: 'flex', color: 'white', padding: "1em"}}}>
                                    <CombinedDataProvider
                                        datasetUrl={friend}
                                        thingUrl={friend}>
                                        <Image property={VCARD.hasPhoto} alt="User profile picture"
                                                    style={{width: 60, height: 60, borderRadius: 30}}/>
                                    </CombinedDataProvider>
                                </Box>
                                <CombinedDataProvider
                                    datasetUrl={friend}
                                    thingUrl={friend}>
                                    {FOAF.name !== null && FOAF.name !== undefined ?
                                        (<Text property={FOAF.name}/>)
                                        : (<Typography>User</Typography>)}
                                </CombinedDataProvider>
                                <ListItemButton onClick={() => {
                                    goToProfile(friend);
                                }}>
                                    <IosShareIcon/>
                                </ListItemButton>
                                <ListItemButton onClick={() => {handleClickOpenDialogRemove(friend)}}>
                                    <DeleteIcon/>
                                </ListItemButton>
                            </ListItem>
                        ) : null
                    ))}
                </List>
                <Button variant="contained" onClick={() => {handleClickOpenDialogAdd()}}>
                    <Box sx={{display: {xs: 'none', md: 'flex', color: 'white', padding: "0.5em"}}}>
                        <PersonAddIcon/>
                    </Box>
                    Añadir amigo
                </Button>
            </Drawer>
        </ThemeProvider>
            {
                // ------------------------ Dialog para Añadir Amigos ----------------------------------------------
            }
        <Dialog onClose={handleCloseDialogAdd} aria-labelledby="customized-dialog-title" open={openDialogAdd}>
            <DialogTitle>
                Añadir amigo
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Intoduce el webID de la persona que quieres añadir:
                </Typography>
                <TextField id={"friend-webID"} label="Friend webID" variant="outlined"
                           helperText="Ejemplo: https://xxxxxxxx.inrupt.net/profile/card#me"
                           sx={{display: {xs: 'none', md: 'flex', color: 'white', padding: "0.5em"}}}
                           onChange={(event: any) => {
                               setAddedFriend(event.target.value);
                           }}>

                </TextField>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCloseDialogAdd} color="error">
                    Cancelar
                </Button>
                <Button autoFocus onClick={() => {addFriend(addedFriend)}} color="primary">
                    Añadir amigo
                </Button>
            </DialogActions>
        </Dialog>
            {
                // ------------------------ Dialog para Eliminar Amigos ----------------------------------------------
            }
            <Dialog onClose={handleCloseDialogRemove} aria-labelledby="customized-dialog-title" open={openDialogRemove}>
                <DialogTitle>
                    Eliminar amigo
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Esta acción no se puede revertir
                    </Typography>
                    <Typography gutterBottom>
                        ¿Desea continuar?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDialogRemove} color="primary">
                        Cancelar
                    </Button>
                    <Button autoFocus onClick={() => {removeAFriend()}} color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
    </>
    );
}
export default MyFriendsListView;