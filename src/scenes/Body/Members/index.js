import React, { Component } from 'react';
import axios from 'axios';
import Scenes from '../../../scenes';
import SectionHeader from '../../../components/SectionHeader';
import AddMember from './scenes/AddMember';
import Loader from '../../../components/Loader';
import ViewMembers from './scenes/ViewMembers';
import '../../../Assets/css/members.min.css'

class Members extends Component {
// const Members = (props) => {
  // console.log(props);
  constructor(props) {
    super(props);
    this.fetchMembers=this.fetchMembers.bind(this);
    this.fetchBooks=this.fetchBooks.bind(this);
    this.state = {
      is: {
        fetching: false,
        error: false,
        ok: false
      },
      bookIs: {
        fetching: false,
        error: false,
        ok: false
      },
      error: null,
      auth: null,
      members: null,
      books: null
    };
  }

  componentWillMount(){
    this.fetchMembers();
    this.fetchBooks();
  }
  fetchMembers(e){
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
  fetchBooks(){
    console.log(localStorage.getItem('user'));
    this.setState({ bookIs: {fetching: true, error: false, ok: false} })
    const self = this;
    axios.post('http://localhost:1337/books',{
      user: localStorage.getItem('user')
    })
    .then((res)=>{
      console.log(res.data);
        if(res.data){

          self.setState({ bookIs: {fetching: false, error: false, ok: true} })
          self.setState({ books: res.data.books }, ()=>{    console.log('sasBooks', this.state.books);
        })
        }
        else{
          self.setState({ bookIs: {fetching: false, error: true, ok: false} })
          self.setState({ error: res.data.message })
        }
    })
  }
  renderContent() {
    console.log('sasBooks2', this.state.books)
    const { is, members } = this.state;
    console.log("members: ", members);
    if (is.fetching) {
      return <Loader />;
    }
    if (!members) {
      return (
        <div>None</div>
      );
    }
    // const sortedDriverList = drivers.sort((a, b) =>
    //   (new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1));
    return (
      <div>
        <div className="members-container">
          <ViewMembers data={members} triggerMembers={this.fetchMembers} books={this.state.books} />
        </div>
      </div>
    );
  }
  render() {
    console.log(this.state.books)
    return (
      <Scenes>
        <div>
          <SectionHeader>
            <div className="row">
              <div className="col-75">
                <span className="member-title">Members</span>
              </div>
              <div className="col-25" style={{ paddingRight: 0 }}>
                <AddMember 
                  triggerMembers={this.fetchMembers}
                  books={this.state.books ? this.state.books: []}
                />
              </div>
            </div>
          </SectionHeader>
          <div className="content-area-container">`{this.renderContent()}</div>
        </div>
      </Scenes>
    );
  }
};

export default Members;
