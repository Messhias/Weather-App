import React from 'react';

// importing the prop types
import PropTypes from "prop-types";

// font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

/**
 * Auto complete component class.
 */
export default class AutoComplete extends React.Component {
    /**
     * Default class constructor.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            suggestion: [],
            value: "",
            selected: [],
        }
    }

    /**
     * Set upt the propTypes to strict array prop types.
     * @type {{suggestions: *}}
     */
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };

    /**
     * Setting up the default prop types.
     * @type {{suggestions: Array}}
     */
    static defaultProps = {
        suggestions: []
    };

    /**
     * Input text on change event.
     * @param event
     */
    onChange(event) {
        const userInput = event.currentTarget.value;
        const { suggestions } = this.props;
        this.setState({ value: userInput });

        if (userInput !== "")  {
            // Filter our suggestions that don't contain the user's input
            const filteredSuggestions = suggestions.filter(
                suggestion =>
                    suggestion.capital.toLowerCase().indexOf(userInput.toLowerCase()) > -1
            );

            this.setState({ suggestions: filteredSuggestions.slice(0, 8) });
        } else this.setState({ suggestions: [] });
    }

    /**
     * Prepare data to add new city.
     * @param suggestions
     */
    addCity(suggestions = []) {
        this.setState({ suggestions: [], value: "" });
        this.props.addCity(suggestions);
    }

    /**
     * Highlight the characters.
     *
     * @param suggestion
     * @param value
     * @return {*}
     * @private
     */
    _highLightText(suggestion = [], value = "") {
        let index = suggestion.capital.toLowerCase().indexOf(value.toLocaleLowerCase());

        if (index !== 0) {
            return (
                <li
                    key={suggestion.id}
                    onClick={() => this.addCity(suggestion)}
                >
                    {suggestion.capital.substring(0,index)}<span className='highlight'>{suggestion.capital.substring(index,index+value.length)}</span>{suggestion.capital.substring(index + value.length)}
                </li>
            );
        } else {
            return (
                <li
                    key={suggestion.id}
                    onClick={() => this.addCity(suggestion)}
                >
                    {suggestion.capital}
                </li>
            );
        }
    }

    /**
     * Container for suggestions list.
     * @param suggestions
     * @param value
     * @return {*}
     * @private
     */
    _renderSuggestionsList(suggestions = [], value = "") {
        return (
            <div
                className={'suggestions-list'}
            >
                <ul>
                    {suggestions.map(s =>
                        this._highLightText(s, value)
                    )}
                </ul>
            </div>
        )
    }

    /**
     * Default render function.
     * @return {*}
     */
    render() {
        const {
            value = "",
            suggestions = [],
        } = this.state;

        return (
            <div
                className={"add-page-input"}
            >
                <div className={'arrow-right'}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
                <input
                    type={'text'}
                    value={value}
                    onChange={(e) => this.onChange(e)}
                />
                {this._renderSuggestionsList(suggestions, value)}
            </div>
        );
    }
}