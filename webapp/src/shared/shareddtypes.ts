import {Session} from "@inrupt/solid-client-authn-browser";



export const options :{[publicName:string]:string}={
  "Academic Institution":"academicInstitution",
  "Bar":"bar",
  "Entertainment":"entertainment",
  "Hospital":"hospital",
  "Hotel":"hotel",
  "Landscape":"landscape",
  "Museum":"museum",
  "Other":"other",
  "Park" :"park",
  "Police Station":"policeStation",
  "Public Inst.":"publicInstitution",
  "Restaurant":"restaurant",
  "Shop":"shop",
  "Sports Club":"sportsClub",
  "Supermarket":"supermarket",
  "Transport Centre":"transportCentre",
  "Cinema" :"cinema"

};

export type SessionType = {
    session: Session;
}