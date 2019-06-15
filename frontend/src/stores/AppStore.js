import { EventEmitter } from "events";

import dispatcher from "./Dispatcher";
import Constants from '../constants/AppConstants';

/**
 * Default class signature.
 *
 * This class it'll represents all the state of the application with their objects
 */
class AppStore extends EventEmitter {
    /**
     * Default class constructor.
     *
     * Init the main class attributes.
     */
    constructor() {
        super();
        this.user = null;
        this.page = null;
    }

    /**
     * Main emmit change.
     *
     * @param action
     * @param data
     */
    change(action, data) {
        this.emit('change');
        this.emit('change_' + action, data);
    }

    /**
     * Set new user data.
     *
     * @param user
     */
    setUser(user) {
        this.user = user;
        this.change('user');
    }

    /**
     * Retrieving the user data.
     *
     * @return {null}
     */
    getUser() {
        return this.user;
    }

    /**
     * Setting the page into the state application.
     *
     * @param page
     */
    setPage(page) {
        this.page = page;
        this.change('page');
    }

    /**
     * Getting the previously state page.
     *
     * @return {null}
     */
    getPage() {
        return this.page;
    }

    /**
     * Handling all the actions into the state management.
     *
     * @param action
     * @return {*}
     */
    handleActions(action) {
        const { actions } = Constants;
        switch (action.type) {
            case actions.SET_USER:
                this.setUser(action.user);
            break;

            case actions.SET_PAGE:
                this.setPage(action.page);
                break;

            default: return action;
        }
    }
}

const store = new AppStore();

dispatcher.register(store.handleActions.bind(store));

export default store;
