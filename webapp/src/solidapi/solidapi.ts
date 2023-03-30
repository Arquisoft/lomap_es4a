
import {
    getSolidDataset,
    getContainedResourceUrlAll,
    getFile,
    deleteFile,
    getJsonLdParser,
    overwriteFile,
    getThing,
    ThingPersisted,
    buildThing,
    createThing,
    saveSolidDatasetAt,
    setThing,
    createSolidDataset,
    Thing
} from '@inrupt/solid-client';
import { Session } from '@inrupt/solid-client-authn-browser';
import {RDF, SCHEMA_INRUPT} from "@inrupt/vocab-common-rdf";
import {JsonLd} from "json-ld-types";

async function readData(session: Session, url: string): Promise<File | null> {
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
    try {
        await overwriteFile(
            url,
            file,
            { contentType: file.type, fetch: session.fetch }
        );
    } catch (error) {
        result = false;
    }
    return result;
}

async function findDataInContainer(session: Session, url: string): Promise<File[] | null> {
    try {
        let dataset = await getSolidDataset(
            url,
            { fetch: session.fetch }
        );

        let urls = getContainedResourceUrlAll(dataset);
        let files: Array<File> = [];
        for (let i = 0; i < urls.length; i++) {
            let file = await readData(session, urls[i]);
            if (file != null) {
                files.push(file);
            }
        }
        return files;
    } catch (error) {
        return null;
    }
    return null;
}

/*
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
*/

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

async function readThing(session: Session, url: string): Promise<ThingPersisted | null> {
    return null;
    try {
        let dataset = await getSolidDataset(url);
        let thing = getThing(dataset, url);
        return thing;
    } catch (error) {
        return null;
    }
}

async function createPlaceDataset(session: Session) {
    try {
        let dataset = createSolidDataset();
        await saveSolidDatasetAt(
            "https://gonzalo99.inrupt.net/public/test",
            dataset,
            { fetch: session.fetch }
        );
    } catch (error) {
        console.log(error);
    }
}

// plain RDF
/*
export async function addPlace(session: Session) {
    await createPlaceDataset(session);

    try {
        let url = "https://gonzalo99.inrupt.net/public/test";
        let dataset = await getSolidDataset(
            url,
            { fetch: session.fetch }
        );
        let place = buildThing(createThing({name: "sanfran"}))
            .addStringNoLocale(SCHEMA_INRUPT.name, "Campo de San Francisco")
            .addStringNoLocale(SCHEMA_INRUPT.latitude, "43.361717")
            .addStringNoLocale(SCHEMA_INRUPT.longitude, "-5.850186")
            .addUrl(RDF.type, "https://schema.org/Place")
            .build();
        dataset = setThing(dataset, place);
        await saveSolidDatasetAt(
            url,
            dataset,
            { fetch: session.fetch }
        );
    } catch (error) {
        console.log(error);
    }
}
*/


// JSON-LD
export async function addPlace(session: Session) {
    await createPlaceDataset(session);

    try {
        let url = "https://gonzalo99.inrupt.net/public/test";
        let dataset = await getSolidDataset(
            url,
            { fetch: session.fetch }
        );
        let place = {
            "@context": "https://schema.org",
            "@type": "Place",
            "name": "Campo de San Francisco",
            "latitude": "43.361717",
            "longitude": "10",
        };
        let placeToSave = buildThing(createThing(place)).build();
        dataset = setThing(dataset, placeToSave);
        await saveSolidDatasetAt(
            url,
            dataset,
            { fetch: session.fetch }
        );
    } catch (error) {
        console.log(error);
    }
}

export { readThing, findDataInContainer, readData, writeData, deleteData };