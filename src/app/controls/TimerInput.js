import React from 'react';
import './TimerInput.css';
import MinuteInput from './timerInput/MinuteInput';

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
    const { value, onChange } = this.props;
    onChange(value + 1);
  };
  decrement = e => {
    e.stopPropagation();
    const { value, onChange } = this.props;
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  };
  endEdit = () => {
    this.setState({ isEditing: false });
  };

  render() {
    const { isEditing } = this.state;
    const { label, value, onChange } = this.props;
    return (
      <div className="timer-input">
        <h3>{label}</h3>
        <div onClick={this.startEdit}>
          <button className="btn" onClick={this.decrement}>
            -
          </button>
          {isEditing ? (
            <MinuteInput
              value={value}
              onSubmit={value => {
                this.endEdit();
                onChange(value);
              }}
              onBlur={this.endEdit}
            />
          ) : (
            <span>{value}</span>
          )}
          <button className="btn" onClick={this.increment}>
            +
          </button>
        </div>
      </div>
    );
  }
}

export default TimerInput;
