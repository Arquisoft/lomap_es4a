
import {
    getFile,
    deleteFile,
    overwriteFile, getContainedResourceUrlAll, getSolidDataset, getThing, getUrl
} from '@inrupt/solid-client';
import { Session } from '@inrupt/solid-client-authn-browser';
import Point from "./Point";

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

function mapUrlFor(session: Session): string {
    if (typeof session.info.webId !== "undefined") {
        return session.info.webId.split("/").slice(0, 3).join("/").concat("/public", "/lomap", "/map");
    }
    return "";
}

// async function existsUrl(session: Session, url: string): Promise<boolean> {
//     // let urls = getContainedResourceUrlAll(url);
//     // let files: Array<File> = [];
//     // for (let i = 0; i < urls.length; i++) {
//     //     let file = await readData(session, urls[i]);
//     //     if (file != null) {
//     //         files.push(file);
//     //     }
//     // }
//     // return files;
//
//     let file = await getFile(url, {fetch: session.fetch});
//     return file !== null;
//
//     return await getFile(
//         url,
//         {fetch: session.fetch}
//     ).catch(_ => {
//         return false;
//     }).then(_ => {
//         return true;
//     });
// }

async function checkStructure(session: Session): Promise<boolean> {
    let publicUrl = "";
    let lomapUrl = "";
    let mapUrl = "";
    if (typeof session.info.webId !== "undefined") {
        publicUrl = session.info.webId.split("/").slice(0, 3).join("/").concat("/public/");
        lomapUrl = publicUrl.concat("lomap/");
        mapUrl = lomapUrl.concat("map");
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

export async function createMap(session: Session): Promise<boolean> {
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
        return false;
    } // Check if the webId is undefined

    if (await checkStructure(session)) {
        return false;
    } // Check if there's a structure for the map already created

    let url = mapUrlFor(session);

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
            "name": "Mapa Propio",
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

export async function addPoint(session: Session, point: Point): Promise<boolean> {
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
        return false;
    } // Check if the webId is undefined

    let url = mapUrlFor(session);

    if (!await checkStructure(session)) {
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

export async function retrievePoints(session: Session): Promise<Point[]> {
    if (typeof session.info.webId === 'undefined' || session.info.webId === null) {
        return [];
    } // Check if the webId is undefined

    let url = mapUrlFor(session);

    if (!await checkStructure(session)) {
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
