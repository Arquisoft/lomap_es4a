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
    Typography
} from "@mui/material";
import {CombinedDataProvider, Text, useSession} from "@inrupt/solid-ui-react";
import {FOAF} from "@inrupt/vocab-common-rdf";
import * as React from "react";


interface MyFriendsListView {
    open: boolean;
    onClose: () => void;
}

function MyFriendsListView(props: MyFriendsListView): JSX.Element {

    const { session } = useSession();

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
                <List sx={{ width:'20em' }} disablePadding>
                    <ListItem>
                        <IconButton onClick={props.onClose}>
                            <ChevronLeftIcon sx={{color: "white"}} />
                        </IconButton>
                        <ListItemText primary="Your friends list" />
                    </ListItem>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block', color: 'white' } }}
                    >
                        {session.info.webId ? (
                            <CombinedDataProvider
                                datasetUrl={session.info.webId}
                                thingUrl={session.info.webId}>
                                {FOAF.knows !== null && FOAF.knows !== 'undefined' ?
                                    (<Text property={ FOAF.knows }/>):
                                    (<Typography>You don't have any friends</Typography>)
                                }

                            </CombinedDataProvider>
                        ): null }
                    </Typography>
                </List>
            </Drawer>
        </ThemeProvider>
    );
}

export default MyFriendsListView;