import React, {useEffect, useRef, useState} from "react";

interface IMap{
    mapType: google.maps.MapTypeId,
    mapTypeControl?: boolean,
}

// Para hacer el codigo más legible
// Creamos variables que nos ayuden con el código
type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const Map: React.FC<IMap> = ({mapType, mapTypeControl = false}) => {

    const ref = useRef<HTMLDivElement>(null);
    // Asegurarnos de que se inicializa el hook
    const [map, setMap] = useState<GoogleMap>();

    const startMap = (): void => {
        // Si el mapa no está listo
        if (!map){
            // Iniciamos el mapa
            defaultMapStart();
        }
    }
    useEffect(startMap, [map]);

    const defaultMapStart = ():void => {
        //Default address
        const defaultAddress = new google.maps.LatLng(65.166, 13.369);
        // Inicializar el mapa
        initMap(5, defaultAddress);
    };

    const initMap = (zoomLevel: number, address: GoogleLatLng): void =>{
        if (ref.current){
            setMap(
                // Los opts es toda la configuración opcional
                // que quieras añadire al mapa
                new google.maps.Map(ref.current, {
                   zoom: zoomLevel,
                   center: address,
                   mapTypeControl:mapTypeControl,
                   streetViewControl: false,
                   zoomControl: true,
                   mapTypeId: mapType
                })
            );
        }
    };

    return(
        <div className= "map-container">
            <div ref = {ref} className= "map-container_map"></div>
        </div>
    );
}

export default Map;