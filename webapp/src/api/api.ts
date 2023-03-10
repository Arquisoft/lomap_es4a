import {User} from '../shared/shareddtypes';
import {MarkerType} from "../components/Map/Map";

export async function addUser(user:User):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':user.name, 'email':user.email})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getUsers():Promise<User[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

// ------------------------------- METODOS PARA EL FUNCIONAMIENTO DEL MAPA -----------------------------------
const PLACE_RADIUS = 2500; // 2500 meters
const TYPE = 'cafe'; // Se puede cambiar para que filtre

export const fetchNearbyPlaces = async (lat:number, lng: number): Promise<MarkerType[]> =>{

    const response = await fetch(
        `https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=${lat}%2C${lng}&type=${TYPE}&radius=${PLACE_RADIUS}&language=en`,
        {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_TRUEWAY_API_KEY!,
                'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com'
            }
        }
    );

    if(!response.ok){
        throw new Error("Oh no! Something went wrong!")
    }

    const data = await response.json();
    return data.results;
};
// ----------------------------------------------------------------------------------------------------------