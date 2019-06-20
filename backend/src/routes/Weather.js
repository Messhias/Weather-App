import {__construct} from "../utils/initApp";

const WeatherRouter = express();
const { Client } = require('pg');

import express from "express";
import cors from 'cors';
// Parse URL-encoded bodies (as sent by HTML forms)
WeatherRouter.use(express.urlencoded({extended: true }));
WeatherRouter.use(cors());
// Parse JSON bodies (as sent by API clients)
WeatherRouter.use(express.json());

// importing the custom functions.
import {verifyJWT } from "../utils/JWT";
const client = new Client({
    host: "ec2-54-235-104-136.compute-1.amazonaws.com",
    database: "d48g6qmc3oadt7",
    password: "c0cf6f4bbda0673b7ad0d1e7ccb302f0024267836d2c0866073ea715b43a8116",
    user: "vtzgyqdtpsmotu",
});
client.connect();

// Proxy request
WeatherRouter.post('/weather', verifyJWT, (request, response, next) => {
    const query = "select * from locations_data where country = $1 and city = $2 limit 1";
    client.query(query, [`${request.body.country}`, `${request.body.city}`])
        .then(res => response.status(200).send(res.rows[0]));
});

__construct();

module.exports = WeatherRouter;
