
import {
    getFile,
    deleteFile,
    overwriteFile, getContainedResourceUrlAll, getSolidDataset
} from '@inrupt/solid-client';
import { Session } from '@inrupt/solid-client-authn-browser';
import Point from "./Point";
import { fetchDocument } from "tripledoc";
import { foaf } from "rdf-namespaces";

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

  export async function checkPointCategory(session: Session, mapName: string, id: string, categoryName: string): Promise<boolean> {
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
  
      let pointIndex = -1;
      for (let i = 0; i < map.spatialCoverage.length; i++) {
        if (map.spatialCoverage[i].id === id) {
          pointIndex = i;
          break;
        }
      }
  
      if (pointIndex === -1) {
        return false; // Point with given ID not found
      }
  
      if (map.spatialCoverage[pointIndex].category === categoryName) {
        return true; // Point category matches given category name
      }
  
      return false; // Point category does not match given category name
    } catch (error) {
      return false;
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

export async function myFriends(session: Session): Promise<string[]> {
    if (checkSession(session)) {
        const webIdDoc = await fetchDocument(session.info.webId!);
        let profile = webIdDoc.getSubject(session.info.webId!)
        if(profile == null){
            return [];
        }
        return profile.getAllRefs(foaf.knows);
    }
    return [];
}
