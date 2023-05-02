import Mapa from "./Map/Map";
import React from "react";
import { SessionType } from "../shared/shareddtypes";
import AddPoint from "./Options/AddPoint";
import Point from "../solidapi/Point";

import Navbar from "./Navbar/Navbar";
import PointsView from "./Navbar/PointsView";
import MapListView from "./Navbar/MapListView";
import SearchBar from "./Searchbar/Searchbar";

import {addPoint, getPointsCategory,getPointFromCoords, deletePoint, getPoint, updatePoint,saveImage, saveReview} from "../solidapi/solidapi";

import savedMarker2 from '../images/markerGuerdado2.png';
import EditPoint from "./Options/EditPoint";

import {Button, Grid, Typography, Box, Dialog, DialogActions, DialogContent} from '@mui/material';
import MyFriendsListView from "./Navbar/MyFriendsListView";
import DetailsPoint from "./Options/DetailsPoint";

export default function MainPage({ session }: SessionType): JSX.Element {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const [pointsListOpen, setPointsListOpen] = React.useState(false);
    const [addPointOpen, setAddPointOpen] = React.useState(false);
    const [editPointOpen, setEditPointOpen] = React.useState(false);
    const [detailsPointOpen, setDetailsPointOpen] = React.useState(false);
    const [mapListOpen, setMapListOpen] = React.useState(false);
    const [myFriendsListOpen, setMyFriendsListOpen] = React.useState(false);
    const [markerList, setMarkerlist] = React.useState<{[id: string]: google.maps.Marker}>({});
    const [clickedPoint, setClickedPoint] = React.useState({lat:0, lng:0});
    const [currentMapName, setCurrentMapName] = React.useState("Map"); // nombre del mapa que está cargado
    const [point, setPoint] = React.useState(new Point("", "", "", 0, 0, ""));
    const [markerToAdd, setMarkerToAdd] = React.useState<google.maps.Marker>();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDialog2, setOpenDialog2] = React.useState(false);

    const toggleNavbar = () => {
        setNavbarOpen(!navbarOpen);
    }

    const openPointsList = () => {
        setNavbarOpen(false);
        setPointsListOpen(true);
    }

    const closePointsList = () => {
        setPointsListOpen(false);
        setNavbarOpen(true);
    }

    const openMapList = () => {
        setMapListOpen(true);
    }

    const closeMapList = () => {
        setMapListOpen(false);
    }

    const openMyFriendsList = () => {
        setMyFriendsListOpen(true);
        setNavbarOpen(false);
    }

    const closeMyFriendsList = () => {
        setMyFriendsListOpen(false);
        setNavbarOpen(true);
    }

    const closeAddPoints = () => {
        setAddPointOpen(false);
        markerToAdd?.setVisible(false);
    }

    const closeEditPoint = () => {
        setEditPointOpen(false);
        setPointsListOpen(true);
        markerToAdd?.setVisible(false);
    }

    const openEditPoint = (id: string) => {
        getPoint(session, currentMapName, id).then(point => {
            if (point !== null) {
                setPoint(point);
            }
            setPointsListOpen(false);
            setEditPointOpen(true);
        }).catch();
    }

    const clickMarker = (lat: number, lng: number) => {
        

        
        getPointFromCoords(session, currentMapName, lat, lng).then(point => {
            
            if (point !== null) {
                setPoint(point);
                //getImages(point)
               
                setDetailsPointOpen(true);
            }
           
            
        }).catch();
        
    }

    const closeDetailsPoint = () => {
        setDetailsPointOpen(false);
    }

    const clickMap = (lat: number, lng: number) => {
        setClickedPoint({lat: lat, lng: lng});
        setAddPointOpen(true);

    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setPointsListOpen(!pointsListOpen)
      };

      const handleCloseDialog2 = () => {
        setOpenDialog2(false);
        setDetailsPointOpen(!pointsListOpen)
      };

    const createPoint = (point: Point) => {
        addPoint(session, currentMapName, point).then(() => {
            markerToAdd?.setIcon(savedMarker2);
            markerToAdd?.setVisible(true);
            markerToAdd?.setTitle(point.name);
            markerList[point.id] = (markerToAdd!);
        }).catch();
    }

    const editPoint = (point: Point) => {
        updatePoint(session, currentMapName, point).then(() => {
            closeEditPoint();

            markerList[point.id].setTitle(point.name);
        }).catch(error => console.log(error));
    }
    
    const eliminatePoint = (id: string)=>{
        deletePoint(session, currentMapName, id).then(() => {
            markerList[id].setMap(null);

            delete markerList[id];

            setPointsListOpen(!pointsListOpen)
            setOpenDialog(true)
        }).catch(error => console.log(error));
    }

    const getPuntosCategoria = async (cat: string[]) => {
        const result = await getPointsCategory(session, currentMapName,  cat);
        //console.log(result+" "+id);
        return result;
    }
    const addImage=(image: File,point:Point)=>{
        saveImage(session,currentMapName,image,point).then(() => {
            setDetailsPointOpen(!detailsPointOpen)
            setOpenDialog2(true)
        }).catch(error => console.log(error));
    }
    const addReview=(comment:string,ratingValue:number)=>{

        saveReview(session, currentMapName, comment, ratingValue,point).catch(error => console.log(error));
       
    }
    const getNombreMapa= ()=>{
        return currentMapName
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
            <Box sx={{ gridArea: 'search'}}><SearchBar toggleNavbar={toggleNavbar} markers={markerList} nombreMapa={getNombreMapa}/></Box>
            <Box><Navbar open={navbarOpen} toggleNavbar={toggleNavbar} openPointsList={openPointsList} openMapList={openMapList} openMyFriendsList={openMyFriendsList} /></Box>
            <Box><AddPoint open={addPointOpen} onClose={closeAddPoints} clickedPoint={clickedPoint} createPoint={createPoint}/></Box>
            <Box><EditPoint open={editPointOpen} onClose={closeEditPoint} point={point} editPoint={editPoint}/></Box>
            <Box><PointsView open={pointsListOpen} onClose={closePointsList} markerList={markerList} openEditPoint={openEditPoint} deletePoint={eliminatePoint}  getPointsCategory={getPuntosCategoria}></PointsView></Box>
            <Box><DetailsPoint open={detailsPointOpen} onClose={closeDetailsPoint} point={point}  markerList={markerList} addImage={addImage} addReview={addReview}/></Box>
            <Box><MyFriendsListView open={myFriendsListOpen} onClose={closeMyFriendsList} ></MyFriendsListView></Box>
            <Box><MapListView open={mapListOpen} onClose={closeMapList} currentMapName={currentMapName} setCurrentMapName={setCurrentMapName} session={session} ></MapListView></Box>
            <Box sx={{ gridArea: 'mainContainer'}}><Mapa session={session} markers={markerList} markerList={setMarkerlist} clickMap={clickMap} clickMarker={clickMarker} setMarkerToAdd={setMarkerToAdd} currentMapName={currentMapName} /></Box>


            <Dialog onClose={handleCloseDialog} aria-labelledby="customized-dialog-title" open={openDialog}>
                <DialogContent dividers>
                <Typography gutterBottom>The Place has been deleted</Typography>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleCloseDialog} color="primary">
                OK
                </Button>
                </DialogActions>
            </Dialog>


            <Dialog onClose={handleCloseDialog2} aria-labelledby="customized-dialog-title" open={openDialog2}>
                <DialogContent dividers>
                <Typography gutterBottom>Image uploaded!</Typography>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleCloseDialog2} color="primary">
                OK
                </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}