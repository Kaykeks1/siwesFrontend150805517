import React from 'react';
import axios from 'axios';
// import {Modal, ModalBody} from 'reactstrap'
import Modal from 'react-modal';
import Datetime from 'react-datetime';
import Select from 'react-select';
// import DateTimePicker from '../../../../../components/DateTimePicker';

// import '../PlanDetailsInfo.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

const customStyles = {
  overlay : {
    backgroundColor: 'rgba(15, 15, 15, 0.35)',
  },
  content : {
    width: '35%',
    height: '50%',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    transition: '.5s ease'

  }
};


class AddMember extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modalIsOpen: false,
        // selectedOption: null
      };
      this.addMember=this.addMember.bind(this);
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      // this.handleChange = this.handleChange.bind(this);
    }
    
    addMember(e){
      e.preventDefault();  
      console.log('add');
      console.log(localStorage.getItem('user'));
      this.setState({ is: {fetching: true, error: false, ok: false} })
      const self = this;
      let firstName = this.refs.firstName.value;
      let lastName = this.refs.lastName.value;
      let phoneNumber = this.refs.phoneNumber.value;
      let email = this.refs.email.value;
      let address = this.refs.address.value;
      let dateJoined = this.refs.dateJoined.value;
      // let book = this.state.selectedOption.map(book =>(book.value));
      // console.log(book);
      axios.post('http://localhost:1337/member',{
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
        dateJoined: dateJoined,
        // book: book,
        user: localStorage.getItem('user')
      })
      .then((res)=>{
        console.log(res.data);
          if(res.data.ok){
  
            self.setState({ is: {fetching: false, error: false, ok: true} })
            self.setState({ members: res.data }, ()=>{    console.log('yo');
            self.setState({modalIsOpen: false});
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

    openModal() {
      this.setState({modalIsOpen: true});
    }
  
    afterOpenModal() {
      // references are now sync'd and can be accessed.
      // this.subtitle.style.color = '#f00';
    }
  
    closeModal() {
      this.setState({modalIsOpen: false});
    }
    // handleChange(selectedOption) {
    //   this.setState({ selectedOption });
    // }
    render() {
      // const {books} = this.props;
      // const options = books.map(book => ({value: book.id, label: `${book.title} (${book.author})`}));
    return (
      <div>
        <div style={{float: 'right'}}>
        <button
          onClick={this.openModal}
          className="create-member-btn"
        >
          <i className="fa fa-plus" /> Add Member 
        </button>
        {/* <Datetime
          viewMode='months'
          closeOnTab      
            /> */}
        </div>
        <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className="member-form-header"><h2>Add Member Form</h2></div>
          {/* <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div> */}
          <form onSubmit={this.addMember}>
            <div className="row">
              <div className="col-50">
                <label className="member-label">
                  First Name
                </label><br />
                <input
                  className="member-input"
                  type="text"
                  ref="firstName"
                  placeholder="First Name"
                />
              </div>
              <div className="col-50">
                <label className="member-label">
                  Last Name
                </label><br />
                <input
                  className="member-input"
                  type="text"
                  ref="lastName"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-50">
                <label className="member-label">
                  Phone Number
                </label><br />
                <input
                  className="member-input"
                  type="number"
                  // name="password"
                  ref="phoneNumber"
                  placeholder="Mobile"
                />
              </div>
              <div className="col-50">
                <label className="member-label">
                  Email
                </label><br />
                <input
                  className="member-input"
                  type="email" 
                  // name="password"
                  ref="email"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-50">
                <label className="member-label">
                  Address
                </label><br />
                <input
                  className="member-input"
                  type="text"
                  // name="password"
                  ref="address"
                  placeholder="Address"
                />
              </div>
              <div className="col-50">
                <label className="member-label">
                  Date Joined
                </label>
                <input
                  className="member-input"
                  type="datetime-local"
                  // name="password"
                  ref="dateJoined"
                  placeholder="Date Joined"
                />
              </div>
            </div>
            
            <button
              onClick={this.closeModal}
              className="cancel-btn"
              name="cancel"
            >
              Cancel
            </button>

            <button
              // onClick={this.addMember}
              className="add-btn"
              type="submit"
              name="submit"
            >
              Add
            </button>
          </form>
        </Modal>
        </div>
      </div>
    );
    }
  };
  
  
  
  export default AddMember;
  