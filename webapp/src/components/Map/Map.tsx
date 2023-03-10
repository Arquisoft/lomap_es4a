import {GoogleMap, Marker, InfoWindow, useJsApiLoader} from "@react-google-maps/api";
import React from "react";
import {containerStyle, center, options} from "./settings";

const Map: React.FC = () => {
    const {isLoaded} = useJsApiLoader(
        {
        id:'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!
    })

    // Save map in ref if we want to access the map
    const mapRef = React.useRef<google.maps.Map | null>(null);

    const onLoad = (map: google.maps.Map): void => {
        mapRef.current = map;
    }

    const onUnMount = (): void => {
        mapRef.current = null;
    };

    if(!isLoaded) return <div>Map loading...</div>;
    return(
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                options={options as google.maps.MapOptions}
                center={center}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnMount}
            />
        </div>
    );
};
export default Map;