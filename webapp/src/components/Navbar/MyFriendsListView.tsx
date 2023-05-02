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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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
    const [openAlert, setOpenAlert] = useState("");


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
            setOpenAlert("Friend added!");
            myFriendList.push(friendWebID);
        });
    }

    function removeAFriend() {
        removeFriend(session.info.webId!, session, selectedFriend);
        console.log("Amigo: "+ selectedFriend +" eliminado.")
        setOpenDialogRemove(false);
        setOpenAlert("Friend deleted!");
        let filteredFriends = myFriendList.filter((friend) => friend !== selectedFriend);
        setMyFriendList(filteredFriends);
    }

    const goToProfile = (friend: string) => { window.open(friend) };

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

    // Maneja el cierre de la alerta
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {if (reason === 'clickaway') {return;}setOpenAlert("");}

    return (
        <><ThemeProvider theme={theme}>
            <Drawer anchor="left" open={props.open} onClose={props.onClose}>
                <List sx={{width: '25em'}} disablePadding>
                    <ListItem>
                        <IconButton data-testid={"closeMyFriendListView"} onClick={props.onClose}>
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
                                <ListItemButton onClick={() => {goToProfile(friend)}}>
                                    <IosShareIcon/>
                                </ListItemButton>
                                <ListItemButton data-testid={"del-" + friend} onClick={() => {handleClickOpenDialogRemove(friend)}}>
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
                    Add friend
                </Button>
            </Drawer>

            <Snackbar open={openAlert !== ""} onClose={handleCloseAlert} autoHideDuration={1000} >
                <Alert severity="success"
                       sx={{ width: '100%', backgroundColor: 'green', color: 'white'  }}
                       iconMapping={{ success: <CheckCircleOutlineIcon sx={{ color: 'white' }} />,}}
                >
                    {openAlert}
                </Alert>
            </Snackbar>

        </ThemeProvider>
            {
                // ------------------------ Dialog para Añadir Amigos ----------------------------------------------
            }
        <Dialog onClose={handleCloseDialogAdd} aria-labelledby="customized-dialog-title" open={openDialogAdd}>
            <DialogTitle>
                Add friend
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Introduce the webID of the friend you want to add:
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
                    Cancel
                </Button>
                <Button id={"addFriendBtn"} autoFocus onClick={() => {addFriend(addedFriend)}} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
            {
                // ------------------------ Dialog para Eliminar Amigos ----------------------------------------------
            }
            <Dialog onClose={handleCloseDialogRemove} aria-labelledby="customized-dialog-title" open={openDialogRemove}>
                <DialogTitle>
                    Delete friend
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        This action can not be undone
                    </Typography>
                    <Typography gutterBottom>
                        ¿Are you sure you want to continue?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDialogRemove} color="primary">
                        Cancel
                    </Button>
                    <Button autoFocus onClick={() => {removeAFriend()}} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
    </>
    );
}
export default MyFriendsListView;