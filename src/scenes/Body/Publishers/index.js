import React, { Component } from 'react';
import axios from 'axios';
import Scenes from '../../../scenes';
import SectionHeader from '../../../components/SectionHeader';
import AddPublisher from './scenes/AddPublisher';
import Loader from '../../../components/Loader';
import ViewPublishers from './scenes/ViewPublishers';
import '../../../Assets/css/publishers.min.css'

class Publishers extends Component {
  constructor(props) {
    super(props);
    this.fetchPublishers=this.fetchPublishers.bind(this);
    this.fetchBooks=this.fetchBooks.bind(this);
    this.state = {
      is: {
        fetching: false,
        error: false,
        ok: false
      },
      error: null,
      publishers: null,
      books: null
    };
  }

  componentWillMount(){
    this.fetchPublishers();
    this.fetchBooks();
  }
  fetchPublishers(){
    console.log(localStorage.getItem('user'));
    this.setState({ is: {fetching: true, error: false, ok: false} })
    const self = this;
    axios.post('http://localhost:1337/publishers',{
      user: localStorage.getItem('user')
    })
    .then((res)=>{
      console.log(res.data);
        if(res.data){

          self.setState({ is: {fetching: false, error: false, ok: true} })
          self.setState({ publishers: res.data.publishers }, ()=>{    console.log('yo');
        })
        }
        else{
          self.setState({ is: {fetching: false, error: true, ok: false} })
          self.setState({ error: res.data.message })
        }
    })
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
          self.setState({ books: res.data.books }, ()=>{    console.log('yo');
        })
        }
        else{
          self.setState({ bookIs: {fetching: false, error: true, ok: false} })
          self.setState({ error: res.data.message })
        }
    })
  }
  renderContent() {
    const { is, publishers } = this.state;
    console.log("publishers: ", publishers);
    if (is.fetching) {
      return <Loader />;
    }
    if (!publishers) {
      return (
        <div>None</div>
      );
    }
    return (
      <div>
        <div className="drivers-table-container">
          <ViewPublishers data={publishers} triggerPublishers={this.fetchPublishers} books={this.state.books ? this.state.books: []} />
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
              <div className="col-75">
              <span className="publisher-title">Publishers</span>
              </div>
              <div className="col-25" style={{ paddingRight: 0 }}>
                <AddPublisher
                  triggerPublishers={this.fetchPublishers}
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

export default Publishers;
