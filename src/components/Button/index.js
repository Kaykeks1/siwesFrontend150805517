import React from 'react';
import PropTypes from 'prop-types';
import '../../Assets/css/button.min.css';

const Button = (props) => {
  const {
    type,
    buttonClass,
    isDisabled,
    is,
    showSpinner,
    onClick,
    style,
  } = props;

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={isDisabled || is.fetching}
      onClick={onClick}
      style={style}
      tabIndex={0}
    >
      {(is.fetching && showSpinner) ? 'Please wait' : props.children}
      <i className={`fa ${(is.fetching && showSpinner) ? 'fa-circle-o-notch fa-spin float-right' : ''}`} />
    </button>
  );
};

Button.defaultProps = {
  is: {},
  showSpinner: false,
  buttonClass: '',
  onClick: () => {},
  style: {},
  isDisabled: false,
  children: '',
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  buttonClass: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.shape({}),
  isDisabled: PropTypes.bool,
  is: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.bool,
  ]),
  showSpinner: PropTypes.bool,
  children: PropTypes.node,
};

export default Button;
