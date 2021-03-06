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

// Proxy requests
app.use(User);
app.use(Home);
app.use(Weather);
app.use(Countries);
app.use(Location);

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('frontend/build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}
// constructing the application.
__construct();

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, function () {
    console.log("Express is working on port " + process.env.PORT || 3000);
});
