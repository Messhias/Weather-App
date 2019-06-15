import express from "express";
const HomeRouter = express();
import cors from 'cors';
// Parse URL-encoded bodies (as sent by HTML forms)
HomeRouter.use(express.urlencoded({extended: true }));
HomeRouter.use(cors());
// Parse JSON bodies (as sent by API clients)
HomeRouter.use(express.json());

// importing the custom functions.
import {verifyJWT, jwt} from "../utils/JWT";

// retrieving the AppStore
import {getCountriesList} from '../controllers/Home';



// Proxy request
HomeRouter.get('/home', (request, response, next) => {
// HomeRouter.get('/home', verifyJWT, (request, response, next) => {
    response.status(200).send(getCountriesList())
});

module.exports = HomeRouter;
