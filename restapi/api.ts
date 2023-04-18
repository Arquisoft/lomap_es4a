import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
const api:Router = express.Router();

const cookieSession = require("cookie-session");

const cors = require("cors");

const {
    getSessionFromStorage,
    Session
} = require("@inrupt/solid-client-authn-node");

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

    console.log("Session: " + session.info.webId)

    return res.redirect("http://localhost:3000/mainpage");
});

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