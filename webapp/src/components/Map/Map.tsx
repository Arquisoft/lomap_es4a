import React, {useEffect, useState} from "react";
import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";
// API Calls
// Map Settings
import {containerStyle, center, options} from "./settings";
// Images
import savedMarker from '../../images/markerGuardado.png';
import savedMarker2 from '../../images/markerGuerdado2.png';
import {createMap, retrievePoints} from "../../solidapi/solidapi";

export type MarkerType = {
    id: string,
    location: google.maps.LatLngLiteral,
    name: string,
    phone_number: string;
    website: string
}

function Mapa({session, markers, markerList, clickMap, setMarkerToAdd, currentMapName}: any): JSX.Element {
    
    const [map, setMap] = useState(React.useRef<google.maps.Map | null>(null).current);

    const {isLoaded} = useJsApiLoader(
        {
            id:'google-map-script',
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!
        })

    // Save map in ref if we want to access the map
    //const mapRef = React.useRef<google.maps.Map | null>(null);

    let mList: { [id: string]: google.maps.Marker } = {};
   
    // Elimina todos los puntos del mapa y llama de nuevo al loadMap.
    // Se ejecuta al renderizar el componente, solamente si cambia el currentMapName.
    useEffect(() => {
        if (map !== null) {
            Object.keys(markers).forEach((id: string) => {
                markers[id].setMap(null);
            });
            onLoad(map);
        }
    }, [currentMapName]);
   
    const addMarker=(pointId: string, m:google.maps.Marker)=>{
        mList[pointId] = m;
    }

    const onLoad = (googleMap: google.maps.Map): void => { // TODO: aquí se imprimen los puntos recuperados del pod
        createMap(session, currentMapName).then(() => {

            retrievePoints(session, currentMapName).then(points => {
                if (points != null) {

                    points.forEach(point => {

                        // NUEVO
                        let marker = new google.maps.Marker({
                            position: {lat: point.latitude, lng: point.longitude},
                            map: googleMap,
                            title: point.name,
                            icon: {
                                url: savedMarker2
                            }
                        });
                        marker.setMap(googleMap);
                        marker.addListener('click', () =>{
                            openInfoView(marker);
                        })

                        addMarker(point.id, marker);
                    });
                    setMap(googleMap);
                    markerList(mList);
                }
            });
        });
    }

    const openInfoView = (marker: google.maps.Marker): void => {
        // TODO: Añadir funcion en el onClick de infoWindow
        let infowindow = new google.maps.InfoWindow({
            // Es HTML por lo tanto no funciona el deleteMark()-
            content: 'Not implemented yet',
            ariaLabel: "Uluru",
        });
        infowindow.open(map, marker);
    };

    const onUnMount = (): void => {
        setMap(null);
    };

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng != null) {
            //TODO: Que se no se guarde si no le das al botón de marcar
            let marker = new google.maps.Marker({
                // @ts-ignore
                position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
                map: map,
                title: 'Prueba save',
                icon: {
                    url: savedMarker,
                },
                visible:true,
            });
            marker.addListener('click', () =>{
                openInfoView(marker);
            })
            // Punto a añadir si guardamos
            setMarkerToAdd(marker);
            // Mostrar menú añadir punto
            clickMap(e.latLng.lat(), e.latLng.lng());
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