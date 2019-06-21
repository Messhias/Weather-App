import React from 'react';

// importing react router components.
import {NavLink} from "react-router-dom";

// importing the requests.
import CountriesList from '../../request/Countries/List';

// importing components.
import AutoComplete from '../../components/AutoComplete';

// font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";

// importing the requests
import AddLocation from '../../request/Locations/Add';

/**
 * Default class signature.
 *
 * This class is responsible to add new user city.
 */
export default class Add extends React.Component {
    /**
     * Initiate the class with the default constructor and creating the objects.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            selected: null,
        };

        // binding functions.
        this.addCity = this.addCity.bind(this);
    }

    /**
     * Default react life function.
     */
    componentWillMount() {
        this._fetchCountries()
    }

    /**
     * Fetching the countries list.
     * @private
     */
    _fetchCountries() {
        CountriesList()
            .then(response => {
                const { data = [] } = response;
                if (data.length > 0) {
                    this.setState({ countries: data });
                }
            })
            .catch(error => {
                if (error.response) {
                    if (!error.response.data.auth) {
                        this.props.history.push("/");
                    }
                }
            });
    }

    /**
     * @param countries
     * @return {*}
     * @private
     */
    _renderSelectBox(countries = []) {
        return <AutoComplete
            suggestions={countries}
            addCity={this.addCity}
        />
    }

    /**
     * Start the add new location process.
     * @param suggestion
     */
    addCity(suggestion = []) {
        this.setState({ selected: suggestion });
    }

    /**
     * Render the save button if there's some city selected.
     *
     * @param selected
     * @return {Array|*}
     * @private
     */
    static _renderSaveButton(selected = null) {
        if (selected) {
            return (
                <div>
                    {selected.capital}
                    <div className={'save-city-button'}>
                        <button
                            type={'submit'}
                        >
                            SAVE
                        </button>
                    </div>
                </div>
            );
        }

        return [];
    }

    /**
     * Send the data to api.
     *
     * @param event
     * @private
     */
    _submitForm(event) {
        event.preventDefault();
        const { selected = null } = this.state;

        if (selected) {
            AddLocation(selected)
                .then(response => {
                    const { data = false } = response;

                    if (data) this.props.history.push("/home");
                })
                .catch(error => {
                    if (error.response) {
                        if (!error.response.data.auth) {
                            this.props.history.push("/");
                        }
                    }
                });
        }
    }

    /**
     * Default render function.
     *
     * @return {*}
     */
    render() {
        const { countries = [], selected = [] } = this.state;

        if (countries.length === 0) {
            return  (
                <div>
                    Loading the view...
                </div>
            );
        }

        return (
            <div
                className={"add-page-container"}
            >
                <div
                    className={'back-button'}
                >
                    <NavLink
                        to={"/home"}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </NavLink>
                </div>
                <form
                    onSubmit={(e) => this._submitForm(e)}
                    className={'form-container'}
                >
                    {this._renderSelectBox(countries)}
                    {Add._renderSaveButton(selected)}
                </form>
            </div>
        );
    }
}