import React from 'react';
import './SourceLink.css';

const SourceLink = () => (
  <a id="source-link" href={process.env.REACT_APP_SOURCE_URL} alt="Source url">
    <i className="fa fa-github" />
  </a>
);

export default SourceLink;
