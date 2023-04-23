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
    Typography, Switch, ListItemButton, MenuItem, FormControl, InputLabel, Select, CircularProgress, Collapse
} from "@mui/material";
import {CombinedDataProvider, Image, Text, useSession} from "@inrupt/solid-ui-react";

import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {VCARD} from "@inrupt/lit-generated-vocab-common";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import {TbSeparator} from "react-icons/all";
import PeopleIcon from "@mui/icons-material/People";


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

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const loadFriends = () => {
        myFriends(session).then((friends) => {
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
                        myFriendList.map(friend =>(
                            friend ? (
                                <List>
                                <ListItemButton key={friend} onClick={handleClick}>
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
                                            (<Text property={FOAF.name}/>)
                                            : (<Typography>User</Typography>)
                                        }
                                    </CombinedDataProvider>
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{ color: "white" }}>
                                            <ListItemIcon sx={{ color: "white" }}>
                                                <PeopleIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Perfil" />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                                </List>
                            ): null
                        ))
                    }
                </List>
            </Drawer>
        </ThemeProvider>
    );
}
export default MyFriendsListView;