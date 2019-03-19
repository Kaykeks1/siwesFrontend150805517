import React, { Component } from 'react';
import axios from 'axios';
import Scenes from '../../../scenes';
import XLSX from 'xlsx';
import SectionHeader from '../../../components/SectionHeader';
import Panel from '../../../components/Panel';
import '../../../Assets/css/dashboard.min.css'


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.fetch=this.fetch.bind(this);
    this.state = {
      is: {
        fetching: false,
        error: false,
        ok: false
      },
      members: 0,
      books: 0,
      publishers: 0,
      assignedBooks: null,
      error: null,
    }
  }
  componentWillMount(){
    this.fetch();
  }
  async fetch(e){
    console.log(localStorage.getItem('user'));
    this.setState({ is: {fetching: true, error: false, ok: false} })
    const self = this;
    await axios.post('http://localhost:1337/members',{//1
      user: localStorage.getItem('user')
    })
    .then((res)=>{
        if(res.data){
          self.setState({ members: res.data.size },() => {
          });
        }
        else{
          self.setState({ is: {fetching: false, error: true, ok: false} })
          self.setState({ error: res.data.message })
        }
    })
  await axios.post('http://localhost:1337/books?populate=member',{//2
    user: localStorage.getItem('user')
  })
  .then((res)=>{
      if(res.data){
        self.setState({ books: res.data.size }, ()=>{
          console.log("data: ",res.data)
      })
      self.setState({ assignedBooks: res.data.assignedBooks })
      }
      else{
        self.setState({ is: {fetching: false, error: true, ok: false} })
        self.setState({ error: res.data.message })
      }
  })
  await axios.post('http://localhost:1337/publishers',{//3
    user: localStorage.getItem('user')
  })
  .then((res)=>{
      if(res.data){
        self.setState({ publishers: res.data.size }, ()=>{    console.log('yo');
      })
      self.setState({ is: {fetching: false, error: false, ok: true} })
      }
      else{
        self.setState({ is: {fetching: false, error: true, ok: false} })
        self.setState({ error: res.data.message })
      }
  })
    // e.preventDefault();  
  }
  render() {
    const {members, books, publishers, assignedBooks}= this.state;
    return (
      <Scenes>
        <div>
            <SectionHeader>
            <div className="row">
              <div className="col-75">
                <span className="dashboard-title">Dashboard</span>
              </div>
              <div className="col-25  " style={{ paddingRight: 0 }}>
              {/* <div onSubmit={this.onFormSubmit}>
                <input type="file" name="file" onChange={(e)=>this.onChange(e)}/>
              </div> */}
              </div>
            </div>
          </SectionHeader>
            <div>
              <div className="row" style={{height: '300px'}}>
                <div className="col-33" style={{height: '300px'}}>
                  <Panel style={{width: '70%', height: '40%', margin: '0 auto', textAlign: 'center', marginTop: '20%'}}>
                    <div className="item-box" style={{color: '#388E36'}}>
                      <i className="fa fa-book" style={{fontSize: '2.0em'}} /> &nbsp;<span className="item-number">{books}</span> <span style={{color: '#388E36'}}>books</span>
                    </div>
                  </Panel>
                </div>
                <div className="col-33" style={{height: '300px'}}>
                  <Panel style={{width: '70%', height: '40%', margin: '0 auto', textAlign: 'center', marginTop: '20%'}}>
                    <div className="item-box" style={{color: '#800080'}}>
                      <i className="fa fa-user" style={{fontSize: '2.0em'}} /> &nbsp;<span className="item-number">{members}</span> <span style={{color: '#800080'}}>members</span>
                    </div>
                  </Panel>
                </div>
                <div className="col-33" style={{height: '300px'}}>
                  <Panel style={{width: '70%', height: '40%', margin: '0 auto', textAlign: 'center', marginTop: '20%'}}>
                    <div className="item-box" style={{color: '#DD4B39'}}>
                      <i className="fa fa-user" style={{fontSize: '2.0em'}} /> &nbsp;<span className="item-number">{publishers}</span> <span style={{color: '#DD4B39'}}>publishers</span>
                    </div>
                  </Panel>
                </div>
              </div>
              <Panel style={{marginLeft: '2%', width: '96%', height: '600px'}}>
                <div className="assigned-book-title">
                  <h3><b>Borrowed Books</b></h3>
                  List of books that have been borrowed
                </div>
                <div className="table-div">
                <table className="dashboard-table">
                      <thead>
                        <tr>
                          <th>Book Title</th>
                          <th>Authors</th>
                          <th>Assigned to</th>
                        </tr>
                      </thead>
                      <tbody>
                        { assignedBooks ?
                          assignedBooks.map( item => 
                            (
                              <tr>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>{item.member.firstName} {item.member.lastName}</td>
                              </tr>)) :
                          "No Books"
                        }
                      </tbody>
                    </table>
                </div>
              </Panel>
            </div>
        </div>
      </Scenes>
    );
  }
}

export default Dashboard;
