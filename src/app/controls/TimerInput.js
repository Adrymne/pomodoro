import React from 'react';
import './TimerInput.css';

class TimerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };
  }

  startEdit = () => {
    this.setState({ isEditing: true });
  };
  increment = e => {
    e.stopPropagation();
  };
  decrement = e => {
    e.stopPropagation();
  };

  render() {
    const { isEditing } = this.state;
    const { label, value } = this.props;
    return (
      <div className="timer-input">
        <h3>{label}</h3>
        <div onClick={this.startEdit}>
          <button className="btn" onClick={this.decrement}>
            -
          </button>
          {isEditing ? <input value={value} /> : <span>{value}</span>}
          <button className="btn" onClick={this.increment}>
            +
          </button>
        </div>
      </div>
    );
  }
}

export default TimerInput;
