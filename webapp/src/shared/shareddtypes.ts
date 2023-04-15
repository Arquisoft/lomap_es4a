import {Session} from "@inrupt/solid-client-authn-browser";

export type User = {
    name:string;
    email:string;
  }

export type SessionType = {
    session: Session;
}