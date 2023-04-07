import {Session} from "@inrupt/solid-client-authn-browser";
import Point from "./Point";
import {MarkerType} from "../components/Map/Map";

import { getSolidDataset, getUrl, getThing } from '@inrupt/solid-client';
import { VCARD } from "@inrupt/vocab-common-rdf";

export type SessionType = {
    session: Session;
}
/*
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
*/

export async function getProfilePic(session: Session): Promise<string | null> {
    /*let webId: string = "";
    let photoUrl: string | null = "";
    if (session.info.webId != null) {
        webId = session.info.webId;
    }

    let profileThing = await readThing(session, webId);

    if (profileThing != null) {
        photoUrl = getUrl(profileThing, VCARD.hasPhoto);
    }

    console.log("FASDF AS OFAS FHAOIS DFHOAIS HFOAIS HFP HFS")
    console.log(photoUrl)
    return photoUrl;*/


    let webId: string = "";
    if (session.info.webId != null) {
        webId = session.info.webId;
    }

    let profileDataset = await getSolidDataset(webId);
    let profileThing = getThing(profileDataset, webId);
    let photoUrl: string | null = "";
    if (profileThing != null) {
        photoUrl = getUrl(profileThing, VCARD.hasPhoto);
    }

    return photoUrl;
}