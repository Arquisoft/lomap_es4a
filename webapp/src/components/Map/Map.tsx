import React, {useState} from "react";
import {GoogleMap, Marker, InfoWindow, useJsApiLoader} from "@react-google-maps/api";
import {useQuery} from "react-query";
// API Calls
import {fetchNearbyPlaces, fetchUserPlaces} from "../../api/api";
// Map Settings
import {containerStyle, center, options} from "./settings";
// SOLID API
import {retrievePoints, savePoint, SessionType} from "../../solidapi/solidapiAdapter";
import {forEach} from "@react-google-maps/api/dist/utils/foreach";
import Point from "../../solidapi/Point";

export type MarkerType = {
    id: string,
    location: google.maps.LatLngLiteral,
    name: string,
    phone_number: string;
    website: string
}

const Map: React.FC<SessionType> = (session: SessionType) => {
    const [click, setClick] = React.useState<google.maps.LatLngLiteral>({} as google.maps.LatLngLiteral);
    const [map, setMap] = useState(null);

    const {isLoaded} = useJsApiLoader(
        {
            id:'google-map-script',
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!
        })

    // Save map in ref if we want to access the map
    const mapRef = React.useRef<google.maps.Map | null>(null);

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

    //console.log(nearbyPositions);

    let userPoints: Point[]
    userPoints = [];
    const onLoad = (map: google.maps.Map): void => { // TODO: aquí se imprimen los puntos recuperados del pod
        mapRef.current = map;
        retrievePoints(session.session).then(points => {
            if (points != null) {
                userPoints = points;
                userPoints.forEach(point => {
                    console.log(point);
                    // NUEVO
                    let marker = new google.maps.Marker({
                        position: {lat: point.latitude, lng: point.longitude},
                        map: mapRef.current,
                        title: point.id
                    });
                    marker.setMap(mapRef.current);
                });
            }
        });
    }

    const onUnMount = (): void => {
        mapRef.current = null;
    };

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng != null) {
            setClick({lat: e.latLng.lat(), lng: e.latLng.lng()});
            let point = savePoint(session.session, e.latLng.lat(), e.latLng.lng()); // TODO: aquí se imprime el punto que resulta de un click del usuario en el mapa
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