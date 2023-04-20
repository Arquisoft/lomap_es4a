import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
const api:Router = express.Router();

const cookieSession = require("cookie-session");

const cors = require("cors");

const {
    getSessionFromStorage,
    Session
} = require("@inrupt/solid-client-authn-node");

import {
    getFile,
    deleteFile,
    overwriteFile,
    getContainedResourceUrlAll,
    getSolidDataset,
    getThing,
    getStringNoLocale,
    getStringNoLocaleAll, getUrlAll
} from '@inrupt/solid-client';

import {FOAF, VCARD} from "@inrupt/vocab-common-rdf";

// import { fetchDocument } from "tripledoc";

import {Point} from "../webapp/src/shared/shareddtypes";

import {Blob} from 'node:buffer';
import {File} from '@web-std/file';

const port = 5000;

api.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
        allowedHeaders: ['Content-Type', 'Authorization'],
        preflightContinue: true
    }),
);

api.use(
    cookieSession({
        name: "session",
        // These keys are required by cookie-session to sign the cookies.
        keys: [
            "Required, but value not relevant for this demo - key1",
            "Required, but value not relevant for this demo - key2",
        ],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
);

api.get("/isLoggedIn", async (req: any, res, next) => {
    const session = await getSessionFromStorage(req.session.sessionId);
    let isLoggedIn = false;
    if (req.session.sessionId !== null && req.session.sessionId !== undefined && session !== null && session !== undefined && session.info !== null && session.info !== undefined) {
        isLoggedIn = session.info.isLoggedIn;
    }
    res.json({isLoggedIn: isLoggedIn});
});

api.get("/login", async (req: any, res, next) => {
    const session = new Session();

    //let podProvider = req.body.podProvider;

    req.session.sessionId = session.info.sessionId;
    const redirectToSolidIdentityProvider = (url: string) => {
        res.redirect(url);
    };

    await session.login({
        redirectUrl: "http://localhost:5000/api/redirect",
        oidcIssuer: "https://inrupt.net/",
        clientName: "LoMap",
        handleRedirect: redirectToSolidIdentityProvider
    });
});

api.get("/logout", async (req: any, res, next) => {
    const session = await getSessionFromStorage(req.session.sessionId);
    await session.logout();

    return res.redirect("http://localhost:3000/");
});

api.get("/redirect", async (req: any, res, next) => {
    const session = await getSessionFromStorage(req.session.sessionId);

    let url = "http://localhost:5000/api" + req.url;

    await session.handleIncomingRedirect(url);

    // if-else no totalmente necesario, 
    if (session.info.isLoggedIn) {
        res.status(200);
    } else {
        res.status(403);
    }

    return res.redirect("http://localhost:3000/mainpage");
});

api.get("/name", async (req: any, res, next) => {
    if (req.session.sessionId === undefined || req.session.sessionId === null || req.session.sessionId === "") {
        return res.status(400).send({name: ""});
    } // Check sessionId

    const session = await getSessionFromStorage(req.session.sessionId);

    let dataset = await getSolidDataset(session.info.webId, { fetch: session.fetch });

    const profile = getThing(dataset, session.info.webId);

    let name = "";

    if (profile !== null) {
        name = getStringNoLocale(profile, FOAF.name)!;
    }

    return res.status(200).send({name: name});
});

api.get("/profilePicture", async (req: any, res, next) => {
    if (req.session.sessionId === undefined || req.session.sessionId === null || req.session.sessionId === "") {
        return res.status(400).send({name: ""});
    } // Check sessionId

    const session = await getSessionFromStorage(req.session.sessionId);

    let dataset = await getSolidDataset(session.info.webId, { fetch: session.fetch });

    const profile = getThing(dataset, session.info.webId);

    let pfp = "";

    if (profile !== null) {
        pfp = getStringNoLocale(profile, VCARD.hasPhoto)!;
    }

    return res.status(200).send({pfp: pfp});
});

api.post("/maps/add", async (req: any, res, next) => {
    if (req.session.sessionId === undefined || req.session.sessionId === null || req.session.sessionId === "") {
        return res.sendStatus(400);
    } // Check sessionId

    const session = await getSessionFromStorage(req.session.sessionId);
    const mapName = req.body.mapName;

    if (!checkSession(session)) {
        return res.sendStatus(400);
    }

    if (!checkMapNameIsValid(mapName)) {
        return res.sendStatus(400);
    } // Check if map name is valid

    if (await checkStructure(session, mapName)) {
        return res.sendStatus(200);
    } // Check if there's a structure for the map already created

    const url = mapUrlFor(session, mapName);

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
        let file = new File([await blob.arrayBuffer()], mapa.name + ".jsonld", { type: blob.type });

        await overwriteFile(
            url,
            file,
            { contentType: file.type, fetch: session.fetch }
        );

        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(400);
    }
});

api.delete("/maps/delete/:mapName", async (req: any, res, next) => {
    if (req.session.sessionId === undefined || req.session.sessionId === null || req.session.sessionId === "") {
        return res.sendStatus(400);
    } // Check sessionId

    const session = await getSessionFromStorage(req.session.sessionId);
    const mapName = req.params.mapName;

    if (!checkSession(session)) {
        return res.sendStatus(400);
    }

    const url = mapUrlFor(session, mapName);

    try {
        await deleteFile(
            url,
            { fetch: session.fetch }
        );

        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(400);
    }
});

api.get("/maps/names", async (req: any, res, next) => {
    if (req.session.sessionId === undefined || req.session.sessionId === null || req.session.sessionId === "") {
        return res.status(400).send([]);
    } // Check sessionId

    const session = await getSessionFromStorage(req.session.sessionId);

    if (!checkSession(session)) {
        return res.status(400).send([]);
    }

    const url = session.info.webId.split("/").slice(0, 3).join("/").concat("/public", "/lomap");

    let dataset = await getSolidDataset(url, { fetch: session.fetch });
    let mapUrls = getContainedResourceUrlAll(dataset); // urls de los mapas del usuario

    let mapNames = mapUrls.map(mapUrl =>
        mapUrl.split("/lomap/")[1]
    );

    return res.status(200).send(mapNames);
});

api.get("/points/:mapName", async (req: any, res, next) => {
    if (req.session.sessionId === undefined || req.session.sessionId === null || req.session.sessionId === "") {
        return res.status(400).send([]);
    } // Check sessionId

    const session = await getSessionFromStorage(req.session.sessionId);
    const mapName = req.params.mapName;

    if (!checkSession(session)) {
        return res.status(400).send([]);
    }

    if (!checkMapNameIsValid(mapName)) {
        return res.status(400).send([]);
    } // Check if map name is valid

    if (!await checkStructure(session, mapName)) {
        return res.status(400).send([]);
    } // Check if there's a structure for the map already created

    const url = mapUrlFor(session, mapName);

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

        return res.status(200).send(points);
    } catch (error) {
        return res.status(400).send([]);
    }
});

api.get("/point/:mapName/:id", async (req: any, res, next) => {
    if (req.session.sessionId === undefined || req.session.sessionId === null || req.session.sessionId === "") {
        return res.status(400).send([]);
    } // Check sessionId

    const session = await getSessionFromStorage(req.session.sessionId);
    const mapName = req.params.mapName;
    const id = req.params.id;

    if (!checkSession(session)) {
        return res.status(400).send([]);
    }

    if (!checkMapNameIsValid(mapName)) {
        return res.status(400).send([]);
    } // Check if map name is valid

    if (!await checkStructure(session, mapName)) {
        return res.status(400).send([]);
    } // Check if there's a structure for the map already created

    const url = mapUrlFor(session, mapName);

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

        return res.status(200).send(pointToGet);
    } catch (error) {
        return res.status(400).send(null);
    }
});

api.post("/points/add", async (req: any, res, next) => {
    if (req.session.sessionId === undefined || req.session.sessionId === null || req.session.sessionId === "") {
        return res.sendStatus(400);
    } // Check sessionId

    const session = await getSessionFromStorage(req.session.sessionId);
    const mapName = req.body.mapName;
    let point = req.body.point;

    if (!checkSession(session)) {
        return res.sendStatus(400);
    }

    if (!checkMapNameIsValid(mapName)) {
        return res.sendStatus(400);
    } // Check if map name is valid

    if (!await checkStructure(session, mapName)) {
        return res.sendStatus(400);
    } // Check if there's a structure for the map already created

    const url = mapUrlFor(session, mapName);

    point = JSON.parse(JSON.stringify(point));
    point["@context"] = "https://schema.org/";
    point["@type"] = "Point";

    try {
        let mapBlob = await getFile(
            url,
            { fetch: session.fetch }
        );

        let map = JSON.parse(await mapBlob.text());

        map.spatialCoverage.push(point);

        let blob = new Blob([JSON.stringify(map)], { type: "application/ld+json" });
        let file = new File([await blob.arrayBuffer()], map.name + ".jsonld", { type: blob.type });

        await overwriteFile(
            url,
            file,
            { contentType: file.type, fetch: session.fetch }
        );

        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
});

api.delete("/points/delete/:mapName/:id", async (req: any, res, next) => {
    if (req.session.sessionId === undefined || req.session.sessionId === null || req.session.sessionId === "") {
        return res.sendStatus(400);
    } // Check sessionId

    const session = await getSessionFromStorage(req.session.sessionId);
    const mapName = req.params.mapName;
    const id = req.params.id;

    if (!checkSession(session)) {
        return res.sendStatus(400);
    }

    if (!checkMapNameIsValid(mapName)) {
        return res.sendStatus(400);
    } // Check if map name is valid

    if (!await checkStructure(session, mapName)) {
        return res.sendStatus(400);
    } // Check if there's a structure for the map already created

    const url = mapUrlFor(session, mapName);

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
        let file = new File([await blob.arrayBuffer()], map.name + ".jsonld", { type: blob.type });

        await overwriteFile(
            url,
            file,
            { contentType: file.type, fetch: session.fetch }
        );

        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(400);
    }
});

api.put("/points/update", async (req: any, res, next) => {
    if (req.session.sessionId === undefined || req.session.sessionId === null || req.session.sessionId === "") {
        return res.sendStatus(400);
    } // Check sessionId

    const session = await getSessionFromStorage(req.session.sessionId);
    const mapName = req.body.mapName;
    let point = req.body.point;

    if (!checkSession(session)) {
        return res.sendStatus(400);
    }

    if (!checkMapNameIsValid(mapName)) {
        return res.sendStatus(400);
    } // Check if map name is valid

    if (!await checkStructure(session, mapName)) {
        return res.sendStatus(400);
    } // Check if there's a structure for the map already created

    const url = mapUrlFor(session, mapName);

    point = JSON.parse(JSON.stringify(point));
    point["@context"] = "https://schema.org/";
    point["@type"] = "Point";

    try {
        let mapBlob = await getFile(
            url,
            { fetch: session.fetch }
        );

        let map = JSON.parse(await mapBlob.text());

        let count = 0;
        map.spatialCoverage.forEach((p: Point) => {
            if (point.id === p.id) {
                map.spatialCoverage[count] = point;
                return;
            }
            count++;
        });

        let blob = new Blob([JSON.stringify(map)], { type: "application/ld+json" });
        let file = new File([await blob.arrayBuffer()], map.name + ".jsonld", { type: blob.type });

        await overwriteFile(
            url,
            file,
            { contentType: file.type, fetch: session.fetch }
        );

        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
});

api.get("/friends", async (req: any, res, next) => {
    if (req.session.sessionId === undefined || req.session.sessionId === null || req.session.sessionId === "") {
        return res.status(400).send([]);
    } // Check sessionId

    const session = await getSessionFromStorage(req.session.sessionId);

    if (!checkSession(session)) {
        return res.status(400).send([]);
    }

    let dataset = await getSolidDataset(session.info.webId, { fetch: session.fetch });

    const profile = getThing(dataset, session.info.webId);

    let friendWebIds: string[] = [];

    if (profile !== null) {
        friendWebIds = getUrlAll(profile, FOAF.knows)!;
    }

    return res.status(200).send({friendWebIds: friendWebIds});
});

// PRIVATE FUNCTIONS

async function checkStructure(session: any, mapName: string): Promise<boolean> {
    let publicUrl = "";
    let lomapUrl = "";
    let mapUrl = "";
    if (session.info.webId !== undefined && checkMapNameIsValid(mapName)) {
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

function mapUrlFor(session: typeof Session, mapName:string): string {
    if (typeof session.info.webId !== "undefined" && checkMapNameIsValid(mapName)) {
        return session.info.webId.split("/").slice(0, 3).join("/").concat("/public", "/lomap", "/", mapName);
    }
    return "";
}

function checkSession(session: any): boolean {
    if (session === null || session === undefined) {
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

function checkMapNameIsValid(mapName:string): boolean {
    const regex = /\W+/; // \W es equivalente a [^A-Za-z0-9_]+
    return mapName !== undefined && mapName !== null
        && mapName.trim() !== ""
        && mapName.match(regex) === null;
}

// -------------------------------------------------------------------------------------------

interface User {
    name: string;
    email: string;
}

//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users: Array<User> = [];

api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(users);
    }
);

api.post(
  "/users/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let name = req.body.name;
    let email = req.body.email;
    let user: User = {name:name,email:email}
    users.push(user);
    return res.sendStatus(200);
  }
);

export default api;