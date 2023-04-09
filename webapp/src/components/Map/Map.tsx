import React, {useState} from "react";
import {GoogleMap, Marker, InfoWindow, useJsApiLoader} from "@react-google-maps/api";
import {useQuery} from "react-query";
// API Calls
// Map Settings
import {containerStyle, center, options} from "./settings";
// SOLID API
import {forEach} from "@react-google-maps/api/dist/utils/foreach";
import Point from "../../solidapi/Point";
// Images
import savedMarker from '../../images/markerGuardado.png';
import savedMarker2 from '../../images/markerGuerdado2.png';
import {Button} from "@mui/material";
import {addPoint, createMap, retrievePoints} from "../../solidapi/solidapi";

export type MarkerType = {
    id: string,
    location: google.maps.LatLngLiteral,
    name: string,
    phone_number: string;
    website: string
}

function Mapa({session, markerList, clickMap, markerToAdd}: any) {
    const [click, setClick] = React.useState<google.maps.LatLng>();

    const [map, setMap] = useState(React.useRef<google.maps.Map | null>(null).current);

    const {isLoaded} = useJsApiLoader(
        {
            id:'google-map-script',
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!
        })

    // Save map in ref if we want to access the map
    //const mapRef = React.useRef<google.maps.Map | null>(null);
   
    var mList:google.maps.Marker[]
    mList=[];
   
    const addMarker=(m:google.maps.Marker)=>{
        mList.push(m)
    }

    const onLoad = (googleMap: google.maps.Map): void => { // TODO: aquí se imprimen los puntos recuperados del pod
        createMap(session);

        retrievePoints(session).then(points => {
            if (points != null) {

                points.forEach(point => {

                    // NUEVO
                    let marker = new google.maps.Marker({
                        position: {lat: point.latitude, lng: point.longitude},
                        map: googleMap,
                        title: point.id,
                        icon: {
                            url: savedMarker2
                        }
                    });
                    marker.setMap(googleMap);
                    marker.addListener('click', () =>{
                        openInfoView(marker);
                    })

                    addMarker(marker);
                });
                setMap(googleMap);
                markerList(mList)
            }
        });
    };

    const openInfoView = (marker: google.maps.Marker): void => {
        // TODO: Añadir funcion en el onClick de infoWindow
        let infowindow = new google.maps.InfoWindow({
            // Es HTML por lo tanto no funciona el deleteMark()-
            content: '<button onclick="">Borrar Punto</button>',
            ariaLabel: "Uluru",
        });
        infowindow.open(map, marker);
    };

    const onUnMount = (): void => {
        setMap(null);
    };

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng != null) {
            setClick(e.latLng!);
            //TODO: Que se no se guarde si no le das al botón de marcar
            let marker = new google.maps.Marker({
                // @ts-ignore
                position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
                map: map,
                title: 'Prueba save',
                icon: {
                    url: savedMarker,
                },
                visible:false,
            });

            marker.addListener('click', () =>{
                openInfoView(marker);
            })
            // Punto a añadir si guardamos
            markerToAdd(marker);
            // Mostrar menú añadir punto
            clickMap(e.latLng.lat(), e.latLng.lng(), marker);
        }

    };

    if(!isLoaded) return <div>Map loading...</div>;

    return(
        <div>
            <GoogleMap
                id="map"
                mapContainerStyle={containerStyle}
                options={options as google.maps.MapOptions}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnMount}
                onClick={onMapClick}
            >
            </GoogleMap>
        </div>
    );
}
export default Mapa;