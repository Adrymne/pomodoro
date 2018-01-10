import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import './Skip.css';

const Skip = ({ onSkip, onReset }) => (
  <div className="skip-input">
    <button className="btn skip-btn" onClick={onReset}>
      <i className="fa fa-fast-backward" />
    </button>
    <button className="btn skip-btn" onClick={onSkip}>
      <i className="fa fa-fast-forward" />
    </button>
  </div>
);

const mapDispatchToProps = {
  onSkip: actions.nextPhase,
  onReset: actions.resetPhase
};

export default connect(undefined, mapDispatchToProps)(Skip);
