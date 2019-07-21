import React from 'react';
import Autocomplete from './Autocomplete';

const InputField = () => (
  <div className="container-fluid bg-light d-flex justify-content-center">
    <div className="container d-flex justify-content-center">
      <div className="row">
        <div className="inputSection">
          <Autocomplete suggestions={['Poland', 'Germany', 'Spain', 'France']} />
        </div>
      </div>
    </div>
  </div>
);

export default InputField;
