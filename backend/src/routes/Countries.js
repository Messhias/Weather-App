import express from "express";
const CountriesRouter = express();
import cors from 'cors';
// Parse URL-encoded bodies (as sent by HTML forms)
CountriesRouter.use(express.urlencoded({extended: true }));
CountriesRouter.use(cors());
// Parse JSON bodies (as sent by API clients)
CountriesRouter.use(express.json());

// importing the custom functions.
import {verifyJWT } from "../utils/JWT";
import {__construct} from "../utils/initApp";

const { Client } = require('pg');
const clientConstructor = new Client({
    host: "ec2-23-21-186-85.compute-1.amazonaws.com",
    database: "dfp4d40glbpd2f",
    password: "435c87d3d3c6eeca55c10d3914f3a514f867eac38ba5fb3830fe180fc1e20c2d",
    user: "uscomshhpttkvk",
});
clientConstructor.connect();


// Proxy request
// CountriesRouter.get('/home', (request, response, next) => {
CountriesRouter.get('/countries', verifyJWT, (request, response, next) => {
    const query = "select * from countries_list";
    client.query(query)
        .then(res => {
            __construct();
            response.status(200).send(res.rows);
        });
});

module.exports = CountriesRouter;
