import Box from "@mui/material/Box";
import PrimarySearchAppBar from "./Searchbar/Searchbar";
import Mapa from "./Map/Map";
import { Button, Grid, Typography } from "@mui/material";
import React, {useEffect} from "react";
import { SessionType } from "../solidapi/solidapiAdapter";
import AddPoint from "./Options/AddPoint";
import Point from "../solidapi/Point";

import Navbar from "./Navbar/Navbar";
import PointsView from "./Navbar/PointsView";
import MapListView from "./Navbar/MapListView";

import SearchBar from "./Searchbar/Searchbar";

import { Marker } from "@react-google-maps/api";
import {addPoint,deletePoint} from "../solidapi/solidapi";

import savedMarker2 from '../images/markerGuerdado2.png';

import {Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';

export default function MainPage({ session }: SessionType): JSX.Element {

    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const [pointsListOpen, setPointsListOpen] = React.useState(false);
    const [addPointOpen, setAddPointOpen] = React.useState(false);
    const [mapListOpen, setMapListOpen] = React.useState(false);
    const [markerList, setMarkerlist] = React.useState<google.maps.Marker[]>([]);
    const [clickedPoint, setClickedPoint] = React.useState({lat:0, lng:0});
    const [markerToAdd, setMarkerToAdd] = React.useState<google.maps.Marker>();
    const [openDialog, setOpenDialog] = React.useState(false);



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
        markerToAdd?.setVisible(false);
    }

    const clickMap = (lat: number, lng: number) => {
        setAddPointOpen(true);
        setClickedPoint({lat: lat, lng: lng});

    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
        
        setPointsListOpen(!pointsListOpen)
      };

    const createPoint = (point: Point) => {
        //TODO: Aquí se crearía el punto
        addPoint(session, point);
        markerToAdd?.setIcon(savedMarker2);
        markerToAdd?.setVisible(true);
        markerToAdd?.setTitle(point.name)
        markerList.push(markerToAdd!)
        //TODO: (Idea) recargar el mapa
    }
    const [pointsViewCounter, setPointsViewCounter] = React.useState(0);

    
    const eliminatePoint=(index:number)=>{
       
        
         

        deletePoint(session,index);
        markerList[index].setMap(null);
        //console.log("Antes de eliminar "+markerList.length)
        markerList.splice(index,1);
       // console.log("Despues de eliminar "+markerList.length)
        setPointsListOpen(!pointsListOpen)
        setOpenDialog(true)
        
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
            <Box><PointsView open={pointsListOpen} onClose={closePointsList} markerList={markerList} deletePoint={eliminatePoint}></PointsView></Box>
            <Box><MapListView open={mapListOpen} onClose={closeMapList} ></MapListView></Box>
            <Box sx={{ gridArea: 'mainContainer'}}><Mapa session={session} markerList={setMarkerlist} clickMap={clickMap} markerToAdd={setMarkerToAdd}/></Box>




            <Dialog onClose={handleCloseDialog} aria-labelledby="customized-dialog-title" open={openDialog}>
            <DialogContent dividers>
            <Typography gutterBottom>Se ha eliminado el punto </Typography>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleCloseDialog} color="primary">
            OK
            </Button>
            </DialogActions>
            </Dialog>
        </Grid>
    );
}