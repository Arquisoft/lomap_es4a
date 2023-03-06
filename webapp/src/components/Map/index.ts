/*
import { Loader } from "@googlemaps/js-api-loader";

let map: google.maps.Map;

const additionalOptions = {};
// [START maps_programmatic_load_promise]
const loader = new Loader({
    apiKey: "AIzaSyCOlcnJjf8A-kNSEbajhfWQgc0J0vOtXVI",
    version: "weekly",
    ...additionalOptions,
});

loader.load().then(() => {
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
});
*/
// [END maps_programmatic_load_promise]
// [END maps_programmatic_load]
export {default} from './Map';
