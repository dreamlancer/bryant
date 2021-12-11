import React from 'react';
import Autosuggest from 'react-autosuggest';
import { observer } from 'mobx-react';

import './InputSuggest.scss';

class InputSuggest extends React.Component {
  constructor() {
    super();

    this.state = {
      values: null,
      value: null,
      suggestions: [],
      required: null,
      defaultValue: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if (props.defaultValue !== state.defaultValue) {
      newState.value = props.defaultValue;
      newState.defaultValue = props.defaultValue;
    }
    if (props.required !== state.required) {
      if (props.values) {
        const lowercaseCountries = props.values.map(item =>
          item.name.toLowerCase()
        );
        const uppercaseCountries = props.values.map(item => item.name);
        props.field.set(
          'rules',
          props.required
            ? `required|string|in:${lowercaseCountries.concat(
                uppercaseCountries
              )}`
            : ''
        );
      }
      newState.required = props.required;
    }
    if (props.values !== state.values) {
      if (props.values && props.required) {
        const lowercaseCountries = props.values.map(item =>
          item.name.toLowerCase()
        );
        const uppercaseCountries = props.values.map(item => item.name);
        props.field.set(
          'rules',
          `${
            props.required ? 'required|' : ''
          }string|in:${lowercaseCountries.concat(uppercaseCountries)}`
        );
      }

      newState.values = props.values;
    }
    return newState;
  }

  onChange = (e, { newValue }) => {
    const { id, handleCountrySelect, field } = this.props;

    if (id === 'country') {
      handleCountrySelect(newValue);
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }

    field.set(newValue);
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    const suggestions = this.getSuggestions(value);

    this.setState({
      suggestions,
    });
  };

  findValue = value => {
    const { values } = this.props;

    return values.filter(
      country => country.name.toLowerCase() === value.toLowerCase()
    );
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const { values } = this.props;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 || !values || values === undefined
      ? []
      : values.filter(
          country =>
            country.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.name;

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => <div>{suggestion.name}</div>;

  render() {
    const { value, suggestions, defaultValue } = this.state;
    const { placeholder, values, field, req } = this.props;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      ...field.bind({
        placeholder: !values ? 'Select a Country' : placeholder || '',
        onChange: this.onChange,
        value: value || value === '' ? value : defaultValue,
        disabled: !values && !defaultValue,
        autoComplete: 'off',
      }),
    };

    return (
      <div className="field-wrapper">
        <div className="measure">
          <div className="light-silver">
            {field.label}
            {req && <span className="highlight">*</span>}
          </div>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            highlightFirstSuggestion
            id={this.props.id}
          />
          <small className="error red">{field.error}</small>
        </div>
      </div>
    );
  }
}

export default observer(InputSuggest);
