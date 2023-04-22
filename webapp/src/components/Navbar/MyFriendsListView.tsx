import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {myFriends} from "../../solidapi/solidapi";

import {
    createTheme,
    ThemeProvider,
    IconButton,
    Divider,
    Typography, Switch, ListItemButton, MenuItem, FormControl, InputLabel, Select
} from "@mui/material";
import {CombinedDataProvider, Image, Text, useSession} from "@inrupt/solid-ui-react";

import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {VCARD} from "@inrupt/lit-generated-vocab-common";
import Box from "@mui/material/Box";
import {useEffect} from "react";


interface MyFriendsListViewProps {
    open: boolean;
    onClose: () => void;
}

function MyFriendsListView (props: MyFriendsListViewProps): JSX.Element {
    const {session} = useSession();
    const [myFriendList, setMyFriendList] = React.useState([] as string[]);

    useEffect(() => {
        // Si salimos del drawer hay que cancelar el fetch
        // Así no hay Memory Leak
        const controller = new AbortController();
        loadFriends();

        return () => {
            // cancel the request before component unmounts
            controller.abort();
        };
    }, []);

    const loadFriends = () => {
        myFriends(session).then((friends) => {
            // COMPROBADO, LOS SACA BIEN
            //actualFriends = friends;
            setMyFriendList(friends);

        })
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

    const darkTheme = createTheme({
        palette: {
            mode: "dark"
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Drawer anchor="left" open={props.open} onClose={props.onClose} >
                <List sx={{width: '25em'}} disablePadding>
                    <ListItem>
                        <IconButton onClick={props.onClose}>
                            <ChevronLeftIcon sx={{color: "white"}}/>
                        </IconButton>
                        <ListItemText primary="Your friends list"/>
                    </ListItem>
                    <Divider sx={{backgroundColor: "#808b96"}} />

                    {
                        //<Button onClick={loadFriends}> Cargar Amigos</Button>
                        myFriendList.map(friend =>(
                            friend ? (
                                <ListItem key={friend}>
                                    <Box sx={{ display: { xs: 'none', md: 'flex', color: 'white', padding:"1em"} }}>
                                    <CombinedDataProvider
                                        datasetUrl={friend}
                                        thingUrl={friend}>
                                        <Image property={VCARD.hasPhoto.iri.value} alt="User profile picture" style={{width:60, height:60, borderRadius:30}}/>
                                    </CombinedDataProvider>
                                    </Box>
                                    <CombinedDataProvider
                                        datasetUrl={friend}
                                        thingUrl={friend}>
                                        {FOAF.name !== null && FOAF.name !== undefined ?
                                            (<Text property={ FOAF.name }/>):
                                            (<Typography>User</Typography>)
                                        }
                                    </CombinedDataProvider>
                                </ListItem>
                            ): null
                        ))
                    }
                </List>
            </Drawer>
        </ThemeProvider>
    );
}
export default MyFriendsListView;