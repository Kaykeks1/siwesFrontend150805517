import React from 'react';
import axios from 'axios';


class DeleteBook extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modalIsOpen: false,
        selectedOption: null
      };
      this.deleteBook=this.deleteBook.bind(this);
    }
    
    deleteBook(e){
      e.preventDefault();  
      console.log('add');
      console.log(localStorage.getItem('user'));
      this.setState({ is: {fetching: true, error: false, ok: false} })
      const self = this;
      // let book = this.refs.book.value;
      axios.delete(`http://localhost:1337/book/${self.props.id}`,{
        user: localStorage.getItem('user')
      })
      .then((res)=>{
        console.log(res.data);
          if(res.data.ok){
  
            self.setState({ is: {fetching: false, error: false, ok: true} })
            // self.setState({ book: res.data.book }, ()=>{    console.log('yo');})
          self.props.triggerBooks()
          }
          else{
            self.setState({ is: {fetching: false, error: true, ok: false} })
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
            onClick={this.deleteBook}
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
  
  
  
  export default DeleteBook;
  