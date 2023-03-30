import React, {useState} from "react";
import {GoogleMap, Marker, InfoWindow, useJsApiLoader} from "@react-google-maps/api";
import {useQuery} from "react-query";
// API Calls
import {fetchNearbyPlaces, fetchUserPlaces} from "../../api/api";
// Map Settings
import {containerStyle, center, options} from "./settings";
// SOLID API
import {retrievePoints,  SessionType} from "../../solidapi/solidapiAdapter";
import {forEach} from "@react-google-maps/api/dist/utils/foreach";
import Point from "../../solidapi/Point";

export type MarkerType = {
    id: string,
    location: google.maps.LatLngLiteral,
    name: string,
    phone_number: string;
    website: string
}

function Map({session, markerList, clickMap}: any) {
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);

    const [map, setMap] = useState(React.useRef<google.maps.Map | null>(null).current);

    const {isLoaded} = useJsApiLoader(
        {
            id:'google-map-script',
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!
        })

    // Save map in ref if we want to access the map
    //const mapRef = React.useRef<google.maps.Map | null>(null);

    const [clickedPos, setClickedPos] = React.useState<google.maps.LatLngLiteral>({} as google.maps.LatLngLiteral)

    const {
        data: nearbyPositions,
        isLoading,
        isError
    } = useQuery([clickedPos.lat, clickedPos.lng], () => fetchNearbyPlaces(clickedPos.lat, clickedPos.lng),
        {
            enabled: !!clickedPos.lat,
            refetchOnWindowFocus: false,
        });

   
    var mList:google.maps.Marker[]
    mList=[];
   
    const addMarker=(m:google.maps.Marker)=>{
        mList.push(m)
    }
    let userPoints: Point[]
    userPoints = [];
    const onLoad = (googleMap: google.maps.Map): void => { // TODO: aquí se imprimen los puntos recuperados del pod
        retrievePoints(session).then(points => {
            if (points != null) {
                userPoints = points;

                userPoints.forEach(point => {
                    
                    // NUEVO
                    let marker = new google.maps.Marker({
                        position: {lat: point.latitude, lng: point.longitude},
                        map: googleMap,
                        title: point.id
                        
                    });
                    marker.setMap(googleMap);
                    addMarker(marker);
                });
                setMap(googleMap);
                markerList(mList)
            }
        });
    }

    const onUnMount = (): void => {
        setMap(null);
    };

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng != null) {
            setClicks([...clicks, e.latLng!]);
            //setClickedPos({lat: e.latLng.lat(), lng: e.latLng.lng()});
            //let point = savePoint(session, e.latLng.lat(), e.latLng.lng()); // TODO: aquí se imprime el punto que resulta de un click del usuario en el mapa

            // NUEVO
            /*
            let marker = new google.maps.Marker({
                position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
                map: map,
                title: point?.id
            });
            marker.setMap(map);
            */
            // Mostrar menú añadir punto
            clickMap(null);
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