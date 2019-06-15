import { EventEmitter } from "events";

// default imports.
import Axios from 'axios';
import dispatcher from "./dispatcher";

import loki from 'lokijs';

const db = new loki();

// reseting database
db.removeCollection("countriesList");
db.removeCollection("myLocations");
db.saveDatabase();

/**
 * Default class signature.
 */
class AppStore extends EventEmitter {
    /**
     * Default class constructor.
     */
    constructor() {
        super();
        this.myLocations = db.addCollection("myLocations");
        this.countriesList = db.addCollection("countriesList");

        this.myLocations.insert([
            {
                city: "Budapest",
                country:"HU"
            },
            {
                city: "Berlin",
                country: "DE",
            }
        ]);
    }

    /**
     * Fetching the countries list.
     */
    fetchCountriesList() {
        Axios("https://restcountries.eu/rest/v2/all")
            .then(response => {
                const { status = 500 } = response;
                if (status === 200) {
                    const { data = [] } = response;
                    this.setCountriesList(data);
                }
            })
            .catch(error => console.error(error));
    }

    /**
     * Inserting the list of countries list with primary information.
     *
     * @param list
     */
    setCountriesList(list = []) {
        this.countriesList.insert(list);
        this.emit("set_countrie_list");
    }

    /**
     * Retrieving the information of the countries list.
     *
     * @return {any}
     */
    getCountriesList() {
        return this.countriesList.data;
    }

    /**
     * @param action
     * @param data
     */
    change(action, data) {
        this.emit('change');
        this.emit('change_' + action, data);
    }

    /**
     * Setting up a new location.
     *
     * @param location
     */
    setLocation(location = []) {
        this.myLocations.push(location);
        this.emit("add_location");
    }

    /**
     * Getting all the myLocations.
     *
     * @return {*[]|*}
     */
    getMyLocations() {
        return this.myLocations.data;
    }

    /**
     * Function to set location data.
     * Here we get the location which we want to update and after filter based in all the location
     * that we have at moment we set a new location or update a existing one.
     *
     * @param location
     * @param data
     */
    setLocationData(location = [], data = []) {
        if (location.length > 0 && location) {
            const filtered = this.getMyLocations()
                .filter(myLocationstore => locationStore.country === location.country
                    &&
                    locationStore.city === location.city
                );

            if (filtered.length > 0) {
                filtered[0].push(data);
                this.setLocation(filtered[0]);
            } else {
                location[0].push(data);
                this.setLocation(location);
            }
            this.emit("updated_location_data");
        }
    }

    /**
     * Returning the specific location data based on location.
     *
     * @param location
     * @return {T[]|Array}
     */
    getMyLocationsData(location = []) {
        if (location.length > 0 && location) {
            return this.getMyLocations()
                .filter(locationStore => locationStore.country === location.country
                    &&
                    locationStore.city === location.city
                );
        }

        return [];
    }

    /**
     * @param user
     */
    setUser(user) {
        this.user = user;
        this.change('user');
    }

    /**
     *
     * @param action
     * @return {*}
     */
    static handleActions(action) {
        return action;
    }
}

const store = new AppStore();

dispatcher.register(AppStore.handleActions.bind(store));

export default store;
