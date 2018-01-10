import React from 'react';
import './MinuteInput.css';

class MinuteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: props.value };
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  };
  onChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;
    const { onBlur } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="minute-input"
          type="number"
          autoFocus
          value={value}
          min="1"
          onChange={this.onChange}
          onBlur={onBlur}
        />
      </form>
    );
  }
}

export default MinuteInput;
