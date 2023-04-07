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
import { SelectChangeEvent, InputLabel, MenuItem, Select, FormControl, createTheme, ThemeProvider, IconButton, Divider, TextField } from "@mui/material";


interface MapListViewProps {
    open: boolean;
    onClose: () => void;
}

function MapListView(props: MapListViewProps): JSX.Element {

    const [currentLoadMap, setCurrentLoadMap] = useState(""); // info del mapa a cargar
    const [currentNewMap, setCurrentNewMap] = useState(""); // info del mapa a crear
    const [currentDeleteMap, setCurrentDeleteMap] = useState(""); // info del mapa a borrar

    const handleLoadMapChange = (event: SelectChangeEvent) => {
        setCurrentLoadMap(event.target.value);
    };
    
    const handleNewMapChange = (event: any) => {
        setCurrentNewMap(event.target.value);
    };

    const handleDeleteMapChange = (event: SelectChangeEvent) => {
        setCurrentDeleteMap(event.target.value);
    };

    const handleLoadMapClick = () => {
        // TODO: Se debe de cargar la lista de puntos correspondiente al mapa seleccionado
        setCurrentLoadMap("");
        props.onClose();
    };

    const handleDeleteMapClick = () => {
        // TODO: Se debe de eliminar el mapa seleccionado
        setCurrentDeleteMap("");
        props.onClose();
    };

    const handleNewMapClick = () => {
        // TODO: Se debe de crear el nuevo mapa con el nombre escogido (y validar el nuevo nombre)
        if (currentNewMap != null && currentNewMap.trim() !== "") {
            setCurrentNewMap("");
            props.onClose();
        }
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
                        <TextField id="mapNameField" label="New map's name" variant="filled" fullWidth onChange={handleNewMapChange}/>
                    </ThemeProvider>
                </ListItem>
                <ListItem>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mb: 4 }}
                        onClick={handleNewMapClick}
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
                                value={currentLoadMap}
                                onChange={handleLoadMapChange}
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
                        sx={{ mb: 4 }}
                        onClick={handleLoadMapClick}
                    >
                        Load Map
                    </Button>
                </ListItem>
                <Divider sx={{backgroundColor: "#808b96", height: "0.1em"}} />
                <ListItem>
                    <DeleteIcon />
                    <ListItemText primary="Delete an existent map" />
                </ListItem>
                <ListItem>
                    <ThemeProvider theme={darkTheme}>
                        <FormControl fullWidth >
                            <InputLabel id="selectDeleteMapLabel">Choose a map to delete</InputLabel>                        
                            <Select 
                                labelId="selectDeleteMapLabel"
                                label="Choose a map to delete"
                                id="selectDeleteMap"
                                value={currentDeleteMap}
                                onChange={handleDeleteMapChange}
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
                        onClick={handleDeleteMapClick}
                    >
                        Delete Map
                    </Button>
                </ListItem>
            </List>
        </Drawer>
    </ThemeProvider>
  );
}

export default MapListView;