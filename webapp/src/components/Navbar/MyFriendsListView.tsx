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
    Typography
} from "@mui/material";
import {useSession} from "@inrupt/solid-ui-react";

import * as React from "react";


interface MyFriendsListViewProps {
    open: boolean;
    onClose: () => void;
}

function MyFriendsListView (props: MyFriendsListViewProps): JSX.Element {
    const {session} = useSession();

    let actualFriends:string[];
    actualFriends = [];

    const loadFriends = () => {
        myFriends(session).then((friends) => {
            // COMPROBADO, LOS SACA BIEN
            actualFriends = friends;
        })
        seeMyFriends();
    };

    const seeMyFriends = () => {
        actualFriends.forEach(friend => {
            console.log(friend);
        });
    }

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
                    <Divider sx={{backgroundColor: "#808b96"}} />
                    <Button onClick={loadFriends}>Cargar amigos</Button>
                </List>
            </Drawer>
        </ThemeProvider>
    );
}
export default MyFriendsListView;