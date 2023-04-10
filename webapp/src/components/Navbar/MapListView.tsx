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
import { deleteMap, retrieveMapNames } from '../../solidapi/solidapi';
import { Session } from '@inrupt/solid-client-authn-browser';


interface MapListViewProps {
    open: boolean;
    onClose: () => void;
    currentMapName: string;
    setCurrentMapName: React.Dispatch<React.SetStateAction<string>>;
    session: Session;
}

function MapListView(props: MapListViewProps): JSX.Element {

    const [currentLoadMap, setCurrentLoadMap] = useState(""); // info del mapa a cargar
    const [currentNewMap, setCurrentNewMap] = useState(""); // info del mapa a crear
    const [currentDeleteMap, setCurrentDeleteMap] = useState(""); // info del mapa a borrar
    const [mapNames, setMapNames] = useState<string[]>([]); // lista de nombres sacados del pod

    const handleLoadMapChange = (event: SelectChangeEvent) => {
        setCurrentLoadMap(event.target.value);
    };
    
    const handleNewMapChange = (event: any) => {
        setCurrentNewMap(event.target.value);
    };

    const handleDeleteMapChange = (event: SelectChangeEvent) => {
        setCurrentDeleteMap(event.target.value);
    };

    // Carga la lista de puntos correspondiente al mapa seleccionado
    const handleLoadMapClick = () => {
        props.setCurrentMapName(currentLoadMap);
        setCurrentLoadMap("");
        props.onClose();
    };

    // Elimina el mapa seleccionado
    const handleDeleteMapClick = () => {
        // Si el mapa actual es el que se a a borrar, se carga un nuevo mapa.
        // Si no hay más mapas, se crea el mapa "Map1"
        deleteMap(props.session, currentDeleteMap)
            .then(() => {
                retrieveMapNames(props.session).then(names => {
                    if (props.currentMapName === currentDeleteMap) { // comprueba si se borra el mapa actual
                        props.setCurrentMapName(names.length > 0 ? names[0] : props.currentMapName+"-new");
                    }
                    else if (names.length === 0) { // Comprueba si quedan mapas
                        props.setCurrentMapName("Map1");
                    }
                    setCurrentDeleteMap("");
                    props.onClose();
                });
            });
    };

    // Crea el nuevo mapa con el nombre escogido (validando el nuevo nombre)
    const handleNewMapClick = () => {
        if (currentNewMap != null && currentNewMap.trim() !== "") {
            props.setCurrentMapName(currentNewMap);
            setCurrentNewMap("");
            props.onClose();
        }
    };

    const handleOpenSelect = () => {
        retrieveMapNames(props.session)
            .then(names => setMapNames(names));
    }

    // Devuelve los menu items correspondientes a los nombres de los 
    // mapas existentes en el pod del usuario
    const generateMapSelectMenuItems = (): JSX.Element[] => {        
        return (mapNames.map((mapName:string) => 
            <MenuItem key={mapName} value={mapName}>{mapName}</MenuItem>
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
                                onOpen={handleOpenSelect}
                            >
                                {generateMapSelectMenuItems()}
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
                                onOpen={handleOpenSelect}
                            >
                                {generateMapSelectMenuItems()}
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