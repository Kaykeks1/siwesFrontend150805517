import React from 'react';
import axios from 'axios';


class DeleteMember extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modalIsOpen: false,
        selectedOption: null
      };
      this.deleteMember=this.deleteMember.bind(this);
    }
    
    deleteMember(e){
      e.preventDefault();  
      console.log('add');
      console.log(localStorage.getItem('user'));
      this.setState({ is: {fetching: true, error: false, ok: false} })
      const self = this;
      // let book = this.refs.book.value;
      axios.delete(`http://localhost:1337/member/${self.props.id}`,{
        user: localStorage.getItem('user')
      })
      .then((res)=>{
        console.log(res.data);
          if(res.data.ok){
  
            self.setState({ is: {fetching: false, error: false, ok: true} })
            self.setState({ members: res.data }, ()=>{    console.log('yo');
            self.props.triggerMembers()
          })
            // console.log("logged in", res.data);
            // localStorage.setItem('auth', res.data.authenticated);
            // localStorage.setItem('user', res.data.id);
            // console.log("user1: ",localStorage.getItem('user'));
            // self.setState({auth: localStorage.getItem('auth')});
            // console.log(localStorage.getItem('auth'));
          }
          else{
            self.setState({ is: {fetching: false, error: true, ok: false} })
            // self.setState({ error: res.data.message })
            //   console.log("Not logged in", res.data);
          }
      })
      e.preventDefault();  
    }
    render() {
    return (
      <div>
        <div style={{float: 'right'}}>
        <button
            className="edit-btn"
            onClick={this.deleteMember}
            >
            <i className="material-icons">delete</i>
            <span>Delete</span>
        </button>
        </div>
        <div> 
        </div>
      </div>
    );
    }
  };
  
  
  
  export default DeleteMember;
  