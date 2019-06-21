import {__construct} from "./utils/initApp";

require("dotenv-safe").load();
const http = require('http');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

// importing the routes
import User from './routes/User';
import Home from './routes/Home';
import Weather from './routes/Weather';
import Countries from './routes/Countries';
import Location from './routes/Location';

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// constructing the application.
__construct();


// Proxy requests
app.use(User);
app.use(Home);
app.use(Weather);
app.use(Countries);
app.use(Location);

const server = http.createServer(app);
app.listen(process.env.PORT || 3000, function () {
    console.log("Express is working on port " + process.env.PORT || 3000);
});
