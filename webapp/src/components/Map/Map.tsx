import React, {useState} from "react";
import {GoogleMap, Marker, InfoWindow, useJsApiLoader} from "@react-google-maps/api";
import {useQuery} from "react-query";
// API Calls
// Map Settings
import {containerStyle, center, options} from "./settings";
// SOLID API
import {retrievePoints,  SessionType} from "../../solidapi/solidapiAdapter";
import {forEach} from "@react-google-maps/api/dist/utils/foreach";
import Point from "../../solidapi/Point";
// Images
import savedMarker from '../../images/markerGuardado.png';
import savedMarker2 from '../../images/markerGuerdado2.png';
import {Button} from "@mui/material";

// Custom events
import {publish, subscribe} from "../../event";
import point from "../../solidapi/Point";

export type MarkerType = {
    id: string,
    location: google.maps.LatLngLiteral,
    name: string,
    phone_number: string;
    website: string
}

function Map(props: any) {
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);

    const [map, setMap] = useState(React.useRef<google.maps.Map | null>(null).current);

    const session = props.session;

    const showAddOption = () => {
        publish('showAddOption')
    }

    const {isLoaded} = useJsApiLoader(
        {
            id:'google-map-script',
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!
        })

    // Save map in ref if we want to access the map
    //const mapRef = React.useRef<google.maps.Map | null>(null);

    const [clickedPos, setClickedPos] = React.useState<google.maps.LatLngLiteral>({} as google.maps.LatLngLiteral)

    //console.log(nearbyPositions);

    let userPoints: Point[]
    userPoints = [];
    const onLoad = (googleMap: google.maps.Map): void => { // TODO: aquí se imprimen los puntos recuperados del pod
        retrievePoints(session).then(points => {
            if (points != null) {
                points.forEach(point => {
                    console.log(point);
                    // NUEVO
                    let marker = new google.maps.Marker({
                        position: {lat: point.latitude, lng: point.longitude},
                        map: googleMap,
                        title: point.id,
                        icon: {
                            url: savedMarker2,
                            origin: new window.google.maps.Point(0,0),
                            anchor: new window.google.maps.Point(15,15),
                            scaledSize: new window.google.maps.Size(40,40)
                        }
                    });
                    marker.setMap(googleMap);
                    marker.addListener('click', () =>{

                        //deleteMark(marker);
                        openInfoView(marker);
                    })
                });
                setMap(googleMap);
            }
        });
    };

    function deleteMark(marker: google.maps.Marker): void {
        // TODO: Eliminar el marker del POD
        console.log("Marker: " + marker.getTitle() + " borrado");
        marker.setMap(null);
    };

    const openInfoView = (marker: google.maps.Marker): void => {
        // TODO: Añadir funcion en el onClick de infoWindow
        let infowindow = new google.maps.InfoWindow({
            content: '<button onclick="deleteMark()">Borrar Punto</button>',
            ariaLabel: "Uluru",
        });
        //console.log(selectedMark);
        infowindow.open(map, marker);
    };

    const onUnMount = (): void => {
        setMap(null);
    };

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng != null) {
            setClicks([...clicks, e.latLng!]);
            //setClickedPos({lat: e.latLng.lat(), lng: e.latLng.lng()});
            //let point = savePoint(session, e.latLng.lat(), e.latLng.lng()); // TODO: aquí se imprime el punto que resulta de un click del usuario en el mapa

            //TODO: Que se no se guarde si no le das al botón de marcar
            //savePoint(session.session, e.latLng.lat(), e.latLng.lng()); //
            // @ts-ignore

            // NUEVO
            let marker = new google.maps.Marker({

                position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
                map: map,
                title: 'Prueba 1',
                visible:false,
            });

            // Mostrar menú añadir punto
            showAddOption();

            subscribe('save', () => marker.setVisible(true));
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
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnMount}
                onClick={onMapClick}
            >

            </GoogleMap>
        </div>
    );
};

export default Map;