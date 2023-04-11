import {useState} from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import DeleteIcon from '@mui/icons-material/Delete';
import {myFriends} from "../../solidapi/solidapi";

import {
    SelectChangeEvent,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    createTheme,
    ThemeProvider,
    IconButton,
    Divider,
    TextField,
    Typography, ListItemButton
} from "@mui/material";
import {CombinedDataProvider, Image, Text, useSession} from "@inrupt/solid-ui-react";

import * as React from "react";
import {VCARD} from "@inrupt/lit-generated-vocab-common";
import GreenSwitch from "./GreenSwitch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


interface MyFriendsListView {
    open: boolean;
    onClose: () => void;
}

function MyFriendsListView(props: MyFriendsListView): JSX.Element {
    const {session} = useSession();

    //TODO: Mirar como sacar los datos de la promise
    //let friends = await myFriends(session);

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
            <Drawer anchor="left" open={props.open} onClose={props.onClose}>
                <List sx={{width: '20em'}} disablePadding>
                    <ListItem>
                        <IconButton onClick={props.onClose}>
                            <ChevronLeftIcon sx={{color: "white"}}/>
                        </IconButton>
                        <ListItemText primary="Your friends list"/>
                    </ListItem>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block', color: 'white'}}}
                    >
                    </Typography>
                </List>
            </Drawer>
        </ThemeProvider>
    );
}
export default MyFriendsListView;