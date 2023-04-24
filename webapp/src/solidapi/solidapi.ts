
import {
    getFile,
    deleteFile,
    overwriteFile,
    getContainedResourceUrlAll,
    getSolidDataset,
    saveSolidDatasetAt,
    setThing,
    addIri,
    getThing,
    addUrl,
    Thing
} from '@inrupt/solid-client';
import { Session } from '@inrupt/solid-client-authn-browser';
import Point from "./Point";
import { fetchDocument } from "tripledoc";
import { foaf } from "rdf-namespaces";
import {FOAF} from "@inrupt/vocab-common-rdf";

import {v4 as uuidv4} from 'uuid';
import { MyImage } from '../components/Options/Carousel';
import Review from './Review';
import { reviewRating } from 'rdf-namespaces/dist/schema';

function checkSession(session: Session): boolean {
    if (session === null || typeof session === "undefined") {
        return false;
    }
    if (session.info === null || typeof session.info === "undefined") {
        return false;
    }
    if (session.info.webId === null || typeof session.info.webId === "undefined") {
        return false;
    }
    return true;
}

export function checkMapNameIsValid(mapName:string): boolean {
    const regex = /\W+/; // \W es equivalente a [^A-Za-z0-9_]+
    return typeof mapName !== "undefined" && mapName !== null
        && mapName.trim() !== ""
        && mapName.match(regex) === null;
}

function mapUrlFor(session: Session, mapName:string): string {
    if (typeof session.info.webId !== "undefined" && checkMapNameIsValid(mapName)) {
        return session.info.webId.split("/").slice(0, 3).join("/").concat("/public", "/lomap", "/", mapName);
    }
    return "";
}

async function checkStructure(session: Session, mapName: string): Promise<boolean> {
    let publicUrl = "";
    let lomapUrl = "";
    let mapUrl = "";
    if (typeof session.info.webId !== "undefined" && checkMapNameIsValid(mapName)) {
        publicUrl = session.info.webId.split("/").slice(0, 3).join("/").concat("/public/");
        lomapUrl = publicUrl.concat("lomap/");
        mapUrl = lomapUrl.concat(mapName);
    } else {
        return false;
    }
    let dataset = await getSolidDataset(publicUrl, { fetch: session.fetch });
    let urls = getContainedResourceUrlAll(dataset);
    if (!urls.includes(lomapUrl)) {
        return false;
    } else {
        dataset = await getSolidDataset(lomapUrl, { fetch: session.fetch });
        urls = getContainedResourceUrlAll(dataset);
        if (!urls.includes(mapUrl)) {
            return false;
        } else {
            return true;
        }
    }
}

export async function createMap(session: Session, mapName:string): Promise<boolean> {
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
        return false;
    } // Check if the webId is undefined

    if (!checkMapNameIsValid(mapName)) {
        return false;
    } // Check if map name is valid

    if (await checkStructure(session, mapName)) {
        return false;
    } // Check if there's a structure for the map already created

    let url = mapUrlFor(session, mapName);

    try {
        let persona  = {
            "@context": "https://schema.org/",
            "@type": "Person",
            "identifier": session.info.webId
        }

        let mapa = {
            "@context": "https://schema.org/",
            "@type": "Map",
            "id": "0",
            "name": mapName,
            "author": persona,
            "spatialCoverage": []
        }

        let blob = new Blob([JSON.stringify(mapa)], { type: "application/ld+json" });
        let file = new File([blob], mapa.name + ".jsonld", { type: blob.type });

        await overwriteFile(
            url,
            file,
            { contentType: file.type, fetch: session.fetch }
        );
    } catch (error) {
        return false;
    }
    return true;
}

export async function getPoint(session: Session, mapName:string, id: string): Promise<Point | null> {
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
        return null;
    } // Check if the webId is undefined

    let url = mapUrlFor(session, mapName);

    if (!await checkStructure(session, mapName)) {
        return null;
    }

    try {
        let mapBlob = await getFile(
            url,
            { fetch: session.fetch }
        );

        let map = JSON.parse(await mapBlob.text());

        let pointToGet: Point | null = null;
        map.spatialCoverage.forEach((point: Point) => {
            if (point.id === id) {
                pointToGet = point;
                return;
            }
        });

        return pointToGet;
    } catch (error) {
        return null;
    }
}

export async function getPointFromCoords(session: Session, mapName:string, lat: number, lng: number): Promise<Point | null> {
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
        return null;
    } // Check if the webId is undefined

    let url = mapUrlFor(session, mapName);

    if (!await checkStructure(session, mapName)) {
        return null;
    }

    try {
        let mapBlob = await getFile(
            url,
            { fetch: session.fetch }
        );

        let map = JSON.parse(await mapBlob.text());

        let pointToGet: Point | null = null;
        map.spatialCoverage.forEach((point: Point) => {
            if (point.latitude === lat && point.longitude === lng) {
                pointToGet = point;
                return;
            }
        });

        return pointToGet;
    } catch (error) {
        return null;
    }
}

export async function addPoint(session: Session, mapName:string, point: Point): Promise<boolean> {
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
        return false;
    } // Check if the webId is undefined

    if (!checkMapNameIsValid(mapName)) {
        return false;
    }

    let url = mapUrlFor(session, mapName);

    if (!await checkStructure(session, mapName)) {
        return false;
    }

    let pointToSave = JSON.parse(JSON.stringify(point));
    pointToSave["@context"] = "https://schema.org/";
    pointToSave["@type"] = "Point";


    try {
        let mapBlob = await getFile(
            url,
            { fetch: session.fetch }
        );

        let map = JSON.parse(await mapBlob.text());

        map.spatialCoverage.push(pointToSave);

        let blob = new Blob([JSON.stringify(map)], { type: "application/ld+json" });
        let file = new File([blob], map.name + ".jsonld", { type: blob.type });

        await overwriteFile(
            url,
            file,
            { contentType: file.type, fetch: session.fetch }
        );
    } catch (error) {
        return false;
    }
    return true;
}





export async function deletePoint(session: Session,mapName:string, id: string): Promise<boolean> {
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
        return false;
    } // Check if the webId is undefined

    let url = mapUrlFor(session, mapName);

    if (!await checkStructure(session, mapName)) {
        return false;
    }

    try {
        let mapBlob = await getFile(
            url,
            { fetch: session.fetch }
        );

        let map = JSON.parse(await mapBlob.text());

        let count = 0;
        map.spatialCoverage.forEach((point: Point) => {
            if (point.id === id) {
                map.spatialCoverage.splice(count, 1);
                return;
            }
            count++;
        });

      let blob = new Blob([JSON.stringify(map)], { type: "application/ld+json" });
      let file = new File([blob], map.name + ".jsonld", { type: blob.type });

      await overwriteFile(
        url,
        file,
        { contentType: file.type, fetch: session.fetch }
      );
    } catch (error) {
      return false;
    }
    return true;
  }

  export async function getPointsCategory(session: Session, mapName: string, categoryNames: string[]): Promise<Point[]> {
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
      return [];
    } // Check if the webId is undefined

    let url = mapUrlFor(session, mapName);

    if (!await checkStructure(session, mapName)) {
      return [];
    }

    try {
        let mapBlob = await getFile(
            url,
            { fetch: session.fetch }
        );

        let map = JSON.parse(await mapBlob.text());

        let lista:Point[]=[];

        for (let i = 0; i < map.spatialCoverage.length; i++) {
            if(categoryNames.includes(map.spatialCoverage[i].category)){
            lista.push(map.spatialCoverage[i])

            }
        }


        return lista;
    } catch (error) {
      return [];
    }
  }









export async function updatePoint(session: Session, mapName:string, pointToUpdate: Point): Promise<boolean> {
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
        return false;
    } // Check if the webId is undefined

    let url = mapUrlFor(session, mapName);

    if (!await checkStructure(session, mapName)) {
        return false;
    }

    let pointToSave = JSON.parse(JSON.stringify(pointToUpdate));
    pointToSave["@context"] = "https://schema.org/";
    pointToSave["@type"] = "Point";

    try {
        let mapBlob = await getFile(
            url,
            { fetch: session.fetch }
        );

        let map = JSON.parse(await mapBlob.text());

        let count = 0;
        map.spatialCoverage.forEach((point: Point) => {
            if (point.id === pointToUpdate.id) {
                map.spatialCoverage[count] = pointToSave;
                return;
            }
            count++;
        });

        let blob = new Blob([JSON.stringify(map)], { type: "application/ld+json" });
        let file = new File([blob], map.name + ".jsonld", { type: blob.type });

        await overwriteFile(
            url,
            file,
            { contentType: file.type, fetch: session.fetch }
        );
    } catch (error) {
        return false;
    }
    return true;
}

export async function retrievePoints(session: Session, mapName:string): Promise<Point[]> {
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
        return [];
    } // Check if the webId is undefined

    if (!checkMapNameIsValid(mapName)) {
        return [];
    }

    let url = mapUrlFor(session, mapName);

    if (!await checkStructure(session, mapName)) {
        return [];
    }

    try {
        let mapBlob = await getFile(
            url,
            { fetch: session.fetch }
        );

        let map = JSON.parse(await mapBlob.text());

        let points: Point[] = [];

        map.spatialCoverage.forEach((point: Point) => {
            points.push(point);
        });
        return points;
    } catch (error) {
        return [];
    }
}

// Devuelve los nombres de los mapas que tiene el usuario
export async function retrieveMapNames(session: Session): Promise<string[]> {
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
        return [];
    } // Check if the webId is undefined

    let url = session.info.webId.split("/").slice(0, 3).join("/").concat("/public", "/lomap");

    let dataset = await getSolidDataset(url, { fetch: session.fetch });
    let mapUrls = getContainedResourceUrlAll(dataset); // urls de los mapas del usuario

    return mapUrls.map(mapUrl =>
        mapUrl.split("/lomap/")[1]
    );
}

// Borra el mapa cuyo nombre se pasa como parámetro
export async function deleteMap(session: Session, mapName: string): Promise<boolean> {
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
        return false;
    } // Check if the webId is undefined

    if (!checkMapNameIsValid(mapName)) {
        return false;
    }

    let url = mapUrlFor(session, mapName);

    try {
        await deleteFile(
            url,
            { fetch: session.fetch }
        );

        return true;

    } catch (error) {
      return false;
    }
}

export async function myFriends(session: Session){
    if (checkSession(session)) {
        const webIdDoc = await fetchDocument(session.info.webId!);
        let profile = webIdDoc.getSubject(session.info.webId!)
        if(profile == null){
            return [];
        }
        return profile.getAllRefs(FOAF.knows);
    }
    return [];
}

//Function that adds a new friend to the user's profile
async function addNewFriend(webId:string, session:Session, friendWebId:string) {
    // Get the Solid dataset of the profile
    const profileDataset = await getSolidDataset(webId);

    const thing = getThing(profileDataset, webId);

    const updatedThing = addIri(thing as Thing, FOAF.knows, friendWebId);

    const updatedProfileDataset = setThing(profileDataset, updatedThing);

    await saveSolidDatasetAt(webId, updatedProfileDataset, {
        fetch: session.fetch,
    });
}

///

export async function saveImage(session: Session, mapName:string, image: File, point:Point): Promise<boolean> {
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
        return false;
    } // Check if the webId is undefined

   
    let id=uuidv4()
    let url = lomapUrlFor(session)+id;
    console.log(url)

    try {
        point.logo.push(url)
        console.log(point.logo)
        await updatePoint(session, mapName,point)
        await overwriteFile(
            url,
            image,
            { contentType: image.type, fetch: session.fetch }
        );
    } catch (error) {
        return false;
    }
    return true;
}
export async function getPointImages(session: Session, mapName:string, point:Point): Promise<MyImage[]> {
    
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
        return [];
    } // Check if the webId is undefined

    if (!checkMapNameIsValid(mapName)) {
        return [];
    }
    
    let l:any=point.logo.map(imageUrl => {
        
        return {
            src: imageUrl,
            alt: "Image stored at " + imageUrl
        };
        
    });
    /*
    l.forEach((element:MyImage) => {
        console.log(element)
    });
    */
    return l
   
}

export async function saveReview(session: Session, mapName:string, comment:string,ratingValue:number, point:Point): Promise<boolean> {
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
        return false;
    } // Check if the webId is undefined
    /*
setReviews([...reviews, { 
    author: "u",
    reviewBody: comment, 
    reviewRating: ratingValue,
  datePublished:Date.now() }]);

    */
    

    try {
        point.review.push({
            author: "u",
            reviewBody: comment, 
            reviewRating: ratingValue,
            
          datePublished:Date.now()
         });
         console.log(ratingValue)
        
        //console.log(point.review)
        await updatePoint(session, mapName,point)
        
    } catch (error) {
        return false;
    }
    return true;
}

function lomapUrlFor(session: Session): string {
    if (typeof session.info.webId !== "undefined") {
        return session.info.webId.split("/").slice(0, 3).join("/").concat("/public", "/images", "/");
    }
    return "";
}


