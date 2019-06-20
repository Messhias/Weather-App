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
const client = new Client({
    host: process.env.POSTGRES_HOST,
    database: "benestudio",
    password: "benestudio",
    user: "benestudio",
});
client.connect();


// Proxy request
// CountriesRouter.get('/home', (request, response, next) => {
CountriesRouter.get('/countries', verifyJWT, (request, response, next) => {
    const query = "select * from countries_list";
    client.query(query)
        .then(res => {
            response.status(200).send(res.rows);
        });
});

__construct();

module.exports = CountriesRouter;
