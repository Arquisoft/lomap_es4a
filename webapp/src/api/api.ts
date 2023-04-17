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

export async function login(podProvider: string): Promise<boolean> {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    let response = await fetch(apiEndPoint+'/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'podProvider': podProvider})
    });
    if (response.status===200)
        return true;
    else
        return false;
}

export async function isLoggedIn(): Promise<boolean> {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    let response = await fetch(apiEndPoint+'/isLoggedIn');
    let result = await response.json();
    return result.isLoggedIn;
}