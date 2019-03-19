import React from 'react';
import Datetime from 'react-datetime';
import PropTypes from 'prop-types';
import 'react-datetime/css/react-datetime.css';
import '../../Assets/css/datetimePicker.min.css';

const DateTimePicker = (props) => {
  const {
    inputField: {
      onChange,
      value,
    },
    label,
    displayLabel,
    timeFormat,
    input,
    dateFormat,
    defaultValue,
    open,
    name,
    inputProps,
    disableOnClickOutside,
    closeOnSelect,
  } = props;

  let showLabel = null;

  if (displayLabel === true) {
    showLabel = <label className="datepicker-label">{label}</label>;
  }
  return (
    <div className="date-picker">
      {showLabel}
      <Datetime
        name={name}
        value={value}
        onChange={onChange}
        input={input}
        timeFormat={timeFormat}
        dateFormat={dateFormat}
        defaultValue={defaultValue}
        closeOnSelect={closeOnSelect}
        disableOnClickOutside={disableOnClickOutside}
        open={open}
        inputProps={inputProps}
        className="datepicker-container"
      />
    </div>
  );
};

DateTimePicker.defaultProps = {
  inputField: {},
  timeFormat: false,
  input: true,
  open: false,
  name: '',
  dateFormat: true,
  inputProps: {},
  label: '',
  displayLabel: false,
  closeOnSelect: false,
  disableOnClickOutside: false,
  defaultValue: '',
};

DateTimePicker.propTypes = {
  inputField: PropTypes.shape({}),
  name: PropTypes.string,
  input: PropTypes.bool,
  timeFormat: PropTypes.bool,
  dateFormat: PropTypes.bool,
  open: PropTypes.bool,
  inputProps: PropTypes.shape({}),
  label: PropTypes.string,
  displayLabel: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  disableOnClickOutside: PropTypes.bool,
  defaultValue: PropTypes.string,
};

export default DateTimePicker;
