import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

// import Header from './scenes/Header';
import Scenes from './scenes';
import Dashboard from './scenes/Body/Dashboard';
import Members from './scenes/Body/Members';
import Books from './scenes/Body/Books';
import Publishers from './scenes/Body/Publishers';

import './Assets/css/configure.min.css';
// import SideBar from './scenes/SideBar';

import font from 'font-awesome/css/font-awesome.css'; // eslint-disable-line
import simpleLineIcons from 'simple-line-icons/css/simple-line-icons.css'; // eslint-disable-line
import materialIcons from 'material-design-icons/iconfont/material-icons.css'; // eslint-disable-line
// import ionIcons from 'ionicons/css/ionicons.css'; // eslint-disable-line

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <Header /> */}
          <div className="" style={{}}>
            <div className="">
              <div>
                <Route exact path='/login' component={Login} />  
                <Route exact path='/signup' component={Signup} />  
                <Route exact path='/' component={Dashboard} />  
                {/* <Route exact path='/dashboard' component={Dashboard} />   */}
                <Route exact path='/members' component={Members} />  
                <Route exact path='/books' component={Books} />
                <Route exact path='/publishers' component={Publishers} />  
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
