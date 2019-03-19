import React from 'react';
import PropTypes from 'prop-types';
import '../../Assets/css/panel.min.css';

const Panel = props => (
  <div className="panel" style={props.style}>
    {props.header ? <div className="panel-header">{props.header}</div> : null}
    <div className="panel-body">{props.children}</div>
    {props.footer ? <div className="panel-footer">{props.footer}</div> : null}
  </div>
);

Panel.defaultProps = {
  header: '',
  footer: '',
  children: '',
};


Panel.propTypes = {
  header: PropTypes.string,
  footer: PropTypes.string,
  children: PropTypes.node,
};

export default Panel;
