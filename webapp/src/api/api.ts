import {User} from '../shared/shareddtypes';
import {MarkerType} from "../components/Map/Map";
import Point from "../solidapi/Point";
import {Session} from "@inrupt/solid-client-authn-browser";

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
// ----------------------------------------------------------------------------------------------------------

export async function login(podProvider: string): Promise<void> {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api';

    window.location.href = apiEndPoint+'/login';
}

export async function createMap(mapName: string): Promise<boolean> {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/maps/add', {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'mapName': mapName})
    });
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export async function retrievePoints(mapName: string): Promise<Point[]> {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/points/'+mapName, {
        credentials: 'include',
        mode: 'cors',
        method: 'GET'
    });
    if (response.status === 200) {
        return response.json();
    } else {
        return response.json();
    }
}

// export async function isLoggedIn(): Promise<boolean> {
//     const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
//     let response = await fetch(apiEndPoint+'/isLoggedIn');
//     let result = await response.json();
//
//     return result.isLoggedIn;
// }