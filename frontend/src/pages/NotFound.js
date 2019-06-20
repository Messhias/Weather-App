import React from 'react';

import {NavLink} from "react-router-dom";

/**
 * Stateless component for page not found.
 *
 * @return {*}
 */
export default () => (
    <div
        className={'page-not-found'}
    >
        <div
        className={'back-button'}
        >
            <NavLink
                to={"/home"}
            >
                {'<'}
            </NavLink>
        </div>
        <p>
            Page not found.
        </p>
    </div>
)