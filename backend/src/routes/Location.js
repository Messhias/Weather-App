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
    host: "ec2-23-21-186-85.compute-1.amazonaws.com",
    database: "dfp4d40glbpd2f",
    password: "435c87d3d3c6eeca55c10d3914f3a514f867eac38ba5fb3830fe180fc1e20c2d",
    user: "uscomshhpttkvk",
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
                        __construct();
                        response.status(200).send(true);
                    })
                    .catch(error => console.error(error));
            } else {
                __construct();
                response.status(200).send(true);
            }
        })
        .catch(error => console.error(error));
});

module.exports = LocationRoute;
