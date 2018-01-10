import React from 'react';
import './Skip.css';

const Skip = () => (
  <div className="skip-input">
    <button className="btn skip-btn">
      <i className="fa fa-fast-backward" />
    </button>
    <button className="btn skip-btn">
      <i className="fa fa-fast-forward" />
    </button>
  </div>
);

export default Skip;
