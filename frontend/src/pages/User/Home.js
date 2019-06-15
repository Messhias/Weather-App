import React from 'react';

// app store
import AppStore from '../../stores/AppStore';

// font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

// importing the requests into the api.
import HomeRequest from '../../request/User/Home';

// nav link to routes import
import {NavLink} from "react-router-dom";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countriesList: [],
            myLocations: [],
        };
    }

    componentWillMount() {
        if (AppStore.getUser() === null) this.props.history.push("/");
        HomeRequest()
            .then(response => {
                const { status = 500 } = response;
                if (status === 200) {
                    const { data = [] } = response;
                    this.setState({ ...data });
                }
            })
            .catch(error => console.error(error));
    }

    _renderMyCurrentLocations(myLocations = []) {
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
            locations = this._renderMyCurrentLocations(myLocations);

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