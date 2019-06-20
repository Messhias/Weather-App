import React from 'react';

// importing the routes.
import Login from '../../request/User/Login';

// getting the app store application.
import AppStore from '../../stores/AppStore';

import { withRouter } from "react-router-dom";
import {eraseStorageUser, storageUser} from "../../utils/Functions";


/**
 * Default class signature.
 *
 * This class is responsible to control the form component.
 */
class Form extends React.Component {
    /**
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    /**
     * @param event
     * @private
     */
    _onSubmit(event) {
        event.preventDefault();
        const {
            email,
            password
        } = this.state;

        if (email && password) {
            const data = { email,  password };
            Login(data)
                .then(response => {
                    const { status = 500 } = response;

                    if (status === 200) {
                        const { data = null } = response;
                        if (data) {
                            const { auth = false } = data;

                            if (auth) {
                                eraseStorageUser();
                                storageUser(data);
                                AppStore.setUser(data);

                                // uncomment the lines bellow if you want to add the user data to the localStorage.
                                AppStore.setPage("/home");
                                this.props.history.push('home');
                            }
                        }
                    } else {
                        eraseStorageUser();
                        AppStore.setUser(null);
                        this.props.history.push("/");
                    }
                })
                .catch(error => console.error(error));
        }
    }

    /**
     * @param event
     * @private
     */
    _inputOnChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    /**
     * @return {*}
     */
    render() {
        return (
            <div
                className={'login-container'}
            >
                <form
                    onSubmit={event => this._onSubmit(event)}
                >
                    <div>
                        <label htmlFor={'username'}>
                            username
                        </label>
                        <input
                            type={'text'}
                            onChange={event => this._inputOnChange(event)}
                            id={'email'}
                            name={'name'}
                        />
                    </div>
                    <div>
                        <label htmlFor={'password'}>
                            password
                        </label>
                        <input
                            type={'password'}
                            onChange={event => this._inputOnChange(event)}
                            id={'password'}
                            name={'password'}
                        />
                    </div>
                    <div>
                        <button>
                            LOGIN
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(Form);