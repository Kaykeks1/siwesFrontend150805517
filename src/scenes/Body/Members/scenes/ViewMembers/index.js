import React from 'react';
import PropTypes from 'prop-types';
import Sugar from 'sugar';
import Panel from '../../../../../components/Panel';
// import DriverItem from './components/DriverItem';
import '../../../../../Assets/css/viewMembers.min.css';
import EditMember from '../EditMember';
import AssignBook from '../AssignBook';
import DeleteMember from '../DeleteMember';


const ViewMembers = props => {
  return(
  <div>
    <div className="list" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)'}}>
      {
        props.data.map(item =>
          (
            <div className="member-item" style={{margin: '5px'}}>
                <Panel style={{borderRadius: '10px', marginLeft: '8px'}}>
                  <div className="member-info">
                    <div className="row info-header">
                      <div className="col-30">
                        <i className="fa fa-bars" />
                        {/* <i className="fa fa-ellipsis-h" /> */}
                      </div>
                      <div className="col-25" style={{ paddingRight: 0 }}>
                        <AssignBook triggerMembers={props.triggerMembers}  data={item} books={props.books}/>
                      </div>
                      <div className="col-20" style={{ paddingRight: 0 }}>
                        <EditMember triggerMembers={props.triggerMembers}  data={item} books={props.books}/>
                      </div>
                      <div className="col-25" style={{ paddingRight: 0 }}>
                        <DeleteMember triggerMembers={props.triggerMembers} id={item.id} />
                      </div>
                    </div>
                    <p className = "infos"><b>Name:</b> <i className="fa fa-user" /> &nbsp;{item.firstName} {item.lastName}</p>
                    <span className = "infos"><b>Email:</b> <i className="fa fa-envelope" style={{ fontSize: '14px' }} /> &nbsp;
                      <a href={(item.email) ? `mailto: +${item.email}` : null} style={{ textDecoration: 'none', color: '#02adfd' }}>
                        {item.email ? ` ${item.email}` : null}
                      </a>
                    </span><br />
                    <span className = "infos"><b>Mobile Number:</b> <i className="fa fa-phone" /> &nbsp;
                      <a href={(item.phoneNumber) ? `tel: +${item.phoneNumber}` : null} style={{ textDecoration: 'none', color: '#02adfd' }}>
                        {item.phoneNumber ? `${item.phoneNumber}` : null}
                      </a>  
                    </span><br />
                    <span className = "infos"><b>Home Address:</b> <i className="fa fa-home" /> &nbsp;{item.address ? `${item.address}` : null}</span><br />
                    <span className = "infos"><b>Date Joined:</b> <i className="fa fa-calendar" /> &nbsp;{item.dateJoined ? `${Sugar.Date(item.dateJoined).format().raw}` : null}</span><br />
                  </div>
                </Panel>
          </div>
          ))
                    }
    </div>
  </div>
)};

ViewMembers.defaultProps = {
  data: [],
};
ViewMembers.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ViewMembers;
