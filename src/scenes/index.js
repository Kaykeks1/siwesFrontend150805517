import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header';
import '../Assets/css/scenes.min.css';
import SideBar from './SideBar';

class Scenes extends Component {
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
  componentWillMount() {
    var self = this;
    self.setState({auth: localStorage.getItem('auth')});
    console.log(self.state.auth);
  }
  // som() {
  //   var self = this;
  //   self.setState({auth: localStorage.getItem('auth')});
  //   console.log(self.state.auth);
  // }
  render() {
    // this.som.bind(this);
    localStorage.getItem('auth')
    console.log(this.state.auth);
    if (!this.state.auth) {
      console.log(localStorage.getItem('auth'));
      return <Redirect to="/login" />;
    }
    return (
        <div className="dashboard">
        <div className="side-bar"><SideBar /></div>
        <main className="main-content">
          {/* <Header /> */}
          <div className="content">
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}

export default Scenes;
