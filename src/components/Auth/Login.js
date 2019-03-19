import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
// import Button from './Button'
import '../../Assets/css/login.min.css';

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
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    const self = this;
    axios.post('http://localhost:1337/user/login',{
            // headers: {"Content-Type": "application/json"},
            email: email,
            password : password
    })
    .then((res)=>{
      console.log(res.data);
        if(res.data.authenticated===true){
          self.setState({ is: {fetching: false, error: false, ok: true} })
          // alert("logged in");
          console.log("logged in", res.data);
          localStorage.setItem('auth', res.data.authenticated);
          localStorage.setItem('user', res.data.id);
          console.log("user1: ",localStorage.getItem('user'));
          self.setState({auth: localStorage.getItem('auth')});
          console.log(localStorage.getItem('auth'));
        }
        else{
          self.setState({ is: {fetching: false, error: true, ok: false} })
          self.setState({ error: res.data.message })
            console.log("Not logged in", res.data);
        }
    })
    e.preventDefault();
    
}
  render() {
    console.log(this.state.auth);
    if (this.state.auth) {
      console.log(localStorage.getItem('auth'));
      return <Redirect to="/" />;
    }
    console.log(this.state.is);
    const { is } = this.state;
    return (
      <div className="login-page">
        <div className="login-form">
          <form className="log-in-form" onSubmit ={this.handleSubmit.bind(this)}>
            <label className="login-label"> Login Form</label><br />
            <div className="login-fields">
              <input
                className="login-input"
                type="text"
                // name="email"
                ref="email"
                placeholder="Email Address"
              /><br />
              {/* <label  className="login-label">Password</label><br /> */}
              <input
                className="login-input"
                type="password"
                // name="password"
                ref="password"
                placeholder="Password"
              /><br />
            </div>
              <span className="login-question">Don't have an account? <Link to="/signup">Sign Up</Link></span>
              <button
                className="login-btn"
                type="submit"
                value="Login"
                name="submit"
              >
              { is.fetching ? 'Please wait' : 'Login'}
              <i className={`fa ${(is.fetching) ? 'fa-circle-o-notch fa-spin float-right' : ''}`} /><br />
              </button>
              <div>
                {this.state.error &&
                  <span className="login-error">{this.state.error}</span>
                }
              </div>
            </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const selector = formValueSelector('signupForm');
  return {
    formFields: selector(state, 'email', 'passsword'),
  };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'signupForm',
})(Signup));
