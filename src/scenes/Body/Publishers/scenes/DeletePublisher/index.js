import React from 'react';
import axios from 'axios';


class DeletePublisher extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modalIsOpen: false,
        selectedOption: null,
        publisher: null,
      };
      this.deletePublisher=this.deletePublisher.bind(this);
    }
    
    deletePublisher(e){
      e.preventDefault();  
      console.log('add');
      console.log(localStorage.getItem('user'));
      this.setState({ is: {fetching: true, error: false, ok: false} })
      const self = this;
      axios.delete(`http://localhost:1337/publisher/${self.props.id}`,{
        user: localStorage.getItem('user')
      })
      .then((res)=>{
        console.log(res.data);
          if(res.data.ok){
  
            self.setState({ is: {fetching: false, error: false, ok: true} })
            // self.setState({ publisher: res.data.publisher }, ()=>{    console.log('yo');})
          self.props.triggerPublishers()
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
            onClick={this.deletePublisher}
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
  
  
  
  export default DeletePublisher;
  