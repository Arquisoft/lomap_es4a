import Box from "@mui/material/Box";
import PrimarySearchAppBar from "./Searchbar/Searchbar";
import Map from "./Map/Map";
import { Grid } from "@mui/material";
import React, {useEffect} from "react";
import { SessionType } from "../solidapi/solidapiAdapter";
import Navbar from "./Navbar/Navbar";
import AddPointOption from "./Options/AddPointOption";
import Point from "../solidapi/Point";

// Custom events
import { subscribe, unsubscribe } from "../event";
import PointsView from "./Navbar/PointsView";
import SearchBar from "./Searchbar/Searchbar";

export default function MainPage({ session }: SessionType): JSX.Element {
    
    const [pointsState, setPointsState] = React.useState(false);
    
    const clickPoints=(visible:boolean)=>{
        console.log(visible)
        setPointsState(visible);
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
            <Box><Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={openPointsList} /></Box>
            <Box><AddPointOption/></Box>
            <Box><PointsView open={pointsListOpen} onClose={closePointsList} ></PointsView></Box>
            <Box sx={{ gridArea: 'mainContainer'}}><Map session={session}/></Box>
        </Grid>
    );
}