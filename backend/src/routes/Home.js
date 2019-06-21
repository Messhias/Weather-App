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
    host: "ec2-23-21-186-85.compute-1.amazonaws.com",
    database: "dfp4d40glbpd2f",
    password: "435c87d3d3c6eeca55c10d3914f3a514f867eac38ba5fb3830fe180fc1e20c2d",
    user: "uscomshhpttkvk",
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
