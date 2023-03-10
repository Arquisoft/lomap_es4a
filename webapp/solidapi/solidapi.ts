
import {
    getSolidDataset,
    getContentType,
    getFile,
    deleteFile,
    saveFileInContainer,
    overwriteFile
} from "@inrupt/solid-client";
import { Session } from "@inrupt/solid-client-authn-browser";


async function login(identityProvider: string, redirectUrl: string): Promise<Session> {
    let session = new Session();
    try {
        await session.login({
            oidcIssuer: identityProvider,
            redirectUrl: redirectUrl
        });
    } catch (error) {
        console.log(error);
    }
    return session;
}

async function readData(session: Session, url: string): Promise<File | null> {
    if (!existsUrl(session, url)) {
        return null;
    }
    let parts = url.split("/");
    let name = parts.pop();
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

export { login, readData, writeData, deleteData };