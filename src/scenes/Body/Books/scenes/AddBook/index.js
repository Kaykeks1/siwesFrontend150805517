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
    height: '40%',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    transition: '.5s ease'

  }
};

const options = [
  {value: true, label: 'Available'},
  {value: false, label: 'Not Available'},
]

class AddBook extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modalIsOpen: false,
        selectedOption: null,
        error: null,
        is: {
          fetching: false,
          error: false,
          ok: false
        },
      };
      this.addBook=this.addBook.bind(this);
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    
    addBook(e){
      e.preventDefault();  
      console.log(localStorage.getItem('user'));
      this.setState({ is: {fetching: true, error: false, ok: false} })
      const self = this;
      let title = this.refs.title.value;
      let author = this.refs.author.value;
      let price = this.refs.price.value;
      let available = this.state.selectedOption.value;
      // let book = this.refs.book.value;
      axios.post('http://localhost:1337/book',{
        title: title,
        author: author,
        price: price,
        available: available,
        // book: book,
        user: localStorage.getItem('user')
      })
      .then((res)=>{
        console.log(res.data);
          if(res.data.ok){
  
            self.setState({ is: {fetching: false, error: false, ok: true} })
            // self.setState({ books: res.data }, ()=>{    console.log('yo');})
            self.setState({modalIsOpen: false});
            self.props.triggerBooks()
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
    return (
      <div>
        <div style={{float: 'right'}}>
        <button
          onClick={this.openModal}
          className="create-book-btn"
        >
          <i className="fa fa-plus" /> Add Book 
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

          <div className="book-form-header"><h2>Add Book Form</h2></div>
          <form onSubmit={this.addBook}>
            <div className="row">
              <div className="col-50">
                <label className="book-label">
                  Title
                </label><br />
                <input
                  className="book-input"
                  type="text"
                  ref="title"
                  placeholder="Book Title"
                />
              </div>
              <div className="col-50">
                <label className="book-label">
                  Author
                </label><br />
                <input
                  className="book-input"
                  type="text"
                  ref="author"
                  placeholder="Author's name"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-50">
                <label className="book-label">
                  Cost
                </label><br />
                <input
                  className="book-input"
                  type="number"
                  // name="password"
                  ref="price"
                  placeholder="price"
                />
              </div>
              <div className="col-50">
                <label className="book-label">
                  Status
                </label><br />
                <Select 
                  // className="book-input"
                  ref="available"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={options}
                  placeholder="Availabilty"
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
  
  
  
  export default AddBook;
  