import {useState} from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import { SelectChangeEvent, InputLabel, MenuItem, Select, FormControl, createTheme, ThemeProvider, IconButton, Divider, TextField } from "@mui/material";


interface MapListViewProps {
    open: boolean;
    onClose: () => void;
}

function MapListView(props: MapListViewProps): JSX.Element {

    const [currentMap, setCurrentMap] = useState("");

    const handleMapChange = (event: SelectChangeEvent) => {
        setCurrentMap(event.target.value);
    };

    const handleLoadMapClick = () => {
        // TODO: Se debe de cargar la lista de puntos correspondiente al mapa seleccionado
        props.onClose();
    };

    const handleCreateMapClick = () => {
        // TODO: Se debe de crear el nuevo mapa con el nombre escogido
        props.onClose();
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
            <List sx={{ width:'20em' }} disablePadding>
                <ListItem>
                    <IconButton onClick={props.onClose}>
                        <ChevronLeftIcon sx={{color: "white"}} />
                    </IconButton>
                    <ListItemText primary="Map List" />
                </ListItem>
                <Divider sx={{backgroundColor: "#808b96", height: "0.1em"}} />
                <ListItem>
                    <AddBoxIcon />
                    <ListItemText primary="Create a new map" />
                </ListItem>
                <ListItem>
                    <ThemeProvider theme={darkTheme}>
                        <TextField id="mapNameField" label="New map's name" variant="filled" fullWidth />
                    </ThemeProvider>
                </ListItem>
                <ListItem>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mb: 4 }}
                        onClick={handleCreateMapClick}
                    >
                        Create new Map
                    </Button>
                </ListItem>
                <Divider sx={{backgroundColor: "#808b96", height: "0.1em"}} />
                <ListItem>
                    <FindReplaceIcon />
                    <ListItemText primary="Load an existent map" />
                </ListItem>
                <ListItem>
                    <ThemeProvider theme={darkTheme}>
                        <FormControl fullWidth >
                            <InputLabel id="selectMapLabel">Choose a map to load</InputLabel>                        
                            <Select 
                                labelId="selectMapLabel"
                                label="Choose a map to load"
                                id="selectMap"
                                value={currentMap}
                                onChange={handleMapChange}
                            >
                                <MenuItem value={"Mapa1"}>Mapa1</MenuItem>
                                <MenuItem value={"Mapa2"}>Mapa2</MenuItem>
                                <MenuItem value={"Mapa3"}>Mapa3</MenuItem>
                                <MenuItem value={"Mapa4"}>Mapa4</MenuItem>
                            </Select>                        
                        </FormControl>
                    </ThemeProvider>
                </ListItem>
                <ListItem>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleLoadMapClick}
                    >
                        Load Map
                    </Button>
                </ListItem>
            </List>
        </Drawer>
    </ThemeProvider>
  );
}

export default MapListView;