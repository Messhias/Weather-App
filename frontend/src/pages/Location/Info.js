import React from 'react';

// importing requests
import Weather from '../../request/Weather/Info';
import { getTemperature } from "../../utils/Functions";
import {NavLink} from "react-router-dom";

// getting the icons map list
import weatherIcon from '../../utils/icons';

// font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";

/**
 * Class responsible to track the icons data.
 */
export default class Info extends React.Component {
    /**
     * Default class constructor.
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            city: props.match.params && props.match.params.city ? props.match.params.city : false,
            country: props.match.params && props.match.params.country ? props.match.params.country : false,
            current_time: new Date(),
            sunrise: new Date(),
            sunset: new Date(),
            icon: "",
            weather_description: "",
            temperature: 0,
        };
    }

    /**
     * Default react life cycle function.
     */
    componentWillMount() {
        const { city = false, country = false } = this.state;

        Weather({city: city, country: country})
            .then(response => {
                const { status = 500 } = response;
                if (status === 200) {
                    const { data = [] } = response,
                        { info = [] } = data;
                    this._treatIconData(info);
                    this._setCurrentTime(info);
                    this._weatherDescription(info);
                    this._setTemperatureInfo(info);
                    this._setSunStages(info);
                }
            })
            .catch(error => {
                console.error(error);
                this.props.history.push('/');
            });
    }

    /**
     * Set up sunrise and sunset.
     *
     * @param data
     * @private
     */
    _setSunStages(data = []) {
        if (data.sys) {
            const sunrise = new Date(data.sys.sunrise);
            const sunset = new Date(data.sys.sunset);

            this.setState({ sunset, sunrise });
        }
    }

    /**
     * @param data
     * @private
     */
    _setTemperatureInfo(data = []) {
        if (data.main) {
            const temperature = getTemperature(data.main.temp);

            this.setState( { temperature });
        }
    }

    /**
     * Setting the weather description.
     *
     * @param data
     * @private
     */
    _weatherDescription(data = []) {
        if (data.weather.length > 0) {
            this.setState({ weather_description: data.weather[0].description });
        }
    }

    /**
     * Treat and set current time.
     *
     * @param data
     * @private
     */
    _setCurrentTime(data = []) {
        if (data.dt) {
            let current_time = new Date(data.dt);
            this.setState({ current_time });
        }
    }

    /**
     * Tracking icon data.
     *
     * @param data
     * @private
     */
    _treatIconData(data = []) {
        if (data.weather.length > 0 ) {
            const prefix = 'wi wi-';
            const code = data.weather[0].id;
            let icon = weatherIcon[code].icon;

            // If we are not in the ranges mentioned above, add a day/night prefix.
            if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
                icon = 'day-' + icon;
            }

            // Finally tack on the prefix.
            icon = prefix + icon;

            this.setState({ icon });
        }
    }

    /**
     * Default render function.
     *
     * @return {*}
     */
    render() {
        const {
            icon = "",
            city = "",
            weather_description = "",
            current_time = new Date(),
            sunrise = new Date(),
            sunset = new Date(),
            temperature = 0,
        } = this.state;

        return (
            <div
                className={'weather-info'}
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
                <div className={'row'}>
                    <div className={'column description-row'}>
                        <i className={`weather-icon ${icon}`} />
                        <div className={'weather-description'}>
                            {weather_description}
                        </div>
                    </div>
                    <div className={'column middle-row'}>
                        {current_time.getHours()}
                        <br/>
                        {current_time.getMinutes()}
                        <br/>
                        <div className={'blue-highlight'}>
                            {city}
                        </div>
                    </div>
                    <div className={'column sun-stages'}>
                        <div className={'row'}>
                            <div className={'weather-sys-info'}>
                                <i className={"wi wi-thermometer"}/>
                                {" "}{temperature}˚C
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'weather-sys-info'}>
                                <i className={"wi wi-sunrise"}/>
                                {`${sunrise.getHours()}:${sunrise.getMinutes()}`}
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'weather-sys-info'}>
                                <i className={"wi wi-sunset"}/>{" "}
                                {`${sunset.getHours()}:${sunset.getMinutes()}`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}