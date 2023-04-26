import {
    getSolidDatasetWithAcl,
    hasResourceAcl,
    hasFallbackAcl,
    hasAccessibleAcl,
    createAcl,
    createAclFromFallbackAcl,
    getResourceAcl,
    setAgentDefaultAccess,
    saveAclFor
} from "@inrupt/solid-client";
import { Session } from "@inrupt/solid-client-authn-browser";

export async function givePermissions(session: Session, friendsWebIds:string[]) {

    if (session.info.webId === null || typeof session.info.webId === "undefined")
        throw new Error("Invalid session");

    const lomapUrl = session.info.webId.split("/").slice(0, 3).join("/").concat("/public", "/lomap");

    // Fetch the SolidDataset and its associated ACLs, if available:
    const myDatasetWithAcl = await getSolidDatasetWithAcl(lomapUrl, {fetch: session.fetch});

    // Obtain the SolidDataset's own ACL, if available,
    // or initialise a new one, if possible:
    let resourceAcl;
    if (!hasResourceAcl(myDatasetWithAcl)) {
        if (!hasAccessibleAcl(myDatasetWithAcl)) {
            throw new Error(
            "The current user does not have permission to change access rights to this Resource."
            );
        }
        if (!hasFallbackAcl(myDatasetWithAcl)) {
            // Initialise a new empty ACL
            resourceAcl = createAcl(myDatasetWithAcl);
        } else {
            resourceAcl = createAclFromFallbackAcl(myDatasetWithAcl);
        }
    } else {
        resourceAcl = getResourceAcl(myDatasetWithAcl);
    }
    

    // Give yourself Control access to the given Resource:
    let updatedAcl = setAgentDefaultAccess(
        resourceAcl,
        session.info.webId,
        { read: true, append: true, write: true, control: true }
    );
    // Now save the ACL:
    await saveAclFor(myDatasetWithAcl, updatedAcl, {fetch: session.fetch});


    // Give your friends Control access to the given Resource:
    for (let friendWebId of friendsWebIds) {
        updatedAcl = setAgentDefaultAccess(
            resourceAcl,
            friendWebId,
            { read: true, append: true, write: true, control: true }
        );
        // Now save the ACL:
        await saveAclFor(myDatasetWithAcl, updatedAcl, {fetch: session.fetch});
    }      
}
  