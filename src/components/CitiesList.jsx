import React from 'react';
import PropTypes from 'prop-types';

const CitiesList = ({ cities }) => (
  <ul className="list-group">
    {cities.map(el => (
      <li className="list-group-item list-group-item-action" key={el.city}>{el.city}</li>
    ))}
  </ul>
);

CitiesList.propTypes = {
  cities: PropTypes.array.isRequired, // eslint-disable-line
};


export default CitiesList;
