import React from 'react';
import axios from 'axios';
// import {Modal, ModalBody} from 'reactstrap'
import Modal from 'react-modal';
import Datetime from 'react-datetime';
import Select from 'react-select';
import ItemCard from './ItemCard';
// import DateTimePicker from '../../../../../components/DateTimePicker';

// import '../PlanDetailsInfo.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

const customStyles = {
  overlay : {
    backgroundColor: 'rgba(15, 15, 15, 0.35)',
  },
  content : {
    width: '50%',
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

class AssignBook extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modalIsOpen: false,
        // selectedOption: this.props.data.book.map(item => ({value: item.id, label: `${item.title} (${item.author})`})),
        selectedOption: null,
        books: this.props.data.books ? this.props.data.books : [],
        bookList: this.props.books ? this.props.books : [],
      };
      this.assignBook=this.assignBook.bind(this);
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.addItem=this.addItem.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
    }
    componentWillReceiveProps(nextProps) {
      console.log("sas1", this.props.data.books)
      this.setState({ books: nextProps.data.books })
      console.log("sas2", this.props)
      if (nextProps.books) {
        console.log("seeeeee")
        this.setState({ bookList: nextProps.books })
      }

    }
    
    assignBook(e){
      e.preventDefault();  
      console.log('assignBook');
      console.log(localStorage.getItem('user'));
      this.setState({ is: {fetching: true, error: false, ok: false} })
      const self = this;
      console.log(this.state.selectedOption)
      // let book = this.state.selectedOption.map(book =>(book.value));
      // let book = this.state.selectedOption.value;
      // const books = this.props.books.find(item => item.id === book);   
      const books = this.state.books;    
      axios.patch(`http://localhost:1337/member/book/${self.props.data.id}`,{
        books: books,
        user: localStorage.getItem('user')
      })
      .then((res)=>{
        console.log(res.data);
          if(res.data.ok){
  
            self.setState({ is: {fetching: false, error: false, ok: true} }, ()=>self.props.triggerMembers())
            // this.setState({ books: books })
            self.setState({ members: res.data }, ()=>{    console.log('yo');
            self.setState({modalIsOpen: false});
            
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
    handleChange(selectedOption) {
      this.setState({ selectedOption });
    }
    addItem(e){
      e.preventDefault();  
      let assignedDate = this.refs.assignedDate.value;
      let dueDate = this.refs.dueDate.value;
      let bookId = this.state.selectedOption.value;
      let book = this.props.books.find(item => item.id === bookId);
      book= {...book, assignedDate, dueDate}
      this.setState({books: [...this.state.books, book]});
      this.myFormRef.reset();
      this.setState({ selectedOption: null });
      e.preventDefault();  
    }
    deleteItem(item) {
      const updatedBooks = this.state.books.filter(value => item !== value.id);
      this.setState({books: updatedBooks});
    }
    render() {
      const {books, data} = this.props;
      const options = this.state.bookList.map(book => ({value: book.id, label: `${book.title} (${book.author})`}));
      console.log("The Books: ", this.state.books)
      let td = new Date();
      let d = new Date(data.dateJoined);
      console.log("Date: ", td > d, " : ", td, " and ", d)
      return (
      <div>
        <div style={{float: 'right'}}>
        <button
            className="edit-btn"
            onClick={this.openModal}
            >
            <i className="material-icons">mode_edit</i>
            <span>Book</span>
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
          <div className="row">
            <div className="col-50">
              <h2>Assign Book Form</h2>
            </div>
            <div className="col-50 save-div">
              <button
                onClick={this.assignBook}
                className="save-btn"
              >
                Save
              </button>
            </div>
          </div>
          <form onSubmit={this.addItem} ref={(el) => this.myFormRef = el}>
            <div className="row">
              <div className="col-50">
                <label className="assign-label">
                  Assigned Date
                </label>
                <input
                  className="assign-input"
                  type="datetime-local"
                  // name="password"
                  ref="assignedDate"
                  placeholder="Date Joined"
                />
              </div>
              <div className="col-50">
                <label className="assign-label">
                  Due Date
                </label>
                <input
                  className="assign-input"
                  type="datetime-local"
                  // name="password"
                  ref="dueDate"
                  placeholder="Date Joined"
                /><br />
              </div>
            </div>
            <div className="row">
              <div className="col-50">
                <label className="assign-label">
                  Book
                </label>
                <Select 
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={options}
                  placeholder="Book"
                  className="assign-book-select"
                />
              </div>
              <div className="col-50">
                <button
                  // onClick={this.editMember}
                  className="assign-btn"
                  type="submit"
                  name="submit"
                >
                  <i className="fa fa-plus" /> Assign Book
                </button>
              </div>
            </div>
          </form>
          {
            this.state.books &&
            <div className="book-table-container">
              <table className="book-list-table" style={{width: '100%'}}>
                <thead>
                  <tr className="book-list-heading">
                    <th className="title" style={{textAlign: 'center'}}>Book</th>
                    <th className="title" style={{textAlign: 'center'}}>Assigned Date</th>
                    <th className="title" style={{textAlign: 'center'}}>Due Date</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {
                  this.state.books.map(data => (<ItemCard
                    key={data.id}
                    data={data}
                    remove={() => this.deleteItem(data.id)}
                  />))
                }
                </tbody>
              </table>
            </div>
          }
        </Modal>
        </div>
      </div>
    );
    }
  };
  
  
  
  export default AssignBook;
  