import express from "express";
const UserRouter = express();
import cors from 'cors';
// Parse URL-encoded bodies (as sent by HTML forms)
UserRouter.use(express.urlencoded({extended: true }));
UserRouter.use(cors());
// Parse JSON bodies (as sent by API clients)
UserRouter.use(express.json());

// importing the custom functions.
import { jwt } from "../utils/JWT";

/**
 * Login route
 *
 * @return mixed
 */
UserRouter.route("/login").post(function(request, response){
    if (request.body) {
        if(request.body.email === 'jobs@benestudio.io' && request.body.password === '123'){
            //auth ok
            const id = 1; // user id
            const token = jwt.sign({ id }, process.env.SECRET, {expiresIn: 3000 });
            response.status(200).send({ auth: true, token: token });
        }
    } else {
        response.status(401).send('Invalid login!');
    }
    response.status(401).send();
});

/**
 * Logout route.
 *
 * @return mixed
 */
UserRouter.get('/logout', function(request, response) {
    response.status(200).send({ auth: false, token: null });
});

module.exports = UserRouter;