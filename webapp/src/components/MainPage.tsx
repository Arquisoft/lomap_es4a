import Box from "@mui/material/Box";
import PrimarySearchAppBar from "./Searchbar/Searchbar";
import Map from "./Map/Map";
import { Grid } from "@mui/material";
import React, {useEffect} from "react";
import { SessionType } from "../solidapi/solidapiAdapter";
import AddPointOption from "./Options/AddPointOption";
import Point from "../solidapi/Point";

// Custom events
import { subscribe, unsubscribe } from "../event";
import SearchBar from "./Searchbar/Searchbar";
import { Marker } from "@react-google-maps/api";

export default function MainPage({ session }: SessionType): JSX.Element {

    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const [pointsListOpen, setPointsListOpen] = React.useState(false);
    const [markerList, setMarkerlist] = React.useState<google.maps.Marker[]>([]);

    /*
    const toggleNavbar = (open: boolean) => {
        setNavbarOpen(open);
    }*/

    const toggleNavbar = () => {
        setNavbarOpen(!navbarOpen);
    }

    const openPointsList = () => {
        setPointsListOpen(true);
    }

    const closePointsList = () => {
        setPointsListOpen(false);
    }
    

    
    /* Solo para mostrar los puntos (a ser llamado al cerrar la lista de puntos y al actualizar la visibilidad de un punto)
    const showPoints = () => {
        // Mostrar puntos en el mapa
    };
     */

    return (
        <Grid
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(9, 1fr)',
                gridTemplateRows: 'auto',
                gridTemplateAreas: `"search search search search search search search search search"
                "search search search search search search search search search"
                "mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer "
                "mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer "
                "mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer "
                "mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer "`,
            }}>
            <Box sx={{ gridArea: 'search'}}><SearchBar toggleNavbar={toggleNavbar} /></Box>
            <Box sx={{ gridArea: 'mainContainer'}}><Map session={session} markerList={setMarkerlist}/></Box>
        </Grid>
    );
}