import React from 'react';

const CitiesList = props => (
  <ul className="list-group">
    {props.cities.map((el, i) => (
      <li className="list-group-item list-group-item-action" key={i}>{el.city}</li>
    ))}
  </ul>
);

export default CitiesList;
