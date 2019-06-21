import {__construct} from "../utils/initApp";

const WeatherRouter = express();
import express from "express";
import cors from 'cors';

// Parse URL-encoded bodies (as sent by HTML forms)
WeatherRouter.use(express.urlencoded({extended: true }));
WeatherRouter.use(cors());

// Parse JSON bodies (as sent by API clients)
WeatherRouter.use(express.json());

// importing JWT functions.
import {verifyJWT } from "../utils/JWT";

const { Client } = require('pg');
const client = new Client({
    host: "ec2-23-21-186-85.compute-1.amazonaws.com",
    database: "dfp4d40glbpd2f",
    password: "435c87d3d3c6eeca55c10d3914f3a514f867eac38ba5fb3830fe180fc1e20c2d",
    user: "uscomshhpttkvk",
});
client.connect();

// Proxy request
WeatherRouter.post('/weather', verifyJWT, (request, response, next) => {
    __construct();
    const query = "select * from locations_data where country = $1 and city = $2 limit 1";
    client.query(query, [`${request.body.country}`, `${request.body.city}`])
        .then(res => response.status(200).send(res.rows[0]))
        .catch(e => console.error(e));
});

module.exports = WeatherRouter;
