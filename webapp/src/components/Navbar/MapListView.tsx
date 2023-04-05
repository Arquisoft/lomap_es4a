import {useState} from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { SelectChangeEvent, InputLabel, MenuItem, Select, FormControl, createTheme, ThemeProvider, IconButton } from "@mui/material";


interface MapListViewProps {
    open: boolean;
    onClose: () => void;
}

function MapListView(props: MapListViewProps): JSX.Element {

    const [currentMap, setCurrentMap] = useState("");

    const handleMapChange = (event: SelectChangeEvent) => {
        setCurrentMap(event.target.value);
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
                        sx={{ mt: 3, mb: 2 }}
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