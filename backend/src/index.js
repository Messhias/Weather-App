require("dotenv-safe").load();
const http = require('http');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
import AppStore from './store/AppStore';

// importing the routes
import User from './routes/User';
import Home from './routes/Home';

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// fetching the countries
AppStore.fetchCountriesList();

// Proxy requests
app.use(User);
app.use(Home);

const server = http.createServer(app);
server.listen(3000);
