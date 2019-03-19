import React from 'react';
import axios from 'axios';
// import {Modal, ModalBody} from 'reactstrap'
import Modal from 'react-modal';
import Select from 'react-select';


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

class AddPublisher extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modalIsOpen: false,
        selectedOption: null,
        error: null,
        publisher: null,
        is: {
          fetching: false,
          error: false,
          ok: false
        },
      };
      this.addPublisher=this.addPublisher.bind(this);
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    
    addPublisher(e){
      e.preventDefault();  
      console.log(localStorage.getItem('user'));
      this.setState({ is: {fetching: true, error: false, ok: false} })
      const self = this;
      let firstName = this.refs.firstName.value;
      let lastName = this.refs.lastName.value;
      let phoneNumber = this.refs.phoneNumber.value;
      let email = this.refs.email.value;
      let address = this.refs.address.value;
      console.log(this.state.selectedOption)
      let book = this.state.selectedOption.map(book =>(book.value));
      axios.post('http://localhost:1337/publisher',{
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
        book: book,
        user: localStorage.getItem('user')
      })
      .then((res)=>{
        console.log(res.data);
          if(res.data.ok){
  
            self.setState({ is: {fetching: false, error: false, ok: true} })
            // self.setState({ publisher: res.data.publisher }, ()=>{    console.log('yo');})
            self.setState({modalIsOpen: false});
            self.props.triggerPublishers()
          }
          else{
            self.setState({ is: {fetching: false, error: true, ok: false} })
            self.setState({ error: res.data.message })
          }
      })
      e.preventDefault();  
    }

    openModal() {
      this.setState({modalIsOpen: true});
    }
  
    afterOpenModal() {
    }
  
    closeModal() {
      this.setState({modalIsOpen: false});
    }
    handleChange(selectedOption) {
      console.log("option selected: ", selectedOption)
      this.setState({ selectedOption });
    }
    render() {
      const {books} = this.props;
      const options = books.map(book => ({value: book.id, label: `${book.title} (${book.author})`}));
    return (
      <div>
        <div style={{float: 'right'}}>
        <button
          onClick={this.openModal}
          className="create-publisher-btn"
        >
          <i className="fa fa-plus" /> Add Publisher 
        </button>
        </div>
        <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className="publisher-form-header"><h2>Add Publisher Form</h2></div>
          <form onSubmit={this.addPublisher}>
            <div className="row">
              <div className="col-50">
                <label className="publisher-label">
                  First Name
                </label>
                <input
                  className="publisher-input"
                  type="text"
                  ref="firstName"
                  placeholder="First Name"
                />
              </div>
              <div className="col-50">
                <label className="publisher-label">
                  Last Name
                </label>
                <input
                  className="publisher-input"
                  type="text"
                  ref="lastName"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-50">
                <label className="publisher-label">
                  Phone Number
                </label>
                <input
                  className="publisher-input"
                  type="number"
                  // name="password"
                  ref="phoneNumber"
                  placeholder="Mobile"
                />
              </div>
              <div className="col-50">
                <label className="publisher-label">
                  Email
                </label>
                <input
                  className="publisher-input"
                  type="email" 
                  // name="password"
                  ref="email"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-50">
                <label className="publisher-label">
                  Address
                </label>
                <input
                  className="publisher-input"
                  type="text"
                  // name="password"
                  ref="address"
                  placeholder="Address"
                />
              </div>
              <div className="col-50">
                <label className="publisher-label">
                  Book
                </label>
                <Select
                  name="book"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={options}
                  placeholder="Select Book(s)"
                  isMulti
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
  
  
  
  export default AddPublisher;
  