import React, {useEffect, useState} from "react";
import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";
// API Calls
// Map Settings
import {containerStyle, center, options} from "./settings";
// Images
import savedMarker from '../../images/markerGuardado.png';
import savedMarker2 from '../../images/markerGuerdado2.png';
import {createMap, retrievePoints} from "../../solidapi/solidapi";

function Mapa({session, markers, markerList, clickMap, clickMarker, setMarkerToAdd, currentMapName}: any): JSX.Element {
    
    const [map, setMap] = useState(React.useRef<google.maps.Map | null>(null).current);

    const {isLoaded} = useJsApiLoader(
        {
            id:'google-map-script',
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!
        })

    let mList: { [id: string]: google.maps.Marker } = {};
   
    // Elimina todos los puntos del mapa y llama de nuevo al loadMap.
    // Se ejecuta al renderizar el componente, solamente si cambia el currentMapName.
    useEffect(() => {
        if (map !== null) {Object.keys(markers).forEach((id: string) => {markers[id].setMap(null);});onLoad(map);}
        // eslint-disable-next-line
        }, [currentMapName]);
   
    const addMarker=(pointId: string, m:google.maps.Marker)=>{ mList[pointId] = m; }

    const onLoad = (googleMap: google.maps.Map): void => {createMap(session, currentMapName).then(() => {retrievePoints(session, currentMapName).then(points => {if (points != null) {points.forEach(point => {let marker = new google.maps.Marker({position: {lat: point.latitude, lng: point.longitude}, map: googleMap, title: point.name, icon: {url: savedMarker2}});marker.setMap(googleMap);marker.setMap(googleMap);marker.addListener('click', (marker: any) =>{clickMarker(marker.latLng.lat(), marker.latLng.lng());});addMarker(point.id, marker);});setMap(googleMap);markerList(mList);}}).catch(error => console.log(error));}).catch(error => console.log(error));}

    const onUnMount = (): void => {setMap(null);};
    // @ts-ignore
    const onMapClick = (e: google.maps.MapMouseEvent) => {if (e.latLng != null) {let marker = new google.maps.Marker({position: {lat: e.latLng.lat(), lng: e.latLng.lng()}, map: map, title: 'Prueba save', icon: {url: savedMarker,}, visible:true,});marker.addListener('click', (marker: any) =>{clickMarker(marker.latLng.lat(), marker.latLng.lng()); }); setMarkerToAdd(marker); clickMap(e.latLng.lat(), e.latLng.lng());}};

    if(!isLoaded) return <div>Map loading...</div>;return(<div><GoogleMap data-testid={"mapToTest"} id="map" mapContainerStyle={containerStyle} options={options as google.maps.MapOptions} center={center} zoom={10} onLoad={onLoad} onUnmount={onUnMount} onClick={onMapClick}></GoogleMap></div>);
}
export default Mapa;