
import {
    createSolidDataset,
    getSolidDataset,
    getFile,
    deleteFile,
    saveFileInContainer,
    overwriteFile, createContainerAt
} from '@inrupt/solid-client';
import { Session } from '@inrupt/solid-client-authn-browser';


async function init(session: Session): Promise<boolean> {
    if (session.info.webId == null) {
        return false;
    } // Check if the webId is undefined
    let basicUrl = session.info.webId?.split("/").slice(0, 3).join("/");
    let pointsUrl = basicUrl.concat("/public", "/points");
    if (!existsUrl(session, pointsUrl)) {
        createUrl(session, pointsUrl);
    } else {
        console.log("Existe la url" + pointsUrl);
    }
    console.log(basicUrl);
    return true;
}

async function readData(session: Session, url: string): Promise<File | null> {
    if (!existsUrl(session, url)) {
        return null;
    }
    let parts = url.split("/");
    let name = parts[parts.length - 1];
    try {
        let blob = await getFile(
            url,
            { fetch: session.fetch }
        );
        return new File([blob], name, { type: blob.type });
    } catch (error) {
        return null;
    }
    return null;
}

async function writeData(session: Session, url: string, file: File): Promise<boolean> {
    let result = true;
    if (!existsUrl(session, url)) {
        return false;
    }
    if (existsData(session, url, file)) {
        try {
            await overwriteFile(
                url,
                file,
                { contentType: file.type, fetch: session.fetch }
            );
        } catch (error) {
            result = false;
        }
    } else {
        try {
            await saveFileInContainer(
                url,
                file,
                { slug: file.name, contentType: file.type, fetch: session.fetch }
            );
        } catch (error) {
            result = false;
        }
    }
    return result;
}

async function deleteData(session: Session, url: string): Promise<boolean> {
    let result = true;
    if (!existsUrl(session, url)) {
        return false;
    }
    try {
        await deleteFile(
            url,
            { fetch: session.fetch }
        );
    } catch (error) {
        result = false;
    }
    return result;
}

function existsUrl(session: Session, url: string): boolean {
    try {
        getSolidDataset(
            url,
            { fetch: session.fetch }
        );
    } catch (error) {
        return false;
    }
    return true;
}

function existsData(session: Session, url: string, file: File) {
    try {
        getFile(
            url + "/" + file.name,
            { fetch: session.fetch }
        );
    } catch (error) {
        return true;
    }
    return false;
}

function createUrl(session: Session, url: string) {
    createContainerAt(url);
}

export { init, readData, writeData, deleteData };