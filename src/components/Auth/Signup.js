import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import '../../Assets/css/signup.min.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is: {
        fetching: false,
        error: false,
        ok: false
      },
      error: null,
      auth: null,
    };
  }
  handleSubmit(e){
    this.setState({ is: {fetching: true, error: false, ok: false} })
    let firstName = this.refs.firstName.value;
    let lastName = this.refs.lastName.value;
    let libraryName = this.refs.libraryName.value;
    let email = this.refs.email.value;
    let phoneNumber = this.refs.phoneNumber.value;
    let password = this.refs.password.value;
    const self = this;
    axios.post('http://localhost:1337/user/signup',{
            firstName: firstName,
            lastName: lastName,
            libraryName: libraryName,
            email: email,
            phoneNumber: phoneNumber,
            password : password
    })
    .then((res)=>{
      console.log(res.data);
        if(res.data.authenticated===true){
          self.setState({ is: {fetching: false, error: false, ok: true} })
          console.log("signed up", res.data);
          localStorage.setItem('auth', res.data.authenticated);
          localStorage.setItem('user', res.data.id);
          console.log("user1: ",localStorage.getItem('user'));
          self.setState({auth: localStorage.getItem('auth')});
          console.log(localStorage.getItem('auth'));
        }
        else{
          self.setState({ is: {fetching: false, error: true, ok: false} })
          self.setState({ error: res.data.message });
            console.log("Not signed up", res.data);
        }
    })
    e.preventDefault();   
  }
  render() {
    if (this.state.auth) {
      console.log(localStorage.getItem('auth'));
      return <Redirect to="/" />;
    }
    const { is } = this.state;
    return (
      <div className="signup-page">
        <div className="signup-form">
          <form className="sign-up-form" onSubmit ={this.handleSubmit.bind(this)}>
            <label className="signup-label">Sign Up Form</label><br />
            <div className="signup-fields">
              <input
                className="signup-input"
                type="text"
                placeHolder="First Name"
                ref="firstName"
              /><br />
              <input
                className="signup-input"
                type="text"
                placeHolder="Last Name"
                ref="lastName"
              /><br />
              <input
                className="signup-input"
                type="text"
                ref="libraryName"
                placeHolder="Library Name"
              /><br />
              <input
                className="signup-input"
                type="text"
                ref="email"
                placeHolder="Email Address"
              /><br />
              <input
                className="signup-input"
                type="number"
                ref="phoneNumber"
                placeHolder="Mobile Number"
              /><br />
              <input
                className="signup-input"
                type="password"
                ref="password"
                placeHolder="Password"
              /><br />
            </div>
            <span className="signup-question">Already have an account? <Link to="/login">Login</Link></span>
            <button
              className="signup-btn"
              type="submit"
              name="submit"
            >
              { is.fetching ? 'Please wait' : 'Signup'}
              <i className={`fa ${(is.fetching) ? 'fa-circle-o-notch fa-spin float-right' : ''}`} /><br />
            </button>
            {this.state.error &&
              <span className="signup-error">{this.state.error}</span>
            }
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const selector = formValueSelector('signupForm');
  return {
    formFields: selector(state, 'firstName', 'lastName', 'libraryName', 'email', 'phoneNumber', 'passsword'),
  };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'signupForm',
})(Signup));
