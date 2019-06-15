import React from 'react';

// importing the react router components.
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// importing all pages component.
import Pages from '../pages/AllPages';

/**
 * Mounting dynamically all the routes.
 *
 * @return {*[]}
 */
function makeRoutes() {
    const paths = {
        "/": Pages.User.Login,
        "/login": Pages.User.Login,
        "/logout": Pages.User.Logout,
        "/home": Pages.User.Home,
    };

    return Object.keys(paths).map(path => {
        return (
            <Route
                exact
                key={path}
                path={path}
                component={paths[path]}
            />
        );
    });
}

export default class Routes extends React.Component {

    render() {
        return (
            <div id="wrapper">
                <Router
                    basename={"#"}
                    ref="route"
                >
                    <Switch>
                        {makeRoutes()}
                        <Route component={Pages.NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}