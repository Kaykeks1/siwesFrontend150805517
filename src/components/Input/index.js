import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { getPasswordScore } from 'services/passwordTester';
// import ErrorMessage from 'components/ErrorMessage';
import './Input.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'password',
    };
    this.showHidePassword = this.showHidePassword.bind(this);
  }

  showHidePassword(e) {
    e.preventDefault();
    this.setState({
      type: this.state.type === 'password' ? 'text' : 'password',
    });
  }

  render() {
    const {
      input: {
        name,
        onChange,
        onFocus,
        value,
      },
      meta: {
        touched,
        error,
        warning,
        dirty,
        active,
      },
      type,
      short,
      full,
      label,
      placeHolder,
      // validationErrorMsg,
      validationSuccessMsg,
      isDisabled,
      displayLabel,
      size,
      step,
      minLength,
      maxLength,
      // passwordMeter,
    } = this.props;

    let showLabel = null;

    if (displayLabel === true) {
      showLabel = <label className="input-label">{label}</label>;
    }
    // const passwordTestResult = getPasswordScore(String(value));

    const shortClass = (short) ? 'w-60' : '';
    const fullClass = (full) ? 'full' : '';

    return (
      <div className={`input-class ${fullClass}`}>
        <div className="label-section">
          {showLabel}
          {
              type === 'password' ?
                <button className="show-hide-btn" onClick={this.showHidePassword} tabIndex={-1}>
                  {this.state.type === 'password' ?
                      (<span><i className="fa fa-eye" /> <span>Show</span></span>) :
                      (<span><i className="fa fa-eye-slash" /> <span>Hide</span></span>)}
                </button> : null}
        </div>
        <input
          type={type === 'password' ? this.state.type : type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeHolder}
          disabled={isDisabled}
          size={size}
          step={step}
          minLength={minLength}
          maxLength={maxLength}
          tabIndex={0}
          className={`input ${shortClass}`}
        />
        <div className="validation-message">
          {
              validationSuccessMsg &&
              <div className="validation-message--success">{validationSuccessMsg}</div>
            }
          {/* {
              validationErrorMsg &&
              <div className="validation-message--errors">
                <ErrorMessage errors={validationErrorMsg} />
              </div>
            } */}
          {
              touched && error &&
              <div className="validation-message--errors"><span>{error}</span></div>
            }
          {
              active && dirty &&
              <div className="validation-message--help-text">{warning}</div>
            }
        </div>
        {/* {
          passwordMeter && value !== '' ? (
            <div>
              <div className="bar-container">
                <div className={`bar
                ${passwordTestResult === 0 ? 'bar-20' : ''}
                ${passwordTestResult === 1 ? 'bar-40' : ''}
                ${passwordTestResult === 2 ? 'bar-60' : ''}
                ${passwordTestResult === 3 ? 'bar-80' : ''}
                ${passwordTestResult === 4 ? 'bar-100' : ''}`}
                />
              </div>
              <p className="bar-text">
                {
                  passwordTestResult === 0 ? 'Very Weak Password' : ''
                }
                {
                  passwordTestResult === 1 ? 'Weak Password' : ''
                }
                {
                  passwordTestResult === 2 ? 'Fairly Good Password' : ''
                }
                {
                  passwordTestResult === 3 ? 'Strong Password' : ''
                }
                {
                  passwordTestResult === 4 ? 'Very Strong Password' : ''
                }
              </p>
            </div>
          ) : null
        } */}
      </div>
    );
  }
}

Input.defaultProps = {
  isDisabled: false,
  displayLabel: false,
  input: {
    name: '',
  },
  meta: {},
  label: '',
  validationErrorMsg: '',
  validationSuccessMsg: '',
  placeHolder: '',
  size: '',
  step: '',
  minLength: '',
  maxLength: '',
  passwordMeter: false,
  short: false,
  full: false,
};

Input.propTypes = {
  input: PropTypes.shape({}),
  meta: PropTypes.shape({}),
  type: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  validationErrorMsg: PropTypes.string,
  validationSuccessMsg: PropTypes.string,
  isDisabled: PropTypes.bool,
  displayLabel: PropTypes.bool,
  size: PropTypes.string,
  step: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  passwordMeter: PropTypes.bool,
  short: PropTypes.bool,
  full: PropTypes.bool,
};

export default Input;
