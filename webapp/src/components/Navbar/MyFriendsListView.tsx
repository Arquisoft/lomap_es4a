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
import {useSession} from "@inrupt/solid-ui-react";

import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


interface MyFriendsListViewProps {
    open: boolean;
    onClose: () => void;
}

function MyFriendsListView (props: MyFriendsListViewProps): JSX.Element {
    const {session} = useSession();
    const [myFriendList, setMyFriendList] = React.useState([] as string[]);

    const loadFriends = () => {
        myFriends(session).then((friends) => {
            // COMPROBADO, LOS SACA BIEN
            //actualFriends = friends;
            setMyFriendList(friends);

        })
    };

    const seeMyFriends = (): JSX.Element[] => {
        loadFriends()
        console.log(myFriendList);
        return (myFriendList.map((friend:string) =>
            <ListItem key={friend}>
                <ListItemText primary={friend.toString()} />
            </ListItem>
        ));
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

    const darkTheme = createTheme({
        palette: {
            mode: "dark"
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Drawer anchor="left" open={props.open} onClose={props.onClose} >
                <List sx={{width: '20em'}} disablePadding>
                    <ListItem>
                        <IconButton onClick={props.onClose}>
                            <ChevronLeftIcon sx={{color: "white"}}/>
                        </IconButton>
                        <ListItemText primary="Your friends list"/>
                    </ListItem>
                    <Divider sx={{backgroundColor: "#808b96"}} />
                    <Button onClick={loadFriends}> Cargar Amigos</Button>
                    {
                        myFriendList.map(friend =>(
                            <ListItem key={friend}>
                                <ListItemText primary={friend} />
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
        </ThemeProvider>
    );
}
export default MyFriendsListView;