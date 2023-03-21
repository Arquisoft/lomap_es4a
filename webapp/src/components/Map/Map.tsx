import React, {useState} from "react";
import {GoogleMap, Marker, InfoWindow, useJsApiLoader} from "@react-google-maps/api";
import {useQuery} from "react-query";
// API Calls
// Map Settings
import {containerStyle, center, options} from "./settings";
// SOLID API
import {retrievePoints, savePoint, SessionType} from "../../solidapi/solidapiAdapter";
import {forEach} from "@react-google-maps/api/dist/utils/foreach";
import Point from "../../solidapi/Point";
// Images
import savedMarker from '../../images/markerGuardado.png';
import savedMarker2 from '../../images/markerGuerdado2.png';
import {Button} from "@mui/material";

export type MarkerType = {
    id: string,
    location: google.maps.LatLngLiteral,
    name: string,
    phone_number: string;
    website: string
}

const Map: React.FC<SessionType> = (session: SessionType) => {
    // Click en el mapa (Crea un marcador)
    const [click, setClick] = React.useState<google.maps.LatLngLiteral>({} as google.maps.LatLngLiteral);
    const [map, setMap] = useState(null);

    // Devuelve el Marker pulsado
    const [selectedMark, getSelectedMark] = React.useState<google.maps.Marker> ({} as google.maps.Marker);

    // Create the Infowindow of the Marker
    const [infoWindow, setInfoWindow] = React.useState<google.maps.InfoWindowOptions>({} as google.maps.InfoWindowOptions);

    const {isLoaded} = useJsApiLoader(
        {
            id:'google-map-script',
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!
        })

    // Save map in ref if we want to access the map
    const mapRef = React.useRef<google.maps.Map | null>(null);

    const onLoad = (map: google.maps.Map): void => { // TODO: aquí se imprimen los puntos recuperados del pod
        mapRef.current = map;
        retrievePoints(session.session).then(points => {
            if (points != null) {
                points.forEach(point => {
                    console.log(point);
                    // NUEVO
                    let marker = new google.maps.Marker({
                        position: {lat: point.latitude, lng: point.longitude},
                        map: mapRef.current,
                        title: point.id,
                        icon: {
                            url: savedMarker2,
                            origin: new window.google.maps.Point(0,0),
                            anchor: new window.google.maps.Point(15,15),
                            scaledSize: new window.google.maps.Size(40,40)
                        },
                        //draggable: true

                    });
                    marker.setMap(mapRef.current);

                    marker.addListener('click', () => {
                        // Te devuelve el Marker pulsado
                        map.setCenter(marker.getPosition()!);
                        getSelectedMark(marker);
                        openInfoView(marker);
                    })
                });
            }
        });
    }

    const openInfoView = (marker: google.maps.Marker): void => {
        new google.maps.InfoWindow({
            content: "<Button autoFocus onClick={deleteMark()} color=\"primary\">\n" +
                "                            Borrar Punto\n" +
                "                        </Button>",
            ariaLabel: "Uluru",
        }).open(
            {
                anchor: marker,
                map
            });
    };

    const deleteMark = (): void => {
        // TODO: Eliminar el marker del POD
        selectedMark.setMap(null);
    };

    const onUnMount = (): void => {
        mapRef.current = null;
    };

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng != null) {
            setClick({lat: e.latLng.lat(), lng: e.latLng.lng()});

            //TODO: Que se no se guarde si no le das al botón de marcar
            savePoint(session.session, e.latLng.lat(), e.latLng.lng()); // TODO: aquí se imprime el punto que resulta de un click del usuario en el mapa
            /*
            // NUEVO
            let marker = new google.maps.Marker({

                position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
                map: mapRef.current,
                title: point?.id
            });
            marker.setMap(mapRef.current);
             */
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
                <Marker position={click}/>

            </GoogleMap>
        </div>
    );
};

export default Map;