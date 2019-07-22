import React, { Component, Fragment } from 'react';
import CitiesList from './CitiesList';

export default class Autocomplete extends Component {
  static defaultProperty = {
    suggestions: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: '',
      cities: [],
    };
  }

  onChange = (e) => {
    // eslint-disable-next-line
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // eslint-disable-next-line
    const filteredSuggestions = suggestions.filter(
      suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.target.value,
    });
  };

  onClick = (e) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.target.innerText,
    });
  };

  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  onSubmit = (e) => {
    const { userInput } = this.state;
    e.preventDefault();
    switch (userInput) {
      case 'Poland':
      case 'Germany':
      case 'Spain':
      case 'France':
        console.log('submit');
        this.searchPollutionCities(e);
        break;
      default:
        console.log('sorry, this country is unavailable');
    }
  }

  searchPollutionCities = (e) => {
    e.preventDefault();
    const { userInput } = this.state;
    const replaceCountryString = (country) => {
      switch (country) {
        case 'Poland':
          return 'PL';
        case 'Germany':
          return 'DE';
        case 'Spain':
          return 'ES';
        case 'France':
          return 'FR';
        default:
          return null;
      }
    };

    fetch(`https://api.openaq.org/v1/cities?country=${replaceCountryString(userInput)}&order_by[]=count&sort=desc&limit=10`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json()).then((data) => {
      console.log(data.results);
      this.setState({
        cities: [...data.results],
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { cities } = this.state;
    const {
      onChange,
      onClick,
      onKeyDown,
      onSubmit,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
      },
    } = this;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className; // eslint-disable-line

              if (index === activeSuggestion) {
                className = 'active';
              }

              return (
                // eslint-disable-next-line
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <div className="row">
          <div className="container-fluid bg-light d-flex justify-content-center p-3">
            <div className="container d-flex justify-content-center inputSection">
              <div className="inputSection">
                <form className="form-inline" onSubmit={onSubmit}>
                  <div className="form-group mb-2">
                    <input
                      className="form-control"
                      type="text"
                      tabIndex="0"
                      placeholder="Search country"
                      onChange={onChange}
                      onKeyDown={onKeyDown}
                      value={userInput || ''}
                    />
                    {suggestionsListComponent}
                  </div>
                  <button type="submit" className="btn btn-outline-secondary mb-2">Search</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container d-flex justify-content-center">
            <CitiesList cities={cities} />
          </div>
        </div>
      </Fragment>
    );
  }
}
