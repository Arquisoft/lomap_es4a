import {User} from '../shared/shareddtypes';
import Point from "../solidapi/Point";

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

export async function logout(): Promise<void> {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api';

    await fetch(apiEndPoint+'/logout', {
        credentials: 'include',
        mode: 'cors',
        method: 'GET'
    });

    window.location.href = apiEndPoint+'/';
}

export async function getNameOrDefault(): Promise<string> {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api';

    let response = await fetch(apiEndPoint+'/name', {
        credentials: 'include',
        mode: 'cors',
        method: 'GET'
    });

    let json = await response.json();
    let name = json.name === "" ? "User" : json.name;
    return name;
}

export async function getProfilePictureOrDefault(): Promise<string> {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api';

    let response = await fetch(apiEndPoint+'/profilePicture', {
        credentials: 'include',
        mode: 'cors',
        method: 'GET'
    });

    let json = await response.json();
    let pfp = json.pfp === "" || json.pfp === null ? "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" : json.name;
    return pfp;
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

export async function deleteMap(mapName: string): Promise<boolean> {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/maps/delete/'+mapName, {
        credentials: 'include',
        mode: 'cors',
        method: 'DELETE'
    });
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export async function retrieveMapNames(): Promise<string[]> {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/maps/names', {
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

export async function getPoint(mapName: string, id: string): Promise<Point | null> {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/point/'+mapName+"/"+id, {
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

export async function addPoint(mapName: string, point: Point): Promise<boolean> {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/points/add', {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'mapName': mapName, 'point': point})
    });
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export async function deletePoint(mapName: string, id: string): Promise<boolean> {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/points/delete/'+mapName+'/'+id, {
        credentials: 'include',
        mode: 'cors',
        method: 'DELETE'
    });
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export async function updatePoint(mapName: string, point: Point): Promise<boolean> {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/points/update/', {
        credentials: 'include',
        mode: 'cors',
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'mapName': mapName, 'point': point})
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

export async function retrieveFriends(): Promise<string[]> {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/friends', {
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