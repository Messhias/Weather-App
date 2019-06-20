import {__construct} from "../utils/initApp";

const LocationRoute = express();
const { Client } = require('pg');

import express from "express";
import cors from 'cors';
// Parse URL-encoded bodies (as sent by HTML forms)
LocationRoute.use(express.urlencoded({extended: true }));
LocationRoute.use(cors());
// Parse JSON bodies (as sent by API clients)
LocationRoute.use(express.json());

// importing the custom functions.
import {verifyJWT } from "../utils/JWT";
const client = new Client({
    host: "ec2-54-235-104-136.compute-1.amazonaws.com",
    database: "d48g6qmc3oadt7",
    password: "c0cf6f4bbda0673b7ad0d1e7ccb302f0024267836d2c0866073ea715b43a8116",
    user: "vtzgyqdtpsmotu",
});
client.connect();

/**
 * Add new locations.
 */
LocationRoute.post("/location/add", verifyJWT, (request, response, next) => {
    let query = "select * from my_locations where country = $1 and city = $2";
    client.query(query, [`${request.body.data.info.alpha2Code}`, `${request.body.data.capital}`])
        .then(res => {
            if (res.rows.length === 0) {
                query = "insert into my_locations (city, country) values($1, $2)";
                client.query(query, [`${request.body.data.info.capital}`, `${request.body.data.info.alpha2Code}`])
                    .then(result => {
                        response.status(200).send(true);
                        __construct();
                    })
                    .catch(error => console.error(error));
            } else {
                response.status(200).send(true);
                __construct();
            }
        })
        .catch(error => console.error(error));
});

__construct();

module.exports = LocationRoute;
