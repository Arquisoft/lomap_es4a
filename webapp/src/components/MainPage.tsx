import Box from "@mui/material/Box";
import PrimarySearchAppBar from "./Searchbar/Searchbar";
import Mapa from "./Map/Map";
import { Grid } from "@mui/material";
import React, {useEffect} from "react";
import { SessionType } from "../solidapi/solidapiAdapter";
import AddPoint from "./Options/AddPoint";
import Point from "../solidapi/Point";

import Navbar from "./Navbar/Navbar";
import PointsView from "./Navbar/PointsView";
import MapListView from "./Navbar/MapListView";

import SearchBar from "./Searchbar/Searchbar";

import { Marker } from "@react-google-maps/api";
import {addPoint} from "../solidapi/solidapi";


export default function MainPage({ session }: SessionType): JSX.Element {

    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const [pointsListOpen, setPointsListOpen] = React.useState(false);
    const [addPointOpen, setAddPointOpen] = React.useState(false);
    const [mapListOpen, setMapListOpen] = React.useState(false);
    const [markerList, setMarkerlist] = React.useState<google.maps.Marker[]>([]);
    const [clickedPoint, setClickedPoint] = React.useState({lat:0, lng:0});
    const [currentMapName, setCurrentMapName] = React.useState("Map"); // nombre del mapa que está cargado

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

    const openMapList = () => {
        setMapListOpen(true);
    }

    const closeMapList = () => {
        setMapListOpen(false);
    }

    const openAddPoints = () => {
        setAddPointOpen(true);
    }

    const closeAddPoints = () => {
        setAddPointOpen(false);
    }

    const clickMap = (lat: number, lng: number) => {
        setAddPointOpen(true);
        setClickedPoint({lat: lat, lng: lng})
    }

    const createPoint = (point: Point) => {
        //TODO: Aquí se crearía el punto
        addPoint(session, currentMapName, point);
        //TODO: (Idea) recargar el mapa
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
            <Box><Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={openPointsList} openMapList={openMapList} /></Box>
            <Box><AddPoint open={addPointOpen} closeAddPoints={closeAddPoints} clickedPoint={clickedPoint} createPoint={createPoint}/></Box>
            <Box><PointsView open={pointsListOpen} onClose={closePointsList} markerList={markerList}></PointsView></Box>
            <Box><MapListView open={mapListOpen} onClose={closeMapList} currentMapName={currentMapName} setCurrentMapName={setCurrentMapName} session={session} ></MapListView></Box>
            <Box sx={{ gridArea: 'mainContainer'}}><Mapa session={session} markers={markerList} markerList={setMarkerlist} clickMap={clickMap} currentMapName={currentMapName} /></Box>
        </Grid>
    );
}