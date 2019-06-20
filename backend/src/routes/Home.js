import express from "express";
const HomeRouter = express();
import cors from 'cors';
// Parse URL-encoded bodies (as sent by HTML forms)
HomeRouter.use(express.urlencoded({extended: true }));
HomeRouter.use(cors());
// Parse JSON bodies (as sent by API clients)
HomeRouter.use(express.json());

// importing the custom functions.
import {verifyJWT } from "../utils/JWT";
import {__construct} from "../utils/initApp";

const { Client } = require('pg');
const client = new Client({
    host: "ec2-54-235-104-136.compute-1.amazonaws.com",
    database: "d48g6qmc3oadt7",
    password: "c0cf6f4bbda0673b7ad0d1e7ccb302f0024267836d2c0866073ea715b43a8116",
    user: "vtzgyqdtpsmotu",
});
client.connect();

// Proxy request
// HomeRouter.get('/home', (request, response, next) => {
HomeRouter.get('/home', verifyJWT, (request, response, next) => {
    const query = "select * from my_locations";
    client.query(query)
        .then(res => {
            response.status(200).send(res.rows);
        });
});

__construct();

module.exports = HomeRouter;
