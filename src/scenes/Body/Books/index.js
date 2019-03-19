import React, { Component } from 'react';
import axios from 'axios';
import Scenes from '../../../scenes';
import SectionHeader from '../../../components/SectionHeader';
import AddBook from './scenes/AddBook';
import Loader from '../../../components/Loader';
import ViewBooks from './scenes/ViewBooks';
import MemberFilter from './scenes/MemberFilter';
import FilterComponent from '../../../components/FilterComponent';
import '../../../Assets/css/books.min.css'

class Books extends Component {
  constructor(props) {
    super(props);
    this.fetchBooks=this.fetchBooks.bind(this);
    this.fetchMembers=this.fetchMembers.bind(this);
    this.filterMembers=this.filterMembers.bind(this);
    this.state = {
      is: {
        fetching: false,
        error: false,
        ok: false
      },
      error: null,
      books: null,
      books2: null,
      members: null
    };
  }

  componentWillMount(){
    this.fetchBooks();
    this.fetchMembers();
  }
  fetchBooks(){
    console.log(localStorage.getItem('user'));
    this.setState({ is: {fetching: true, error: false, ok: false} })
    const self = this;
    axios.post('http://localhost:1337/books',{
      user: localStorage.getItem('user')
    })
    .then((res)=>{
      console.log(res.data);
        if(res.data){

          self.setState({ is: {fetching: false, error: false, ok: true} })
          self.setState({ books: res.data.books }, ()=>{    console.log('yo');
        })
        self.setState({ books2: res.data.books })
        }
        else{
          self.setState({ is: {fetching: false, error: true, ok: false} })
          self.setState({ error: res.data.message })
        }
    })
  }
  fetchMembers(){
    console.log(localStorage.getItem('user'));
    this.setState({ is: {fetching: true, error: false, ok: false} })
    const self = this;
    axios.post('http://localhost:1337/members',{
      user: localStorage.getItem('user')
    })
    .then((res)=>{
      console.log(res.data);
        if(res.data){

          self.setState({ is: {fetching: false, error: false, ok: true} })
          self.setState({ members: res.data.members }, ()=>{    console.log('yo');
        })
        }
        else{
          self.setState({ is: {fetching: false, error: true, ok: false} })
          self.setState({ error: res.data.message })
        }
    })
    // e.preventDefault();  
  }
  filterMembers(item) {
      if(item) {
        this.setState({books: this.state.books2}, ()=>{
          const updatedBooks = this.state.books.filter(value => item.value === value.member);
          console.log('updatedBooks', updatedBooks);
          const self = this;

          self.setState({books: updatedBooks});
        });
      }
  }
  renderContent() {
    const { is, books } = this.state;
    console.log("books: ", books);
    if (is.fetching) {
      return <Loader />;
    }
    if (!books) {
      return (
        <div>None</div>
      );
    }
    return (
      <div>
        <div className="drivers-table-container">
          <ViewBooks data={books} triggerBooks={this.fetchBooks} />
        </div>
      </div>
    );
  }
  render() {
    return (
      <Scenes>
        <div>
          <SectionHeader>
            <div className="row">
              <div className="col-50">
              <span className="book-title">Books</span>
              </div>
              <div className="col-25">
                <FilterComponent
                  text="Filter Member" 
                  // dropDownCss={css`
                  //               width: 500px;
                  //               padding: 16px;
                  //               `}
                >
                  <MemberFilter
                    handleClick={this.filterMembers}
                    members={this.state.members}
                  /> 
                </FilterComponent>                
              </div>
              <div className="col-25" style={{ paddingRight: 0 }}>
                <AddBook 
                  triggerBooks={this.fetchBooks}
                />
              </div>
            </div>
          </SectionHeader>
          <div className="books-container">`{this.renderContent()}</div>
        </div>
      </Scenes>
    );
  }
};

export default Books;
