import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import '../../Assets/css/sideBar.min.css';
import library from '../../Assets/images/library.PNG';
import home from '../../Assets/images/home.png';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          is: {
            fetching: false,
            error: false,
            ok: false
          },
          error: null,
          auth: true,
        };
      }
      componentDidMount() {
          if (!localStorage.getItem('user')) {
            this.setState({auth: false})
          }
      }
    handleLogout(e){
        console.log('yo');
        this.setState({ is: {fetching: true, error: false, ok: false} })
        // let email = this.refs.email.value;
        // let password = this.refs.password.value;
        const self = this;
        axios.post('http://localhost:1337/user/logout', {
            user: localStorage.getItem('user')
        })
        .then((res)=>{
          console.log(res.data);
            if(res.data.status){
              self.setState({ is: {fetching: false, error: false, ok: true} })
              // alert("logged in");
              console.log("logged out", res.data);
              localStorage.setItem('auth', false);
              localStorage.removeItem('user');
              self.setState({auth: false});
              console.log(localStorage.getItem('auth'));
              // return <Redirect to="/" />;
                // //x=data.user;
                // // self.setState({userId:data.user});
                // localStorage.setItem('log',true);
                // console.log(localStorage.getItem('log'));
                // localStorage.setItem('user',res.data.user);
                // localStorage.setItem('name',res.data.Uname);
                // localStorage.setItem('email',res.data.Email);
                // // <Redirect to ='Dashboard' component={Dashboard} />
                // console.log(res.data);
                // self.setState({move:!self.state.move})
            }
            else{
              self.setState({ is: {fetching: false, error: true, ok: false} })
              self.setState({ error: res.data.message })
                // <Redirect to ='Login' />
                // alert("Not logged in");
                console.log("Not logged out", res.data);
                console.log(localStorage.getItem('user'));

            }
        })
        .catch((error)=>{
            console.log(error);
        })
        e.preventDefault();
        
    }
  render() {
    // console.log("sidebar user: ",localStorage.getItem('user').id);
    console.log("sidebar", !this.state.auth);
    if (!this.state.auth) {
      console.log("sidebar", localStorage.getItem('auth'));
      return <Redirect to="/login" />;
    }
    return (
      <div className="sideBar-list">
        <div className="sideBar-top">
            <div className="libSys">LIBRARY MANAGEMENT SYSTEM</div>
            <img src={library} className="libraryLogo" alt="library"/>
        </div>
        <div style={{textAlign: 'left'}}>
            <ul className="list-ul">
                <li>
                    <Link to="/">
                        <div className="item-link"><i className="fa fa-dashboard" style={{color: 'rgb(238, 238, 238)'}} />  Dashboard</div>
                    </Link> 
                </li>
                <li>
                    <Link to="/members">
                        <div className="item-link"><i className="fa fa-user" style={{color: 'rgb(238, 238, 238)'}} /> Members</div>
                    </Link> 
                </li>
                <li>
                    <Link to="/books">
                        <div className="item-link"><i className="fa fa-book" style={{color: 'rgb(238, 238, 238)'}} /> Books</div>
                    </Link> 
                </li>
                <li>
                    <Link to="/publishers">
                        <div className="item-link"><i className="fa fa-user" style={{color: 'rgb(238, 238, 238)'}} /> Publishers</div>
                    </Link> 
                </li>
                <li>
                    <Link to="/login" onClick={this.handleLogout.bind(this)} >
                        <div className="item-link"><i className="fa fa-sign-out" style={{color: 'rgb(238, 238, 238)'}} /> Sign Out</div>
                    </Link> 
                </li>
            </ul>
        </div>
      </div>
    );
  }
}

export default SideBar;
