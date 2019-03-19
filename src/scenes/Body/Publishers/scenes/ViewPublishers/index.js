import React from 'react';
import PropTypes from 'prop-types';
import Panel from '../../../../../components/Panel';
// import DriverItem from './components/DriverItem';
import '../../../../../Assets/css/viewMembers.min.css';
import EditPublisher from '../EditPublisher';
import DeletePublisher from '../DeletePublisher';


const ViewPublishers = props => (
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
                                        <EditPublisher triggerPublishers={props.triggerPublishers}  data={item} books={props.books} />
                                      </div>
                                      <div className="col-25" style={{ paddingRight: 0 }}>
                                        <DeletePublisher triggerPublishers={props.triggerPublishers} id={item.id} />
                                      </div>
                                    </div>
                                    <p><b>Name:</b> <i className="fa fa-user" /> &nbsp;{item.firstName} {item.lastName}</p>
                                    <span><b>Email:</b> <i className="fa fa-envelope" style={{ fontSize: '14px' }} /> &nbsp;
                                      <a href={(item.email) ? `mailto: +${item.email}` : null} style={{ textDecoration: 'none', color: '#02adfd' }}>
                                        {item.email ? ` ${item.email}` : null}
                                      </a>
                                    </span><br />
                                    <span><b>Mobile Number:</b> <i className="fa fa-phone" /> &nbsp;
                                      <a href={(item.phoneNumber) ? `tel: +${item.phoneNumber}` : null} style={{ textDecoration: 'none', color: '#02adfd' }}>
                                        {item.phoneNumber ? `${item.phoneNumber}` : null}
                                      </a>  
                                    </span><br />
                                    <span><b>Home Address:</b> <i className="fa fa-home" /> &nbsp;{item.address ? `${item.address}` : null}</span><br />
                                  </div>
                                </Panel>
                          </div>
                          ))
                    }
    </div>
  </div>
);

ViewPublishers.defaultProps = {
  data: [],
};
ViewPublishers.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ViewPublishers;
