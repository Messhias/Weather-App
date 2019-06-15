require("dotenv-safe").load();
const http = require('http');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

// importing the routes
import User from './routes/User';

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Proxy requests
app.use(User);

const server = http.createServer(app);
server.listen(3000);
