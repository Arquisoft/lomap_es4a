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
import PeopleIcon from '@mui/icons-material/People';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SelectChangeEvent, InputLabel, MenuItem, Select, FormControl, createTheme, ThemeProvider, IconButton, Divider, TextField, FormHelperText } from "@mui/material";
import { deleteMap, retrieveMapNames, retrieveFriendsMapNames, checkMapNameIsValid, extractUsersNameFromURL } from '../../solidapi/solidapi';


interface MapListViewProps {
    open: boolean;
    onClose: () => void;
    currentMapName: string;
    setCurrentMapName: React.Dispatch<React.SetStateAction<string>>;
    session: any;
}

function MapListView(props: MapListViewProps): JSX.Element {

    const [currentLoadMap, setCurrentLoadMap] = useState(""); // info del mapa a cargar
    const [currentNewMap, setCurrentNewMap] = useState(""); // info del mapa a crear
    const [currentDeleteMap, setCurrentDeleteMap] = useState(""); // info del mapa a borrar
    const [mapNames, setMapNames] = useState<string[]>([]); // lista de nombres sacados del pod
    const [friendsMaps, setFriendsMaps] = useState<{urls: string[]; names: string[];}>({urls:[], names:[]}); // lista de nombres y urls de los mapas de los amigos
    const [openAlert, setOpenAlert] = useState("");

    // Validaciones de datos
    const [newMapsNameError, setNewMapsNameError] = useState("");
    const [isLoadMapEmpty, setIsLoadMapEmpty] = useState(false);
    const [isDeleteMapEmpty, setIsDeleteMapEmpty] = useState(false);



    const handleLoadMapChange = (event: SelectChangeEvent) => {
        setIsLoadMapEmpty(event.target.value === "");
        setCurrentLoadMap(event.target.value);
    };
    
    const handleNewMapChange = (event: any) => {
        // Validaciones del nuevo nombre del mapa    
        if (!checkMapNameIsValid(event.target.value) && event.target.value !== "") {
            setNewMapsNameError("Only letters, numbers and _ are allowed.");
        } else {
            setNewMapsNameError("");
        }
        setCurrentNewMap(event.target.value);
    };

    const handleDeleteMapChange = (event: SelectChangeEvent) => {
        setIsDeleteMapEmpty(event.target.value === "");
        setCurrentDeleteMap(event.target.value);
    };

    // Carga la lista de puntos correspondiente al mapa seleccionado
    const handleLoadMapClick = () => {
        if (checkMapNameIsValid(currentLoadMap) || currentLoadMap.includes("https://")) {
            setIsLoadMapEmpty(false);
            props.setCurrentMapName(currentLoadMap);
            setOpenAlert("Map loaded!"); 
            setCurrentLoadMap("");
            props.onClose();
        } else { // mapa vacío
            setIsLoadMapEmpty(true);
        }
    };

    // Elimina el mapa seleccionado
    const handleDeleteMapClick = () => {
        if (checkMapNameIsValid(currentDeleteMap)) { 
            // Si el mapa actual es el que se a a borrar, se carga un nuevo mapa.
            // Si no hay más mapas, se crea el mapa "Map1"
            deleteMap(props.session, currentDeleteMap)
                .then(() => {
                    retrieveMapNames(props.session).then(names => {
                        setIsDeleteMapEmpty(false);
                        if (props.currentMapName === currentDeleteMap) { // comprueba si se borra el mapa actual
                            props.setCurrentMapName(names.length > 0 ? names[0] : props.currentMapName+"_new");
                        }
                        else if (names.length === 0) { // Comprueba si quedan mapas
                            props.setCurrentMapName("Map1");
                        }
                        setOpenAlert("Map deleted correctly!");                        
                        setCurrentDeleteMap("");
                        props.onClose();
                    }).catch(error => console.log(error));
                }).catch(error => console.log(error));
        } else {
            setIsDeleteMapEmpty(true);
        }
    };

    // Crea el nuevo mapa con el nombre escogido (validando el nuevo nombre)
    const handleNewMapClick = () => {
        if (checkMapNameIsValid(currentNewMap)) {            
            props.setCurrentMapName(currentNewMap);
            setOpenAlert("Map created correctly!");
            setCurrentNewMap("");
            props.onClose();
        } else {
            setNewMapsNameError("Empty map name");
        }
    };

    const handleOpenDeleteSelect = () => {
        retrieveMapNames(props.session)
            .then(names => setMapNames(names))
            .catch(error => console.log(error));
    }

    // Devuelve los menu items correspondientes a los nombres de los 
    // mapas existentes en el pod del usuario
    const generateMapDeleteSelectMenuItems = (): JSX.Element[] => {        
        return (mapNames.map((mapName:string) => 
            <MenuItem key={mapName} value={mapName}>{mapName}</MenuItem>
        ));
    }

    const handleOpenLoadSelect = () => {
        retrieveMapNames(props.session)
            .then(names => {
                retrieveFriendsMapNames(props.session)
                    .then(friendsMaps => {
                        setFriendsMaps(friendsMaps);
                        setMapNames(names);
                    }).catch(error => console.log(error));                
            }).catch(error => console.log(error));
    }

    // Devuelve los menu items correspondientes a los nombres de los 
    // mapas existentes en el pod del usuario y en el de sus amigos
    const generateMapLoadSelectMenuItems = (): JSX.Element[] => {    
        let menuItems: JSX.Element[] = []

        menuItems.push(...mapNames.map((mapName:string) => 
            <MenuItem key={mapName} value={mapName}>{mapName}</MenuItem>
        ));

        menuItems.push(...friendsMaps.names.map((mapName:string, i:number) => 
            <MenuItem key={friendsMaps.urls[i]} value={friendsMaps.urls[i]}>
                <PeopleIcon/>{extractUsersNameFromURL(friendsMaps.urls[i])}<ArrowRightIcon/>{mapName}
            </MenuItem>
        ));

        return menuItems;
    }

    // Maneja el cierre de la alerta
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert("");
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
                        <TextField 
                            id="mapNameField"
                            data-testid="mapNameField"
                            label="New map's name" 
                            variant="filled" 
                            fullWidth 
                            onChange={handleNewMapChange}
                            error={newMapsNameError !== ""}
                            helperText={newMapsNameError}
                        />
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
                        <FormControl fullWidth error={isLoadMapEmpty} >
                            <InputLabel id="selectMapLabel">Choose a map to load</InputLabel>                        
                            <Select 
                                labelId="selectMapLabel"
                                label="Choose a map to load"
                                id="selectMap"
                                data-testid="selectMap"
                                value={currentLoadMap}
                                onChange={handleLoadMapChange}
                                onOpen={handleOpenLoadSelect}
                            >
                                {friendsMaps.names.length === 0 ? (<Box sx={{ display: 'flex', justifyContent:'center' }}><CircularProgress /></Box>) : ""}
                                {generateMapLoadSelectMenuItems()}
                            </Select>
                            <FormHelperText>{isLoadMapEmpty ? "Please, select a map to load." : ""}</FormHelperText>               
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
                        <FormControl fullWidth error={isDeleteMapEmpty} >
                            <InputLabel id="selectDeleteMapLabel">Choose a map to delete</InputLabel>                        
                            <Select 
                                labelId="selectDeleteMapLabel"
                                label="Choose a map to delete"
                                id="selectDeleteMap"
                                data-testid="selectDeleteMap"
                                value={currentDeleteMap}
                                onChange={handleDeleteMapChange}
                                onOpen={handleOpenDeleteSelect}
                            >
                                {mapNames.length === 0 ? (<Box sx={{ display: 'flex', justifyContent:'center' }}><CircularProgress /></Box>) : ""}
                                {generateMapDeleteSelectMenuItems()}
                            </Select>
                            <FormHelperText>{isDeleteMapEmpty ? "Please, select a map to delete." : ""}</FormHelperText>                        
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

        <Snackbar open={openAlert !== ""} onClose={handleCloseAlert} autoHideDuration={1000} >
            <Alert severity="success" 
                sx={{ width: '100%', backgroundColor: 'green', color: 'white'  }}  
                iconMapping={{ success: <CheckCircleOutlineIcon sx={{ color: 'white' }} />,}}
                >
                    {openAlert}
            </Alert>
        </Snackbar>

    </ThemeProvider>
  );
}

export default MapListView;