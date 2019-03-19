import React from 'react';
import PropTypes from 'prop-types';
import '../../Assets/css/sectionHeader.min.css';

const SectionHeader = props => (

  <header className="header">
    {props.children}
  </header>
);

SectionHeader.defaultProps = {
  children: '',
};

SectionHeader.propTypes = {
  children: PropTypes.node,
};

export default SectionHeader;
