import React, { Component } from 'react';

import InputField from './InputField';

export default class App extends Component {
  state={ search: '' }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      search: e.target.value,
    });
  }

  render() {
    const { search } = this.state;
    return (
      <InputField />
    );
  }
}
