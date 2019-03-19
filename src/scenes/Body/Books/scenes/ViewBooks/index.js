import React from 'react';
import PropTypes from 'prop-types';
import Panel from '../../../../../components/Panel';
// import DriverItem from './components/DriverItem';
import '../../../../../Assets/css/viewMembers.min.css';
import EditBook from '../EditBook';
import DeleteBook from '../DeleteBook';

const color = {
  true: '#15d865',
  false: '#ffd930',
};
const ViewBooks = props => (
  <div>
    <div className="list" style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)'}}>
      {
                        props.data.map(item =>
                          (
                            <div className="member-item" style={{margin: '5px'}}>
                                <Panel style={{borderRadius: '10px', marginLeft: '8px'}}>
                                  <div className="member-info">
                                    <div className="row info-header">
                                      <div className="col-50">
                                        <i className="fa fa-bars" />
                                        {/* <h3 className="heading">Customer Information</h3> */}
                                      </div>
                                      <div className="col-25" style={{ paddingRight: 0 }}>
                                        <EditBook triggerBooks={props.triggerBooks}  data={item} />
                                      </div>
                                      <div className="col-25" style={{ paddingRight: 0 }}>
                                        <DeleteBook triggerBooks={props.triggerBooks} id={item.id} />
                                      </div>
                                    </div>
                                    <p><b>Title:</b> <i className="fa fa-tag" /> &nbsp; {item.title}</p>
                                    <span><b>Authur:</b> <i className="fa fa-user" /> &nbsp;{item.author ? `${item.author}` : null}</span><br />
                                    <span><b>Cost:</b> <i className="fa fa-money" /> &nbsp; &#8358;{item.price ? `${item.price}` : null}</span><br />
                                    <span><b>Status:</b> <i className="fa fa-circle" style={item.available ? { color: '#15d865' } : { color: '#ffd930' }}/> &nbsp;{item.available ? 'Available' : 'Not Available'}</span><br />
                                  </div>
                                </Panel>
                          </div>
                          ))
                    }
    </div>
  </div>
);

ViewBooks.defaultProps = {
  data: [],
};
ViewBooks.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ViewBooks;
