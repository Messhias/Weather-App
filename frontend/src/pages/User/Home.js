import React from 'react';

// font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

// importing the requests into the api.
import HomeRequest from '../../request/User/Home';

// nav link to routes import
import {NavLink} from "react-router-dom";
import {getStoredUser} from "../../utils/Functions";

/**
 * Default class signature.
 *
 * Home page class, that responsible to show my cities list.
 */
export default class Home extends React.Component {
    /**
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            countriesList: [],
            myLocations: [],
        };
    }

    /**
     * Default react life cycle function.
     */
    componentWillMount() {
        if (!getStoredUser()) this.props.history.push("/");
        HomeRequest()
            .then(response => {
                const { status = 500 } = response;
                if (status === 200) {
                    const { data = [] } = response;
                    this.setState({ myLocations: data });
                }
            })
            .catch(error => {
                if (!error.response.data.auth) {
                    this.props.history.push("/");
                }
            });
    }

    /**
     * @param myLocations
     * @return {Array}
     * @private
     */
    static _renderMyCurrentLocations(myLocations = []) {
        const view = [];
        if (myLocations.length > 0) {
            view.push(myLocations.map(location =>
                <p
                    key={`location-link-${location.city}-${location.country}`}
                >
                    <NavLink
                        to={`/info/${location.city}/${location.country}`}
                    >
                        {location.city}
                    </NavLink>
                </p>
            ));
        }

        return view;
    }

    render() {
        const { myLocations = [] } = this.state,
            locations = Home._renderMyCurrentLocations(myLocations);

        return (
            <div
                className={'home-page-container'}
            >
                {locations}
                <p>
                    <NavLink
                        to={`/add-location`}
                    >
                        <FontAwesomeIcon icon={faPlus}/>
                    </NavLink>
                </p>
            </div>
        );
    }
}