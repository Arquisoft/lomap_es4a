import {Session} from "@inrupt/solid-client-authn-browser";
import {findDataInContainer, readData, writeData} from "./solidapi";
import Point from "./Point";
import {MarkerType} from "../components/Map/Map";

export type SessionType = {
    session: Session;
}

export function savePoint(session: Session, lat: number, lng: number): Point | null {
    let point = new Point(lat, lng);

    if (session.info.webId == null) {
        return null;
    } // Check if the webId is undefined

    let basicUrl = session.info.webId?.split("/").slice(0, 3).join("/");
    let pointsUrl = basicUrl.concat("/public", "/points", "/" + point.id + ".json");

    let blob = new Blob([JSON.stringify(point)], { type: "application/json" });
    let file = new File([blob], point.id + ".json", { type: "application/json" });

    writeData(session, pointsUrl, file).then(result => {
        if (result) {
            console.log("Point " + point.id + " saved correctly in " + pointsUrl);
        } else {
            console.log("Point " + point.id + " could not be saved correctly");
        }
    });

    return point;
}

export async function retrievePoints(session: Session): Promise<Point[] | null>{
    if (session.info.webId == null) {
        return null;
    } // Check if the webId is undefined

    let basicUrl = session.info.webId?.split("/").slice(0, 3).join("/");
    let pointsUrl = basicUrl.concat("/public", "/points/");

    let points: Point[] = [];
    let files = await findDataInContainer(session, pointsUrl);
    let file: File;
    if (files != null) {
        for (let i = 0; i < files.length; i++) {
            file = files[i];
            let text = await file.text();
            points.push(JSON.parse(text));
        }
    }
    return points;
}